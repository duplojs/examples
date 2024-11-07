import { useBuilder, OkHttpResponse } from "@duplojs/core";

export const myRoute = useBuilder()
	.createRoute("GET", "/hello-world")
	.handler(() => new OkHttpResponse(
		"Hello World",
		"this is a body",
	));
