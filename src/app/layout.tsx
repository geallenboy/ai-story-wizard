import type { Metadata } from "next";
import Provider from "./provider";
import { Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const MyAppFont = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI故事魔法师",
  description:
    "AI 故事魔法师是一款智能儿童故事生成 SaaS 产品，通过尖端的人工智能技术，为孩子和家庭带来独特的故事体验。无论是为孩子定制专属的冒险故事，还是为教育者提供寓教于乐的内容，AI 故事魔法师都能轻松满足需求，点燃孩子的想象力和创造力",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo.svg" />
        </head>
        <body className={MyAppFont.className}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
