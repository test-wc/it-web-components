import { html, TemplateResult } from 'lit';
import '@italia/video';

export default {
  title: 'Componenti/Video',
  component: 'it-video',
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
  <it-video style="--it-video-text-color: ${textColor || 'black'}" .header=${header} .counter=${counter}> </it-video>
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
  <it-video style="--it-video-text-color: ${textColor || 'black'}" .header=${header} .counter=${counter}>
    <p slot="content">Slotted content</p>
  </it-video>
`;
export const SlottedContent = SlottedTemplate.bind({});
SlottedContent.argTypes = {
  slot: { table: { disable: true } },
};
