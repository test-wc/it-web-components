import { html, TemplateResult } from 'lit';
import '../src/index';

export default {
  title: 'ItIcon',
  component: 'it-icon',
  argTypes: {},
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  header?: string;
  counter?: number;
  textColor?: string;
  slot?: TemplateResult;
}

const Template: Story<ArgTypes> = () => html`
  <div style="background-color: yellow;width: 100px; height:100px">
    <it-icon name="it-android"></it-icon>
  </div>
`;

export const Regular = Template.bind({});
