import type { Meta, StoryObj } from '@storybook/react';
import { AddTodoDialog } from '../components';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { jest, expect } from '@storybook/jest';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Example/AddTodoDialog',
    component: AddTodoDialog,
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof AddTodoDialog>;

const defaultArgs = {
    todoDialog: true,
    setTodoDialog: jest.fn(),
    submitted: true,
    setSubmitted: jest.fn(),
    todo: {
        id: "",
        title: "",
        description: "",
        dueDate: new Date(0),
        status: "",
    },
    setTodo: jest.fn(),
    toast: jest.fn(),
}

export default meta;
type Story = StoryObj<typeof meta>;



// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const DefaultAddTodoDialog: Story = {
    args: defaultArgs
};

export const InputTodoData: Story = {
    args: {
        todoDialog: true,
        setTodoDialog: jest.fn(),
        submitted: true,
        setSubmitted: jest.fn(),
        todo: {
            id: "",
            title: "",
            description: "",
            dueDate: new Date(0),
            status: "",
        },
        setTodo: jest.fn(),
        toast: jest.fn(),
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const titleInput = await canvas.getByRole('textbox', { name: /title/i })

    },
}
