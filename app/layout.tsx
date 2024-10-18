import type { Metadata } from "next";
import "./globals.css";
import { TopbarProvider } from "@/providers/Topbar";

export const metadata: Metadata = {
  title: "Malucas Awards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`h-screen bg-gradient-to-b from-[#f93fff]  to-[#f7f908] bg-fixed`}
      >
        <TopbarProvider>{children}</TopbarProvider>
      </body>
    </html>
  );
}
