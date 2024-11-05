import { createChecker } from "@duplojs/core";
import { getUser } from "../user";

export const userExistCheck = createChecker("userExist")
	.handler(
		// handler must return result of output function
		(input: number, output) => {
			const user = getUser({ id: input });

			if (user) {
				return output("user.exist", user);
			} else {
				return output("user.notfound", user);
			}
		},
	);
