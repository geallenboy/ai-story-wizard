import { integer, json, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const StoryData = pgTable('storyData', {
    id: serial('id').primaryKey(),
    storyId: varchar('storyId'),
    storySubject: text('storySubject'),
    storyType: varchar('storyType'),
    ageGroup: varchar('ageGroup'),
    imageStyle: varchar('imageStyle'),
    output: json('output'),
    coverImage: varchar('coverImage'),
    userEmail: varchar('userEmail'),
    userName: varchar('userName'),
    userImage: varchar('userImage')
})

export const PromptData = pgTable('promptData', {
    id: serial('id').primaryKey(),
    promptId: varchar('promptId'),
    userPrompt: text("userPrompt"),
    modelPrompt: text("modelPrompt"),
    output: json('output'),
    prompt: text("prompt"),
    userEmail: varchar('userEmail'),
})

export const Users = pgTable('users', {
    id: serial('id').primaryKey(),
    userName: varchar('userName'),
    userEmail: varchar('userEmail'),
    userImage: varchar('userImage'),
    credit: integer('credits').default(3)
})