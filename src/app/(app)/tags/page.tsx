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
import React, { useMemo, useState } from "react";
import { useCurrentSession } from "@/hooks/use-current-session";
import { formatRibuan } from "@/utils";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ContentWrapper from "@/components/admin-panel/content-wrapper";
import { AutoComplete } from "@/components/autocomplete";
import { useQuery } from "@tanstack/react-query";
import { searchMember } from "@/actions/member-action";
import { createPayment } from "@/actions/payment-action";

export default function TagsPage() {
  const [member, setMember] = useState("");
  const [memberId, setMemberId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [sisaHutang, setSisaHutang] = useState("");
  const [memberName, setMemberName] = useState("");
  const [paymentValue, setPaymentValue] = useState("");
  const { session } = useCurrentSession();
  const [value, setValue] = useState("");
  const [valueMamber, setValueMamber] = useState("");
  const [selectedMemberValue, setSelectedMemberValue] = useState<any>("");

  const closeModal = () => {
    setMember("");
    setMemberId(null);
    setSisaHutang("");
    setMemberName("");
    setPaymentValue("");
    setIsOpen(false);
  };
  const handleChange = (e: any) => {
    const rawValue = e.target.value;
    const filteredValue = rawValue.replace(/[^0-9]/g, "");
    setPaymentValue(formatRibuan(filteredValue));
  };

  const handleSelect = (value: any) => {
    const filteredValue = value.saldo.replace(/[^0-9]/g, "");
    setSisaHutang(filteredValue);
    setMemberName(value.name);
    setMemberId(value.id);
    setIsOpen(true);
  };

  const handlePayment = async () => {
    if (memberId && paymentValue && session?.user?.id) {
      try {
        await createPayment({
          id: memberId,
          amount: parseFloat(paymentValue.replace(/[^0-9]/g, "")),
          userId: session?.user?.id,
        });
        closeModal();
        toast.success("Payment update successfully!");
      } catch (error) {
        console.log(error);
        toast.error("error payment create!");
        throw new Error("error payment create!");
      }
    } else {
      toast.error("error payment create!");
      throw new Error("error payment create");
    }
  };

  const { data: members, isLoading: membersIsLoading } = useQuery({
    queryKey: ["member", value],
    queryFn: () => searchMember(value),
  });

  const transformedDataMember = useMemo(() => {
    return members?.map((item) => ({
      ...item,
      label: item.name, // Tambahkan label dengan nilai dari name
      value: item.id, // Tambahkan value dengan nilai dari id
    }));
  }, [members]);

  return (
    <ContentLayout title='Tags'>
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
            <BreadcrumbPage>Tags</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ContentWrapper>
        <div>
          {/*<AutoCompleteMember*/}
          {/*  searchInput={member}*/}
          {/*  setSearchInput={setMember}*/}
          {/*  onSelected={handleSelect}*/}
          {/*/>*/}

          <AutoComplete
            selectedValue={selectedMemberValue}
            onSelectedValueChange={(value) => {
              setSelectedMemberValue(value);
              setMemberId(value);
            }}
            onSelectedObjectChange={(data) => {
              if (data) {
                setMemberName(data?.name);
                setMemberId(data?.id as any);
                setSisaHutang(data?.saldo as any);
              }
            }}
            searchValue={valueMamber}
            onSearchValueChange={setValueMamber}
            // @ts-ignore
            items={transformedDataMember ?? []}
            isLoading={membersIsLoading}
          />
        </div>
        <Button onClick={() => setIsOpen(true)}>Payment</Button>

        {/* modal */}
        <Dialog open={isOpen} onOpenChange={() => closeModal()}>
          <DialogContent className='sm:max-w-[425px]'>
            <div>
              <Label htmlFor='memberName'>Name</Label>
              <Input
                className='text-right'
                disabled
                readOnly
                type='text'
                id='memberName'
                value={memberName}
              />
            </div>
            <div>
              <Label htmlFor='sisaHutang'>Sisa Hutang</Label>
              <Input
                className='text-right'
                disabled
                readOnly
                type='number'
                id='sisaHutang'
                value={sisaHutang}
              />
            </div>
            <div>
              <Label htmlFor='payment'>Bayar Senilai</Label>
              <Input
                className='text-right'
                id='payment'
                value={paymentValue}
                onChange={handleChange}
              />
            </div>
            <div className='flex'>
              <Button onClick={handlePayment} className='ml-auto'>
                Payment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </ContentWrapper>
    </ContentLayout>
  );
}
