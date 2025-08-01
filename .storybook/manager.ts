import { addons, State } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: {
    ...themes.light, // puoi anche usare themes.dark o un tema personalizzato

    colorPrimary: '#0066CC',
    colorSecondary: '#0066CC',

    // UI
    appBg: '#f9f9f9',
    appContentBg: '#FFF',
    appBorderRadius: 4,
    appPreviewBg: '#f9f9f9',

    brandTitle: 'Design Web Components',
    brandUrl: 'https://github.com/italia/design-web-components', // opzionale
    brandImage: './logo.png',
  },
});
