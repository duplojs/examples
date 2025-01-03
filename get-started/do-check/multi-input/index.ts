import { createChecker, createTypeInput, type GetTypeInput } from "@duplojs/core";
import { getUser } from "../user";

export const inputUserExist = createTypeInput<{
	id: number;
	email: string;
}>();

// inputUserExist.id(123); { inputName: "id", value: 123 };
// inputUserExist.email("foo"); { inputName: "email", value: "foo" };

export const userExistCheck = createChecker("userExist")
	.handler(
		({ inputName, value }: GetTypeInput<typeof inputUserExist>, output) => {
			const query: Parameters<typeof getUser>[0] = {};

			if (inputName === "id") {
				query.id = value;
			} else if (inputName === "email") {
				query.email = value;
			}

			const user = getUser(query);

			if (user) {
				return output("user.exist", user);
			} else {
				return output("user.notfound", null);
			}
		},
	);
