import { html } from 'lit';
import '../src/it-dropdown.js';

export default {
  title: 'Componenti/Dropdown',
};

export const Base = () => html`
  <it-dropdown>
    <button type="button" popovertarget="menu1">Apri menu</button>
    <ul id="menu1" popover class="dropdown-menu-popover">
      <li><a href="/home">Home</a></li>
      <li><a href="/about">Chi siamo</a></li>
      <li><a href="/contatti">Contatti</a></li>
    </ul>
  </it-dropdown>
`;
