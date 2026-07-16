import { cookies } from "next/headers";

import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  const payload = verifyToken(token);

  if (!payload) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: payload.id,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });

  return user;
}