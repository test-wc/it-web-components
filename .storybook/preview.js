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
    docs: {
      toc: {
        headingSelector: 'h1, h2, h3',
        title: 'Indice',
      },
    },
    options: {
      storySort: {
        order: ['Welcome', 'PersonalizzazioneDegliStili', 'Componenti', ['Button', 'Icon', 'Video']],
      },
    },
  },
};

export default preview;
