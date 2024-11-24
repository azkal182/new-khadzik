import * as z from "zod";

export const LoginSChema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});
