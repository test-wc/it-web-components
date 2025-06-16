/** @type { import('@storybook/web-components').Preview } */
import './main.scss';
import './storybook-styles.scss';

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Welcome', 'PersonalizzazioneDegliStili', 'Componenti', ['Button', 'Icon']],
      },
    },
  },
};

export default preview;
