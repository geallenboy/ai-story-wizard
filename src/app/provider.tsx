"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useUserStore } from "@/stores/userStore";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Header from "./_components/Header";
import { addUser, getUserByEmail } from "@/servers/userServer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const provider = ({ children }: { children: React.ReactNode }) => {
  const { setUser } = useUserStore();

  const { user } = useUser();
  useEffect(() => {
    user && saveNewUserIfNotExist();
  }, [user, setUser]);

  const saveNewUserIfNotExist = async () => {
    const userResp: any = await getUserByEmail(
      user?.primaryEmailAddress?.emailAddress ?? ""
    );
    console.log("userResp:", userResp);
    if (!userResp[0]) {
      const result: any = addUser(user);
      console.log("new User", result[0]);
      setUser(result[0]);
    } else {
      setUser(userResp[0]);
    }
  };
  return (
    <PayPalScriptProvider
      options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "" }}
    >
      <NextUIProvider>
        <Header />
        {children}
        <ToastContainer />
      </NextUIProvider>
    </PayPalScriptProvider>
  );
};

export default provider;
