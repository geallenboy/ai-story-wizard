import { db } from "@/config/db";
import { StoryData } from "@/config/schema";
import { eq, desc } from "drizzle-orm";
import uuid4 from "uuid4";

export const addStory = async (formData: any, output: string, imageUrl: string, user: any) => {
    try {
        const recordId = uuid4();
        const result = await db
            .insert(StoryData)
            .values({
                storyId: recordId,
                ageGroup: formData?.ageGroup,
                imageStyle: formData?.imageStyle,
                storySubject: formData?.storySubject,
                storyType: formData?.storyType,
                output: JSON.parse(output),
                coverImage: imageUrl,
                userEmail: user?.userEmail,
                userImage: user?.userImage,
                userName: user?.userName,
            })
            .returning({ storyId: StoryData?.storyId });
        return result;
    } catch (error: any) {
        console.error("Error fetching users:", error);
        throw new error("Error fetching users:", error)
    }
};

export const getByIdStory = async (id: string) => {
    const result = await db
        .select()
        .from(StoryData)
        .where(eq(StoryData.storyId, id));
    return result
}

export const getAllStories = async (offset: number) => {
    const result: any = await db
        .select()
        .from(StoryData)
        .orderBy(desc(StoryData.id))
        .limit(8)
        .offset(offset);
    return result
}

export const getUserStory = async (user: any) => {
    const result: any = await db
        .select()
        .from(StoryData)
        .where(
            eq(StoryData.userEmail, user?.primaryEmailAddress?.emailAddress ?? "")
        )
        .orderBy(desc(StoryData.id));
    return result
}