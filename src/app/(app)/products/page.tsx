import React from "react";
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
import { TooltipProvider } from "@/components/ui/tooltip";
import ContentWrapper from "@/components/admin-panel/content-wrapper";
import { ProductDataTable } from "@/app/(app)/products/table";
import { prisma } from "@/lib/prisma";

const ProductsPage = async () => {
  const products = await prisma.product.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <ContentLayout title='Dashboard'>
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
            <BreadcrumbPage>Product</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <TooltipProvider>
        <ContentWrapper>
          <ProductDataTable products={products as any} />
        </ContentWrapper>
      </TooltipProvider>
    </ContentLayout>
  );
};

export default ProductsPage;
