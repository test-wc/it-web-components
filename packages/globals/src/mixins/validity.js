/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Form validation status.
 */
export var VALIDATION_STATUS;
(function (VALIDATION_STATUS) {
    /**
     * One indicating no validation error.
     */
    VALIDATION_STATUS["NO_ERROR"] = "";
    /**
     * One indicating missing required value.
     */
    VALIDATION_STATUS["ERROR_REQUIRED"] = "required";
})(VALIDATION_STATUS || (VALIDATION_STATUS = {}));
/**
 * @param Base The base class.
 * @returns A mix-in implementing `.setCustomValidity()` method.
 */
const ValidityMixin = (Base) => {
    class ValidityMixinImpl extends Base {
        // Not using TypeScript `protected` due to: microsoft/TypeScript#17744
        // Using `string` instead of `VALIDATION_STATUS` until we can require TypeScript 3.8
        /**
         * @param state The form validation status.
         * @returns The form validation error messages associated with the given status.
         * @protected
         */
        _getValidityMessage(state) {
            return {
                [VALIDATION_STATUS.NO_ERROR]: '',
                [VALIDATION_STATUS.ERROR_REQUIRED]: this.requiredValidityMessage,
            }[state];
        }
        // Not using TypeScript `protected` due to: microsoft/TypeScript#17744
        // Using `string` instead of `VALIDATION_STATUS` until we can require TypeScript 3.8
        /**
         * Checks if the value meets the constraints.
         *
         * @returns `VALIDATION_STATUS.NO_ERROR` if the value meets the constraints. Some other values otherwise.
         * @protected
         */
        _testValidity() {
            const { required, value } = this;
            return required && !value
                ? VALIDATION_STATUS.ERROR_REQUIRED
                : VALIDATION_STATUS.NO_ERROR;
        }
        /**
         * Checks if the value meets the constraints.
         * Fires cancelable `invalid` event if it doesn't.
         *
         * @returns `true` if the value meets the constraints. `false` otherwise.
         */
        checkValidity() {
            const status = this._testValidity();
            if (status !== VALIDATION_STATUS.NO_ERROR) {
                if (this.dispatchEvent(new CustomEvent('invalid', {
                    bubbles: false,
                    cancelable: true,
                    composed: false,
                }))) {
                    this.invalid = true;
                    this.validityMessage = this._getValidityMessage(status);
                }
                return false;
            }
            this.invalid = false;
            this.validityMessage = '';
            return true;
        }
        /**
         * Sets the given custom validity message.
         *
         * @param validityMessage The custom validity message
         */
        setCustomValidity(validityMessage) {
            this.invalid = Boolean(validityMessage);
            this.validityMessage = validityMessage;
        }
    }
    return ValidityMixinImpl;
};
export default ValidityMixin;
//# sourceMappingURL=validity.js.map