import { Dialog } from "primereact/dialog";
import React, { Dispatch, SetStateAction } from "react";
import { Todo } from "@customTypes/TodoList";
import { emptyTodo } from "@helpers/constants";
import { deleteTodos } from "@data/";
import { Button } from "primereact/button";

type DeleteTodoDialogProps = {
  todo: Todo;
  setTodo: Dispatch<SetStateAction<Todo>>;
  deleteTodoDialog: boolean;
  setDeleteTodoDialog: Dispatch<SetStateAction<boolean>>;
  toast: any;
};

export default function DeleteTodoDialog({
  todo,
  setTodo,
  deleteTodoDialog,
  setDeleteTodoDialog,
  toast,
}: DeleteTodoDialogProps) {
  const deleteTodo = async () => {
    const { error: deleteTodoError } = await deleteTodos([todo.id]);
    setDeleteTodoDialog(false);
    setTodo(emptyTodo);
    if (deleteTodoError) {
      toast.current?.show({
        severity: "failure",
        summary: "Failure",
        detail: "Failed to delete todo",
        life: 3000,
      });
    } else
      toast.current?.show({
        severity: "success",
        summary: "Successful",
        detail: "Todo Deleted",
        life: 3000,
      });
  };
  const hideDeleteTodoDialog = () => {
    setDeleteTodoDialog(false);
  };
  const deleteTodoDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteTodoDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteTodo}
      />
    </React.Fragment>
  );

  return (
    <>
      <Dialog
        visible={deleteTodoDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteTodoDialogFooter}
        onHide={hideDeleteTodoDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {todo && (
            <span>
              Are you sure you want to delete <b>{todo.title}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  );
}
