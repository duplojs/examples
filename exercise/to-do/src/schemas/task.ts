export const taskSchema = zod.object({
	id: zod.number(),
	listId: zod.number(),
	title: zod.string(),
	description: zod.string(),
	completed: zod.boolean(),
});
