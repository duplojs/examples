import { useBuilder, zod } from "@duplojs/core";

export const myFunctionName = useBuilder()
	.createRoute("PATCH", "/my-patch-router/{userId}")
	.extract(
		{
			params: {
				userId: zod.coerce.number(),
			},
		},
		(response, type, index, error) => response.code(400).info(`TYPE_ERROR.${type}${index ? `.${index}` : ""}`).send(),
	)
	.handler((pickup) => {
		//...
	});
