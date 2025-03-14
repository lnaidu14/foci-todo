import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { emptyTodo, statuses, getTodoStatus } from "@helpers/constants";
import { Button } from "primereact/button";
import { Todo } from "@customTypes/TodoList";
import { Dispatch, SetStateAction } from "react";
import { Toolbar } from "primereact/toolbar";

export const dueDateBodyTemplate = (rowData: any) => {
  const date = rowData.dueDate;
  date?.setDate(date.getDate());

  const month = date?.toLocaleString("default", {
    month: "long",
  });
  const dayDate = String(date?.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const year = String(date.getFullYear()).padStart(2, "0");
  const displayDate = `${month} ${dayDate}, ${year} - ${hours}:${minutes}`;
  return displayDate;
};

export const statusBodyTemplate = (rowData: any) => {
  return (
    <Tag value={rowData.status} severity={getTodoStatus(rowData.status)}></Tag>
  );
};

export const statusItemTemplate = (option: string) => {
  return <Tag value={option} severity={getTodoStatus(option)} />;
};

export const statusRowFilterTemplate = (options: any) => {
  return (
    <Dropdown
      value={options.value}
      options={statuses}
      onChange={(e) => options.filterApplyCallback(e.value)}
      itemTemplate={statusItemTemplate}
      placeholder="Select status"
      className="p-column-filter"
      showClear
      style={{ minWidth: "12rem" }}
    />
  );
};

type LeftToolBarTemplateProps = {
  selectedTodos: Todo[];
  setTodo: Dispatch<SetStateAction<Todo>>;
  setSubmitted: Dispatch<SetStateAction<boolean>>;
  setTodoDialog: Dispatch<SetStateAction<boolean>>;
  setDeleteTodosDialog: Dispatch<SetStateAction<boolean>>;
  setCompleteTodosDialog: Dispatch<SetStateAction<boolean>>;
};

export const LeftToolbarTemplate = ({
  selectedTodos,
  setTodo,
  setSubmitted,
  setTodoDialog,
  setDeleteTodosDialog,
  setCompleteTodosDialog,
}: LeftToolBarTemplateProps) => {
  const openNew = () => {
    setTodo(emptyTodo);
    setSubmitted(false);
    setTodoDialog(true);
  };

  const confirmDeleteSelected = () => {
    setDeleteTodosDialog(true);
  };

  const confirmMarkSelectedCompleted = () => {
    setCompleteTodosDialog(true);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Add todo"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedTodos || !selectedTodos.length}
        />
        <Button
          label="Mark as completed"
          icon="pi pi-check"
          severity="info"
          onClick={confirmMarkSelectedCompleted}
          disabled={
            selectedTodos.some((e) => e.status === "COMPLETED") ||
            !selectedTodos ||
            !selectedTodos.length
          }
        />
      </div>
    );
  };

  return (
    <>
      <Toolbar className="mb-4" start={leftToolbarTemplate}></Toolbar>
    </>
  );
};
