import { fn } from '@storybook/test';
import AppButton from '../components/AppButton';

export default {
  title: 'AppButton',
  component: AppButton,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: {
    onClick: fn(),
  },
};

export const PrimaryButton = {
  args: {
    title: 'Create Thread',
    label: 'Kirim',
    type: 'primary',
    width: '300px',
  },
};

export const SecondaryButton = {
  args: {
    title: 'Sign Out',
    label: 'Sign Out',
    type: 'secondary',
    width: '300px',
  },
};

export const DefaultButton = {
  args: {
    title: 'Create Thread',
    label: 'Kirim',
    type: 'default',
    width: '300px',
  },
};

export const DarkButton = {
  args: {
    title: 'Register',
    label: 'Register',
    type: 'dark',
    width: '300px',
  },
};
