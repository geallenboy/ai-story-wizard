"use client";
import React, { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import BookCoverPage from "../_componetns/BookCoverPage";
import StoryPages from "../_componetns/StoryPages";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import { getByIdStory } from "@/servers/storyServer";

const ViewStory = ({ params }: { params: Promise<{ id: string }> }) => {
  const [story, setStory] = useState<any>();
  const bookRef = useRef<any>();
  const [count, setCount] = useState(0);
  useEffect(() => {
    getStory();
  }, []);
  const getStory = async () => {
    const { id } = await params; // 解包 params
    console.log(id, 88);
    const result: any = await getByIdStory(id);

    console.log(result[0]);
    setStory(result[0]);
  };

  return (
    <div className="p-10 md:px-20 lg:px-40 flex justify-center flex-col ">
      <h2 className="font-bold text-4xl text-center p-10 bg-primary text-white">
        {story?.output?.story_cover?.title}
      </h2>
      <div className="relative flex items-center justify-center">
        {/* @ts-ignore */}
        <HTMLFlipBook
          width={500}
          height={500}
          showCover={true}
          className="mt-10"
          useMouseEvents={false}
          ref={bookRef}
        >
          <div>
            {story?.coverImage && (
              <BookCoverPage imageUrl={story?.coverImage} />
            )}
          </div>
          {[...Array(story?.output?.chapters?.length)].map((item, index) => (
            <div key={index} className="bg-white p-10 border">
              <StoryPages storyChapter={story?.output.chapters[index]} />
            </div>
          ))}
        </HTMLFlipBook>
        {count != 0 && (
          <div
            className="absolute -left-5 top-[250px]"
            onClick={() => {
              bookRef.current.pageFlip().flipPrev();
              setCount(count - 1);
            }}
          >
            <IoIosArrowDropleftCircle className="text-[40px] text-primary cursor-pointer" />
          </div>
        )}

        {count != story?.output.chapters?.length - 2 && (
          <div
            className="absolute right-0 top-[250px]"
            onClick={() => {
              bookRef.current.pageFlip().flipNext();
              setCount(count + 1);
            }}
          >
            <IoIosArrowDroprightCircle className="text-[40px] text-primary cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewStory;
