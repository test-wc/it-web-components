# Globals

This package contains extendable BaseComponent and BaseLocalizedComponent, utils and mixins, reusable in all web-components packages.

## Installation

```bash
npm i globals
```

## Usage

```html
<script type="module">
  import '@italia/globals';
</script>
```

### BaseComponent

Base web-component

Example:

```js
import { BaseComponent } from '@italia/globals';

@customElement('my-element')
export class MyElement extends BaseComponent {
  render() {
    return html`<div>Your html</div>`;
  }
}
```

### BaseLocalizedComponent

Base localized component, to be used when you need translations in your component.

```js
import { registerTranslation } from '@italia/i18n';
import { BaseLocalizedComponent } from '@italia/globals';
import en from '../translations/en';
import es from '../translations/es';

registerTranslation(en, es);

@customElement('my-element')
export class MyElement extends BaseLocalizedComponent {
  render() {
    return html` <div>
        <h2>Lang</h2>
        ${this.$localize.lang()}
      </div>
      <div>
        <h2>Direction</h2>
        ${this.$localize.dir()}
      </div>
      <div>
        <h2>Translate string</h2>
        ${this.$t('hello_world')}
      </div>
      <div>
        <h2>Date</h2>
        ${this.$d('2021-09-15 14:00:00 ET', { year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
      <div>
        <h2>Number</h2>
        ${this.$n(1234.56, { style: 'currency', currency: 'USD' })}
      </div>`;
  }
}
```

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
