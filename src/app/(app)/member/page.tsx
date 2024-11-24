import React from "react";
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
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { getMembers } from "@/actions/member-action";
import { MemberDataTable } from "@/app/(app)/member/table";

const MemberPage = async () => {
  const members = await getMembers();
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
            <BreadcrumbPage>Member</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ContentWrapper>
        <MemberDataTable members={members as any} />
      </ContentWrapper>
    </ContentLayout>
  );
};

export default MemberPage;
