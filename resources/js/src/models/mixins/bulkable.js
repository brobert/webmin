/* eslint-disable */
import _ from 'underscore';
import Backbone from 'backbone';

/**
 * Methods to run bulk requests on multiple models
 *
 *  myCollection.bulkPatch([99,110,111], {status: 'active'}, function(res){
 *      console.log("four models made active", res)
 *  }, true)
 *
 *  myCollection.bulkDestroy([99,110,111], function(res){
 *      console.log("four models removed", res)
 *  }, true)
 *
 */

var instanceMethods = {
    bulkPatch: bulkPatch,
    bulkDestroy: bulkDestroy,
    bulkRequest: bulkRequest
};

export default {
    _instanceMethods: instanceMethods
};

/**
 * Performs custom POST request on resource. Useful when bulkPatch and bulkDestroy are not enough.
 * POST should be enough for all cases, GET fails when too many ids are sent.
 * Consider support extra options to allow overwrite Backbone.ajax properties if required.
 *
 * @param {Array} ids primary key values of models to update
 * @param {String} route eg. '/res/user/password_email' or simply 'password_email' 
 * @param {Function} callback on succes, takes webservice response.data as argument and collection as context
 * @param {Boolean} allowMissing allows to run bulk operation on models which do not belong to current collection, default false
 */
function bulkRequest(ids, route, callback, allowMissing) {
    if (route[0] !== '/') route = this.url + '/' + route; // 'password_email' => '/res/user/password_email'

    _bulkAjax.call(this, {
        type: 'POST',
        data: {
            id: ids
        },
        url: route
    }, callback, allowMissing);
}

/**
 * Performs ajax request for bulk update
 * @param {Array} ids primary key values of models to update
 * @param {Object} attributes with new values to update
 * @param {Function} callback on succes, takes webservice response.data as argument and collection as context
 * @param {Boolean} allowMissing allows to run bulk operation on models which do not belong to current collection, default false
 */
function bulkPatch(ids, attributes, callback, allowMissing, errCallback) {
    if (typeof attributes !== 'object' || Object.keys(attributes).length === 0) {
        console.error('missing attributes to update');
    }

    var data = _.clone(attributes);
    data.id = ids

    _bulkAjax.call(this, {
        type: 'PUT',
        data: data
    }, callback, allowMissing, errCallback);
}

/**
 * Performs ajax request for bulk destroy
 * @param {Array} ids primary key values of models to be updated
 * @param {Function} callback on succes, takes webservice response.data as argument and collection as context
 * @param {Boolean} allowMissing allows to run bulk operation on models which do not belong to current collection, default false
 */
function bulkDestroy(ids, callback, allowMissing) {
    _bulkAjax.call(this, {
        type: 'DELETE',
        data: {
            id: ids
        },
    }, callback, allowMissing);
}

// runs bulk ajax, executed callback on success
function _bulkAjax(options, callback, allowMissing, onError) {
    if (!allowMissing) {
        options.data.id = _filterExistingIds(this, options.data.id);
    }

    options.data = JSON.stringify(options.data);
    var opts = _.extend({
        dataType: 'json',
        contentType: 'application/json',
        url: typeof this.url === 'function' ? this.url() : this.url,
        success: function(data) {
            callback.call(this, data.data);
        },
        error: function(xhr) {
            if (onError) {
                onError.call(this.xhr);
            }
        },
    }, options);

    Backbone.ajax(opts);
}

// filters passed id values to return only these which belong to current collection
function _filterExistingIds(collection, ids) {
    return ids.filter(id => collection.get(id));
}
