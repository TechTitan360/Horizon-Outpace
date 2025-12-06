<div align="center">

![Horizon Outpace](./banner.png)

# 🚀 Horizon Outpace

**Transform Tasks into Momentum**

*A modern full-stack task management platform with real-time collaboration, built with Next.js, Bun, and PostgreSQL*

[![Next.js](https://img.shields.io/badge/Next.js-15.5.7-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-Runtime-orange?logo=bun)](https://bun.sh/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)](https://www.postgresql.org/)

![Coffee Consumed](https://img.shields.io/badge/Coffee-∞%20cups-brown?logo=buymeacoffee)
![Lines of Code](https://img.shields.io/badge/Lines%20of%20Code-Too%20Many-brightgreen)
![Bugs Created](https://img.shields.io/badge/Bugs%20Created-More%20Than%20Fixed-success)

[Live Demo](https://your-app.vercel.app) • [Report Bug](https://github.com/TechTitan360/Horizon-Outpace/issues) • [Request Feature](https://github.com/TechTitan360/Horizon-Outpace/issues)

</div>

---

## 📋 Quick Navigation

Click any section below to expand:

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔐 Environment Variables](#-environment-variables)
- [🌐 Deployment](#-deployment)
- [📡 API Documentation](#-api-documentation)
- [🆘 Troubleshooting](#-troubleshooting)

---

<details open>
<summary><h2>✨ Features</h2></summary>

### Core Functionality
- ✅ **User Authentication** - JWT-based secure login/signup with password hashing
- 📝 **Task Management** - Create, update, delete, and organize tasks with priorities
- 👥 **Team Collaboration** - Multi-user support with role-based permissions
- 📊 **Real-time Dashboard** - Live statistics and task analytics
- 🎯 **Smart Filtering** - Status-based task filtering (Todo, In Progress, Completed)

### Technical Highlights
- 🎨 **Glassmorphism UI** - Modern, clean interface with smooth animations
- 🔒 **Protected Routes** - Client-side authentication guards
- 🚄 **Fast Backend** - Bun runtime for lightning-fast API responses
- 💾 **Type-safe ORM** - Drizzle ORM with full TypeScript support
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile

</details>

---

<details>
<summary><h2>🛠️ Tech Stack</h2></summary>

<table>
<tr>
<td valign="top" width="50%">

### Frontend
- **Framework:** Next.js 15.5.7 (App Router)
- **UI Library:** React 19.2
- **Styling:** Tailwind CSS 4
- **Animations:** GSAP, Lucide Icons
- **Language:** TypeScript
- **Deployment:** Vercel

</td>
<td valign="top" width="50%">

### Backend
- **Runtime:** Bun
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **Authentication:** JWT + bcrypt
- **Validation:** Zod
- **Deployment:** Railway / Render

</td>
</tr>
</table>

</details>

---

<details>
<summary><h2>🚀 Quick Start</h2></summary>

### Prerequisites

- **Bun** (v1.0+) or Node.js (v18+)
- **PostgreSQL** (v14+)
- **Git**

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/TechTitan360/Horizon-Outpace.git
cd Horizon-Outpace
```

**2. Setup Backend**
```bash
cd backend
bun install
```

Create `.env` file:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/outpace
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d
PORT=8000
NODE_ENV=development
```

Run migrations:
```bash
bun run db:migrate
```

Start backend:
```bash
bun dev
```

**3. Setup Frontend**
```bash
cd ../frontend
bun install
```

Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Start frontend:
```bash
bun dev
```

**4. Open the app**
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:8000](http://localhost:8000)

</details>

---

<details>
<summary><h2>📁 Project Structure</h2></summary>

```
Horizon-Outpace/
├── backend/
│   ├── src/
│   │   ├── modules/           # Feature modules
│   │   │   ├── auth/          # Authentication logic
│   │   │   └── tasks/         # Task CRUD operations
│   │   ├── middlewares/       # Auth middleware
│   │   ├── db/                # Database schema & config
│   │   ├── config/            # App configuration
│   │   ├── utils/             # Utilities & logger
│   │   ├── app.ts             # Route handler
│   │   └── server.ts          # Bun server
│   ├── drizzle/               # Migration files
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── app/
│   │   ├── auth/              # Login/Signup page
│   │   ├── dashboard/         # Protected dashboard
│   │   │   ├── tasks/         # Tasks management
│   │   │   ├── teams/         # Team collaboration
│   │   │   └── layout.tsx     # Dashboard layout
│   │   ├── components/        # Shared components
│   │   └── globals.css        # Global styles
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

</details>

---

<details>
<summary><h2>🔐 Environment Variables</h2></summary>

### Backend (`backend/.env`)
```env
# Database
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# JWT
JWT_SECRET=your-256-bit-secret-key
JWT_EXPIRES_IN=7d

# Server
PORT=8000
NODE_ENV=development
```

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

> **Note:** For production, update `NEXT_PUBLIC_API_URL` to your deployed backend URL

</details>

---

<details>
<summary><h2>🌐 Deployment</h2></summary>

### Deploy Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Set **Root Directory:** `frontend`
4. Add environment variable: `NEXT_PUBLIC_API_URL=https://your-backend-url`
5. Deploy!

### Deploy Backend (Railway)

1. Create new project on [Railway.app](https://railway.app)
2. Add PostgreSQL database
3. Deploy from GitHub repo
4. Set **Root Directory:** `backend`
5. Configure environment variables
6. Set build command: `bun install && bun run db:migrate`
7. Set start command: `bun run start`

</details>

---

<details>
<summary><h2>📡 API Documentation</h2></summary>

### Authentication

**Register User**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123"
}
```

**Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepass123"
}
```

### Tasks (Protected Routes)

**Get All Tasks**
```http
GET /api/tasks
Authorization: Bearer <token>
```

**Create Task**
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the dashboard",
  "status": 0,
  "priority": 2,
  "dueDate": "2025-12-31"
}
```

**Update Task**
```http
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": 2,
  "priority": 1
}
```

**Delete Task**
```http
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

</details>

---

<details>
<summary><h2>🆘 Troubleshooting</h2></summary>

<details>
<summary><strong>Error: "Cannot find module './components/TaskCard'"</strong></summary>

**The Fix:**
```bash
# Restart your TypeScript server
# VS Code: Ctrl+Shift+P → "TypeScript: Restart TS Server"

# Or just restart your dev server
cd frontend
bun dev
```

**The Reality:**  
TypeScript be like: "I don't see it" 👨‍🦯  
*File exists right there in the folder*  
TypeScript: "Nope, doesn't exist" 🤷‍♂️

Welcome to the club of "Works on Everyone's Machine Except Yours"™️

</details>

<details>
<summary><strong>Error: "hydration failed" in ProtectedRoute</strong></summary>

**The Fix:**
This happens when server and client render differently. Make sure your `ProtectedRoute` component uses `useState` and only checks `localStorage` in `useEffect`:

```tsx
const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

useEffect(() => {
  const token = localStorage.getItem('token');
  setIsAuthenticated(!!token);
}, []);
```

**The Reality:**  
React: "Server said A, but client said B" 😤  
You: "But they're the same thing!"  
React: "HYDRATION FAILED" 💥  

*Narrator: They were, in fact, not the same thing.*

</details>

<details>
<summary><strong>Error: "bun install" not working</strong></summary>

**The Fix:**
```bash
# Install Bun first
curl -fsSL https://bun.sh/install | bash

# Or on Windows
powershell -c "irm bun.sh/install.ps1|iex"
```

**The Reality:**  
You: "Let me just install..."  
Computer: "What's a Bun?" 🤔  
You: *realizes you forgot the prerequisite*  
Computer: "Amateur." 😏

</details>

</details>

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

<details>
<summary>🎨 Fun Fact - Click to reveal</summary>

```
  _    _            _                   ____        _                      
 | |  | |          (_)                 / __ \      | |                     
 | |__| | ___  _ __ _ _______  _ __   | |  | |_   _| |_ _ __   __ _  ___ ___ 
 |  __  |/ _ \| '__| |_  / _ \| '_ \  | |  | | | | | __| '_ \ / _` |/ __/ _ \
 | |  | | (_) | |  | |/ / (_) | | | | | |__| | |_| | |_| |_) | (_| | (_|  __/
 |_|  |_|\___/|_|  |_/___\___/|_| |_|  \____/ \__,_|\__| .__/ \__,_|\___\___|
                                                        | |                   
                                                        |_|                   
```

**You discovered the hidden ASCII art!** 🎉

</details>

---

## 📄 License

This project is private and proprietary.

---

## 👤 Author

**TechTitan360**
- GitHub: [@TechTitan360](https://github.com/TechTitan360)

---

<div align="center">

**Built with ❤️ using Next.js, Bun, and PostgreSQL**

⭐ Star this repo if you find it unique !!!

</div>
