import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Todo } from "@customTypes/TodoList";
import { emptyTodo } from "@helpers/";
import { fetchAllTodos } from "@data/";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import {
  AddTodoDialog,
  DeleteTodosDialog,
  CompleteTodosDialog,
  DeleteTodoDialog,
} from "@components/";
import supabase from "@/supabase";
import {
  LeftToolbarTemplate,
  statusBodyTemplate,
  statusRowFilterTemplate,
} from "../templates/templates";

export default function TodoList() {
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<Todo[]>>(null);

  const [todo, setTodo] = useState<Todo>(emptyTodo);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [todoDialog, setTodoDialog] = useState(false);
  const [deleteTodoDialog, setDeleteTodoDialog] = useState<boolean>(false);
  const [deleteTodosDialog, setDeleteTodosDialog] = useState<boolean>(false);
  const [selectedTodos, setSelectedTodos] = useState<Todo[]>([]);
  const [completeTodosDialog, setCompleteTodosDialog] =
    useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { data: fetchedTodos, error } = await fetchAllTodos();
      if (fetchedTodos) {
        setTodos(fetchedTodos);
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Successfully fetched todos",
          life: 3000,
        });
      } else if (error) {
        toast.current?.show({
          severity: "error",
          summary: "Failure",
          detail: "Failed to fetch todos",
          life: 3000,
        });
      }

      // Tracking (subscribing) to real time changes in database to ensure data isn't stale
      supabase
        .channel("todos")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "todos",
          },
          async (_) => {
            const { data: fetchedTodos } = await fetchAllTodos();
            if (fetchedTodos) setTodos(fetchedTodos);
          }
        )
        .subscribe();
    })();
  }, []);

  const editTodo = (todo: Todo) => {
    setTodo({ ...todo });
    setTodoDialog(true);
  };

  const confirmDeleteTodo = (todo: Todo) => {
    setTodo(todo);
    setDeleteTodoDialog(true);
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

  return (
    <>
      <Toast ref={toast} />
      <div className="card">
        <LeftToolbarTemplate
          selectedTodos={selectedTodos}
          setTodo={setTodo}
          setSubmitted={setSubmitted}
          setTodoDialog={setTodoDialog}
          setDeleteTodosDialog={setDeleteTodosDialog}
          setCompleteTodosDialog={setCompleteTodosDialog}
        />
        <DataTable
          ref={dt}
          dataKey="id"
          selectionMode="checkbox"
          selection={selectedTodos}
          onSelectionChange={(e) => {
            if (Array.isArray(e.value)) {
              setSelectedTodos(e.value);
            }
          }}
          value={todos}
          tableStyle={{ minWidth: "50rem" }}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          filterDisplay="row"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} todos"
          emptyMessage="No time to sit around! You have stuff todo!"
          removableSort
          resizableColumns
          reorderableRows
        >
          <Column selectionMode="multiple" exportable={false}></Column>
          <Column
            field="title"
            header="Title"
            sortable
            filter
            filterPlaceholder="Search by title"
          ></Column>
          <Column
            field="description"
            header="Description"
            sortable
            filter
            filterPlaceholder="Search by title"
          ></Column>
          <Column
            field="status"
            header="Status"
            sortable
            body={(rowData) => statusBodyTemplate(rowData)}
            filter
            filterElement={statusRowFilterTemplate}
          ></Column>
          <Column
            field="dueDate"
            header="Due Date"
            sortable
            dataType="date"
            style={{ minWidth: "8rem" }}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>

      <AddTodoDialog
        todoDialog={todoDialog}
        setTodoDialog={setTodoDialog}
        submitted={submitted}
        setSubmitted={setSubmitted}
        todo={todo}
        setTodo={setTodo}
        toast={toast}
      />

      <DeleteTodoDialog
        todo={todo}
        setTodo={setTodo}
        deleteTodoDialog={deleteTodoDialog}
        setDeleteTodoDialog={setDeleteTodoDialog}
        toast={toast}
      />

      <DeleteTodosDialog
        deleteTodosDialog={deleteTodosDialog}
        setDeleteTodosDialog={setDeleteTodosDialog}
        todo={todo}
        selectedTodos={selectedTodos}
        setSelectedTodos={setSelectedTodos}
        toast={toast}
      />

      <CompleteTodosDialog
        completeTodosDialog={completeTodosDialog}
        setCompleteTodosDialog={setCompleteTodosDialog}
        selectedTodos={selectedTodos}
        setSelectedTodos={setSelectedTodos}
        todo={todo}
        toast={toast}
      />
    </>
  );
}
