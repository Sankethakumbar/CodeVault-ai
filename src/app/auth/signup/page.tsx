"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signupSchema } from "@/schemas/signupSchema";
import type { SignupSchema } from "@/schemas/signupSchema";

import { signup } from "@/actions/auth/signup";

import Image from "next/image";
import { User, Mail, Lock, Check } from "lucide-react";
import Link from "next/link";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const highlights = [
  "Capture any topic — code or otherwise",
  "AI turns raw notes into structured knowledge",
  "Auto-generated summaries, tags & interview questions",
];

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: SignupSchema) => {
    const response = await signup(data);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    toast.success(response.message);
    setTimeout(() => {
      router.push(`/verify?email=${data.email}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-[#FDFCF9] lg:grid lg:grid-cols-2">
      {/* Brand panel — hidden below lg, form takes the full screen on mobile */}
      <div className="relative hidden overflow-hidden bg-[#0B1220] lg:flex lg:flex-col lg:justify-between lg:p-14">
        {/* Signature texture: a faint knowledge graph — dots as notes, lines as recall */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="knowledge-graph"
              x="0"
              y="0"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="1.5" fill="#E8A33D" />
              <circle cx="70" cy="35" r="1.5" fill="#E8A33D" />
              <circle cx="40" cy="80" r="1.5" fill="#E8A33D" />
              <circle cx="100" cy="95" r="1.5" fill="#E8A33D" />
              <line x1="10" y1="10" x2="70" y2="35" stroke="#E8A33D" strokeWidth="0.5" />
              <line x1="70" y1="35" x2="40" y2="80" stroke="#E8A33D" strokeWidth="0.5" />
              <line x1="40" y1="80" x2="100" y2="95" stroke="#E8A33D" strokeWidth="0.5" />
              <line x1="10" y1="10" x2="40" y2="80" stroke="#E8A33D" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#knowledge-graph)" />
        </svg>

        {/* Top: brand mark */}
        <div className="relative z-10 flex items-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/95 p-2">
            <Image
              src="/codevault-logo.svg"
              alt="CodeVault"
              width={144}
              height={100}
              className="h-full w-auto"
              priority
            />
          </span>
          <span className="ml-3 font-serif text-2xl font-semibold tracking-tight text-white">
            Code<span className="text-amber-400">Vault</span>
          </span>
        </div>

        {/* Middle: the one bold statement + feature highlights */}
        <div className="relative z-10 max-w-md">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-amber-400/80">
            vault.create()
          </p>
          <h2 className="font-serif text-4xl font-medium leading-[1.15] text-white">
            Turn what you learn into knowledge you can search.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-400">
            Write a title and the content — AI organizes it, summarizes it,
            and builds recall questions so it&apos;s never buried again.
          </p>

          <ul className="mt-8 space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400/10">
                  <Check className="h-3 w-3 text-amber-400" strokeWidth={2.5} />
                </span>
                <span className="text-sm text-neutral-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom: quiet footer */}
        <p className="relative z-10 font-mono text-xs text-neutral-600">
          © {new Date().getFullYear()} CodeVault
        </p>
      </div>

      {/* Form panel */}
      <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-sm">
          {/* Compact brand row — mobile only */}
          <div className="mb-10 flex items-center justify-center lg:hidden">
            <Image
              src="/codevault-logo.svg"
              alt="CodeVault"
              width={144}
              height={100}
              className="h-9 w-auto"
              priority
            />
            <span className="ml-2.5 font-serif text-xl font-semibold tracking-tight text-neutral-900">
              Code<span className="text-amber-500">Vault</span>
            </span>
          </div>

          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-amber-600">
            Create account
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
            Start your vault
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            A private space to capture, connect, and recall what you learn.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-4">
            {/* Username */}
            <div className="space-y-1.5">
              <Label
                htmlFor="username"
                className="text-sm font-medium text-neutral-700"
              >
                Username
              </Label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  aria-invalid={!!errors.username}
                  {...register("username")}
                  className="h-11 border-neutral-200 bg-white pl-9 text-sm placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
                />
              </div>
              <div className="min-h-[16px]">
                {errors.username && (
                  <p className="text-xs font-medium text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-neutral-700"
              >
                Email
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                  className="h-11 border-neutral-200 bg-white pl-9 text-sm placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
                />
              </div>
              <div className="min-h-[16px]">
                {errors.email ? (
                  <p className="text-xs font-medium text-red-500">
                    {errors.email.message}
                  </p>
                ) : (
                  <p className="text-[11px] text-neutral-400">
                    We&apos;ll send a verification code to confirm this address.
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-neutral-700"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  aria-invalid={!!errors.password}
                  {...register("password")}
                  className="h-11 border-neutral-200 bg-white pl-9 text-sm placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
                />
              </div>
              <div className="min-h-[16px]">
                {errors.password && (
                  <p className="text-xs font-medium text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full bg-[#0B1220] text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#161F32] hover:shadow-md focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-neutral-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-amber-600 underline-offset-4 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}