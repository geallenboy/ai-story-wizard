import { db } from "@/config/db";
import { eq } from "drizzle-orm";
import { Users } from "@/config/schema";

export const getUserByEmail = async (email: string) => {
    try {
        const result = await db
            .select()
            .from(Users)
            .where(
                eq(Users.userEmail, email)
            );

        return result;
    } catch (error: any) {
        console.error("Error fetching users:", error);
        throw new error("Error fetching users:", error)
    }
};

export const addUser = async (user: any) => {
    try {
        const result = await db
            .insert(Users)
            .values({
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userImage: user?.imageUrl,
                userName: user?.fullName,
            })
            .returning({
                userEmail: Users.userEmail,
                userName: Users.userName,
                userImage: Users.userImage,
                credit: Users.credit,
            });
        return result[0]
    } catch (error: any) {
        throw new error("Error fetching users:", error)
    }
}

export const updateUserCredit = async (credit: any, userDetail: any) => {
    try {
        const result = await db
            .update(Users)
            .set({
                credit: credit,
            })
            .where(eq(Users.userEmail, userDetail.userEmail))
            .returning({ id: Users.id });
        return result
    } catch (error: any) {
        throw new error("Error fetching users:", error)
    }
    return null
}