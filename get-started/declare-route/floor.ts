import { useBuilder, Response, makeFloor, zod } from "@duplojs/core";

const floor = makeFloor<{
	foo: "bar";
	prop: number;
}>();

const bar = floor.pickup("foo");
// typeof bar === "bar"

const { foo, prop } = floor.pickup(["foo", "prop"]);
// typeof foo === "bar"
// typeof prop === number

export const myRoute = useBuilder()
	.createRoute("GET", "/hello-world")
	.extract({
		query: {
			foo: zod.string(),
		},
	})
	.handler((pickup) => {
		const bar = pickup("foo");

		return new Response(
			200,
			`Hello ${bar}`,
			"this is a body",
		);
	});
