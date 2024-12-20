import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { QueryClient } from "@tanstack/query-core";
import ReactQueryProvider from "@/app/ReactQueryProvider";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : `http://localhost:${process.env.PORT || 3000}`,
  ),
  title: "Dzik",
  description:
    "A stunning and functional retractable sidebar for Next.js built on top of shadcn/ui complete with desktop and mobile responsiveness.",
  alternates: {
    canonical: "/",
  },
};

const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={GeistSans.className}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            {children}
            <Toaster position='top-right' />
          </ThemeProvider>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
