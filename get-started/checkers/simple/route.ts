import { useBuilder, zod, OkHttpResponse, NotFoundHttpResponse } from "@duplojs/core";
import { userExist } from "./index";

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
            input: (p) => p("params").id,
            result: "user.exist",
            indexing: "user", // index the result of checker in floor to index "user"
            catch: () => new NotFoundHttpResponse("user.notfound"), // 404
        }
    )
    .handler(
        (pickup) => {
            const user = pickup("user");
            return new OkHttpResponse("user.found", user); // 200
        }
    );
