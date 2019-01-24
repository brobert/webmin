/* eslint-disable */
/**
 * Parseable collects methods for parsing server responses.
 */
export default {
    handleResponseRootLevel: handleResponseRootLevel,
    parseMetaData: parseMetaData,
    parse: parse
};

/**
 * Performs several parse methods for model (not collection).
 * The context is model.
 * @param {Object} response - Single level of server response
 * @return {Object} response ready for initializing model
 */
function parse(response, options) {
    response = handleResponseRootLevel(response);
    response = handleParseable.call(this, response);
    response = parseJsonPostfixedAttrs.call(this, response);
    response = parseJsonNestedAttrs.call(this, response);

    if (this.useMetaData) {
        parseMetaData.call(this, response, options)
    }

    return response;
}

/**
 * Gets attributes object from server responses.
 * Handles both root & nested levels. 
 * @param {Object} res - Single level of server response
 * @return {Object} Object of model attributes
 */
function handleResponseRootLevel(res) {
    if (
        typeof res === 'object' && res.hasOwnProperty('data') && res.hasOwnProperty('meta_data') && res.hasOwnProperty('status')
    ) {
        return res.data;
    }
    return res;
}

/**
 * In most cases js model does not need to store all attributes that came from server model.
 * Use parseable option to set attributes that should be available in js model, eg. 
 *
 *      // stores meta_data as this.meta_data in current model
 *      parseable: [
 *          'name', 
 *          'required_filters_json', // with json postfix
 *          'layout', // add relationships
 *      ]
 * @param {Object} res - Single level of server response
 * @return {Object} Object with limited attributes
 */
function handleParseable(res) {
    if (Array.isArray(this.parseable)) {
        var resOut = {};
        for (var i = this.parseable.length - 1; i > -1; i--) {
            if (res.hasOwnProperty(this.parseable[i])) {
                resOut[this.parseable[i]] = res[this.parseable[i]];
            }
        };
        return resOut;
    }
    return res;
}

/**
 * Handles *_json attributes. 
 * Parses attr value & skips '_json' suffix in attr name.
 * @param {Object} data - Raw object attributes from server
 * @return {Object} Object attributes with parsed *_json attrs
 */
function parseJsonPostfixedAttrs(data) {

    if (this.parseJsonAttrSkip) return data;

    var jsonPostfixRegExp = /(\w+)_json$/;
    for (var key in data) {
        if (jsonPostfixRegExp.test(key)) {
            var newKey = key.replace(jsonPostfixRegExp, "$1");
            data[newKey] = JSON.parse(data[key]);
            delete data[key];
        }
    }
    return data;
}

/**
 * Allows to access meta_data from nested (not response root level) models.
 * To use this functionality add to your model definition 'useMetaData' option, eg.
 *
 *      // stores meta_data as this.meta_data in current model
 *      useMetaData: true
 *      // or do anything with meta_data
 *      useMetaData: function(metaData, parseRes, parseOptions) {
 *          parseRes.user_name = meta_data.dict.users[parseRes.userid];
 *      }
 *
 * @param {Object} res Response from parse
 * @param {Object} options Options from parse
 */
function parseMetaData(parseRes, parseOptions) {
    var res;
    if (parseOptions.runUseMetaData && typeof this.useMetaData === 'function' ) {

        // In some cases you may want to initialize model with already fetched sever response
        // (or manually builded data). If you want 'useMetaData()' be executed then set runUseMetaData option:
        // new MyModel(serverRes, { parse: true, runParseMetaData: metaDataObject });
        this.useMetaData(parseOptions.runUseMetaData, handleResponseRootLevel(parseRes), parseOptions);

    } else if (res = parseOptions && parseOptions.xhr && parseOptions.xhr.responseText) {
        // Standard processing called always after fetch().
        var metaData,
            // How can parse meta_data JSON only once and use it in all models initialized from one response?
            // Let's smuggle it in xhr object which is passed to all models.
            smuggleKey = 'responseMetaDataParsed';

        if (parseOptions.xhr[smuggleKey]) {
            metaData = parseOptions.xhr[smuggleKey];
        } else {
            res = JSON.parse(parseOptions.xhr.responseText);
            metaData = res.meta_data;
            parseOptions.xhr[smuggleKey] = metaData;
        }

        if (typeof this.useMetaData === 'function') {
            this.useMetaData(metaData, handleResponseRootLevel(parseRes), parseOptions);
        } else {
            this.metaData = metaData;
        }

    } else {
        console.error("Hey dude, your useMetaData() sux!");
    }

}

/**
 * Allows to handle content of *_json column as model standard top attributes.
 * This is part of parse functionality (check to_jsonable mixin for toJSON equivalent).
 * How it works?
 *
 * Let's say server resource has a 'settings' column which is serialized json,
 * it comes from server as:
 *      {
 *          settings_json: '{"intercept":"3","chain_position":"123","page_impression":"abc"}'
 *      }
 *
 * In backbone model declare 'jsonNestedAttrs' which describes these keys:
 *
 *      jsonNestedAttrs: {
 *          // 1 attribute in server resource: 'model_json'
 *          settings: [ 
 *              // 3 attribtues in backbone model: 'intercept', 'chain_position' and 'page_impression'
 *              'intercept', 
 *              'chain_position', 
 *              'page_impression' 
 *          ] 
 *      }
 *
 * After fetching & parsing all these nested attributes are available directly on model:
 *      myModel.get('intercept')
 *      myModel.set('intercept',4);
 *
 * When model is saved these attributes are serialized again to structure expected by server resource:
 *      myModel.save();
 *
 * @param {Object} data parse result 
 * @return {Object} parse result with handled jsonNestedAttrs 
 */
function parseJsonNestedAttrs(data) {
    if (typeof this.jsonNestedAttrs !== 'object') return data;
    var conf = this.jsonNestedAttrs;

    Object.keys(conf).forEach(function(jsonAttr) { // foreach *_json attr
        if (!Array.isArray(conf[jsonAttr]) || !data.hasOwnProperty(jsonAttr)) return;

        conf[jsonAttr].forEach(function(attr) { // foreach key inside *_json field
            if (data[jsonAttr] && data[jsonAttr].hasOwnProperty(attr)) {
                // throw if its going to overwrite existing attribute
                if (data.hasOwnProperty(attr)) throw attr + ' already exists in parsed data';
                data[attr] = data[jsonAttr][attr];
            }
        });

        // remove jsonAttr after its content was copied to top model attributes
        delete data[jsonAttr];
    })
    return data;
}

