"use client";
import React, { useEffect, useState } from "react";
import AgeGroup from "./_components/AgeGroup";
import ImageStyle from "./_components/ImageStyle";
import StorySubjectInput from "./_components/StorySubjectInput";
import StoryType from "./_components/StoryType";
import { chatSession } from "@/config/GeminiAi";
import axios from "axios";
import { toast } from "react-toastify";
import CustomLoader from "./_components/CustomLoader";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { imageToBase64 } from "@/utils/firebase";
import { updateUserCredit } from "@/servers/userServer";
import { addStory } from "@/servers/storyServer";
import { getByEmailPrompt } from "@/servers/promptServer";
import { useUserStore } from "@/stores/userStore";

export interface fieldData {
  fieldName: string;
  fieldValue: string;
}
export interface formDataType {
  storySubject: string;
  storyType: string;
  imageStyle: string;
  ageGroup: string;
}

const CreateStory = () => {
  const [formData, setFormData] = useState<formDataType>();
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState<any>(null);
  const router = useRouter();
  const notify = (msg: string) => toast(msg);
  const notifyError = (msg: string) => toast.error(msg);
  const { users } = useUserStore();

  const onHandleUserSelection = (data: fieldData) => {
    setFormData((prev: any) => ({
      ...prev,
      [data.fieldName]: data.fieldValue,
    }));
  };
  useEffect(() => {
    if (users) {
      getPrompt();
    }
  }, [users]);
  const getPrompt = async () => {
    const result = await getByEmailPrompt(users?.userEmail);
    if (result && result.length > 0) {
      setPrompt(result[0]);
    }
  };
  /**
   * Save Data in Database
   * @param output AI Output
   * @returns
   */
  const SaveInDB = async (output: string, imageUrl: string) => {
    setLoading(true);
    try {
      const result = addStory(formData, output, imageUrl, users);
      setLoading(false);
      return result;
    } catch (e) {
      setLoading(false);
    }
  };

  const GenerateStory = async () => {
    if (users.credit <= 0) {
      notifyError("你的积分不足!");
      return;
    }
    setLoading(true);

    const final_prompt: any = prompt.prompt
      ?.replace("{ageGroup}", formData?.ageGroup ?? "")
      .replace("{storyType}", formData?.storyType ?? "")
      .replace("{storySubject}", formData?.storySubject ?? "")
      .replace("{imageStyle}", formData?.imageStyle ?? "");

    try {
      const result = await chatSession(prompt).sendMessage(final_prompt || "");
      const story = JSON.parse(
        result?.response.text().replace(/(})(,?)(\n *\})/g, "$1,")
      );
      const context = `Add text with title: ${story?.story_cover?.title} in bold text for book cover, ${story?.story_cover?.image_prompt},`;
      const imageResp = await axios.post("/api/generate-image", {
        prompt: context,
      });
      const AiImageUrl = imageResp?.data?.imageUrl;
      const newImageUrl = await imageToBase64({
        imageUlr: AiImageUrl,
        fileNmae: "ai-story",
        imageType: "jpg",
      });

      // //保存db
      const resp: any = await SaveInDB(result?.response.text(), newImageUrl);
      console.log(resp);
      notify("故事生成");
      await updateUserCredit(Number(users?.credit - 1), users);
      router?.replace("/view-story/" + resp[0].storyId);
      setLoading(false);
    } catch (error) {
      notifyError("服务器错误，请重试");
      setLoading(false);
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-40">
      <h2 className="font-extrabold text-[55px] md:text-[70px] text-primary text-center">
        创作你的故事
      </h2>
      <p className="text-2xl text-primary text-center mt-8 md:mt-0">
        利用人工智能释放您的创作力：以前所未有的方式创作故事！让我们的人工智能将您的想象变成现实，一次讲一个故事。
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-14">
        <StorySubjectInput userSelection={onHandleUserSelection} />
        <StoryType userSelection={onHandleUserSelection} />
        <AgeGroup userSelection={onHandleUserSelection} />
        <ImageStyle userSelection={onHandleUserSelection} />
      </div>
      <div className="flex justify-end my-10 flex-col items-end">
        <Button
          color="primary"
          disabled={loading}
          className="p-10 text-2xl"
          onClick={GenerateStory}
        >
          生成故事
        </Button>
        <span>1 积分</span>
      </div>
      <CustomLoader isLoading={loading} />
    </div>
  );
};

export default CreateStory;
