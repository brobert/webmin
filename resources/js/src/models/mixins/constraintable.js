/* eslint-disable */
/**
 * Constraintable makes models work with owa3 resources contraints.
 */
import Validation from 'commons/validation/validation';

export default {
    initWithConstraints: initWithConstraints,
    validateConstraints: validateConstraints,
    _instanceMethods: {
        initValidationConstraints: initValidationConstraints
    }
};


/**
 * Gets contraints from external source (ajax, localStorage, ..)
 * and sets it to this.contraints of current model. Expects model as context.
 *
 * When constraints is ready and model is initialized 'readyWithConstraints' is triggered
 * and optional callback is executed (if passed as value of withConstraints option).
 *
 * @param {Object} attributes - first argument of constructor
 * @param {Object} options - second argument of constructor
 * @return {Function} resolution callback for getting constraints
 */
function initWithConstraints(attributes, options) {

    if (!options || !options.withConstraints || options.mainConstraintsReady) return;

    this.initValidationConstraints(options);
    // 'options' are passed to models from relations,
    // but we dont want to call initWithConstraints on related models. (do we?)
    options.mainConstraintsReady = true;

}

function initValidationConstraints(options) {

    var self = this,
        noRequest;

    (options && options.noValidationRequest) ? noRequest = options.noValidationRequest: noRequest = false;

    if (this.validationHolder) {
        return;
    }

    this.validationHolder = new Validation(undefined, {
        getValueFor: function(attr) {
            return self.get(attr);
        },
        noValidationRequest: noRequest
    });
    this.validationHolder.prepare(this.getResName(), function() {
        return
    });

}

/**
 * Performs validation using contraints. Expects model as context.
 *      if result is negative triggering 'invalid:' + attribute
 * @param
 * @param
 * @return {?} ?
 */
function validateConstraints(attribute, callback) {

    var self = this,
        validationSkip = function(msg) {
            console.info("validationSkip: " + msg);
            callback.call(self.validationHolder, true);
        },
        validationDone = function(result) {
            callback.call(self.validationHolder, result);
            if (!result) {
                self.trigger('invalid:' + attribute);
            }
        };

    if (this.validationHolder === undefined) {
        console.info('Constraintable: Lack of Validation object');
        return;
    }

    if (attribute === undefined) {
        validationSkip("Missing attribute");
        return;
    }

    var fieldType = this.getFieldType(attribute),
        validateEmpty = fieldType && fieldType.validateEmpty;

    // 'validateIf' expects methods that returns false if validation of attribute must be skipped
    if (fieldType.validateIf && !fieldType.validateIf.call(self)) {
        validationSkip("validateIf");
        return;
    }

    // It looks that validation is skipped for undefined values.
    // So the 'not_blank' constraint will never fail for undefined.
    //
    // Lets introduce new option fieldType.validateEmpty.
    // If set to true for particular fields then allows to validate undefined values without breaking existing forms.
    // TODO check old forms and try to make validateEmpty true by default.
    if (!this.has(attribute) && !validateEmpty) {
        validationSkip("validateEmpty on missing attribute");
        return;
    }

    if (fieldType && fieldType.conditions) {
        var result = this.validationHolder.validateFieldConditions(attribute, this.get(attribute), fieldType.conditions);
        validationDone(result);
    } else {
        this.validationHolder.check(attribute, this.get(attribute), function(result) {
            validationDone(result);
        }, {
            validateEmpty: validateEmpty
        });
    }
}
