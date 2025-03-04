export const userSchema = zod.object({
	id: zod.number(),
	name: zod.string(),
	email: zod.string(),
});
