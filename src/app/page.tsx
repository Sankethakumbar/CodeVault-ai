// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

const CHECKLIST = [
  "Capture any topic — code or otherwise",
  "AI turns raw notes into structured knowledge",
  "Auto-generated summaries, tags & interview questions",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0F172A]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center">
            <span className="flex items-center rounded-lg bg-white px-3 py-1.5 shadow-sm">
              <Image
                src="/codevault-logo.svg"
                alt="CodeVault"
                width={677}
                height={369}
                className="h-7 w-auto"
                priority
              />
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="hidden text-sm font-medium text-white/60 transition hover:text-white sm:block">
              Login
            </Link>
            <Link href="/auth/signup" className="rounded-xl bg-[#F59E0B] px-4 py-2 text-sm font-medium text-[#0F172A] transition hover:bg-[#F59E0B]/90">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Full-width navy hero */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(135deg,transparent_48%,rgba(255,255,255,0.6)_49%,transparent_51%)] [background-size:36px_36px]"
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs font-medium tracking-wide text-[#F59E0B]">
            VAULT.INIT() — YOUR SECOND BRAIN
          </p>

          <h1 className="mt-5 font-serif text-3xl font-semibold leading-tight text-white sm:text-5xl">
            Turn what you learn into knowledge you can search.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base text-white/60 sm:text-lg">
            CodeVault is an AI-powered second brain for developers — capture notes, code snippets, and concepts, and let AI organize, summarize, and recall them for you.
          </p>

          <ul className="mx-auto mt-8 flex max-w-md flex-col items-start gap-3 sm:mx-auto">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-white/80">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F59E0B]/20">
                  <Check className="h-3 w-3 text-[#F59E0B]" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex justify-center">
            <Link
              href="/auth/signup"
              className="flex w-full max-w-[300px] items-center justify-center gap-2 rounded-xl bg-[#F59E0B] px-6 py-3 text-sm font-medium text-[#0F172A] transition hover:bg-[#F59E0B]/90"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <p className="relative mt-16 text-center text-xs text-white/30">
          © {new Date().getFullYear()} CodeVault
        </p>
      </section>
    </div>
  );
}