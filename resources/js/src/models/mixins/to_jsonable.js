/* eslint-disable */
/**
 * ToJsonable collects methods used in toJSON for serializing object to be send to server
 */
export default {
    toJSON: toJSON
};

/**
 * Performs several toJSON operations for model (not collection).
 * The context is model.
 * @param {Object} data - result of origin toJSON method
 * @return {Object} object ready to send to server
 */
function toJSON(data) {
    data = handleJsonNestedAttrs.call(this, data);
    data = skipMissingRelations.call(this, data);
    data = handleHasManyRelations.call(this, data);
    return data;
}

/**
 * Allows to handle content of *_json column as model standard top attributes.
 * This is part of toJSON functionality (check parseable mixin for full description)
 *
 * @param {Object} data toJSON result
 * @return {Object} toJSON result with handled jsonNestedAttrs
 */
function handleJsonNestedAttrs(data) {
    if (typeof this.jsonNestedAttrs !== 'object') return data;
    var conf = this.jsonNestedAttrs;

    Object.keys(conf).forEach(function(jsonAttr) { // foreach *_json attr
        if (!Array.isArray(conf[jsonAttr])) return;
        var jsonServerAttr = jsonAttr + '_json';

        conf[jsonAttr].forEach(function(attr) { // foreach key inside *_json field
            if (!data.hasOwnProperty(attr)) return;

            if (!data.hasOwnProperty(jsonServerAttr)) {
                data[jsonServerAttr] = {};
            } else if (data[jsonServerAttr].hasOwnProperty(attr)) {
                // throw if its going to overwrite existing attribute
                console.warn(attr + ' already exists in ' + jsonServerAttr)
            } else if (typeof data[jsonServerAttr] === 'string') {
                console.warn('"' + jsonServerAttr + '" should be object or empty, but looks like json!');
                data[jsonServerAttr] = {};
            }


            data[jsonServerAttr][attr] = data[attr];
            delete data[attr]; // remove to not send on both levels
        });

    })
    return data;
}

/**
 * Serialized relation as undefined means missing info.
 * It does not mean nothing assigned which is empty array or null.
 * Lets skip it in json which is send to server.
 *
 * @param {Object} data toJSON result
 * @return {Object} toJSON result with skipped missing relationships
 */
function skipMissingRelations(data) {
    if (!Array.isArray(this.relations)) return data;

    var rels = this.relations;
    for (var i = 0, l = rels.length; i < l; i++) {
        if (data[rels[i].key] === undefined) delete data[rels[i].key];
    };

    return data;
}

/**
 * Simplifies saving Backbone.Many relationships and reduces amount of data send to server.
 * Instead of sending full related objects, sends only array of idAttribute values.
 * Enable with saveIdOnly option of relationship.
 *
 * @param {Object} data toJSON result
 * @return {Object} toJSON result with skipped missing relationships
 */
function handleHasManyRelations(data) {
    if (!Array.isArray(this.relations)) return data;

    for (var i = 0, l = this.relations.length; i < l; i++) {
        var rel = this.relations[i];

        // proceed only if Backbone.Many and anything is set
        if (!(rel.type === 'Many' && rel.saveIdOnly && data[rel.key])) continue;

        var idAttribute = this.get(rel.key).getModelIdAttribute(),
            relDataFull = data[rel.key],
            relDataKeys = [];

        while (relDataFull.length) {
            const next = relDataFull.shift();
            const id = next[idAttribute];
            
            //cusom
            if( typeof rel.saveIdOnly === 'function') {
                relDataKeys.push(rel.saveIdOnly(next));
            } else if (id === undefined) { // default
                relDataKeys.push(next);
            } else if (rel.saveIdOnly === 'plain') {
                relDataKeys.push(id);
            } else {
                relDataKeys.push({ [idAttribute]: id });
            }
        }

        data[rel.key] = relDataKeys;
    };

    return data;
}
