import { zod } from "@duplojs/core";

export const userSchema = zod.object({
	id: zod.number(),
	email: zod.string(),
	password: zod.string(),
});
