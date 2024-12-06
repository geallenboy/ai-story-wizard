"use client";
import { PayPalButtons } from "@paypal/react-paypal-js";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { updateUserCredit } from "@/servers/userServer";
import { priceOptions } from "@/constants";
import { useUserStore } from "@/stores/userStore";

const BuyCredits = () => {
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const { users, setUser } = useUserStore((state: any) => state);

  const router = useRouter();
  const notify = (msg: string) => toast(msg);
  const notifyError = (msg: string) => toast.error(msg);
  useEffect(() => {
    if (selectedOption != 0) {
      const price = priceOptions[selectedOption - 1].price;
      setSelectedPrice(price);
    }
  }, [selectedOption]);

  const OnPaymentSuccess = async () => {
    const result = await updateUserCredit(
      priceOptions[selectedOption]?.credits + users?.credit,
      users
    );
    if (result) {
      notify("积分已添加");
      setUser((prev: any) => ({
        ...prev,
        ["credit"]: priceOptions[selectedOption]?.credits + users?.credit,
      }));
      router.replace("/dashboard");
    } else {
      notifyError("服务器错误");
    }
  };

  return (
    <div className="min-h-screen p-10 md:px-20 lg:px-40 text-center">
      <h2 className="text-4xl font-bold text-primary">添加更多积分</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10 items-center justify-center">
        <div>
          {priceOptions.map((option, index) => (
            <div
              key={index + 12}
              className={`p-6 my-3 border bg-primary text-center 
                    rounded-lg text-white cursor-pointer 
                    hover:scale-105 transition-all
                    ${selectedOption == option.id && "bg-black"}
                    `}
              onClick={() => setSelectedOption(option.id)}
            >
              <h2>
                获得 {option.credits} 积分= {option.credits} 故事
              </h2>
              <h2 className="font-bold text-2xl">${option.price}</h2>
            </div>
          ))}
        </div>
        <div>
          {selectedPrice > 0 && (
            <PayPalButtons
              style={{ layout: "vertical" }}
              disabled={!selectedOption || selectedOption == 0}
              // @ts-ignore
              onApprove={() => OnPaymentSuccess()}
              onCancel={() => notifyError("Payment canceld")}
              createOrder={(data, actions) => {
                // @ts-ignore
                return actions.order.create({
                  purchase_units: [
                    {
                      // @ts-ignore
                      amount: {
                        value: selectedPrice.toFixed(2),
                        currency_code: "USD",
                      },
                    },
                  ],
                });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyCredits;
