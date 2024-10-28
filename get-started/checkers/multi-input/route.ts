import { useBuilder, zod, ConflictHttpResponse, OkHttpResponse, NotFoundHttpResponse } from "@duplojs/core";
import { userExist, inputUserExist } from "./index";

export const getUserById = useBuilder()
    .createRoute("GET", "/user/{id}")
    .extract({
        params: zod.object({
            id: zod.number(),
        }),
    })
    .check(
        userExist,
        {
            input: (p) => inputUserExist.id(p("params").id),
            result: "user.exist",
            indexing: "user",
            catch: () => new NotFoundHttpResponse("user.notfound"), // 404
        }
    )
    .handler(
        (pickup) => {
            const user = pickup("user");
            return new OkHttpResponse("user.found", user); // 200
        }
    );

export const userRegister = useBuilder()
    .createRoute("POST", "/register")
    .extract({
        body: zod.object({
                email: zod.string().email(),
                password: zod.string().min(8),
            }),
    })
    .check(
        userExist,
        {
            input: (p) => inputUserExist.email(p("body").email),
            result: "user.exist",
            catch: () => new ConflictHttpResponse("email.taken"), // 409
        }
    )
    .handler(
        (pickup) => {
            const { email, password } = pickup("body");

            // implement your user creation logic here
            const user = { id: 1, email, password };

            return new OkHttpResponse("user.created", user); // 200
        }
    );