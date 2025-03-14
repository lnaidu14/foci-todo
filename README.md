# Todo App

Welcome to the Todo App utilizing Supabase as a backend. Some of the features it has are:

- Filtering
- Sorting
- Keyword Search
- Updating todo status
- Editing the name, description and due date
- Re-organizing the todos based on the priority you want

## Environment

These were the tools and tech used in my environment:

- Node v18.17.0
- NPM v9.6.7
- TypeScript
- Vite
- React
- Vitest
- Windows 10

## Data models

```js
Todo {
    id: string
    title: string
    description?: string
    dueDate: Date
    status: string
}
```

## Setup

To get the application up and running, run

```bash
npm install # Install project dependencies
npm run dev # Runs the application (on port 5173 by default)
```

## Testing the application

Although I wasn't able to run the tests (read the "Nice to haves" section for more details), they have been setup and configured. To run them, use the command:

```bash
npm run test # Uses Vitest to run tests
```

## CI

There are CI jobs that run the test cases on push to the `main` branch. Modifications can be made at `.github/workflows/ci.yml`.

## Improvements to consider:

There are few more features that can be added to this application and some extra procedures that we can follow to improve it. Some of those are:

- If a user has set a todo to "Completed" by mistake, we should be able to set it back to "In-progress".
- If a todo is in a completed state, we can add an option to remove it automatically after a specified time since it's due date.
- At this time, we are only able to sort the dates, there is no way to search for a specific date or range of dates. That might help a user narrow down a todo they are looking for.
- Filtering the date is a little finicky, for example, we need to type "Wed" for "Wednesday". Typing out the full form doesn't work. Need to find a better way to share the date related data more efficiently and consistently across all the components.
- Hovering over the due date with a tool tip mentioning the minutes, hours, days left would be helpful.
- Render errors live instead of only rendering when the "Submit" button is pressed and more in-depth error handling.
