import { Textarea } from "@nextui-org/input";

const StorySubjectInput = ({ userSelection }: any) => {
  return (
    <div>
      <label className="font-bold text-4xl text-primary">1. 故事主题</label>
      <Textarea
        placeholder="写下你想要生成的故事主题"
        size="lg"
        classNames={{
          input: "resize-y min-h-[230px] text-2xl p-5",
        }}
        className="mt-3 max-w-lg"
        onChange={(e) =>
          userSelection({
            fieldValue: e.target.value,
            fieldName: "storySubject",
          })
        }
      />
    </div>
  );
};

export default StorySubjectInput;
