"use client";
import React, { ChangeEvent, useMemo, useRef, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Trash2, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "@/actions/product-action";
import { AutoComplete } from "@/components/autocomplete";
import { formatCurrency, formatRibuan } from "@/utils";
import { toast } from "sonner";
import { searchMember } from "@/actions/member-action";
import { useCurrentSession } from "@/hooks/use-current-session";
import { createTransaction } from "@/actions/transaction-action";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Tipe data untuk item
interface Item {
  label: string;
  value: string;
  id: string;
  name: string;
  type: string;
  price: number;
  regularPrice: number;
  packingPrice: number;
}

// Tipe data untuk rincian
export interface Rincian {
  id: string;
  name: string;
  type?: string;
  price: number;
  quantity: number;
  total: number;
  packing?: boolean;
}

const TransactiosnPage = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [variant, setVariant] = useState<any>(undefined);
  const [total, setTotal] = useState<number>(0);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [rincian, setRincian] = useState<Rincian[]>([]);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const qtyRef = useRef<HTMLInputElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const variantRef = useRef<HTMLButtonElement | null>(null);
  const [value, setValue] = useState("");
  const [selectedMemberValue, setSelectedMemberValue] = useState<any>("");
  const [memberValue, setMemberValue] = useState("");
  const [memberId, setMemberId] = useState<string | undefined>();
  const [searchProductValue, setSearchProductValue] = useState<string>("");
  const [selectedProductValue, setSelectedProductValue] = useState<string>("");
  // const { mutate } = useCreateTransaction({});
  const { session } = useCurrentSession();

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity: any = parseInt(e.target.value, 10) || 0;
    setQuantity(newQuantity);

    if (selectedItem) {
      let price = selectedItem.regularPrice;
      if (variant === "packing") {
        price = selectedItem.packingPrice;
      }
      setTotal(price * newQuantity);
    }
  };

  const handleVariantChange = (variant: string) => {
    setVariant(variant);
    if (variant === "packing") {
      setPrice(selectedItem!.packingPrice);
      setTotal(selectedItem!.packingPrice * quantity);
    } else {
      setPrice(selectedItem!.regularPrice);
      setTotal(selectedItem!.regularPrice * quantity);
    }
  };

  const calculateSubTotal = (items: Rincian[]) => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  const handleSubmit = () => {
    if (variant === undefined) {
      return toast.error("silahkan pilih variant!");
    }
    if (selectedItem) {
      const newRincian: Rincian = {
        id: selectedItem.id,
        name: selectedItem.name,
        type: selectedItem.type,
        quantity,
        price:
          variant === "packing"
            ? selectedItem.packingPrice
            : selectedItem.regularPrice,
        total,
        packing: variant === "packing",
      };
      setRincian([...rincian, newRincian]);
      //   @ts-ignore
      setSubTotal(parseInt(subTotal) + parseInt(total));
      // Reset form fields
      setSelectedItem(null);
      setQuantity(1);
      setPrice(0);
      setTotal(0);
      setVariant(undefined);
      searchRef.current?.focus();
    }
  };

  const handleSave = async () => {
    if (!memberId) {
      return toast.error("Member tidak boleh kosong!");
    }
    if (rincian.length === 0) {
      return toast.error("Anda belum menginput barang!");
    }
    const body = {
      userId: session?.user?.id as string,
      memberId,
      subTotal,
      data: rincian,
    };
    try {
      await createTransaction(body);
      setMemberId(undefined);
      setSelectedMemberValue(undefined);
      setValue("");
      setRincian([]);
      setSubTotal(0);

      toast.success("Trasnsaksi berhasil disimpan!");
    } catch (error) {
      toast.success("Terjadi kesalahan sistem");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Mencegah aksi default seperti submit pada form
      variantRef.current?.focus();
      //   btnRef.current?.focus();
    }
  };

  const { data: products, isLoading: productsIsLoading } = useQuery({
    queryKey: ["products", searchProductValue],
    queryFn: () => searchProducts(searchProductValue),
  });

  const transformedDataProducts = useMemo(() => {
    return products?.map((item) => ({
      ...item,
      label: item.name, // Tambahkan label dengan nilai dari name
      value: item.id, // Tambahkan value dengan nilai dari id
    }));
  }, [products]);

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

  const removeRincian = (index: number) => {
    setRincian((prevState) => {
      const updatedData = prevState.filter((_, i) => i !== index);
      // Perbarui total harga setelah penghapusan
      setSubTotal(calculateSubTotal(updatedData));
      return updatedData;
    });
  };

  return (
    <ContentLayout title='Transactions'>
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
            <BreadcrumbPage>Transactions</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ContentWrapper>
        <Tabs defaultValue='transaction' className='w-full'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='transaction'>Penjualan</TabsTrigger>
            <TabsTrigger value='payment'>Pembayaran</TabsTrigger>
          </TabsList>

          <TabsContent value='transaction'>
            <div className='relative flex w-full flex-col'>
              <div>
                <div className='flex flex-col items-center justify-between gap-3 md:flex-row'>
                  <div className='w-full md:w-60'>
                    <Label htmlFor='search'>Search</Label>
                    <AutoComplete
                      selectedValue={selectedProductValue}
                      onSelectedValueChange={setSelectedProductValue}
                      searchValue={searchProductValue}
                      onSearchValueChange={setSearchProductValue}
                      onSelectedObjectChange={(data) => {
                        if (data) {
                          console.log("test - ", data);
                          // @ts-ignore
                          setSelectedItem(data);
                          if (variant === "packing") {
                            setPrice(data.packingPrice);
                          } else if (variant === "nonPacking") {
                            setPrice(data?.regularPrice);
                          } else {
                            setPrice(data?.regularPrice);
                          }
                          // setQuantity(1);
                          setTotal(data?.regularPrice || 0.0);
                        }
                        // qtyRef.current.focus();
                        if (qtyRef.current) {
                          qtyRef.current.focus();
                          qtyRef.current.setSelectionRange(
                            0,
                            qtyRef.current.value.length,
                          );
                        }
                      }}
                      // @ts-ignore
                      items={transformedDataProducts ?? []}
                      isLoading={productsIsLoading}
                    />
                  </div>
                  <div className='w-full md:w-60'>
                    <Label htmlFor='member'>Member</Label>
                    <AutoComplete
                      selectedValue={selectedMemberValue}
                      onSelectedValueChange={(value) => {
                        setSelectedMemberValue(value);
                        setMemberId(value);
                      }}
                      searchValue={value}
                      onSearchValueChange={setValue}
                      // @ts-ignore
                      items={transformedDataMember ?? []}
                      isLoading={membersIsLoading}
                    />
                  </div>
                </div>

                <div className='mt-3 grid grid-cols-3 gap-3 lg:grid-cols-12'>
                  <div className='col-span-2'>
                    <Label htmlFor='name'>Name</Label>
                    <Input
                      type='text'
                      id='name'
                      value={selectedItem?.name || ""}
                      readOnly
                      className={"cursor-not-allowed"}
                    />
                  </div>
                  <div>
                    <Label htmlFor='type'>Type</Label>
                    <Input
                      type='text'
                      id='type'
                      value={selectedItem?.type || ""}
                      readOnly
                      className={"cursor-not-allowed"}
                    />
                  </div>
                  <div>
                    <Label htmlFor='qty'>Quantity</Label>
                    <Input
                      onKeyDown={handleKeyDown}
                      ref={qtyRef}
                      type='text'
                      id='qty'
                      value={quantity}
                      onChange={handleQuantityChange}
                    />
                  </div>
                  <div className='col-span-2'>
                    <Label htmlFor='price'>Price</Label>
                    <Input
                      type='number'
                      readOnly
                      id='price'
                      value={price}
                      className={"cursor-not-allowed"}
                    />
                  </div>
                  <div className='col-span-2'>
                    <Label htmlFor='total'>Total</Label>
                    <Input
                      readOnly
                      type='number'
                      id='total'
                      value={total}
                      className={"cursor-not-allowed"}
                    />
                  </div>
                  <div className='col-span-2'>
                    <Label htmlFor='total'>Variant</Label>
                    <Select
                      disabled={selectedItem !== null ? false : true}
                      onValueChange={handleVariantChange}
                      value={variant || ""}
                    >
                      <SelectTrigger
                        ref={variantRef}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault(); // Mencegah aksi default seperti submit pada form
                            btnRef.current?.focus();
                          }
                        }}
                        className='w-full'
                      >
                        <SelectValue placeholder='Select a variant' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='packing'>Packing</SelectItem>
                        <SelectItem value='nonPacking'>Non Packing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='col-span-2 flex items-end'>
                    <Button
                      ref={btnRef}
                      className='w-full'
                      onClick={handleSubmit}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              {/* table */}
              <div className='mt-4 min-h-32 border p-2 lg:h-[calc(100vh-56px-64px-20px-24px-56px-48px-260px)] lg:overflow-y-scroll'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-8'>No</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className='w-20'>Quantity</TableHead>
                      <TableHead className='w-20'>Price</TableHead>
                      <TableHead className='w-20 text-center'>
                        Packing
                      </TableHead>
                      <TableHead className='w-40 text-right'>Total</TableHead>
                      <TableHead className='w-40 text-right'>action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rincian.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className='w-8'>{index + 1}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell className='w-20 text-center'>
                          {item.quantity}
                        </TableCell>
                        <TableCell className='w-20'>{item.price}</TableCell>

                        <TableCell className='w-20 text-center'>
                          <div className={"flex items-center justify-center"}>
                            {item.packing ? (
                              <Check size={18} color={"green"} />
                            ) : (
                              <X size={18} color={"red"} />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className='w-40 text-right'>
                          {formatRibuan(item.total)}
                        </TableCell>
                        <TableCell className='w-40 text-right'>
                          <Button
                            onClick={() => removeRincian(index)}
                            size={"icon"}
                            className={"h-8 w-8"}
                          >
                            <Trash2 size={12} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className='ml-auto mt-auto w-52'>
                <Separator className='my-4' />
                <div className='flex items-center'>
                  <strong>Sub Total: </strong>
                  <span className='ml-auto'>{formatCurrency(subTotal)}</span>
                </div>
                <Button
                  disabled={rincian.length === 0}
                  onClick={handleSave}
                  className='mt-3 w-full'
                >
                  Save
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value='payment'>soon.....!.</TabsContent>
        </Tabs>
      </ContentWrapper>
    </ContentLayout>
  );
};

export default TransactiosnPage;
