export const getTodoStatus = (status: string) => {
    switch (status) {
        case "IN-PROGRESS":
            return "warning";

        case "COMPLETED":
            return "success";

        default:
            return null;
    }
};