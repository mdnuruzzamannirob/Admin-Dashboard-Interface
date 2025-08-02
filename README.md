# 🛠️ Admin Dashboard Interface

A minimal admin dashboard built with **React.js**, **Redux Toolkit**, **Tailwind CSS**, **TypeScript**, and **Shadcn UI**. This project simulates user management features and showcases state management, component structure, and responsive layout handling.

---

## 🚀 Live Site

🔗 [Live Demo](https://admin-dashboard-interface-eight.vercel.app)

---

## 📦 Tech Stack

- **React.js** (Functional Components)
- **Redux Toolkit**
- **TypeScript**
- **Tailwind CSS**
- **Shadcn UI**

---

## 🧰 Features Implemented

### ✅ 1. Login Simulation

- Simple login form (no real auth).
- On login, user is redirected to the dashboard.
- Login state is maintained using Redux.

### ✅ 2. Dashboard Layout

- Fixed sidebar & top navigation bar.
- Fully responsive (mobile to desktop).
- Uses semantic icons and Tailwind utility classes.

### ✅ 3. User Management Table

- Displays a list of users from mock JSON data.
- Fields: Name, Email, Role, Status.
- Status toggle for Active/Inactive.
- Client-side pagination implemented.

### ✅ 4. Add/Edit User Modal

- Modal form for creating/editing users.
- Form includes validation for all fields.
- Edit button per row pre-fills the form.

### ✅ 5. Search & Filter

- Search bar filters by name or email.
- Role dropdown filters by Admin/Editor/Viewer.

### ✅ 6. Logout Functionality

- Logout button clears Redux store and redirects to login.

### 🎁 Bonus: Inactive User Notification

- Notification banner at the top showing total inactive users.
- If more than 5 are inactive, shows a warning alert.

---

## 🗂️ Folder Structure Overview

```
src/
├── assets/ # Icons or images
├── components/ # Reusable components (Button, Modal, etc.)
├── features/
│ ├── auth/ # Login state (authSlice.ts)
│ └── users/ # User data & actions (userSlice.ts)
├── layouts/ # Dashboard layout (Sidebar, Topbar)
├── pages/
│ ├── LoginPage.tsx # Login form page
│ └── DashboardPage.tsx # Main dashboard UI
├── store/ # store.ts and rootReducer setup
├── types/ # TypeScript interfaces
```

---

## 🧠 Redux Structure Explained

### 🔑 store.ts

```ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
  },
});
```

### 🔐 authSlice.ts

- Holds `isLoggedIn` state.
- Actions: `login`, `logout`.

### 👥 userSlice.ts

- Stores user list and filters.
- Actions: `setUsers`, `addUser`, `updateUser`, `toggleUserActive`, etc.

## 🧪 How to Run Locally

### Clone the repository

- git clone https://github.com/mdnuruzzamannirob/Admin-Dashboard-Interface.git

- cd Admin-Dashboard-Interface

### Install dependencies

- npm install

### Start the dev server

- npm run dev

## 📌 Notes

- No backend used — all user data is stored in Redux (simulated).
- Clean, modular components for better reusability.
- Code is TypeScript-typed for safety and clarity.

## 📎 Tasks & Checklist from Job Description

```
| Task                          | Status  |
| ----------------------------- | ------  |
| Login Simulation              | ✅ Done |
| Fixed Sidebar + Topbar        | ✅ Done |
| User Management Table         | ✅ Done |
| Add/Edit Modal                | ✅ Done |
| Search & Filter               | ✅ Done |
| Logout                        | ✅ Done |
| Bonus: Inactive User Warning  | ✅ Done |
| Responsive UI                 | ✅ Done |
| Redux State Management        | ✅ Done |
| Clean Code Structure          | ✅ Done |
| README with Setup + Structure | ✅ Done |

```

## 👨‍💻 Author

Made with ❤️ by

Md. Nuruzzaman

🔗 [LinkedIn](https://www.linkedin.com/in/nuruzzamanmd2002/)

🔗 [Portfolio](https://mdnuruzzaman.web.app/)
