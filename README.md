w# 🚀 CodeVault

**CodeVault** is an AI-powered note-taking platform that helps developers organize technical knowledge, generate AI insights, and prepare for interviews—all in one place.

Built with Next.js, Prisma, PostgreSQL, and AI integration, CodeVault enables users to create, manage, and enrich their notes with intelligent features like summaries, flashcards, interview questions, and knowledge trees.

---

## ✨ Features

### 🔐 Authentication
- Secure user signup and login
- JWT-based authentication
- Protected routes
- Demo mode email verification

### 📝 Note Management
- Create notes
- Edit notes
- Delete notes
- View note details
- Responsive dashboard

### 🤖 AI Features
- AI Summary Generation
- Knowledge Tree
- Smart Tags
- Interview Questions
- Flashcards

### 🔍 Search
- Search notes by title, content, summary, and tags

### 🎨 Modern UI
- Clean minimal design
- Responsive layout
- Dashboard with empty states
- Beautiful typography
- Smooth user experience

---

# 🛠 Tech Stack

## Frontend
- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide Icons

## Backend
- Next.js Server Actions
- Prisma ORM
- PostgreSQL

## Authentication
- JWT
- HTTP-only Cookies
- bcrypt

## AI
- OpenAI API

## Email
- Resend

---

# 📁 Project Structure

```
src/
│
├── app/
│   ├── auth/
│   ├── dashboard/
│   ├── notes/
│   └── coming-soon/
│
├── actions/
├── components/
├── lib/
├── services/
├── schemas/
└── generated/
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/Sankethakumbar/CodeVault-ai
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
DATABASE_URL=
JWT_SECRET=
OPENAI_API_KEY=
RESEND_API_KEY=
```

Run Prisma

```bash
npx prisma generate
npx prisma db push
```

Start development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# 🚀 Production

Build

```bash
npm run build
```

Start

```bash
npm start
```

---

# 📸 Screenshots

### Dashboard

_Add dashboard screenshot here_

### Note Editor

_Add editor screenshot here_

### AI Features

_Add AI insights screenshot here_

---

# 🔮 Future Enhancements

- AI Quiz Mode
- PDF Export
- Forgot Password
- Resend Verification
- Advanced Search
- User Profile
- Settings

---

# 📄 License

This project is built for learning and portfolio purposes.

---

# 👨‍💻 Author

**Sanketha Kumbar**

GitHub: https://github.com/Sankethakumbar

LinkedIn: https://www.linkedin.com/in/sanketha-kumbar/
---

⭐ If you like this project, consider giving it a star!