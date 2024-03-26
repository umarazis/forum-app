import ActionButton from '../components/ActionButton';
import { fn } from '@storybook/test';
import { FaPencilAlt, FaChartBar } from 'react-icons/fa';

export default {
  title: 'ActionButton',
  component: ActionButton,
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

export const CreateThreadButton = {
  args: {
    title: 'Create Thread',
    icon: <FaPencilAlt />,
    type: 'primary',
  },
};

export const LeaderboardsButton = {
  args: {
    title: 'Leaderboards',
    icon: <FaChartBar />,
    type: 'default',
  },
};