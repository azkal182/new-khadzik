import React from "react";
import { getMemberDetailById } from "@/actions/member-action";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import ContentWrapper from "@/components/admin-panel/content-wrapper";
import { formatCurrency } from "@/utils";
import { DebtMemberTable } from "@/app/(app)/member/[id]/table";

const MemberDetailPage = async ({ params }: { params: { id: string } }) => {
  const member = await getMemberDetailById(params.id);
  // console.log("member");
  return (
    <ContentLayout title='Member'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/'>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/dashboard'>Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/member'>Member</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detail</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ContentWrapper>
        <div className='flex'>
          <div className='w-20'>Name</div>
          <div>: {member?.name}</div>
        </div>
        <div className='flex'>
          <div className='w-20'>Address</div>
          <div>: {member?.address}</div>
        </div>
        <div className='flex'>
          <div className='w-20'>Sisa</div>
          <div>
            : {member?.saldo ? formatCurrency(member?.saldo.toNumber()) : ""}
          </div>
        </div>
        <div>
          <DebtMemberTable member={member} debtsData={member?.debts as any} />
        </div>
      </ContentWrapper>
    </ContentLayout>
  );
};

export default MemberDetailPage;
