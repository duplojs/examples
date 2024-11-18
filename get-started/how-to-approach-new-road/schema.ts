import { zod } from "@duplojs/core";

export const messageSchema = zod.object({
	senderId: zod.number(),
	receiverId: zod.number(),
	content: zod.string(),
	postedAt: zod.date(),
});
