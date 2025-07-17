import { directive, Directive, AttributePart, DirectiveParameters } from 'lit/directive.js';

class SetAttributesDirective extends Directive {
  update(part: AttributePart, [attributes]: DirectiveParameters<this>) {
    const el = (part as any).element;
    for (const [name, value] of Object.entries(attributes)) {
      if (value != null) el.setAttribute(name, value);
      else el.removeAttribute(name);
    }
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(_attributes: Record<string, string>) {
    return null;
  }
}

const setAttributes = directive(SetAttributesDirective);

export default setAttributes;
