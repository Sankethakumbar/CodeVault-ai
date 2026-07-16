"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Image from "next/image";
import { Mail } from "lucide-react";

import { verify } from "@/actions/auth/verify";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const otpSlotClassName =
  "h-14 w-12 rounded-lg border-2 border-neutral-200 bg-white text-lg font-semibold text-neutral-800 shadow-sm data-[active=true]:border-amber-400 data-[active=true]:ring-2 data-[active=true]:ring-amber-400/40";

export default function VerifyPage() {
  const [verifyCode, setVerifyCode] = useState("");

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

  const handleVerify = async () => {
    if (!email) {
      toast.error("Email not found.");
      return;
    }

    if (verifyCode.length !== 6) {
      toast.error("Please enter the complete verification code.");
      return;
    }

    const response = await verify(email, verifyCode);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    toast.success(response.message);

    if (response.redirectTo) {
      setTimeout(() => {
        router.push(response.redirectTo!);
      }, 1000);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FDFCF9] px-4 py-12">
      {/* Echo of the brand's signature texture */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.09]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="knowledge-graph-light"
            x="0"
            y="0"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="10" cy="10" r="1.5" fill="#0B1220" />
            <circle cx="70" cy="35" r="1.5" fill="#0B1220" />
            <circle cx="40" cy="80" r="1.5" fill="#0B1220" />
            <circle cx="100" cy="95" r="1.5" fill="#0B1220" />
            <line x1="10" y1="10" x2="70" y2="35" stroke="#0B1220" strokeWidth="0.5" />
            <line x1="70" y1="35" x2="40" y2="80" stroke="#0B1220" strokeWidth="0.5" />
            <line x1="40" y1="80" x2="100" y2="95" stroke="#0B1220" strokeWidth="0.5" />
            <line x1="10" y1="10" x2="40" y2="80" stroke="#0B1220" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#knowledge-graph-light)" />
      </svg>

      <div className="relative z-10 w-full max-w-md">
        {/* Brand row */}
        <div className="mb-8 flex items-center justify-center">
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

        <div className="rounded-2xl border border-neutral-200 bg-white p-10 shadow-sm">
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50">
              <Mail className="h-5 w-5 text-amber-500" strokeWidth={1.75} />
            </div>
          </div>

          <p className="mb-2 mt-5 text-center font-mono text-xs uppercase tracking-[0.2em] text-amber-600">
            verify.email()
          </p>
          <h1 className="text-center text-2xl font-semibold tracking-tight text-neutral-900">
            Verify your email
          </h1>
          <p className="mt-2 text-center text-sm leading-relaxed text-neutral-500">
            We&apos;ve sent a 6-digit code to{" "}
            {email ? (
              <span className="font-medium text-neutral-700">{email}</span>
            ) : (
              "your email address"
            )}
            .
          </p>

          <div className="mt-8 flex justify-center">
            <InputOTP
              maxLength={6}
              value={verifyCode}
              onChange={(value) => setVerifyCode(value)}
            >
              <InputOTPGroup className="gap-2">
                <InputOTPSlot index={0} className={otpSlotClassName} />
                <InputOTPSlot index={1} className={otpSlotClassName} />
                <InputOTPSlot index={2} className={otpSlotClassName} />
                <InputOTPSlot index={3} className={otpSlotClassName} />
                <InputOTPSlot index={4} className={otpSlotClassName} />
                <InputOTPSlot index={5} className={otpSlotClassName} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            onClick={handleVerify}
            className="mt-8 h-11 w-full bg-[#0B1220] text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#161F32] hover:shadow-md focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
          >
            Verify
          </Button>

          <p className="mt-6 text-center text-sm text-neutral-500">
            Didn&apos;t receive the code?{" "}
            {/* TODO: wire up resend handler */}
            <Link
              type="button"
              href="/coming-soon?feature=Resend-verification-code"
              className="font-medium text-amber-600 underline-offset-4 hover:underline"
            >
              Resend Code
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-neutral-400">
          The code expires in 10 minutes. Check your spam folder if it
          doesn&apos;t arrive shortly.
        </p>
      </div>
    </div>
  );
}