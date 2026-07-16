"use server";

import prisma from "@/lib/prisma";
import { comparePassword } from "@/lib/bcrypt";

import type { LoginSchema } from "@/schemas/loginSchema";
import type { ApiResponse } from "@/types/api-response";

import { generateToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function login(
  data: LoginSchema
): Promise<ApiResponse> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return {
        success: false,
        status: 404,
        message: "Invalid email or password.",
      };
    }

    // DEMO MODE
    // Email verification temporarily disabled for recruiter review.


    // if (!user.isVerified) {
    //   return {
    //     success: false,
    //     status: 403,
    //     message: "Please verify your email before logging in.",
    //     redirectTo: `/verify?email=${user.email}`,
    //   };
    // }

    const isPasswordCorrect = await comparePassword(
      data.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return {
        success: false,
        status: 401,
        message: "Invalid email or password.",
      };
    }
    const token = generateToken({
  id: user.id,
  email: user.email,
});

const cookieStore = await cookies();

cookieStore.set("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
});
    return {
      success: true,
      status: 200,
      message: "Login successful.",
      redirectTo: "/dashboard",
    };
  } catch (error) {
    console.error("Login Error:", error);

    return {
      success: false,
      status: 500,
      message: "Something went wrong. Please try again.",
    };
  }
}