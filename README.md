# 🚀 Global Code Saver Platform

A premium, full-stack **To-Do List & Code Snippet Manager** designed for the modern developer. Save your daily tasks and code modules in a stunning "Code Editor" themed interface with global persistence powered by MongoDB.

![Project Preview](/C:/Users/siran/.gemini/antigravity/brain/54030113-b1fa-4365-93c5-1f0a44453a1f/code_task_result_1772960296770.png)

## ✨ Features

- **📂 Global Code Saving**: Store snippets and notes in a local/global MongoDB repository.
- **💻 Premium Editor UI**: Fully interactive interface with line numbers, syntax-highlighted pre-blocks, and foldable editor sections.
- **🌓 Adaptive Aesthetics**: Dark mode by default with vibrant animated backgrounds and glassmorphism elements.
- **⚡ Real-time Sync**: Instant updates for CRUD operations with dedicated Toast notifications and progress bars.
- **🔒 Secure Architecture**: Environment-based configuration (`.env`) and Mongoose-driven data modeling.

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Framer Motion, Lucide-React
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Tooling**: Vite, Dotenv, PostCSS

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB installed and running locally

### 2. Installation
```bash
git clone https://github.com/SiranjeeviE/To-do-List.git
cd To-do-List
npm install
cd backend && npm install
```

### 3. Configuration
Create a `.env` file in the root:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/todo_code_saver
```

### 4. Running the App
Start the backend:
```bash
node backend/server.js
```
Start the frontend (in a new terminal):
```bash
npm run dev
```
