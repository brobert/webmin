/* eslint-disable */
/**
 * Allow to send FormData rewriting original model save method
 * took from https://github.com/homeslicesolutions/backbone-model-file-upload/blob/master/backbone-model-file-upload.js
 */
import _ from 'underscore';
import Backbone from 'backbone';

function save(key, val, options) {
    // Variables
    var attrs = {},
        attributes = this.attributes;

    // Do not proceed if smth like IE9 opened
    if (!FormData) {
        return Backbone.Model.prototype.save.call(this, key, val, options);
    }

    // Signature parsing - taken directly from original Backbone.Model.save
    // and it states: 'Handle both "key", value and {key: value} -style arguments.'
    if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
    } else {
        attrs[key] = val;
    }

    // Validate & wait options - taken directly from original Backbone.Model.save
    options = _.extend({
        validate: true
    }, options);

    if (attrs && !options.wait) {
        if (!this.set(attrs, options)) return false;
    } else {
        if (!this._validate(attrs, options)) return false;
    }

    // Merge data temporarily for formdata
    var mergedAttrs = _.extend({}, attributes, attrs);

    if (attrs && options.wait) {
        this.attributes = mergedAttrs;
    }

    // Converting Attributes to Form Data
    var formData = new FormData();

    mergedAttrs = this.toJSON(mergedAttrs) || mergedAttrs;

    if (options.patch) { // see patch:true in origin Backbone.Model.save()
        mergedAttrs = _.pick(mergedAttrs, Object.keys(attrs));
    }

    _.each(mergedAttrs, function(value, key) {
        /* check if array is array of files */
        if (_.isArray(value) && value.length &&
            (value[0] instanceof File || value[0] instanceof Blob)) {

            _.each(value, function(file) {
                formData.append(key, file);
            });
            return;
        }

        /* if not just append as is */
        formData.append(key, value);
    });

    // Set options for AJAX call
    options.data = formData;

    options.processData = false;
    options.contentType = false;

    // Handle "progress" events
    var that = this;
    var beforeSend = options.beforeSend;
    options.beforeSend = function(xhr) {
        xhr.progress = progressHandler.bind(that);

        if (beforeSend) {
            return beforeSend.apply(this, arguments);
        }
    }

    // Resume back to original state
    if (attrs && options.wait) this.attributes = attributes;

    // Continue to call the existing "save" method
    return Backbone.Model.prototype.save.call(this, attrs, options);
}

function progressHandler(event) {
    if (event.lengthComputable) {
        var percentComplete = event.loaded / event.total;
        this.trigger('progress', percentComplete);
    }
}

export default {
    save: save
};
