"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signupSchema } from "@/schemas/signupSchema";
import type { SignupSchema } from "@/schemas/signupSchema";

import { signup } from "@/actions/signup";

import { Brain, BookOpen } from "lucide-react";
import Link from "next/link";


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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";



export default function SignupPage() {

  const { register, handleSubmit, formState: { errors,isSubmitting } } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const onSubmit = async (data: SignupSchema) => {
    console.log(data);
    const response=await signup(data);

    if(!response.success){
      toast.error(response.message);
      return;
    }
    toast.success(response.message);
    setTimeout(()=>{
      router.push(`/verify?email=${data.email}`)
    },1000)
    
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-amber-50 via-orange-50/40 to-white px-4 py-12 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900">
      <div className="w-full max-w-md">
        {/* Brand mark — brain merging into an open book, à la reference lockup */}
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
              Create your account
            </CardTitle>
            <CardDescription className="text-sm text-neutral-500 dark:text-neutral-400">
              A private space to capture, connect, and recall what you learn.
            </CardDescription>
          </CardHeader>


          <form onSubmit={handleSubmit(onSubmit)}>

            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="username"
                    className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    {...register("username")}

                    className="h-10 border-neutral-200 bg-white text-sm placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 dark:border-neutral-800 dark:bg-neutral-950"
                  />
                  {errors.username && (
                    <p className="text-xs font-medium text-red-500 mt-1">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    className="h-10 border-neutral-200 bg-white text-sm placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 dark:border-neutral-800 dark:bg-neutral-950"
                  />
                  {errors.email && (
                    <p className="text-xs font-medium text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                  <p className="text-xs text-neutral-400 dark:text-neutral-500">
                    We&apos;ll send a verification code to confirm this address.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password")}
                    className="h-10 border-neutral-200 bg-white text-sm placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 dark:border-neutral-800 dark:bg-neutral-950"
                  />
                  {errors.password && (
                    <p className="text-xs font-medium text-red-500 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button type="submit" disabled={isSubmitting}
                  className="h-10 w-full bg-amber-500 text-sm font-medium text-white shadow-sm shadow-amber-200 transition-colors hover:bg-amber-600 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 dark:shadow-none">
                  {isSubmitting?"Creating Account...":"Create Account"}
                </Button>
                
              </div>
            </CardContent>
          </form>


          <CardFooter>
            <p className="w-full text-center text-sm text-neutral-500 dark:text-neutral-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-amber-600 underline-offset-4 hover:underline dark:text-amber-400"
              >
                Login
              </Link>
            </p>
          </CardFooter>


        </Card>
      </div>
    </div>
  );
}