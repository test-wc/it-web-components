export function applyDropdownClasses(trigger: HTMLElement, menu: HTMLElement, items: HTMLElement[]) {
  trigger.classList.add('btn', 'dropdown-toggle');
  menu.classList.add('dropdown-menu', 'link-list-wrapper', 'link-list');
  if (trigger.getAttribute('aria-expanded') === 'true') menu.classList.add('show');
  else menu.classList.remove('show');
  items.forEach((item) => item.classList.add('dropdown-item', 'list-item'));
}
