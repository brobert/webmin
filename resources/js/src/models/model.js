/* eslint-disable */
import _ from 'underscore';
import Backbone from 'backbone';
import BbAssociations from 'backbone-associations';
import Parseable from 'models/resources/mixins/parseable';
import ToJsonable from 'models/resources/mixins/to_jsonable';
import Constraintable from 'models/resources/mixins/constraintable';
import Relatable from 'models/resources/mixins/relatable';
import Fetchable from 'models/resources/mixins/fetchable';
import Websocketable from 'models/resources/mixins/websocketable';
import Cronable from 'models/resources/mixins/cronable';
import multipart from 'models/resources/mixins/save_multipart';

var instanceMethods = {
    constructor: function(attributes, options) {
        Constraintable.initWithConstraints.apply(this, arguments);
        var ret = Backbone.AssociatedModel.apply(this, arguments);
        Relatable.bindForeignKeysToRelatedModels.apply(this, arguments);


        if (options && options.websocketable) Websocketable(this);
        if (this.cronable) _.extend(this, Cronable);

        return ret; // return value of default parent contructor
    },

    save: function() {
        if (this.isFileUpload()) {
            return multipart.save.apply(this, arguments);
        }

        return Backbone.Model.prototype.save.apply(this, arguments);
    },

    parse: function(response, options) {
        return Parseable.parse.apply(this, arguments);
    },

    toJSON: function() {
        var response = Backbone.AssociatedModel.prototype.toJSON.apply(this, arguments);
        return ToJsonable.toJSON.call(this, response);
    },

    fetch: function(options) {
        options = options || {};
        options = Fetchable.extendFetchOptions.call(this, options)
        return Backbone.AssociatedModel.prototype.fetch.apply(this, [options]);
    },

    validateConstraints: function() {
        Constraintable.validateConstraints.apply(this, arguments);
        // collect/reset this.constraintsErros , set this.constraintsValid
    },

    validate: function(attrs, options) {
        //TODO use validateConstraints in validate to not break save
        //if (!this.constraintsValid) return this.constraintsErros;
    },

    /**
     * Multiwindow uniqueid (extends http://backbonejs.org/#Model-cid with owa3 windowid).
     * @return {string} unique id
     */
    uniqueId: function() {
        return OWA.getWindowId() + '-' + this.cid;
    },

    /**
     * Returns resource name eg. 'customer_trackgroup'
     * @return {String}
     */
    getResName: function() {
        var res;

        // can be define resourceName directly
        if (this.resourceName) {
            return this.resourceName;
        }

        if (!this.urlRoot && this.url && typeof(this.url) === 'function') {
            this.urlRoot = this.url();
        }

        if (res = this.urlRoot.match(/^\/res\/([^\?]+)/)) {
            return res[1];
        }
        throw 'no recognized resource';
    },
    /**
     * Getter for this.fieldTypes of models, used by form field factory.
     * Throws error if expected fieldType is missing.
     * @param {String} attr - name of attribute (or relationship)
     * @return {Object} Object of 'type' and other properties
     */
    getFieldType: function(attr) {
        if (typeof this.fieldTypes !== 'object')
            console.error('unknown fieldTypes');
        if (!this.fieldTypes.hasOwnProperty(attr))
            console.error('unknown fieldType for ' + attr)

        // normalize if compact eg. name: 'string' => name: {type: 'string'}
        if (typeof this.fieldTypes[attr] === 'string')
            return {
                type: this.fieldTypes[attr]
            };
        else if (typeof this.fieldTypes[attr] === 'function')
            return this.fieldTypes[attr].call(this);

        return this.fieldTypes[attr];
    },

    /**
     * detects if Model has 'file' type field to turn multipartSave instead of json save
     * TODO add functionality for react forms
     */
    isFileUpload: function() {
        // react forms does not have fieldTypes
        if (_.isUndefined(this.fieldTypes)) {
            return false;
        }

        if (typeof this.fieldTypes !== 'object') {
            console.error('unknown fieldTypes');
        }

        return _.some(_.pairs(this.fieldTypes), _.bind(function(entry) {
            return this.getFieldType(entry[0]).type === 'file';
        }, this));
    },

    /**
     * Checks fieldType for given attr.
     * @param {String} attr - name of attribute (or relationship)
     * @return {Boolean} true if fieldType exists and is defined
     */
    hasFieldType: function(attr) {
        return typeof this.fieldTypes === 'object' && this.fieldTypes[attr] !== undefined;
    },

    /**
     * check attribute existence
     * @param {String} attr - name of attribute
     * @return {Boolean} true if exists
     */
    hasAttribute: function (attr) {
        return this.attributes.hasOwnProperty(attr);
    },

    /**
     * myModel.toLabel() creates standard way to get 'name' of current model.
     * By default it is value of 'name' attribute.
     * May be customized in two ways:
     * - by overriding 'labelAttr' (eg. model_name in ca_model)
     * - by custom method 'toLabel' (simple text, no html)
     */
    labelAttr: 'name',

    toLabel: function() {
        if (_.isArray(this.labelAttr)) {
            return this.labelAttr.map((attrName) => (this.get(attrName))).join(' ');
        }
        return this.get(this.labelAttr);
    }
}

_.extend(
    instanceMethods,
    Relatable._instanceMethods,
    Constraintable._instanceMethods
);

var OWAModel = Backbone.AssociatedModel.extend(
    instanceMethods, {
        /**
         * @description static method - allows use translations inside Backbone Models without
         * OWAModel instances
         * @param {type} token
         * @param {type} args
         * @returns {unresolved}
         */
        lang: function(token, args) {
            return Backbone.lang(token, args);
        }

    });

export default OWAModel;
