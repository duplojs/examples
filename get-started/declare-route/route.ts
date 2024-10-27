import { useBuilder, Response } from "@duplojs/core";

export const myRoute = useBuilder()
    .createRoute("GET", "/hello-world")
    .handler(() => {
        return new Response(
            200, 
            "Hello World", 
            "this is a body"
        );
    });
