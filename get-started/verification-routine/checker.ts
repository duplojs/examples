import { createChecker, zod } from "@duplojs/core";

const tokenValues = zod.object({
	id: zod.number(),
	role: zod.string(),
});

export const valideTokenCheck = createChecker("valideToken")
	.handler(
		(input: string, output) => {
			const [userRole, userId] = input.split("-");

			const { success, data } = tokenValues.safeParse({
				id: Number(userId),
				role: userRole,
			});

			if (success) {
				return output("token.valide", data);
			} else {
				return output("token.invalid", null);
			}
		},
	);
