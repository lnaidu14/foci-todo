import supabase from "@/supabase"

export const deleteTodos = async (id: string[]) => {
    const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
    return { error }
}