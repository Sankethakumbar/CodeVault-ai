"use server";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { hashPassword } from "@/lib/bcrypt";
import { generateOTP } from "@/lib/otp";
import prisma from "@/lib/prisma";
import type { SignupSchema } from "@/schemas/signupSchema";
import type { ApiResponse } from "@/types/api-response";

export async function signup(
  data: SignupSchema
): Promise<ApiResponse> {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    // ============================
    // User already exists
    // ============================
    if (existingUser) {
      // Email already verified
      if (existingUser.isVerified) {
        return {
          success: false,
          status: 409,
          message: "An account with this email already exists.",
        };
      }

      // User exists but email is not verified
      const verifyCode = generateOTP();
      const verifyCodeExpiry = new Date(
        Date.now() + 10 * 60 * 1000
      );

      await prisma.user.update({
        where: {
          id: existingUser.id,
        },
        data: {
          verifyCode,
          verifyCodeExpiry,
        },
      });

      const emailResponse = await sendVerificationEmail({
        email: existingUser.email,
        username: existingUser.username,
        verifyCode,
      });
      console.log("Email response",emailResponse);

      if (!emailResponse.success) {
        return {
          success: false,
          status: 500,
          message: emailResponse.message,
        };
      }

      return {
        success: true,
        status: 200,
        message: "Verification code sent successfully.",
        redirectTo: `/verify?email=${existingUser.email}`,
      };
    }

    // ============================
    // New User
    // ============================

    const hashedPassword = await hashPassword(data.password);

    const verifyCode = generateOTP();
    const verifyCodeExpiry = new Date(
      Date.now() + 10 * 60 * 1000
    );

    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        isVerified: false,
        verifyCode,
        verifyCodeExpiry,
      },
    });

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
      redirectTo: `/verify?email=${user.email}`,
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