export const listSchema = zod.object({
	id: zod.number(),
	name: zod.string(),
});
