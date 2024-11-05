import { useBuilder, Response } from "@duplojs/core";

export const myRoute = useBuilder()
	.createRoute("GET", "/hello-world")
	.handler(() => new Response(
		200,
		"Hello World",
		"this is a body",
	));
