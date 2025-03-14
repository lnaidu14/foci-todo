import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Todo } from "@customTypes/TodoList";
import { createTodo, patchTodo } from "@data/";
import { emptyTodo } from "@helpers/constants";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";

type AddToDialogProps = {
  todoDialog: boolean;
  setTodoDialog: Dispatch<SetStateAction<boolean>>;
  submitted: boolean;
  setSubmitted: Dispatch<SetStateAction<boolean>>;
  todo: Todo;
  setTodo: Dispatch<SetStateAction<Todo>>;
  toast: any;
};

export default function AddTodoDialog({
  todoDialog,
  setTodoDialog,
  submitted,
  setSubmitted,
  todo,
  setTodo,
  toast,
}: AddToDialogProps) {
  const [datetime24h, setDateTime24h] = useState(null);

  const hideDialog = () => {
    setSubmitted(false);
    setTodoDialog(false);
  };

  const saveTodo = async () => {
    setSubmitted(true);

    if (todo.id) {
      const { data: updatedTodo, error } = await patchTodo(todo.id, todo);
      if (updatedTodo)
        toast.current?.show({
          severity: "success",
          summary: "Successful",
          detail: "Todo updated",
          life: 3000,
        });
      else if (error)
        toast.current?.show({
          severity: "error",
          summary: "Failure",
          detail: "Failed to update todo",
          life: 3000,
        });
    } else {
      const { data: createdTodo, error } = await createTodo(todo);
      if (createdTodo)
        toast.current?.show({
          severity: "success",
          summary: "Successful",
          detail: "Todo Created",
          life: 3000,
        });
      else if (error)
        toast.current?.show({
          severity: "error",
          summary: "Failure",
          detail: "Failed to create todo",
          life: 3000,
        });
    }

    setTodoDialog(false);
    setTodo(emptyTodo);
    setDateTime24h(null);
  };

  const todoDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveTodo} />
    </React.Fragment>
  );

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || "";
    let _todo = { ...todo };

    // @ts-ignore
    _todo[name] = val;

    setTodo(_todo);
  };

  return (
    <>
      <Dialog
        visible={todoDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Todo Details"
        modal
        className="p-fluid"
        footer={todoDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name" className="font-bold">
            Title
          </label>
          <InputText
            id="title"
            value={todo.title}
            onChange={(e) => onInputChange(e, "title")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !todo.title })}
          />
          {submitted && !todo.title && (
            <small className="p-error">Name is required.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="description" className="font-bold">
            Description
          </label>
          <InputTextarea
            id="description"
            value={todo.description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              onInputChange(e, "description")
            }
            rows={3}
            cols={20}
          />
        </div>
        <div className="field">
          <label htmlFor="title" className="font-bold">
            Due Date
          </label>
          <Calendar
            data-testid="test-calendar"
            value={datetime24h}
            showTime
            variant="filled"
            hourFormat="24"
            touchUI
            showIcon
            showButtonBar
            onChange={(e) => {
              // @ts-ignore
              onInputChange(e, "dueDate");
              // @ts-ignore
              setDateTime24h(e.value);
            }}
          />
          {submitted && !todo.dueDate && (
            <small className="p-error">Due date is required.</small>
          )}
        </div>
      </Dialog>
    </>
  );
}
