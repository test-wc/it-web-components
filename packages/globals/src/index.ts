import TrackFocus from './utils/track-focus.js';
import FormMixin from './mixins/form.js';
import ValidityMixin from './mixins/validity.js';
import setAttributes from './directives/setAttributes.js';
import {
  type Translation,
  type DefaultTranslation,
  registerTranslation,
  LocalizeController,
} from './controllers/localize.js';
import LocalizeMixin from './mixins/localization.js';

export { TrackFocus, FormMixin, ValidityMixin, setAttributes };
export { type Translation, type DefaultTranslation, registerTranslation, LocalizeController, LocalizeMixin }; // localization
export {
  BaseComponent,
  BaseComponentInterface,
  BaseComponentType,
  BaseLocalizedComponent,
} from './base-component/base-component.js';
export { VALIDATION_STATUS } from './mixins/validity.js';
export { cookies } from './utils/cookies.js';
export type Constructor<T = {}> = new (...args: any[]) => T;
