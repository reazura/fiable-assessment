import type { Meta, StoryObj } from '@storybook/react';

import Grid from './grid';

const meta = {
  component: Grid,
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const GridScenario1: Story = {
  args: {
    input: "0,0 SOUTH"
  }
};

export const GridScenario2: Story = {
  args: {
    input: "4,4 WEST"
  }
};

export const GridInvalidInputScenario1: Story = {
  args: {
    input: "0,0"
  }
};