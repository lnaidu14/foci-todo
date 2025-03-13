import React from "react";
import { render, screen } from "@testing-library/react";
import TodoList from "./TodoList";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { it, expect, describe } from "vitest";

describe("TodoList", () => {
  it("renders the TodoList component", () => {
    render(<TodoList />);
    const emptyTodoListText = screen.getByText(
      "No time to sit around! You have stuff todo!"
    );
    expect(emptyTodoListText).toBeInTheDocument();
  });

  it("add todo to list", async () => {
    render(<TodoList />);
    const emptyTodoListText = screen.getByText(
      "No time to sit around! You have stuff todo!"
    );
    expect(emptyTodoListText).toBeInTheDocument();

    const addTodoButton = screen.getByRole("button", { name: /add todo/i });
    await userEvent.click(addTodoButton);
    const titleInputText = screen.getByRole("textbox", { name: /title/i });
    const descriptionInputText = screen.getByRole("textbox", {
      name: /description/i,
    });
    const dateInput = screen.getByTestId("test-calendar");
    const submitButton = screen.getByRole("button", { name: /save/i });

    await userEvent.type(titleInputText, "Todo1");
    await userEvent.type(descriptionInputText, "TodoDesc1");
    // Picking date in calendar
    await userEvent.click(submitButton);

    const todoTitle = screen.getByText("Todo1");
    const todoDesc = screen.getByText("TodoDesc1");
    expect(todoTitle).toBeInTheDocument();
    expect(todoDesc).toBeInTheDocument();
  });

  it("should return an error if todo title is empty", async () => {
    render(<TodoList />);
    const emptyTodoListText = screen.getByText(
      "No time to sit around! You have stuff todo!"
    );
    expect(emptyTodoListText).toBeInTheDocument();

    const addTodoButton = screen.getByRole("button", { name: /add todo/i });
    await userEvent.click(addTodoButton);
    const titleInputText = screen.getByRole("textbox", { name: /title/i });
    const submitButton = screen.getByRole("button", { name: /save/i });

    await userEvent.type(titleInputText, "Todo1");
    await userEvent.click(submitButton);

    const todoTitleError = screen.getByText("Title is required.");
    expect(todoTitleError).toBeInTheDocument();
  });

  // Similar test for calendar date picker. A due date is required to be picked and an error should pop-up if not chosen. Note: This is currently not working as expected. The calendar is choosing the new Date(0) by default if nothing is picked.

  it("mark todo item as completed", async () => {
    render(<TodoList />);
    const emptyTodoListText = screen.getByText(
      "No time to sit around! You have stuff todo!"
    );
    expect(emptyTodoListText).toBeInTheDocument();

    const addTodoButton = screen.getByRole("button", { name: /add todo/i });
    await userEvent.click(addTodoButton);
    const titleInputText = screen.getByRole("textbox", { name: /title/i });
    const descriptionInputText = screen.getByRole("textbox", {
      name: /description/i,
    });
    const dateInput = screen.getByTestId("test-calendar");
    const submitButton = screen.getByRole("button", { name: /save/i });

    await userEvent.type(titleInputText, "Todo1");
    await userEvent.type(descriptionInputText, "TodoDesc1");
    // Picking date in calendar
    await userEvent.click(submitButton);

    const checkBox = screen.getByRole("checkbox");

    await userEvent.click(checkBox);

    const markAsCompletedBtn = screen.getByRole("button", {
      name: /mark as completed/i,
    });
    await userEvent.click(markAsCompletedBtn);
    const confirmBtn = screen.getByRole("button", { name: /yes/i });
    await userEvent.click(confirmBtn);

    const todoStatus = screen.getByText("COMPLETED");
    expect(todoStatus).toBeInTheDocument();
  });

  it("delete todo item", async () => {
    render(<TodoList />);
    const emptyTodoListText = screen.getByText(
      "No time to sit around! You have stuff todo!"
    );
    expect(emptyTodoListText).toBeInTheDocument();

    const addTodoButton = screen.getByRole("button", { name: /add todo/i });
    await userEvent.click(addTodoButton);
    const titleInputText = screen.getByRole("textbox", { name: /title/i });
    const descriptionInputText = screen.getByRole("textbox", {
      name: /description/i,
    });
    const dateInput = screen.getByTestId("test-calendar");
    const submitButton = screen.getByRole("button", { name: /save/i });

    await userEvent.type(titleInputText, "Todo1");
    await userEvent.type(descriptionInputText, "TodoDesc1");
    // Picking date in calendar
    await userEvent.click(submitButton);

    const checkBox = screen.getByRole("checkbox");

    await userEvent.click(checkBox);

    const deleteMultipleBtn = screen.getByRole("button", {
      name: /delete/i,
    });
    await userEvent.click(deleteMultipleBtn);
    const confirmBtn = screen.getByRole("button", { name: /yes/i });
    await userEvent.click(confirmBtn);

    const todoTitle = screen.getByText("Todo1");
    const todoDesc = screen.getByText("TodoDesc1");
    expect(todoTitle).not.toBeInTheDocument();
    expect(todoDesc).not.toBeInTheDocument();
  });
});
