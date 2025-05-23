/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @param Base The base class.
 * @returns A mix-in to handle `formdata` event on the containing form.
 */
const FormMixin = <TBase extends Constructor<HTMLElement>>(Base: TBase) => {
  /**
   * A mix-in class to handle `formdata` event on the containing form.
   */
  abstract class FormMixinImpl extends Base {
    /**
     * Handles `formdata` event.
     *
     * @param event The event.
     */
    abstract _handleFormdata(event: Event): void;

    connectedCallback() {
      // @ts-ignore
      super.connectedCallback();
      if (this.closest('form')) {
        this.closest('form')?.addEventListener(
          'formdata',
          this._handleFormdata.bind(this),
        );
      }
    }

    disconnectedCallback() {
      // if (this._hFormdata) {
      //   this._hFormdata = this._hFormdata.release();
      // }
      // @ts-ignore
      super.disconnectedCallback();
    }
  }
  return FormMixinImpl;
};

export default FormMixin;
