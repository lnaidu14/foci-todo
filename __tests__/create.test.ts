import { createTodo } from "../src/data"
import supabase from "../src/supabase"
jest.mock("../src/supabase.ts")

const mockTodo = {
    id: "mockId",
    title: "mockTitle",
    description: "mockDescription",
    dueDate: new Date(0),
    status: "IN-PROGRESS",
}

describe("create", () => {
    beforeEach(() => {

    });
    it("should be successful if todo is created", async () => {
        const supabaseMock = jest.spyOn(supabase, 'from')
        supabase.mockImplementation(() => { mockTodo })
        const response = await createTodo(mockTodo)
    })
})