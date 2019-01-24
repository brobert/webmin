/* eslint-disable */
import _ from 'underscore';
import Backbone from 'backbone';

/**
 * Fetchable collects methods for fetching
 */
var instanceMethods = {
    setFetchParams: setFetchParams,
    unsetFetchParams: unsetFetchParams,
    getFetchParams: getFetchParams,
    fetchAllIds: fetchAllIds
        // setFetch* methods
};

/**
 * search
 *  myCollection.setFetchSearch('abc');
 *  myCollection.setFetchParams({search: 'abc'});
 *  myCollection.setFetchSearch(); // unset
 *
 * filter
 *  myCollection.setFetchFilter({customerid: 123});
 *  myCollection.setFetchParams({
 *      filter: { customerid: 123 }
 *  });
 *  myCollection.setFetchSearch({customerid: undefined}); // unset customerid
 *  myCollection.setFetchSearch(); // unset all
 *
 * quickFilter
 *  myCollection.setFetchQuickFilter('active');
 *  myCollection.setFetchParams({quickFilter: 'active'})
 *  myCollection.setFetchQuickFilter(); // unset
 *
 * pagination
 *  myCollection.setFetchPage(3);
 *  myCollection.setFetchParams({
 *      page: 3
 *  })
 *  myCollection.setFetchPage(undefined)
 *  myCollection.getFetchPage();
 *
 * itemsPerPage
 *  myCollection.setFetchItemsPerPage(50);
 *  myCollection.setFetchParams({
 *      itemsPerPage: 50
 *  })
 *  myCollection.setFetchItemsPerPage(undefined)
 *  myCollection.getFetchItemsPerPage();
 *
 * sort
 *  myCollection.setFetchSort('name', 'desc')
 *  myCollection.setFetchSort({name: 'desc'}, {status: 'asc'})
 *  myCollection.setFetchParams({
 *      sort: [{name: 'desc'}, {status: 'asc'}]
 *  })
 *  myCollection.setFetchSort() // unset
 *
 * id filter (primary key)
 *  myCollection.setFetchId([1,2,100]);
 *  myCollection.setFetchParams({
 *      id: [1,2,100]
 *  });
 *
 */

// setFetch*
['search', 'filter', 'quickFilter', 'page', 'itemsPerPage', 'sort', 'id'].forEach(function(paramName) {
    var ucfirstParam = paramName.charAt(0).toUpperCase() + paramName.substring(1); // eg. QuickFilter, Sort

    instanceMethods['setFetch' + ucfirstParam] = function() { // eg. setFetchQuickFilter, setFetchSort
        var args = Array.prototype.slice.call(arguments);
        if (args.length > 1) {
            setFetchParam.call(this, paramName, args)
        } else {
            args.unshift(paramName);
            setFetchParam.apply(this, args)
        }

        this.fetchParams = _cleanUpEmptyParams(this.fetchParams);
    }
});

// getFetch* (not all params supported yet)
['filter', 'page', 'itemsPerPage'].forEach(function(paramName) {
    var ucfirstParam = paramName.charAt(0).toUpperCase() + paramName.substring(1); // eg. QuickFilter, Sort

    instanceMethods['getFetch' + ucfirstParam] = function(arg) { // eg. getFetchQuickFilter, getFetchSort
        return getFetchParam.call(this, paramName, arg);
    }
});

export default {
    extendFetchOptions: extendFetchOptions,
    _instanceMethods: instanceMethods
};

/**
 * Sets single fetch parameters. Used by setFetch* methods.
 */
function setFetchParam(paramName, args) {

    var fp = this.fetchParams || {};

    switch (paramName) {

        case 'id':
            var ids = args;

            paramName = 'filter';
            args = {};
            args[this.getModelIdAttribute()] = ids;

        case 'filter':
            if (args === undefined) {
                fp.r = {};
            } else {
                fp.r = fp.r || {};
                Object.keys(args).forEach(function(filterName) {
                    _setOrUnset(fp.r, filterName, args[filterName]);
                })
            }
            break;

        case 'page':
            _setOrUnset(fp, 'page_number', args);
            break;

        case 'itemsPerPage':
            _setOrUnset(fp, 'page_limit', args);
            break;

        case 'sort':
            if (args && typeof args[0] === 'string') {
                args = args.join(' ');
            } else if (args && typeof args[0] === 'object') {
                args = args.map(function(sort) {
                    var sortCol = Object.keys(sort)[0];
                    return sortCol + ' ' + sort[sortCol]
                });
            }

        default:
            fp.q = fp.q || {};
            var jsonParam = {
                quickFilter: 'quick_filter',
                search: 'text_search',
                // sort
            };

            _setOrUnset(fp.q, jsonParam[paramName] || paramName, args);
    }

    this.fetchParams = fp;
}

/**
 * Sets many fetch parameters at once, see comment on top
 */
function setFetchParams(params) {
    Object.keys(params).forEach(function(paramName) {
        setFetchParam.apply(this, [paramName, params[paramName]])
    }, this);
    this.fetchParams = _cleanUpEmptyParams(this.fetchParams);
}

function unsetFetchParams() {
    this.fetchParams = {};
}

function getFetchParams() {
    return this.fetchParams;
}

function getFetchParam(paramName, arg) {
    var fp = this.fetchParams || {};

    switch (paramName) {

        case 'page':
            return fp.page_number;

        case 'itemsPerPage':
            return fp.page_limit;

        case 'filter':
            if (arg === undefined) {
                return fp.r;
            }
            if (typeof fp.r === 'object') {
                return fp.r[arg];
            }
            return;
    }
    console.error('not supported yet: ' + paramName);

}

// set/unset helper
// sets value as attribute of obj
// if value is undefined then attribute is removed
function _setOrUnset(obj, key, value) {
    if (value === undefined) {
        delete obj[key];
    } else {
        obj[key] = value;
    }
}

// helper to clean up empty params namespaces 'q' & 'r'
function _cleanUpEmptyParams(fp) {
    if (typeof fp === 'object') {
        // remove params namespaces if empty
        ['q', 'r'].forEach(function(ns) {
            if (typeof fp[ns] === 'object' && Object.keys(fp[ns]).length === 0) {
                delete fp[ns];
            }
        });
    }
    return fp;
}


/**
 * Extends fetch options with with_objects from:
 * - 'fetchWithObjects' defined in model/collection class - use only for always required dependencies
 * - 'qWithObjects' param in options of fetch method - for single request
 * @param {Object} options - options of fetch
 * @return {Object} updated options
 */
function extendFetchOptions(options) {

    var qWithObjects = options.qWithObjects || this.fetchWithObjects;
    if (!options.data) {
        options.data = {};
    }

    if (qWithObjects && qWithObjects.length > 0) {
        if (!options.data.q) {
            options.data.q = {};
        }
        if (!options.data.q.with_objects) {
            options.data.q.with_objects = qWithObjects;
        }
    }

    if (typeof this.fetchParams === 'object' && Object.keys(this.fetchParams).length) {
        ['q', 'r'].forEach(function(ns) {
            if (this.fetchParams.hasOwnProperty(ns)) {
                options.data[ns] = options.data[ns] || {};
                _.extend(options.data[ns], this.fetchParams[ns]);
            }
        }, this);

        ['page_limit', 'page_number'].forEach(function(pageParam) {
            if (this.fetchParams.hasOwnProperty(pageParam) && !options.data.hasOwnProperty(pageParam)) {
                options.data[pageParam] = this.fetchParams[pageParam];
            }
        }, this);
    }

    options.cache = false;

    return options;
}

// fetches ids (primary key values) for current fetchParams with skipped pagination
// callback takes array of fetched ids as argument, and collection as context
function fetchAllIds(callback) {
    var params = _.clone(this.getFetchParams()) || {},
        qSelect = {},
        url = this.url,
        self = this;

    delete params.page_number;
    delete params.page_limit;

    params.q = params.q || {};
    params.q.select = {}
    params.q.select[this.getModelIdAttribute()] = 'id';

    delete params.q.sort;

    if (typeof this.url === "function") {
        url = this.url();
    }

    Backbone.ajax({
        type: 'POST',
        dataType: 'json',
        url: url + '/list',
        data: params,
        success: function(data) {
            callback.call(self, _.pluck(data.data, 'id'));
        }
    });
}
