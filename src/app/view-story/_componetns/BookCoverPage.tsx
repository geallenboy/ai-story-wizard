import Image from "next/image";
import React from "react";

const BookCoverPage = ({ imageUrl }: any) => {
  return (
    <div>
      <Image key={1} src={imageUrl} alt="cover" width={500} height={500} />
    </div>
  );
};

export default BookCoverPage;
