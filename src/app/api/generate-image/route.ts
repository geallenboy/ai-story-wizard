import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const { prompt } = data;
  const replicate = new Replicate({
    auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
  });

  const input = {
    prompt: prompt,
    output_format: "png",
    output_quality: 80,
    aspect_ratio: "1:1",
  };

  const output: any = await replicate.run("black-forest-labs/flux-schnell", {
    input,
  });

  return NextResponse.json({ imageUrl: output[0] });
}
