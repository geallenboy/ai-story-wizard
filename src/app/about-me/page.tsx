import React from "react";
import Image from "next/image";

const AboutMe = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-10">
      <div className=" text-4xl font-bold text-primary">garron</div>
      <div className="text-2xl text-primary">AI全栈工程师，探索AGI的世界。</div>
      <div className="text-primary">
        WX：
        <Image alt="garron" src="/weixin.png" width="200" height="200" />
      </div>
    </div>
  );
};

export default AboutMe;
