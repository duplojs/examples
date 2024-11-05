import { createChecker } from "@duplojs/core";
import { getUser } from "../user";

export const userExistCheck = createChecker("userExist")
	.handler(
		(input: number, output) => { // handler must return result of output function
			const user = getUser({ id: input });

			if (user) {
				return output("user.exist", user);
			} else {
				return output("user.notfound", user);
			}
		},
	);
