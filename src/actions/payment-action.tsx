"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface IPayment {
  id: string;
  amount: number;
  userId: string;
}

export const createPayment = async (data: IPayment) => {
  const member = await prisma.member.findUnique({ where: { id: data.id } });
  const lastSaldo = member?.saldo;
  const newSaldo = lastSaldo!.toNumber() - data.amount;

  try {
    // Membuat transaksi Prisma
    const result = await prisma.$transaction(async (prisma) => {
      // Update saldo member
      await prisma.member.update({
        where: { id: data.id },
        data: {
          saldo: newSaldo,
        },
      });

      // Create transaction now
      const transaction = await prisma.transaction.create({
        data: {
          memberId: data.id,
          subTotal: data.amount,
          userId: data.userId,
        },
      });

      // Create many debts
      const debt = await prisma.debt.create({
        data: {
          userId: data.userId,
          memberId: data.id,
          name: "Pembayaran",
          credit: data.amount,
          remainingDebt: newSaldo,
        },
      });

      // Return the result
      return { transaction, debt };
    });

    console.log("Transaction successful:", result);
  } catch (error) {
    console.error("Transaction failed:", error);
    return { error: "transaction failed" };
    // Handle the error appropriately
  } finally {
    await prisma.$disconnect();
    revalidatePath(`/member/${data.id}`);
  }
};
