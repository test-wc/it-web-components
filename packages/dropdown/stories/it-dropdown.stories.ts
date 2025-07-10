import { html } from 'lit';
import '@italia/button';
import '@italia/dropdown';
// import '../src/index.scss';

export default {
  title: 'Componenti/Dropdown',
  args: {
    label: 'Menu principale',
    ariaLabelledby: '',
    disabled: false,
    items: [
      { href: '/home', label: 'Home' },
      { href: '/about', label: 'Chi siamo' },
      { href: '/contatti', label: 'Contatti' },
    ],
  },
  argTypes: {
    label: { control: 'text', description: 'Label aria per il menu' },
    ariaLabelledby: { control: 'text', description: 'ID elemento label associato' },
    disabled: { control: 'boolean', description: 'Disabilita il menu' },
    items: { control: 'object', description: 'Voci del menu' },
  },
};

export const Base = (args) => html`
  <it-dropdown aria-label=${args.label} aria-labelledby=${args.ariaLabelledby} ?disabled=${args.disabled}>
    <it-button variant="primary" type="button" slot="trigger">Apri menu</it-button>
    <div class="link-list-wrapper" slot="menu" id="menu-id">
      <ul class="link-list">
        ${args.items.map((item) => html`<li><a class="list-item" href="${item.href}">${item.label}</a></li>`)}
      </ul>
    </div>
  </it-dropdown>
`;

export const ConMolteVoci = Base.bind({});
ConMolteVoci.args = {
  items: [
    { href: '/home', label: 'Home' },
    { href: '/about', label: 'Chi siamo' },
    { href: '/contatti', label: 'Contatti' },
    { href: '/servizi', label: 'Servizi' },
    { href: '/faq', label: 'FAQ' },
    { href: '/altro', label: 'Altro' },
  ],
};

export const Disabilitato = Base.bind({});
Disabilitato.args = {
  disabled: true,
};
