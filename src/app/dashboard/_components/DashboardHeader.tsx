"use client";
import React from "react";
import { useUserStore } from "@/stores/userStore";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";

const DashboardHeader = () => {
  const users = useUserStore((state: any) => state.users);

  return (
    <div className="p-2 md:p-7 bg-primary text-white flex justify-between items-center">
      <h2 className="font-bold text-xl md:text-3xl">我的故事</h2>
      <div className="flex gap-3 items-center">
        <Image src={"/coin.png"} alt="coin" width={50} height={50} />
        <span className="text-xl md:text-2xl">{users?.credit} 积分</span>
        <Link href={"/buy-credits"}>
          <Button className="bg-blue-400" color="secondary">
            购买更多积分
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
