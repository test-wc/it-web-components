import { LitElement, unsafeCSS } from 'lit';
import { TrackFocus } from '@it-web-components/globals';

export const BaseComponent = (style: any): typeof LitElement => {
  return class BaseComponentInternal extends LitElement {
    static override styles = [unsafeCSS(style)];

    protected addFocus(element: HTMLElement) {
      new TrackFocus(element);
    }

    protected composeClass(...classes: any) {
      let composedClass = '';
      classes.forEach((newClass: string) => {
        composedClass += ' ' + newClass;
      });
      return composedClass.trim();
    }
  };
};
