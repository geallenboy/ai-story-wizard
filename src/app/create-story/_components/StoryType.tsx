"use client";
import { createStoryStoryTypeOptionList } from "@/constants";
import Image from "next/image";
import React, { useState } from "react";

export interface OptionField {
  label: string;
  imageUrl: string;
  isFree: boolean;
}

const StoryType = ({ userSelection }: any) => {
  const [selectedOption, setSelectedOption] = useState<string>();

  const onUserSelect = (item: OptionField) => {
    setSelectedOption(item.label);
    userSelection({
      fieldValue: item?.label,
      fieldName: "storyType",
    });
  };
  return (
    <div>
      <label className="font-bold text-4xl text-primary">2. 故事类型</label>
      <div className="grid grid-cols-3 gap-5 mt-3">
        {createStoryStoryTypeOptionList.map((item, index) => (
          <div
            key={index * 77}
            className={`relative hover:scale-110 transition duration-300 cursor-pointer p-1 ${
              selectedOption == item.label
                ? "grayscale-0 border-2 rounded-3xl border-primary"
                : "grayscale-0"
            }`}
            onClick={() => onUserSelect(item)}
          >
            <h2
              className="absolute bottom-5 text-2xl
                     text-white text-center w-full"
            >
              {item.label}
            </h2>
            <Image
              src={item.imageUrl}
              alt={item.label}
              width={300}
              height={500}
              className="object-cover h-[260px] rounded-3xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryType;
