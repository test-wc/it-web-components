import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/ItButton.js';

interface ButtonProps {
  variant: string;
  outline: boolean;
  disabled: boolean;
  slot: string;
}

const renderComponent = (params: any) => html`
  <it-button
    variant="${params.variant}"
    ?disabled="${params.disabled}"
    ?outline="${params.outline}"
    >${params.slot}</it-button
  >
`;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/Button',
  tags: ['autodocs'],
  component: 'it-button',
  render: args => renderComponent(args),
  args: {
    slot: 'Testo bottone',
    variant: 'primary',
    outline: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      description: 'Overwritten description',
      options: ['primary', 'success', 'warning', 'danger'],
    },
    disabled: {
      control: 'boolean',
      type: 'boolean',
    },
    outline: {
      control: 'boolean',
      type: 'boolean',
    },
    slot: {
      control: 'text',
    },
  },
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<ButtonProps>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
  },
};
