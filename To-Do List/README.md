# To-Do List

Simple To-Do List application built with TypeScript, Tailwind CSS, Vitest and GitHub Actions.

## Features

- Add tasks
- Remove tasks
- Mark tasks as completed
- Edit tasks with double click
- Filter tasks (All, Active, Completed)
- Dark mode
- LocalStorage persistence
- Unit and integration testing
- Continous Integration with GitHub Actions

## Technologies

- TypeScript
- Tailwind CSS
- Vitest
- jsdom
- GitHub Actions
- LocalStorage

## Installation

```bash
npm install
```

## Development 

Start Tailwind CSS watcher:

```bash
npm run dev
```

## Testing

Run test in watch mode:

```bash
npm test
```

Run tests once:

```bash
npx vitest run
```
## TypeScript

Check that the project compile correctly

```bash
npx tsc --noEmit
```




## Project Structure

```text
src/
├── js/
│   ├── main.ts
│   ├── todoController.js
│   ├── todoModel.js
│   ├── todoView.js
│   └── store.js
├── styles/
└── test/
│   ├── todoModel.test.js
│   ├── todoView.test.js
│   ├── todoController.test.js
│   └── store.test.js
```

## Architecture

The project follows a simple MVC-inspired structure:

- Model → Business logic (todoModel.ts)
- View → Rendering and UI (todoView.ts)
- Controller → Event handling (todoController.ts)
- Store → LocalStorage persistence (store.ts)


## CI/CD

GitHub Actions automatically:

- Installs dependencies
- Validates TypeScript compilation
- Runs tests

on every push and pull request.

## Learning Objetives

This project was created to learn and practice:

- TypeScript
- Unit Testing
- Integration Testing
- GitHub Actions
- MVC Architecture
- Git and GitHub workflows

## Author

Xavier Quevedo
