import * as z from "zod";

export const CreateMemberSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  address: z.string().optional(),
  phone: z.string().optional(),
});
