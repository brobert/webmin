/* eslint-disable */
import Backbone from 'backbone';

/**
 * Relatable collects methods which work on relationships
 */
export default {
    bindForeignKeysToRelatedModels: bindForeignKeysToRelatedModels,
    _instanceMethods: {
        setRelSimple: setRelSimple,
        getRelation: getRelation
    }
};

/**
 * Allows to set 'Backbone.Many' associations using only ids.
 * Useful in forms (ids are enough to save relationship on server side). 
 * But initialized models cant return any attributes except model.id.
 *
 * @param {string} relKey - name of relation to find
 * @param {int[]} id - values of model.id
 * @return {Backbone.Model[]} new 'dummy' models
 */
function setRelSimple(relKey, id) {
    var idAttribute = this.getRelation(relKey).collectionType.prototype.getModelIdAttribute(),
        objects = [];

    // to unselect all
    if (id === null) {
        return this.set(relKey, id);
    }

    // maybe this case doesn't exist
    if (!id) {
        return;
    }

    id.forEach(function(item) {
        var obj = {};
        if (typeof item === "object" && item !== null) {
            if (item.id !== undefined) {
                obj[idAttribute] = item.id;
            } else {
                // when we have custom key, like 'name'
                var key = Object.keys(item)[0];
                obj[key] = item[key];
            }
        } else {
            obj[idAttribute] = item;
        }
        objects.push(obj);
    });

    return this.set(relKey, objects);
}


/**
 * Looks for relation by key attribute.
 *
 * @param {string} relKey - name of relation to find
 * @return {object|undefined} relation options if relation found
 *
 */
function getRelation(relKey) {
    if (!Array.isArray(this.relations)) return;
    for (var i = this.relations.length - 1; i >= 0; i--) {
        if (this.relations[i].key === relKey) return this.relations[i];
    };
}

/**
 * Synchronizes foreignKey with id of relatedModel.
 * The context is model.
 * @param {Object} rel - relationship setup
 */
function syncForeignKeyFromRelatedModel(rel) {
    var
        relatedObj = this.get(rel.key),
        fKeyName = rel.foreignKey,
        fKeyValue = relatedObj instanceof Backbone.AssociatedModel ? relatedObj.get(fKeyName) : typeof obj === 'object' ? relatedObj[fKeyName] // before parse
        : undefined;

    // do not triggers foreignKey change, if foreignKey is used for auto synchronization
    // then external modules should listen on relatedModel change, not foreignKey
    if (fKeyValue) {
        this.set(fKeyName, fKeyValue, {
            silent: false
        });
    } else {
        this.set(fKeyName, null, {
            silent: false
        }); // must be null to not be skipped in toJSON
    }
}

/**
 * For each relationship with defined foreignKey it will set listener on relation
 * to keep foreignKey synchronized with id of relatedModel.
 * The context is model.
 */
function bindForeignKeysToRelatedModels() {
    if (Array.isArray(this.relations)) {
        this.relations.forEach(function(rel) {
            if (!rel.foreignKey) return;

            this.on('change:' + rel.key, function() {
                syncForeignKeyFromRelatedModel.call(this, rel);
            });
            syncForeignKeyFromRelatedModel.call(this, rel);
        }, this);
    }
}


