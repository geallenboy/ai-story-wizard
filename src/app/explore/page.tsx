"use client";
import React, { useEffect, useState } from "react";
import { StoryItemType } from "../dashboard/_components/UserStoryList";
import StoryItemCard from "../dashboard/_components/StoryItemCard";
import { Button } from "@nextui-org/button";
import CustomLoader from "../create-story/_components/CustomLoader";
import { getAllStories } from "@/servers/storyServer";

const ExploreMore = () => {
  const [offset, setOffset] = useState(0);
  const [storyList, setStoryList] = useState<StoryItemType[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setStoryList([]);
    GetAllStories(0);
  }, []);
  const GetAllStories = async (offset: number) => {
    setLoading(true);
    setOffset(offset);
    const result: any = await getAllStories(offset);
    setStoryList([...storyList, ...result]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-10 md:px-20 lg:px-40">
      <h2 className="font-bold text-4xl text-primary text-center">
        探索更多故事
      </h2>
      <div
        className="grid grid-cols-1 md:grid-cols-2 
        lg:grid-cols-3 xl:grid-cols-4 mt-10
        gap-10"
      >
        {storyList.length > 0 &&
          storyList?.map((item, index) => (
            <StoryItemCard key={index + 11} story={item} />
          ))}
      </div>
      <div className="text-center mt-10">
        <Button
          className=""
          color="primary"
          onClick={() => GetAllStories(offset + 8)}
        >
          更多
        </Button>
      </div>
      <CustomLoader isLoading={loading} />
    </div>
  );
};

export default ExploreMore;
