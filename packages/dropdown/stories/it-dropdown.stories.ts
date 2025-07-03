import { html } from 'lit';
import '@italia/button';
import '@italia/dropdown';
import './preview.scss';

export default {
  title: 'Componenti/Dropdown',
  args: {
    label: 'Menu principale',
    role: 'menu',
    ariaLabelledby: '',
    disabled: false,
    open: false,
    items: [
      { href: '/home', label: 'Home' },
      { href: '/about', label: 'Chi siamo' },
      { href: '/contatti', label: 'Contatti' },
    ],
  },
  argTypes: {
    label: { control: 'text', description: 'Label aria per il menu' },
    role: { control: 'text', description: 'Ruolo ARIA del menu' },
    ariaLabelledby: { control: 'text', description: 'ID elemento label associato' },
    disabled: { control: 'boolean', description: 'Disabilita il menu' },
    open: { control: 'boolean', description: 'Menu aperto' },
    items: { control: 'object', description: 'Voci del menu' },
  },
};

export const Base = (args) => html`
  <it-dropdown
    role=${args.role}
    aria-label=${args.label}
    aria-labelledby=${args.ariaLabelledby}
    ?disabled=${args.disabled}
    ?open=${args.open}
  >
    <it-button variant="primary" type="button" data-popover-trigger>Apri menu</it-button>
    <div popover>
      <div class="link-list-wrapper">
        <ul class="link-list">
          ${args.items.map((item) => html`<li class="list-item"><a href="${item.href}">${item.label}</a></li>`)}
        </ul>
      </div>
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
