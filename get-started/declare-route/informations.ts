import { useBuilder, OkHttpResponse } from "@duplojs/core";

export const myRoute = useBuilder()
	.createRoute("GET", "/hello-world")
	.handler(() => new OkHttpResponse(
		"My super info!",
		undefined,
	));
