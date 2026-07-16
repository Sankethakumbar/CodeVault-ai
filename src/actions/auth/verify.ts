"use server";

import prisma from "@/lib/prisma";

import type { ApiResponse } from "@/types/api-response";

export async function verify(
    email: string,
    verifyCode: string,
): Promise<ApiResponse> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        // User does not exist
        if (!user) {
            return {
                success: false,
                status: 404,
                message: "User not found.",
            };
        }

        // User is already verified
        if (user.isVerified) {
            return {
                success: true,
                status: 200,
                message: "Email is already verified.",
                redirectTo: "/auth/login",
            };
        }

        // No active verification code
        if (!user.verifyCode || !user.verifyCodeExpiry) {
            return {
                success: false,
                status: 400,
                message: "Please request a new verification code.",
            };
        }

        // OTP expired
        if (user.verifyCodeExpiry < new Date()) {
            return {
                success: false,
                status: 410,
                message: "Verification code has expired. Please request a new one.",
            };
        }

        // OTP doesn't match
        if (user.verifyCode !== verifyCode) {
            return {
                success: false,
                status: 400,
                message: "Invalid verification code.",
            };
        }

        // Verify the user
        await prisma.user.update({
            where: {
                id: user.id,
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
            message: "Email verified successfully.",
            redirectTo: "/auth/login",
        };
    } catch (error) {
        console.error("Verify Error:", error);

        return {
            success: false,
            status: 500,
            message: "Something went wrong. Please try again.",
        };
    }
}
