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
    docs: { toc: true },
    options: {
      storySort: {
        order: ['Welcome', 'PersonalizzazioneDegliStili', 'Componenti', ['Button', 'Icon', 'Video']],
      },
    },
  },
};

export default preview;

export const decorators = [
  (Story) => {
    // Usa un effetto per agire sul documento dell'iframe dopo il mount
    // Funziona anche con React o senza (a seconda del setup)

    // Questo codice funziona anche senza React
    setTimeout(() => {
      if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.lang = 'it'; // Cambia "it" con la lingua desiderata
      }
    }, 0); // Lascia tempo all'iframe di caricare
    return Story();
  },
];
