import { Constructor } from '../index.js';
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
export enum VALIDATION_STATUS {
  /**
   * One indicating no validation error.
   */
  NO_ERROR = '',

  /**
   * One indicating that the value is invalid (generic).
   */
  INVALID = 'invalid',

  /**
   * One indicating missing required value.
   */
  ERROR_REQUIRED = 'required',
  /**
   * One indicating that the value does not match the pattern.
   */
  PATTERN = 'pattern',

  /**
   * One indicating that the value is shorter than the minimum length.
   */
  MINLENGTH = 'minlength',
}

/**
 * @param Base The base class.
 * @returns A mix-in implementing `.setCustomValidity()` method.
 */
const ValidityMixin = <T extends Constructor<HTMLElement>>(Base: T) => {
  abstract class ValidityMixinImpl extends Base {
    // Not using TypeScript `protected` due to: microsoft/TypeScript#17744
    // Using `string` instead of `VALIDATION_STATUS` until we can require TypeScript 3.8
    /**
     * @param state The form validation status.
     * @returns The form validation error mesasages associated with the given status.
     * @protected
     */
    _getValidityMessage(state: string, translations: Record<string, string>) {
      return {
        [VALIDATION_STATUS.NO_ERROR]: '',
        [VALIDATION_STATUS.INVALID]: translations.validityInvalid,
        [VALIDATION_STATUS.ERROR_REQUIRED]: translations.validityRequired,
        [VALIDATION_STATUS.PATTERN]: translations.validityPattern,
        [VALIDATION_STATUS.MINLENGTH]: translations.validityMinlength.replace('{minlength}', this.minlength.toString()),
      }[state];
    }

    /**
     * `true` to show the UI of the invalid state.
     */
    abstract invalid: boolean;

    /**
     * `true` if the value is required.
     */
    abstract required: boolean;

    /**
     * The validity message.
     */
    abstract validityMessage: string;

    /**
     * The value.
     */
    abstract _value: string;

    /**
     * The pattern to match to be valid.
     */
    abstract pattern?: string;

    /**
     * `true` if the element is disabled.
     */
    abstract disabled: boolean;

    /**
     * The minimum length of the value.
     */
    abstract minlength: number;

    /**
     * The maximum length of the value.
     */
    abstract maxlength: number;

    /**
     * Checks if the value meets the constraints.
     *
     * @returns `true` if the value meets the constraints. `false` otherwise.
     */
    _checkValidity(translations: Record<string, string>, htmlValidity: boolean = true): boolean {
      // htmlValidity = this.inputElement.checkValidity(); //check browser validity
      let validity = htmlValidity;
      let message: string = validity
        ? (this._getValidityMessage(VALIDATION_STATUS.NO_ERROR, translations) as string)
        : (this._getValidityMessage(VALIDATION_STATUS.INVALID, translations) as string);

      if (this.required || (this._value && this.pattern)) {
        if (this.pattern) {
          const regex = new RegExp(`^${this.pattern}$`, 'u');
          validity = regex.test(this._value.toString());
          if (!validity) {
            message = this._getValidityMessage(VALIDATION_STATUS.PATTERN, translations) as string;
          }
        }
        if (typeof this.minlength !== 'undefined') {
          validity = validity && this._value.toString().length >= this.minlength;
          if (!validity) {
            message = this._getValidityMessage(VALIDATION_STATUS.MINLENGTH, translations) as string;
          }
        }
        if (this.required && !this._value) {
          validity = false;
          message = this._getValidityMessage(VALIDATION_STATUS.ERROR_REQUIRED, translations) as string;
        }
      }

      this.invalid = !validity;
      this.validityMessage = message;
      return validity;
    }

    /**
     * Sets the given custom validity message.
     *
     * @param validityMessage The custom validity message
     */
    setCustomValidity(validityMessage: string) {
      this.invalid = Boolean(validityMessage);
      this.validityMessage = validityMessage;
    }
  }
  return ValidityMixinImpl;
};

export default ValidityMixin;
