import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { Dispatch, SetStateAction } from "react";
import { Todo } from "@customTypes/TodoList";
import { completeTodo } from "@data/";

type CompleteTodosDialogProps = {
  completeTodosDialog: boolean;
  setCompleteTodosDialog: Dispatch<SetStateAction<boolean>>;
  selectedTodos: Todo[];
  setSelectedTodos: Dispatch<SetStateAction<Todo[]>>;
  todo: Todo;
  toast: any;
};

export default function CompleteTodosDialog({
  completeTodosDialog,
  setCompleteTodosDialog,
  selectedTodos,
  setSelectedTodos,
  todo,
  toast,
}: CompleteTodosDialogProps) {
  const hideCompleteTodosDialog = () => {
    setCompleteTodosDialog(false);
  };

  const completeSelectedTodos = async () => {
    const todosToBeCompleted = selectedTodos.map((_todo) => {
      return _todo.id;
    });
    const { data: completedTodos, error } = await completeTodo(
      todosToBeCompleted
    );
    if (completedTodos) {
      setCompleteTodosDialog(false);
      setSelectedTodos([]);
      toast.current?.show({
        severity: "success",
        summary: "Successful",
        detail: "Todos set to completed",
        life: 3000,
      });
    } else if (error)
      toast.current?.show({
        severity: "error",
        summary: "Failure",
        detail: "Failed to set todo to completed",
        life: 3000,
      });
  };

  const completeTodosDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        severity="info"
        outlined
        onClick={hideCompleteTodosDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="info"
        onClick={completeSelectedTodos}
      />
    </React.Fragment>
  );
  return (
    <>
      <Dialog
        visible={completeTodosDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={completeTodosDialogFooter}
        onHide={hideCompleteTodosDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {todo && (
            <span>
              Are you sure you want to set the selected todo(s) to completed?
            </span>
          )}
        </div>
      </Dialog>
    </>
  );
}
