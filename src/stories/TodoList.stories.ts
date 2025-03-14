import type { Meta, StoryObj } from '@storybook/react';
import { TodoList } from '../components';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Example/TodoList',
    component: TodoList,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof TodoList>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const DefaultTodoList: Story = {

};

export const AddTodo: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const addTodoButton = await canvas.getByRole('button', { name: /add todo/i })
        const titleInput = await canvas.getByLabelText('Title')
        // const descriptionInput = canvas.getByLabelText('Description')

        // 👇 Simulate interactions with the component
        // await userEvent.click(await canvas.getByRole('button', { name: /add todo/i }));
        // await waitFor(() => expect(canvas.getByRole('button', { name: /delete/i })).toBeInTheDocument())
        // await expect(canvas.getByLabelText("Title", { exact: true })).toBeInTheDocument();
        // await userEvent.type(canvas.getByLabelText("Title", { exact: true }), 'Test the TodoList')

        // await userEvent.type(descriptionInput, 'Test the TodoList in the evening')


        // See https://storybook.js.org/docs/7/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
        // await userEvent.click(canvas.getByRole('button'));

        // 👇 Assert DOM structure
        // await expect(
        //     canvas.getByText(
        //         'Everything is perfect. Your account is ready and we should probably get you started!'
        //     )
        // ).toBeInTheDocument();
    },
}
