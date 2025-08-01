import LocalizeMixin from './mixins/localization.js';

export {
  type Translation,
  type DefaultTranslation,
  registerTranslation,
  LocalizeController,
} from './controllers/localize.js'; // localization

export { LocalizeMixin };
export type Constructor<T = {}> = new (...args: any[]) => T;
