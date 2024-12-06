import { db } from "@/config/db";
import { PromptData } from "@/config/schema";
import { eq } from "drizzle-orm";

export const getByEmailPrompt = async (userEmail: string) => {
    console.log(PromptData.userEmail, userEmail, 22)
    const result = await db
        .select()
        .from(PromptData)
        .where(eq(PromptData.userEmail, userEmail));
    return result
}