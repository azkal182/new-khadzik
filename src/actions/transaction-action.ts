"use server";

import { Transaction } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface Rincian {
  name: string;
  type?: string;
  price: number;
  quantity: number;
  total: number;
  packing?: boolean;
}
interface Data {
  userId: string;
  memberId: string;
  subTotal: number;
  data: Rincian[];
}
export const createTransaction = async (data: Data) => {
  console.log(data);

  const member = await prisma.member.findUnique({
    where: { id: data.memberId },
  });
  const lastSaldo = member?.saldo;
  const newSaldo = lastSaldo!.toNumber() + data.subTotal;

  try {
    // Membuat transaksi Prisma
    const result = await prisma.$transaction(async (prisma) => {
      // Update saldo member
      await prisma.member.update({
        where: { id: data.memberId },
        data: {
          saldo: newSaldo,
        },
      });

      // Create transaction now
      const transaction = await prisma.transaction.create({
        data: {
          memberId: data.memberId,
          subTotal: data.subTotal,
          userId: data.userId,
        },
      });

      let finalData = [];
      // Create Debts transaction
      for (const txn of data.data) {
        finalData.push({
          userId: data.userId,
          memberId: data.memberId,
          name: txn.name,
          qty: txn.quantity,
          price: txn.price,
          debit: txn.total,
          credit: 0,
          remainingDebt: 0,
          ...(txn.type && { type: txn.type }),
        });
      }

      // Create many debts
      await prisma.debt.createMany({ data: finalData });

      // Return the result
      return { transaction, debts: finalData };
    });

    console.log("Transaction successful:", result);
  } catch (error) {
    console.error("Transaction failed:", error);
    // Handle the error appropriately
  } finally {
    await prisma.$disconnect();
    revalidatePath(`/member`);
  }
};
