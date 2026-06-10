# To-Do List

Simple To-Do List application built with Vanilla JavaScript, Tailwind CSS and Vitest.

## Features

- Add tasks
- Remove tasks
- Mark tasks as completed
- Edit tasks
- Filter tasks
- Dark mode
- LocalStorage persistence

## Technologies

- JavaScript (ES Modules)
- Tailwind CSS
- Vitest
- jsdom
- GitHub Actions

## Installation

```bash
npm install
```

## Run Tailwind

```bash
npm run dev
```

## Run tests

```bash
npm test
```

## Run tests once

```bash
npx vitest run
```

## Project Structure

```text
src/
├── js/
│   ├── todoController.js
│   ├── todoModel.js
│   ├── todoView.js
│   └── store.js
├── styles/
└── test/
```

## CI/CD

Tests are automatically executed using GitHub Actions on every push.

## Author

Xavier Quevedo
