"use client";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Brain, BookOpen } from "lucide-react";


import { verify } from "@/actions/verify";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const otpSlotClassName =
  "h-14 w-12 rounded-lg border-2 border-neutral-200 bg-white text-lg font-semibold text-neutral-800 shadow-sm first:rounded-lg last:rounded-lg data-[active=true]:border-amber-400 data-[active=true]:ring-2 data-[active=true]:ring-amber-400/40 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100";

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-amber-50 via-orange-50/40 to-white px-4 py-12 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900">
      <div className="w-full max-w-md">
        {/* Brand mark — same lockup as Signup page */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex items-center">
            <Brain
              className="h-9 w-9 text-amber-500"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <BookOpen
              className="-ml-2 h-9 w-9 text-neutral-700 dark:text-neutral-300"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
            Code<span className="text-amber-500">Vault</span>
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Where code meets memory
          </p>
        </div>

        <Card className="border-amber-100/80 bg-white/90 shadow-lg shadow-amber-100/40 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/90 dark:shadow-none">
          <CardHeader className="space-y-1.5 pb-4">
            <CardTitle className="text-xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-100">
              Verify your email
            </CardTitle>
            <CardDescription className="text-sm text-neutral-500 dark:text-neutral-400">
              We&apos;ve sent a 6-digit verification code to{" "}
              {email ? (
                <span className="font-medium text-neutral-700 dark:text-neutral-300">
                  {email}
                </span>
              ) : (
                "your email address"
              )}
              .
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-center">
                <InputOTP maxLength={6}   
                        value={verifyCode}
                        onChange={(value) => setVerifyCode(value)}>
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
              {/* TODO: wire up OTP submit handler */}
              <Button 
              onClick={handleVerify}
              className="h-10 w-full bg-amber-500 text-sm font-medium text-white shadow-sm shadow-amber-200 transition-colors hover:bg-amber-600 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 dark:shadow-none">
                Verify
              </Button>
            </div>
          </CardContent>

          <CardFooter>
            <p className="w-full text-center text-sm text-neutral-500 dark:text-neutral-400">
              Didn&apos;t receive the code?{" "}
              {/* TODO: wire up resend handler */}
              <button
                type="button"
                
                className="font-medium text-amber-600 underline-offset-4 hover:underline dark:text-amber-400"
              >
                Resend Code
              </button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}