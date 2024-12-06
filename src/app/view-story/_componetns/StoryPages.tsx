import React from "react";
import { MdPlayCircleFilled } from "react-icons/md";

const StoryPages = ({ storyChapter }: any) => {
  const playSpeech = (text: string) => {
    const synth = window?.speechSynthesis;
    const textToSpeech = new SpeechSynthesisUtterance(text);
    synth.speak(textToSpeech);
  };
  return (
    <div>
      <h2 className="text-2xl fontbold text-primary flex justify-between">
        {storyChapter?.chapter_title}
        <span
          className="text-3xl cursor-pointer"
          onClick={() => playSpeech(storyChapter?.chapter_text)}
        >
          <MdPlayCircleFilled />
        </span>
      </h2>
      <div className="text-lg p-5 mt-3 rounded-lg bg-slate-100 line-clamp-[10] text-black ">
        <p className="overflow-scroll h-[360px]">
          {storyChapter?.chapter_text}
        </p>
      </div>
    </div>
  );
};

export default StoryPages;
