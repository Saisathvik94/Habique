# 🌱 Habique - Task & Habit Manager

Habique is a web-based personal productivity dashboard that helps users organize their day by managing tasks and tracking habits. It features a **drag-and-drop calendar**, **habit streaks**, and a **daily task tracker**. Built with **React**, **FullCalendar**, and **MongoDB**.

---

## ✨ Features

- Add, edit, and complete tasks.
- Drag-and-drop tasks on a weekly calendar to change dates/times.
- Add, delete, and track habits with streaks.
- Sync tasks with MongoDB backend.
- Responsive design for desktop and mobile.

---

## 🌐 Tech Stack

- 🎨 **Frontend:** React, Tailwind CSS, FullCalendar, react-icons, react-calendar
- 🛠️ **Backend:** Node.js, Express
- ☁️ **Database:** MongoDB
- **Others:** dotenv for environment variables

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB

### 📦 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/habique.git
cd habique
```
2. **Install dependencies:**
```bash
npm install
```
3. **Create a .env file in the root directory:**
```bash
cp .example.env .env
```
4. **Add your MongoDB connection string in .env:**
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/your-db-name
```
5. **Frontend Setup:**
```bash
cd frontend
npm run dev
```
The frontend will be available at http://localhost:5173

6. **Start backend server:**
```bash
cd backend
npm run dev
```
The backend will be available at http://localhost:3000

---

### 🤝 Contributions
Contributors are welcome!

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.
