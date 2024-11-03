import { Response, useBuilder, zod, Duplo } from "@duplojs/core";

const duplo = new Duplo({ environment: "TEST" });
// Set default behavior for all registered route of Duplo.
duplo.setExtractError(
    // Your custom response
    (type, key, zodError) => new Response(
        500,
        "Error",
        zodError
    )
);

useBuilder()
    .createRoute("GET", "/user/{userId}")
    .extract(
        {
            params: {
                userId: zod.string()
            }
        },
        // called when there is a zod parsing error.
        // you can return here your custom response else it will return 422 http code (default is duplo's response for extract step).
        (type, key, zodError) => new Response(
            500,
            "Error",
            zodError
        )
    )
    .handler(
        (pickup) => {
            const userId = pickup("userId");

            console.log(userId); // return userId value from request parameters

            return new Response(
                200,
                "superinfo",
                undefined
            )
        }
    )