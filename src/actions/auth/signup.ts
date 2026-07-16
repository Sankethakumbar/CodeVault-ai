"use server";

import { sendVerificationEmail } from "@/lib/sendVerificationEmail";
import { hashPassword } from "@/lib/bcrypt";
import { generateOTP } from "@/lib/otp";
import prisma from "@/lib/prisma";
import type { SignupSchema } from "@/schemas/signupSchema";
import type { ApiResponse } from "@/types/api-response";

export async function signup(
  data: SignupSchema
): Promise<ApiResponse> {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    // ============================
    // User already exists
    // ============================
    if (existingUser) {
      if (existingUser.isVerified) {
        return {
          success: false,
          status: 409,
          message: "An account with this email already exists.",
        };
      }

      // ------------------------------------------------------------------
      // DEMO MODE
      // ------------------------------------------------------------------
      // Resend's development mode only delivers emails to verified
      // recipients. Since recruiters need to use the application,
      // we bypass the email verification flow in this demo build.
      //
      // Production Flow:
      // - Generate OTP
      // - Send verification email
      // - Redirect user to /auth/verify
      //
      // Demo Flow:
      // - Mark user as verified
      // - Redirect directly to login
      // ------------------------------------------------------------------

      await prisma.user.update({
        where: {
          id: existingUser.id,
        },
        data: {
          isVerified: true,
          verifyCode: null,
          verifyCodeExpiry: null,
        },
      });

      return {
        success: true,
        status: 200,
        message: "Account activated successfully.",
        redirectTo: "/auth/login",
      };
    }

    // ============================
    // New User
    // ============================

    const hashedPassword = await hashPassword(data.password);

    // These are kept for production.
    // They are unused in demo mode.

    const verifyCode = generateOTP();
    const verifyCodeExpiry = new Date(
      Date.now() + 10 * 60 * 1000
    );

    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,

        // DEMO MODE
        // Users are created as verified so recruiters
        // can access the application without waiting for
        // an email OTP.

        isVerified: true,

        verifyCode,
        verifyCodeExpiry,
      },
    });

    // ------------------------------------------------------------------
    // PRODUCTION ONLY
    //
    // Uncomment this block after configuring a verified
    // Resend domain.
    // ------------------------------------------------------------------

    /*
    const emailResponse = await sendVerificationEmail({
      email: user.email,
      username: user.username,
      verifyCode,
    });

    if (!emailResponse.success) {
      return {
        success: false,
        status: 500,
        message: emailResponse.message,
      };
    }

    return {
      success: true,
      status: 201,
      message: "Account created successfully.",
      redirectTo: `/auth/verify?email=${user.email}`,
    };
    */

    return {
      success: true,
      status: 201,
      message: "Account created successfully.",
      redirectTo: "/auth/login",
    };
  } catch (error) {
    console.error("Signup Error:", error);

    return {
      success: false,
      status: 500,
      message: "Something went wrong. Please try again.",
    };
  }
}