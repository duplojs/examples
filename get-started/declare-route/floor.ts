import { useBuilder, makeFloor, zod, OkHttpResponse } from "@duplojs/core";

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
	// A step who can enrich floor
	.extract({
		query: {
			foo: zod.string(),
		},
	})
	.handler((pickup) => {
		const bar = pickup("foo");

		return new OkHttpResponse(
			`Hello ${bar}`,
			"this is a body",
		);
	});
