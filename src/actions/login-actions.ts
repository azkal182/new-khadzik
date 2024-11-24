"use server";

import { LoginSChema } from "@/schemas/login-schema";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const loginActions = async (prevState: unknown, formData: FormData) => {
  const validatedFields = LoginSChema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "invalid credentials" };
        default:
          return { message: "something went wrong" };
      }
    }
    throw error;
  }
};
