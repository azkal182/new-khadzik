"use client";
import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ContentWrapper from "@/components/admin-panel/content-wrapper";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import { getDetail, getList } from "@/lib/api";
import { AutoComplete } from "@/components/autocomplete";
import { searchProducts } from "@/actions/product-action";

export default function CategoriesPage() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryKey: ["data", searchValue],
    queryFn: () => searchProducts(searchValue),
  });

  // Manipulasi data untuk menambahkan properti `label` dan `value`
  const transformedData = useMemo(() => {
    return data?.map((item) => ({
      ...item,
      label: item.name, // Tambahkan label dengan nilai dari name
      value: item.id, // Tambahkan value dengan nilai dari id
    }));
  }, [data]);

  // @ts-ignore
  return (
    <ContentLayout title='Categories'>
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
            <BreadcrumbPage>Categories</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ContentWrapper>
        <div>test</div>
        <div className='grid grid-cols-2'>
          <div>Selected value:</div>
          <div className='text-center'>{selectedValue}</div>
          <div>Search value:</div>
          <div className='text-center'>{searchValue}</div>
          <div>Loading state:</div>
          <div className='text-center'>{isLoading ? "true" : "false"}</div>
        </div>
        <div className={"w-52"}>
          <AutoComplete
            selectedValue={selectedValue}
            onSelectedValueChange={setSelectedValue}
            searchValue={searchValue}
            onSearchValueChange={setSearchValue}
            onSelectedObjectChange={(data) => console.log(data)}
            // @ts-ignore
            items={transformedData ?? []}
            isLoading={isLoading}
          />
        </div>
      </ContentWrapper>
    </ContentLayout>
  );
}
