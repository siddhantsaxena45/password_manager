


# 🔐 PassOP - Your Personal Password Manager

A sleek and functional password manager built with React. Save, edit, delete, and manage your website login credentials securely — all in your browser.

---

## 🚀 Features

- ✅ Add, edit, and delete passwords for any website
- ✅ Toggle visibility of passwords
- ✅ Copy usernames, passwords, or URLs with a click
- ✅ Live toast notifications for user feedback
- ✅ Beautiful animations using Lordicon
- ✅ Backend communication (REST API) with support for `GET`, `POST`, and `DELETE`

---

## 🧱 Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js / Express (expected at `http://localhost:3000/`)
- **Libraries**:
  - [`react-toastify`](https://www.npmjs.com/package/react-toastify) – for user feedback toasts
  - [`uuid`](https://www.npmjs.com/package/uuid) – for unique ID generation
  - [`lord-icon`](https://lordicon.com/) – for interactive icons


---

## ⚙️ Getting Started

### 1. Install Dependencies

```bash
npm install
````

Make sure you also install:

```bash
npm install react-toastify uuid
```

### 2. Run Frontend

```bash
npm start
```

The app will be available at `http://localhost:3000`.

> 🧠 Make sure your **backend is also running** at the same port (or adjust fetch URLs accordingly).

---

## 📦 Backend API Expectations

Your frontend expects the backend to expose these endpoints:

* `GET /` — fetch all saved credentials
* `POST /` — save a new credential (JSON body: `{ site, user, pass, id }`)
* `DELETE /` — delete a credential (JSON body: `{ id }`)


---

## 🛡️ Security Notes

* This project is for **learning/demo purposes** and stores passwords in plaintext.
* In production, passwords should be encrypted and stored securely in a database with authentication and proper access control.

---

## 🙌 Credits

* Icons by [Lordicon](https://lordicon.com/)
* Toast notifications by [React Toastify](https://fkhadra.github.io/react-toastify/introduction)

---



