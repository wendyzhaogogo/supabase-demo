import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ApolloProviderWrapper } from "@/lib/apollo-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Lead Builder - Personalized LinkedIn Outreach",
  description: "Generate personalized LinkedIn outreach messages for your leads using AI",
  keywords: ["LinkedIn", "outreach", "AI", "lead generation", "personalized messages"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProviderWrapper>
          {children}
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
