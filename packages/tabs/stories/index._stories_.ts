import { html, TemplateResult } from 'lit';
import '@italia/tabs';

export default {
  title: 'ItTabs',
  component: 'it-tabs',
  argTypes: {
    header: { control: 'text' },
    counter: { control: 'number' },
    textColor: { control: 'color' },
  },
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

const Template: Story<ArgTypes> = ({ header = 'Hello world', counter = 5, textColor }: ArgTypes) => html`
  <it-tabs style="--it-tabs-text-color: ${textColor || 'black'}" .header=${header} .counter=${counter}> </it-tabs>
`;

export const Regular = Template.bind({});

export const CustomHeader = Template.bind({});
CustomHeader.args = {
  header: 'My header',
};

export const CustomCounter = Template.bind({});
CustomCounter.args = {
  counter: 123456,
};
const SlottedTemplate: Story<ArgTypes> = ({ header = 'Hello world', counter = 5, textColor }: ArgTypes) => html`
  <it-tabs style="--it-tabs-text-color: ${textColor || 'black'}" .header=${header} .counter=${counter}>
    <p slot="content">Slotted content</p>
  </it-tabs>
`;
export const SlottedContent = SlottedTemplate.bind({});
SlottedContent.argTypes = {
  slot: { table: { disable: true } },
};
