import { Response, useBuilder, zod } from "@duplojs/core";

useBuilder()
    .createRoute("GET", "/user/{userId}")
    .extract({
        params: {
            userId: zod.string()
        }
    })
    .handler(
        (pickup) => {
            const userId = pickup("userId"); // recovering directly the key "userId" of params object.

            console.log(userId); // return userId value from request parameters

            return new Response(
                200,
                "superinfo",
                undefined
            )
        }
    )

// same as : 
// (but with deeper extract level)
useBuilder()
    .createRoute("GET", "/user/{userId}")
    .extract({
        params: zod.object({
            userId: zod.string()
        }).strip()
    })
    .handler(
        (pickup) => {
            const params = pickup("params"); // recovering "params" object.

            console.log(params.userId); // then recovering the key "userId" of "params" object.

            return new Response(
                200,
                "superinfo",
                undefined
            )
        }
    )

