import * as z from "zod";

export const CreateProductSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  type: z.string().optional(),
  regularPrice: z.number(),
  packingPrice: z.number(),
});
