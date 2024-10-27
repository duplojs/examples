import { useBuilder, Response, makeFloor } from "@duplojs/core";

const floor = makeFloor<{foo: "bar", prop: number}>();

const bar = floor.pickup("foo");
// typeof bar === "bar"

const { foo, prop } = floor.pickup(["foo", "prop"]);
// typeof foo === "bar"
// typeof prop === number

export const myRoute = useBuilder()
    .createRoute("GET", "/hello-world")
    .handler((pickup) => {
        // pickup -> floor.pickup

        return new Response(
            200, 
            "Hello World", 
            "this is a body"
        );
    });