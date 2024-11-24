"use client";
import { useState, ChangeEvent } from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { importProduct } from "@/actions/import-product-action";

export interface TableProductRow {
  no: number;
  name: string;
  type: string;
  regularPrice: string;
  packingPrice: string;
}

export default function ImportButton() {
  const [data, setData] = useState<TableProductRow[]>([]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const binaryStr = e.target?.result;
      if (typeof binaryStr !== "string") return;

      const workbook = XLSX.read(binaryStr, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const jsonData: TableProductRow[] =
        XLSX.utils.sheet_to_json<TableProductRow>(workbook.Sheets[sheetName], {
          range: 3,
          header: ["no", "name", "type", "regularPrice", "packingPrice"],
        });

      const filteredData: TableProductRow[] = jsonData.filter(
        (row) => row.name && row.name,
      );

      console.log(filteredData);

      setData(filteredData);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Upload Excel File</h1>
      <input type='file' accept='.xlsx, .xls' onChange={handleFileUpload} />
      <Button
        onClick={() => {
          importProduct(data);
        }}
      >
        Import
      </Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
