import { createChecker, createTypeInput, GetTypeInput } from "@duplojs/core";
import { getUser, type User } from "../user";

export const inputUserExist = createTypeInput<{
	id: number;
	email: string;
}>();

export const userExist = createChecker("userExist")
    .handler(
        ({ inputName, value }: GetTypeInput<typeof inputUserExist>, output) => {
            let user: User | undefined;

            if (inputName === "id") {
                user = getUser({ id: value });
            } else {
                user = getUser({ email: value });
            }

            if (user) {
                return output("user.exist", user);
            }
                
            return output("user.notfound", user);
        },
    );