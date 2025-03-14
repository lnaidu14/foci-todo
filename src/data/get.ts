import supabase from "@/supabase";


export const fetchAllTodos = async () => {
    let { data, error } = await supabase
        .from('todos')
        .select('*')
    return { data, error }
}