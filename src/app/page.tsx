"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-6 h-6 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center space-y-4">
        <h1 className="text-3xl font-bold text-sky-700">Welcome back 👋</h1>
        <p className="text-gray-700">
          You’re logged in and ready to squash some bugs!
        </p>
        <Link
          href="/dashboard"
          className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition-all"
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center space-y-6 px-4">
      <h1 className="text-4xl font-bold text-sky-700">BugTracker</h1>
      <p className="text-gray-700 max-w-xl">
        BugTracker is a modern issue tracking app where you can define bugs,
        assign them to team members, update their status, and monitor progress
        through a powerful dashboard.
      </p>
      <Link
        href="/api/auth/signin"
        className="px-5 py-2 rounded-lg backdrop-blur-md bg-white/30 border border-white/40 shadow-md text-sky-700 hover:text-sky-900 hover:bg-white/50 transition-all font-semibold"
      >
        Log in to get started
      </Link>
    </div>
  );
}
