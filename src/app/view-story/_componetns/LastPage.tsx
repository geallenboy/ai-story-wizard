import { Button } from "@nextui-org/button";
import React from "react";

const LastPage = ({ props, ref }: any) => {
  return (
    <div className="bg-primary p-10 h-full" ref={ref}>
      <h2 className="text-center text-2xl text-white">结束</h2>
      {/* <div className='flex items-center justify-center'> */}
      <Button>分享</Button>
      {/* </div> */}
    </div>
  );
};

export default LastPage;
