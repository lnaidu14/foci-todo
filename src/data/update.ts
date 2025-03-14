import supabase from "@/supabase"
import { Todo } from "@customTypes/TodoList"

export const completeTodo = async (id: string[]) => {
    const { data, error } = await supabase
        .from('todos')
        .update({ status: 'COMPLETED' })
        .eq('id', id)
        .select()
    return { data, error }
}

export const patchTodo = async (id: string, updateBody: Todo) => {
    const { data, error } = await supabase
        .from('todos')
        .update({ title: updateBody.title, description: updateBody.description })
        .eq('id', id)
        .select()
    return { data, error }
}