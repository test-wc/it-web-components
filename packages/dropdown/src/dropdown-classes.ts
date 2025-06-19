export function applyDropdownClasses(trigger: HTMLElement, menu: HTMLElement, items: HTMLElement[]) {
  trigger.classList.add('btn', 'dropdown-toggle');
  menu.classList.add('dropdown-menu');
  items.forEach((item) => item.classList.add('dropdown-item'));
}
