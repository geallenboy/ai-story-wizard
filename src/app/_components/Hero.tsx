import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="px-10 md:px-28 lg:px-44 h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div>
          <h2 className="text-[40px] md:text-[60px] text-primary font-extrabold py-10">
            在几分钟内为孩子们创作神奇的故事
          </h2>
          <p className="text-2xl text-primary font-light">
            创建有趣且个性化的故事，让您的孩子的冒险栩栩如生，激发他们的阅读热情。只需几秒钟！
          </p>
          <Link href={"./create-story"}>
            <Button
              size="lg"
              color="primary"
              className="mt-5 font-bold text-2xl p-8"
            >
              创作故事
            </Button>
          </Link>
        </div>
        <div>
          <Image src={"/hero.png"} alt="hero" width={700} height={400} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
