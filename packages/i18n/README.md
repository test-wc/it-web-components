# \i18n

Questa micro-libreria senza dipendenze ha l’obiettivo di fornire un Reactive Controller leggero per condividere e applicare traduzioni all’interno di componenti personalizzati. Non è pensata per sostituire strumenti di i18n completi come i18next

## Installation

```bash
npm i @italia/i18n
```

## How it works

To achieve this goal, we lean on HTML’s [`lang`](~https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang~) attribute to determine what language should be used. The default locale is specified by `<html lang="...">`, but any localized element can be scoped to a locale by setting its `lang` attribute. This means you can have more than one language per page, if desired.

```html
<html lang="en">
  <body>
    <my-element>This element will be English</my-element>
    <my-element lang="es">This element will be Spanish</my-element>
    <my-element lang="fr">This element will be French</my-element>
  </body>
</html>
```

This library provides a set of tools to localize dates, currencies, numbers, and terms in your custom element library with a minimal footprint. Reactivity is achieved with a [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) that listens for `lang` changes on `<html>`.

Majority of use cases appear to favor a single language per page. However, multiple languages per page are also supported, but you'll need to explicitly set the `lang` attribute on all components whose language differs from the one set in `<html lang>`.

## Usage

```html
<script type="module">
  import '@italia/i18n';
  registerTranslation(
    {
      $code: 'it',
      $name: 'Italiano',
      $dir: 'ltr',

      // le tue traduzioni
      video_consent_accept: 'Accetto i cookie',
    },
    {
      $code: 'en',
      $name: 'English',
      $dir: 'ltr',

      // le tue traduzioni
      video_consent_accept: 'Accept',
    },
  );
</script>
```

To set the page locale, apply the desired lang attribute to the <html> element.

If you want to change a locale only on a specific web-component, you could pass lang and dir attribute on it.

```html
<my-component lang="en" dir="ltr"></my-component>
```

### Creating a Translation

All translations must extend the `Translation` type and implement the required meta properties (denoted by a `$` prefix). Additional terms can be implemented as show below.

```ts
// en.ts
import type { Translation } from '@italia/i18n';

const translation: Translation = {
  $code: 'en',
  $name: 'English',
  $dir: 'ltr',

  // Simple terms
  upload: 'Upload',

  // Terms with placeholders
  greetUser: (name: string) => `Hello, ${name}!`,

  // Plurals
  numFilesSelected: (count: number) => {
    if (count === 0) return 'No files selected';
    if (count === 1) return '1 file selected';
    return `${count} files selected`;
  },
};

export default translation;
```

### Registering Translations

Once you've created a translation, you need to register it before use. To register a translation, call the `registerTranslation()` method. This example imports and register two translations up front.

```ts
import { registerTranslation } from '@italia/i18n';
import en from './en';
import es from './es';

registerTranslation(en, es);
```

The first translation that's registered will be used as the _fallback_. That is, if a term is missing from the target language, the fallback language will be used instead.

Translations registered with country such as `en-GB` are supported. However, your fallback translation must be registered with only a language code (e.g. `en`) to ensure users of unsupported regions will still receive a comprehensible translation.

For example, if you're fallback language is `en-US`, you should register it as `en` so users with unsupported `en-*` country codes will receive it as a fallback. Then you can register country codes such as `en-GB` and `en-AU` to improve the experience for additional regions.

It's important to note that translations _do not_ have to be registered up front. You can register them on demand as the language changes in your app. Upon registration, localized components will update automatically.

Here's a sample function that dynamically loads a translation.

```ts
import { registerTranslation } from '@italia/i18n';

async function changeLanguage(lang) {
  const availableTranslations = ['en', 'es', 'fr', 'de'];

  if (availableTranslations.includes(lang)) {
    const translation = await import(`/path/to/translations/${lang}.js`);
    registerTranslation(translation);
  }
}
```

### Localizing Components

You can use the `LocalizeController` with any library that supports [Lit's Reactive Controller pattern](https://lit.dev/docs/composition/controllers/). In Lit, a localized custom element will look something like this.

```ts
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { LocalizeController } from '@itallia/i18n';

@customElement('my-element')
export class MyElement extends LitElement {
  private localize = new LocalizeController(this);

  // Make sure to make `dir` and `lang` reactive so the component will respond to changes to its own attributes
  @property() dir: string;
  @property() lang: string;

  render() {
    return html`
      <!-- Terms -->
      ${this.localize.term('hello')}

      <!-- Dates -->
      ${(this.localize.date('2021-09-15 14:00:00 ET'), { month: 'long', day: 'numeric', year: 'numeric' })}

      <!-- Numbers/currency -->
      ${this.localize.number(1000, { style: 'currency', currency: 'USD' })}

      <!-- Determining language -->
      ${this.localize.lang()}

      <!-- Determining directionality, e.g. 'ltr' or 'rtl' -->
      ${this.localize.dir()}
    `;
  }
}
```

## Typed Translations and Arguments

Because translations are defined by the user, there's no way for TypeScript to automatically know about the terms you've defined. This means you won't get strongly typed arguments when calling `this.localize.term()`. However, you can solve this by extending `Translation` and `LocalizeController`.

In a separate file, e.g. `my-localize.ts`, add the following code.

```ts
import { LocalizeController as DefaultLocalizeController } from '@italia/i18n';

// Extend the default controller with your custom translation
export class LocalizeController extends DefaultLocalizeController<MyTranslation> {}

// Export `registerTranslation` so you can import everything from this file
export { registerTranslation } from '@italia/i18n';

// Define your translation terms here
export interface MyTranslation extends Translation {
  myTerm: string;
  myOtherTerm: string;
  myTermWithArgs: (count: string) => string;
}
```

Now you can import `MyLocalizeController` and get strongly typed translations when you use `this.localize.term()`!

## Advantages

- Zero dependencies
- Extremely lightweight
- Supports simple terms, plurals, and complex translations
  - Fun fact: some languages have [six plural forms](https://lingohub.com/blog/2019/02/pluralization) and this utility supports that
- Supports dates, numbers, and currencies using built-in [`Intl` APIs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
- Good DX for custom element authors and consumers
  - Intuitive API for custom element authors
  - Consumers only need to load the translations they want and set the `lang` attribute
- Translations can be loaded up front or on demand

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Demoing with Storybook

To run a local instance of Storybook for your component, run

```bash
npm run storybook
```

To build a production version of Storybook, run

```bash
npm run storybook:build
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
