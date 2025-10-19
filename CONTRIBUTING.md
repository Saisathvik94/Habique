# 🧩 Contributing to Habique

Thank you for considering contributing to **Habique** 💙  
Your help makes this Task & Habit Manager better for everyone!  

This guide will walk you through how to contribute effectively and maintain consistent project quality.

---

## 📘 Table of Contents
- [Code of Conduct](#-code-of-conduct)
- [How Can I Contribute?](#-how-can-i-contribute)
- [Development Setup](#-development-setup)
- [Branch Naming Convention](#-branch-naming-convention)
- [Commit Message Guidelines](#-commit-message-guidelines)
- [Pull Request Process](#-pull-request-process)
- [Coding Style](#-coding-style)
- [Issue Reporting](#-issue-reporting)

---

## 💫 Code of Conduct
This project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/).  
By participating, you agree to maintain a welcoming, respectful environment for all contributors.

---

## 🚀 How Can I Contribute?

### 🐛 Reporting Bugs
If you find a bug:
1. Search existing [issues](../../issues) to avoid duplicates.  
2. Include clear steps to reproduce it, expected behavior, and screenshots if possible.  
3. Use a short, descriptive title (e.g., “Task not showing after calendar drag-drop”).

### 💡 Suggesting Features
We love ideas!  
When suggesting a feature:
- Explain *why* it’s useful.
- Add mockups or examples if applicable.
- Label it as a **feature request** in the issue tracker.

### 🧩 Improving Documentation
You can help by fixing typos, improving explanations, or adding new documentation sections (e.g., installation, setup).

---

## 🧰 Development Setup

1. **Fork** the repository
2. **Clone your fork:**
   ```bash
   git clone https://github.com/<your-username>/Habique.git
   cd Habique
   ```
3. **Install dependencies:**
    ```bash
    npm install
    ```
4. **Set up environment variables:**
    Create a .env file in the root directory using .example.env as a reference:
    ```bash
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/your-db-name
    ```
5. **Run the backend:**
    ```bash
    cd backend
    npm run dev
    ```
6. **Run the frontend:**
    ```bash
    cd frontend
    npm run dev
    ```
---

## 🌿 Branch Naming Convention

Please use the following format for branch names:
feature/<feature-name>
fix/<issue-description>
docs/<documentation-update>
refactor/<what-you-improved>

### Examples:
feature/task-calendar-sync
fix/delete-task-error
docs/update-readme

---

## 💬 Commit Message Guidelines

Follow this structure for clear and meaningful commit messages:

### Types:
- **feat** – new feature  
- **fix** – bug fix  
- **docs** – documentation changes  
- **style** – formatting/UI updates  
- **refactor** – code refactoring  
- **test** – adding or updating tests  

### Examples:

feat(tasks): add drag-drop support in calendar
fix(api): resolve 500 error for POST /api/tasks

---

## 🔄 Pull Request Process

1. Make sure your branch is up to date with `main`:
   ```bash
   git pull origin main
    ```
2. Run linters before pushing:
    ```bash
    npm run lint
    ```
3. Write a clear title and description for your PR.

4. Add screenshots or videos if the change affects the UI.

5. Request a review from project maintainers.

## 🧠 Coding Style

- Follow ESLint + Prettier formatting.

- Use camelCase for JS variables and functions.

- Keep components small and reusable.

- Prefer async/await over .then().

## 🐞 Issue Reporting

- When reporting an issue, please include:

- OS and browser/environment details

- Steps to reproduce

- Expected vs. actual behavior

- Screenshots (if applicable)

## ❤️ Thank You!

Every contribution counts — whether it’s code, design, or documentation.
Let’s make Habique the most intuitive and beautiful productivity app together 🌸🚀