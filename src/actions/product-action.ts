"use server";
import { prisma } from "@/lib/prisma";
import { CreateProductSchema } from "@/schemas/product-schema";
import * as z from "zod";
import { revalidatePath } from "next/cache";

export const searchProducts = async (query: string) => {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return products.map((product) => ({
    ...product,
    regularPrice: product.regularPrice.toNumber(),
    packingPrice: product.packingPrice.toNumber(),
  }));
};

export const createProduct = async (
  values: z.infer<typeof CreateProductSchema>,
) => {
  const validatedFields = CreateProductSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "invalid fields" };
  }
  const { name, type, regularPrice, packingPrice, description } =
    validatedFields.data;
  try {
    const result = await prisma.product.create({
      data: {
        name,
        regularPrice,
        packingPrice,
        ...(type && { type: type }),
        ...(description && { description }),
      },
    });
    revalidatePath("/products");
    return { message: "success", ...result };
  } catch (error) {
    return { error: "failed create product" };
  }
};

export const updateProduct = async (
  values: z.infer<typeof CreateProductSchema>,
) => {
  const validatedFields = CreateProductSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "invalid fields" };
  }

  if (!validatedFields.data.id) {
    return { error: "field id must be defined" };
  }

  const { id, name, type, regularPrice, packingPrice, description } =
    validatedFields.data;
  try {
    const result = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        regularPrice,
        packingPrice,
        ...(type && { type: type }),
        ...(description && { description }),
      },
    });
    revalidatePath("/products");
    return { message: "success", ...result };
  } catch (error) {
    return { error: "failed update product" };
  }
};
