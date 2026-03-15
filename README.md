# Homework 8 — Login Page & Authentication

---

## Overview

A server-side web application built with Node.js and Express that demonstrates user authentication, session persistence, and client-side state management using signed cookies.

The app supports multiple user accounts with unique profile data. After logging in, users are redirected to a protected profile page that displays their personal information. A dark/light mode toggle persists across sessions and even after logout using a signed, httpOnly cookie.

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | Express.js |
| Template Engine | Handlebars (hbs) |
| Session Management | express-session |
| Cookie Handling | cookie-parser |
| Environment Variables | dotenv |

---

## Demo Accounts

| Username | Password |
|---|---|
| admin | password123 |
| student_dev | dev_password |
| fong_bunsong | bunsong@123 |
| superman | KalEl@Metropolis88 |
| batman | Wayne@Midnight77 |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create a `.env` file

Create a file named `.env` in the root of the project with the following contents:

```
COOKIE_SECRET=song_cookie_secret_t9Kf4pL2vM8xQ3nB6rS1wY7zA5dU0hCx2Rj8Pq6Nv4Wm1Gy
SESSION_SECRET=song_session_secret_L8mN2qR5tV7xZ1cB4kP9sD3jF6gH0yWe5Tk3Xu9Fa7Bz
PORT=3000
```

A `.env.example` file is also included as a reference template.

> **NOTE:** I intentionally included hardcoded fallback secrets in `app.js` (e.g., `process.env.COOKIE_SECRET || 'fallback_string'`) to ensure the app runs out of the box after a fresh clone, even without a `.env` file present. I want to be clear that I am fully aware and understand that hardcoding secrets is **not** acceptable in production as environment variables should always be the sole source of sensitive values. This was a deliberate academic convenience to prevent the app from crashing during grading. To support proper setup, I have also included a `.env.example` template and provided the actual secret strings above for reference. 

### 3. Run the app

```bash
npm start
```

Or with auto-reload during development:

```bash
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000)

---

## Features

- Login / Logout with session management
- Protected `/profile` route — redirects to `/login` if not authenticated
- Theme toggle (Light / Dark) persisted via a signed, HttpOnly cookie — survives logout
- Profile page displays user-specific data including photo, bio, and extended fields
- Demo accounts listed on the login page in a collapsible section

---

## Project Structure

```
├── app.js                  # Main server — routes, middleware, user data
├── views/
│   ├── layout.hbs          # Shared layout (topbar, theme class on body)
│   ├── login.hbs           # Login form + demo accounts
│   └── profile.hbs         # Protected profile page
├── public/
│   ├── styles.css          # Light/dark theme styles
│   └── images/             # Profile photos
├── .env                    # Secret keys — NOT committed to GitHub
├── .env.example            # Template showing required keys
├── .gitignore              # Excludes node_modules/ and .env
└── package.json
```

---

## Security Notes

- Session cookie (`connect.sid`) is `HttpOnly` and cleared on logout
- Theme cookie is signed with `COOKIE_SECRET` and set `HttpOnly`
- `.env` is excluded from version control via `.gitignore`
- Hardcoded fallbacks are present **only** for grading convenience — see note above
