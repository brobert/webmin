/* eslint-disable */
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Parseable from 'models/resources/mixins/parseable';
import Fetchable from 'models/resources/mixins/fetchable';
import Bulkable from 'models/resources/mixins/bulkable';
import { moduleToAMD } from 'commons/react/react_utils';

var instanceMethods = {
    meta_data: {},
    meta_private: {},
    initialize: function(models, options) {
        if (options) {
            this.fetchWithObjects = options.fetchWithObjects;
        }
    },
    parse: function(response, options) {
        // this.page = response.metadata.page;
        if (response.hasOwnProperty('meta_data')) {
            this.meta_data = response.meta_data; // TODO replace with Parseable.parseMetaData
        }
        response = Parseable.handleResponseRootLevel(response);
        return response;
    },
    fetch: function(options) {
        var _options = $.extend(true, {}, options);
        _options = Fetchable.extendFetchOptions.call(this, _options);
        return Backbone.Collection.prototype.fetch.call(this, _options);
    },
    removeById: function(id, synchronize) { // deprecated because of missing callback, use model.destroy() instead
        var removed = this.remove(this.get(id));
        if (synchronize) {
            this.sync('delete', removed);
        }
    },
    /**
     * Returns name of model.id attribute.
     * @return {string} model.idAttribute
     */
    getModelIdAttribute: function() {
        return this.model.prototype.idAttribute;
    },

    /**
     * To use collection in common selector define your own 'buildForSelector' method
     * which returns collection in format compatible with owa3 options.tree.
     *
     * In case of plain options.tree it is enough to define 'buildForSelectorAttrName'
     * which will be used to set label in common selector, eg.
     * buildForSelectorName: 'alias' // in plain list of predefined_channels
     *
     */
    fetchForSelectorData: {}, // customizes options.data in fetch() in getForSelector
    buildForSelectorAttrName: 'name',
    buildForSelector: function() {
        if (!this.length) return [];
        var idKey = this.first().idAttribute,
            nameKey = this.buildForSelectorAttrName;

        return this.sortBy(function(m) {
            return m.get(nameKey);
        }).map(function(m) {
            return {
                id: m.get(idKey),
                name: m.get(nameKey)
            }
        })
    },
    // If you need to customize getForSelector then override buildForSelector function
    getForSelector: function(skipCache /*, buildForSelectorArgs */ ) {
        if (skipCache || !this.buildForSelectorCached) {
            var buildForSelectorArgs = Array.prototype.slice.call(arguments, 1);
            this.buildForSelectorCached = this.buildForSelector.apply(this, buildForSelectorArgs);
        }
        return this.buildForSelectorCached;
    },
    // returns number of all (not limited by pagination) models in collection
    getTotalItems: function() {
        if (this.meta_data && this.meta_data.hasOwnProperty('items')) {
            return parseInt(this.meta_data.items);
        }
    },

    // same as collection.get(id) but works with multiple ids, returns array of models
    getModels: function(ids) {
        if (ids === undefined) return [];

        if (!Array.isArray(ids)) {
            ids = [ids];
        };

        return ids
            .map(function(id) {
                return this.get(id)
            }, this) // id to model
            .filter(function(model) {
                return model
            }); // skip undefined
    },

    getQuickFilters: function() {
        return this.quickFilters || [];
    },

    /**
     * Returns array of id values picked from models.
     * @return {int[]} model.id values
     */
    pluckId: function() {
        return this.pluck(this.getModelIdAttribute());
    },

    /**
     * @method meta
     * setter and getter for meta data
     */
    meta: function(key, value) {
        if (value !== undefined) {
            this.meta_private[key] = value;
        }
        return this.meta_private[key];
    },


};

_.extend(
    instanceMethods,
    Fetchable._instanceMethods,
    Bulkable._instanceMethods
);

export default Backbone.Collection.extend(
    instanceMethods, {
        // returns initialized collection for resName, eg.
        // OWACollection.initForRes('rc_file', function(rcFileCollection){ ... });
        initForRes: function(resName, callback, collOptions) {
            require(['models/resources/' + resName + '/' + resName + 's'], function(collClassES6) {
                const collClass = moduleToAMD(collClassES6);

                callback(new collClass(undefined, collOptions));
            });
        },

        // obsolete - is using only for a few tests
        //fetches collection and executes callback with options.tree for common selector as argument
        fullFetchForSelector: function(callback, skipCache) {
            var coll = new this();
            coll.fetch({
                success: function(_coll) {
                    callback(_coll.getForSelector(skipCache));
                }
            });
        },

        fetchForSelector: function (options) {
            const
                currentCollection = new this(),
                url = currentCollection.url;

            let data;
            if (options && options.data) {
                data = options.data;
            }

            return new Promise((resolve, reject) => {
                OWA.network.post(url + '/list.json?for_selector=1', JSON.stringify(data), {
                    success: (response) => {
                        let data = Array.isArray(response.data)? response.data.slice(): [];
                        resolve(data);
                    },
                    error: (error) => {
                        if (error && error.status === 401) return; // app will make logout
                        console.error(error);
                        reject();
                    }
                });
            });
        }

    });
