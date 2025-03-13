import React, { useState, useRef, ChangeEvent } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { v4 as uuidv4 } from "uuid";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { Todo } from "../../types/TodoList";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";

export default function TodoList() {
  let emptyTodo: Todo = {
    id: "",
    title: "",
    description: "",
    dueDate: new Date(0),
    status: "",
  };

  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoDialog, setTodoDialog] = useState<boolean>(false);
  const [deleteTodoDialog, setDeleteTodoDialog] = useState<boolean>(false);
  const [deleteTodosDialog, setDeleteTodosDialog] = useState<boolean>(false);
  const [completeTodosDialog, setCompleteTodosDialog] =
    useState<boolean>(false);
  const [todo, setTodo] = useState<Todo>(emptyTodo);
  const [selectedTodos, setSelectedTodos] = useState<Todo[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [datetime24h, setDateTime24h] = useState(null);
  const [statuses] = useState(["IN-PROGRESS", "COMPLETED"]);

  // Remove completed todos, if the due date has already passed
  //   useEffect(() => {
  //     todos.map((todoToCheck: Todo) => {
  //       const dateNow = new Date();
  //       const diff = (todoToCheck.dueDate.getTime() - dateNow.getTime()) / 1000;
  //       setTodo(todoToCheck);
  //       if (diff < 0) deleteTodo();
  //     });
  //   }, [todos]);

  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<Todo[]>>(null);

  const openNew = () => {
    setTodo(emptyTodo);
    setSubmitted(false);
    setTodoDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setTodoDialog(false);
  };

  const hideDeleteTodoDialog = () => {
    setDeleteTodoDialog(false);
  };

  const hideDeleteTodosDialog = () => {
    setDeleteTodosDialog(false);
  };

  const hideCompleteTodosDialog = () => {
    setCompleteTodosDialog(false);
  };

  const findIndexById = (id: string) => {
    let index = -1;

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const saveTodo = () => {
    setSubmitted(true);

    if (todo.title.trim()) {
      let _todos = [...todos];
      let _todo = { ...todo };

      if (todo.id) {
        const index = findIndexById(todo.id);
        _todos[index] = _todo;
        toast.current?.show({
          severity: "success",
          summary: "Successful",
          detail: "Todo Updated",
          life: 3000,
        });
      } else {
        _todo.id = uuidv4();
        _todo.status = "IN-PROGRESS";
        _todos.push(_todo);
        toast.current?.show({
          severity: "success",
          summary: "Successful",
          detail: "Todo added",
          life: 3000,
        });
      }

      setTodos(_todos);
      setTodoDialog(false);
      setTodo(emptyTodo);
      setDateTime24h(null);
    }
  };

  const editTodo = (todo: Todo) => {
    setTodo({ ...todo });
    setTodoDialog(true);
  };

  const confirmDeleteTodo = (todo: Todo) => {
    setTodo(todo);
    setDeleteTodoDialog(true);
  };

  const deleteTodo = () => {
    let _todos = todos.filter((val) => val.id !== todo.id);

    setTodos(_todos);
    setDeleteTodoDialog(false);
    setTodo(emptyTodo);
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "Todo Deleted",
      life: 3000,
    });
  };

  const confirmDeleteSelected = () => {
    setDeleteTodosDialog(true);
  };

  const confirmMarkSelectedCompleted = () => {
    setCompleteTodosDialog(true);
  };

  const deleteSelectedTodos = () => {
    let _todos = todos.filter((val) => !selectedTodos.includes(val));

    setTodos(_todos);
    setDeleteTodosDialog(false);
    setSelectedTodos([]);
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "Todos Deleted",
      life: 3000,
    });
  };

  const completeSelectedTodos = () => {
    selectedTodos.map((_todo) => {
      _todo.status = "COMPLETED";
    });
    setTodos(todos);
    setCompleteTodosDialog(false);
    setSelectedTodos([]);
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "Todos set to completed",
      life: 3000,
    });
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || "";
    let _todo = { ...todo };

    // @ts-ignore
    _todo[name] = val;

    setTodo(_todo);
  };

  const onInputTextAreaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || "";
    let _todo = { ...todo };

    // @ts-ignore
    _todo[name] = val;

    setTodo(_todo);
  };

  const onDateChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || "";
    let _todo = { ...todo };

    // @ts-ignore
    _todo[name] = val;

    setTodo(_todo);
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

  const dueDateBodyTemplate = (rowData: any) => {
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

  const statusBodyTemplate = (rowData: any) => {
    return (
      <Tag
        value={rowData.status}
        severity={getTodoStatus(rowData.status)}
      ></Tag>
    );
  };

  const actionBodyTemplate = (rowData: Todo) => {
    return (
      <React.Fragment>
        <Button
          tooltip="Edit todo"
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editTodo(rowData)}
          disabled={rowData.status === "COMPLETED"}
        />
        <Button
          tooltip="Delete todo"
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteTodo(rowData)}
        />
      </React.Fragment>
    );
  };

  const getTodoStatus = (status: string) => {
    switch (status) {
      case "IN-PROGRESS":
        return "warning";

      case "COMPLETED":
        return "success";

      default:
        return null;
    }
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Todos</h4>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          placeholder="Search..."
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            setGlobalFilter(target.value);
          }}
        />
      </IconField>
    </div>
  );

  const todoDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveTodo} />
    </React.Fragment>
  );
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

  const statusItemTemplate = (option: string) => {
    return <Tag value={option} severity={getTodoStatus(option)} />;
  };

  const statusRowFilterTemplate = (options: any) => {
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

  return (
    <>
      <div className="w-full h-100">
        <h1 className="flex justify-content-center">Todo App</h1>
        <Toast ref={toast} />
        <div className="card">
          <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

          <DataTable
            ref={dt}
            value={todos}
            selection={selectedTodos}
            onSelectionChange={(e) => {
              if (Array.isArray(e.value)) {
                setSelectedTodos(e.value);
              }
            }}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            filterDisplay="row"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} todos"
            globalFilter={globalFilter}
            header={header}
            selectionMode="checkbox"
            emptyMessage="No time to sit around! You have stuff todo!"
            removableSort
            resizableColumns
            reorderableRows
            onRowReorder={(e) => setTodos(e.value)}
          >
            <Column rowReorder style={{ width: "3rem" }} />
            <Column selectionMode="multiple" exportable={false}></Column>
            <Column
              field="title"
              header="Title"
              sortable
              filter
              filterPlaceholder="Search by title"
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="description"
              header="Description"
              filter
              filterPlaceholder="Search by description"
              style={{ minWidth: "16rem" }}
            ></Column>
            <Column
              field="status"
              header="Status"
              body={statusBodyTemplate}
              sortable
              filter
              filterElement={statusRowFilterTemplate}
              style={{ minWidth: "12rem" }}
            ></Column>{" "}
            <Column
              field="dueDate"
              header="Due Date"
              sortable
              dataType="date"
              body={dueDateBodyTemplate}
              style={{ minWidth: "8rem" }}
            ></Column>
            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "12rem" }}
            ></Column>
          </DataTable>
        </div>

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
            <label htmlFor="title" className="font-bold">
              Title
            </label>
            <InputText
              id="title"
              value={todo.title}
              onChange={(e) => onInputChange(e, "title")}
              required
              autoFocus
              className={classNames({
                "p-invalid":
                  submitted && !todo.title && !(todo.title.length > 20),
              })}
            />
            {submitted && !todo.title && (
              <small className="p-error">Title is required.</small>
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
                onInputTextAreaChange(e, "description")
              }
              required
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
                onDateChange(e, "dueDate");
                // @ts-ignore
                setDateTime24h(e.value);
              }}
            />
            {submitted && !todo.dueDate && (
              <small className="p-error">Due date is required.</small>
            )}
          </div>
        </Dialog>

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
      </div>
    </>
  );
}
