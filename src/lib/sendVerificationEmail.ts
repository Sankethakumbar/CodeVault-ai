import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendVerificationEmailProps {
  email: string;
  username: string;
  verifyCode: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
}

export async function sendVerificationEmail({
  email,
  username,
  verifyCode,
}: SendVerificationEmailProps): Promise<EmailResponse> {
  try {
    const { error } = await resend.emails.send({
      from: "CodeVault AI <onboarding@resend.dev>",
      to: email,
      subject: "Verify your CodeVault AI account",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2>Welcome to CodeVault AI 👋</h2>

          <p>Hello <strong>${username}</strong>,</p>

          <p>Thank you for creating your CodeVault AI account.</p>

          <p>Your verification code is:</p>

          <h1 style="letter-spacing:4px;">
            ${verifyCode}
          </h1>

          <p>This code is valid for <strong>10 minutes</strong>.</p>

          <p>If you didn't create this account, you can safely ignore this email.</p>

          <hr />

          <p style="font-size:12px;color:gray;">
            CodeVault AI
          </p>
        </div>
      `,
    });

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Verification email sent successfully.",
    };
  } catch (error) {
    console.error("Resend Error:", error);

    return {
      success: false,
      message: "Failed to send verification email.",
    };
  }
}