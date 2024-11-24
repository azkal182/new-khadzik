import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card className='mt-6 rounded-lg border-none'>
      <CardContent className='p-6'>
        <div className='min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]'>
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentWrapper;
