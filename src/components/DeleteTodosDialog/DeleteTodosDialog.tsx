import { Dialog } from "primereact/dialog";
import React, { Dispatch, SetStateAction } from "react";
import { Todo } from "@customTypes/TodoList";
import { Button } from "primereact/button";
import { deleteTodos } from "@data/";

type DeleteToDialogProps = {
  deleteTodosDialog: boolean;
  setDeleteTodosDialog: Dispatch<SetStateAction<boolean>>;
  todo: Todo;
  selectedTodos: Todo[];
  setSelectedTodos: Dispatch<SetStateAction<Todo[]>>;
  toast: any;
};

export default function DeleteTodosDialog({
  deleteTodosDialog,
  setDeleteTodosDialog,
  todo,
  selectedTodos,
  setSelectedTodos,
  toast,
}: DeleteToDialogProps) {
  const hideDeleteTodosDialog = () => {
    setDeleteTodosDialog(false);
  };

  const deleteSelectedTodos = async () => {
    const todosToBeDeleted = selectedTodos.map((_todo) => {
      return _todo.id;
    });
    await deleteTodos(todosToBeDeleted);
    setDeleteTodosDialog(false);
    setSelectedTodos([]);
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "Todos Deleted",
      life: 3000,
    });
  };

  const deleteTodosDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteTodosDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedTodos}
      />
    </React.Fragment>
  );

  return (
    <>
      <Dialog
        visible={deleteTodosDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteTodosDialogFooter}
        onHide={hideDeleteTodosDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {todo && (
            <span>Are you sure you want to delete the selected todo(s)?</span>
          )}
        </div>
      </Dialog>
    </>
  );
}
