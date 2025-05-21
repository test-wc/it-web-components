import { LitElement, unsafeCSS } from 'lit';
import TrackFocus from '../utils/track-focus';
export const BaseComponent = (style) => {
    var _a;
    return _a = class extends LitElement {
            addFocus(element) {
                new TrackFocus(element);
            }
            composeClass(...classes) {
                let composedClass = '';
                classes.forEach((newClass) => {
                    composedClass += ' ' + newClass;
                });
                return composedClass.trim();
            }
        },
        _a.styles = [unsafeCSS(style)],
        _a;
};
//# sourceMappingURL=base-component.js.map