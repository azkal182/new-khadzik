"use server";
import { prisma } from "@/lib/prisma";
import * as z from "zod";
import { CreateMemberSchema } from "@/schemas/member-schema";
import { revalidatePath } from "next/cache";

export const searchMember = async (query: string) => {
  const members = await prisma.member.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  return members.map((member) => ({
    ...member,
    saldo: member.saldo.toNumber(),
  }));
};

export const getMembers = async () => {
  const members = await prisma.member.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return members.map((member) => ({
    ...member,
    saldo: member.saldo.toNumber(),
  }));
};

export const createMember = async (
  data: z.infer<typeof CreateMemberSchema>,
) => {
  const validatedFields = CreateMemberSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "invalid fields" };
  }

  try {
    const { address, phone, name } = validatedFields.data;
    const member = await prisma.member.create({
      data: {
        name: name,
        address: address,
        phone: phone,
      },
    });
    revalidatePath("/member");
    return { success: true, ...member };
  } catch (e) {
    return { error: "failed create member" };
  }
};

export const updateMember = async (
  data: z.infer<typeof CreateMemberSchema>,
) => {
  const validatedFields = CreateMemberSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "invalid fields" };
  }
  if (!validatedFields.data.id) {
    return { error: "id must be defined" };
  }

  try {
    const { id, address, phone, name } = validatedFields.data;
    const member = await prisma.member.update({
      where: {
        id,
      },
      data: {
        name: name,
        address: address,
        phone: phone,
      },
    });
    revalidatePath("/member");
    return { success: true, ...member };
  } catch (e) {
    return { error: "failed update member" };
  }
};

export const getMemberDetailById = async (id: string) => {
  const member = await prisma.member.findUnique({
    where: { id },
    include: {
      debts: true,
    },
  });
  revalidatePath(`/member/${id}`);
  return member;
};
