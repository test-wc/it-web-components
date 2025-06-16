import { addons, State } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: {
    ...themes.light, // puoi anche usare themes.dark o un tema personalizzato
    brandTitle: 'Design Web Components',
    brandUrl: 'https://tuosito.it', // opzionale
    brandImage: '/logo.png',
  },
});
