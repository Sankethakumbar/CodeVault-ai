// src/app/coming-soon/page.tsx
import Link from "next/link";
import {
  KeyRound,
  MailCheck,
  Sparkles,
  Search,
  FileDown,
  ArrowLeft,
} from "lucide-react";
import { FeatureCard } from "@/components/coming-soon/FeatureCard";

const FEATURES = {
  "forgot-password": {
    title: "Forgot Password",
    description: "Secure password reset using email OTP.",
    icon: KeyRound,
  },
  "resend-verification": {
    title: "Resend Verification Email",
    description:
      "Receive a new verification email if your previous one expired.",
    icon: MailCheck,
  },
  "ai-quiz": {
    title: "AI Quiz Mode",
    description: "Generate interactive quizzes from your notes.",
    icon: Sparkles,
  },
  "search-notes": {
    title: "Search Notes",
    description:
      "Quickly search notes by title, content, or AI-generated tags.",
    icon: Search,
  },
  "export-notes": {
    title: "Export Notes",
    description: "Download notes as PDF or Markdown.",
    icon: FileDown,
  },
} as const;

type FeatureKey = keyof typeof FEATURES;

interface ComingSoonPageProps {
  searchParams: Promise<{ feature?: string }>;
}

export default async function ComingSoonPage({
  searchParams,
}: ComingSoonPageProps) {
  const { feature } = await searchParams;
  const activeFeature =
    feature && feature in FEATURES ? (feature as FeatureKey) : null;
  const active = activeFeature ? FEATURES[activeFeature] : null;

  return (
    <div className="min-h-screen bg-[#FAF9F5] px-6 py-16">
      <div className="mx-auto max-w-3xl">
        {/* Context banner — only shown if a specific feature was requested */}
        {active && (
          <div className="mb-8 rounded-2xl border border-[#F59E0B]/30 bg-[#F59E0B]/5 p-6 text-center">
            <p className="font-mono text-xs font-medium tracking-wide text-[#F59E0B]">
              🚧 {active.title.toUpperCase()}
            </p>
            <p className="mt-1 text-sm text-[#0F172A]/70">
              This feature is currently under development.
            </p>
          </div>
        )}

        {/* Header */}
        <div className="rounded-2xl border border-black/5 bg-white p-10 text-center shadow-none sm:p-14">
          <p className="font-mono text-xs font-medium tracking-wide text-[#F59E0B]">
            ROADMAP.COMING_SOON()
          </p>
          <h1 className="mt-3 font-serif text-3xl font-semibold text-[#0F172A] sm:text-4xl">
            🚀 Upcoming Features
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-[#0F172A]/60 sm:text-base">
            We&apos;re actively building new features to make CodeVault AI
            even more powerful. Stay tuned!
          </p>
        </div>

        {/* Feature grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {(Object.keys(FEATURES) as FeatureKey[]).map((key) => (
            <FeatureCard
              key={key}
              icon={FEATURES[key].icon}
              title={FEATURES[key].title}
              description={FEATURES[key].description}
              highlighted={key === activeFeature}
            />
          ))}
        </div>

        {/* Back to login */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/auth/login"
            className="flex items-center gap-2 rounded-xl bg-[#0F172A] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0F172A]/90"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}