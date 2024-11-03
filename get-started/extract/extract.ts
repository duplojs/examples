import { Response, useBuilder, zod } from "@duplojs/core";

useBuilder()
    .createRoute("POST", "/user")
    .extract({
        // You can access "Request" properties, defined in the Request object returned by useBuilder function, in the object your giving to extract method.
        body: zod.object({
            userName: zod.string(),
            email: zod.string(),
            age: zod.coerce.string()
        }).strip() // using strip method to remove ts(2589) error.
        // doesn't change default behavior.
    }) // if schema parsing returns an error its returning 422 http code.
    .handler(
        (pickup) => {
            const { userName, email, age } = pickup("body");

            const user = {
                id: Math.random(),
                userName,
                email,
                age
            };

            return new Response(
                204,
                "superinfo",
                user // return the user created.
            )
        }
    )

