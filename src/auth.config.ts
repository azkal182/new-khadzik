import Credentials from "next-auth/providers/credentials";
import { LoginSChema } from "@/schemas/login-schema";
import { prisma } from "@/lib/prisma";
import { compareSync } from "bcrypt-ts";
import { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      // @ts-ignore
      authorize: async (credentials) => {
        const validatedFields = LoginSChema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }

        const { username, password } = validatedFields.data;
        const user = await prisma.user.findUnique({ where: { username } });

        if (!user || !user.password) {
          // throw new Error("User does not exist");
          return null;
        }

        const passwordMatch = compareSync(password, user.password);

        if (!passwordMatch) {
          // throw new Error("Passwords do not match");
          return null;
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
