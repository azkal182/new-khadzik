"use server";
import { prisma } from "@/lib/prisma";
import { TableProductRow } from "@/app/(app)/products/import";

export const importProduct = async (data: TableProductRow[]) => {
  const result = await prisma.product.createMany({
    data: [
      ...data.map((data) => {
        return {
          ...(data.type !== undefined &&
            data.type !== null && { type: String(data.type) }),
          name: data.name,
          regularPrice: data.regularPrice,
          packingPrice: data.packingPrice,
        };
      }),
    ],
  });
  console.log(result);
};
