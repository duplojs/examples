import { createChecker } from "@duplojs/core";
import { getUser } from "../user";

export const userExist = createChecker("userExist")
    .handler(
        (input: number, output) => {
            const user = getUser({ id: input });

            if (user) {
                return output("user.exist", user);
            } else {
                return output("user.notfound", user);
            }
        },
    );