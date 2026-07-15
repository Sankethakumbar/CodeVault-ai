// src/app/dashboard/page.tsx

import { logout } from "@/actions/logout";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">
        Welcome to Dashboard 🎉
      </h1>

      <form action={logout}>
        <button
          className="rounded bg-red-500 px-5 py-2 text-white"
        >
          Logout
        </button>
      </form>
    </div>
  );
}