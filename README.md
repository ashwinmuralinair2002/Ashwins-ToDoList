# Ashwin's To-Do List 📝

A simple and interactive To-Do List application built with **React, TypeScript and Bootstrap**. It helps users organise daily tasks, set deadlines, track completion and manage overdue activities through a clean interface.

## ✨ Features

- **Add Tasks:** Create tasks with a title, description and deadline.
- **View Tasks:** Display all saved tasks in an organised list.
- **Edit Tasks:** Update existing task details.
- **Delete Tasks:** Remove tasks with a confirmation dialog.
- **Mark as Complete:** Toggle tasks between completed and pending.
- **Deadline Management:** Assign deadlines to tasks and prevent selecting past dates.
- **Overdue Notifications:** Display a warning when unfinished tasks pass their deadlines.
- **Toast Notifications:** Receive feedback when tasks are added, edited, deleted or completed.
- **Task Details:** Expand individual tasks to view their descriptions and deadlines.
- **Persistent Storage:** Save tasks in browser LocalStorage so they remain available after refreshing the page.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React 19 | Component-based UI development |
| TypeScript | Static typing |
| Vite | Development server and build tool |
| Bootstrap 5 | Styling and layout |
| SweetAlert2 | Delete confirmation dialogs |
| LocalStorage | Browser-based task persistence |
| HTML5 & CSS3 | Application structure and styling |

## 📂 Project Structure

```text
Ashwins-ToDoList/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── AddTask.tsx
│   │   ├── Header.tsx
│   │   ├── TodoItem.tsx
│   │   └── TodoList.tsx
│   │
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
│
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/ashwinmuralinair2002/Ashwins-ToDoList.git
```

### 2. Navigate to the Project

```bash
cd Ashwins-ToDoList
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## ⚙️ Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Builds the application for production |
| `npm run preview` | Previews the production build |
| `npm run lint` | Runs ESLint checks |

## 💾 Data Persistence

The application uses the browser's **LocalStorage API** to save task information.

- Tasks are loaded automatically when the application starts.
- Changes are saved whenever the task list is updated.
- Tasks remain available after refreshing or reopening the application in the same browser.

No backend server or external database is required.

## 👨‍💻 Author

**Ashwin Murali Nair**

- GitHub: [@ashwinmuralinair2002](https://github.com/ashwinmuralinair2002)
- Repository: [Ashwins-ToDoList](https://github.com/ashwinmuralinair2002/Ashwins-ToDoList)

---

*Developed as a learning project to practise React fundamentals, TypeScript, component-based development, state management and browser storage.*
