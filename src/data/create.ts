import supabase from "@/supabase"
import { v4 as uuidv4 } from "uuid"
import { Todo } from "@customTypes/TodoList"

export const createTodo = async (body: Todo) => {
    const todoBody = {
        id: uuidv4(),
        title: body.title,
        description: body.description,
        dueDate: body.dueDate,
        status: "IN-PROGRESS",
    }
    const { data, error } = await supabase
        .from('todos')
        .insert(todoBody)
        .select()
    return { data, error }
}