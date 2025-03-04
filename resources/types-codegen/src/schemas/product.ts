export const productSchema = zod.object({
	id: zod.number(),
	name: zod.string(),
	price: zod.number(),
	quantity: zod.number(),
});
