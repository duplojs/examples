import { useBuilder, zod, Duplo, InternalServerErrorHttpResponse, OkHttpResponse, UnprocessableEntityHttpResponse } from "@duplojs/core";

const duplo = new Duplo({ environment: "TEST" });
// Set default behavior for all registered route of Duplo.
duplo.setExtractError(
	// Your custom response
	(type, key, zodError) => new UnprocessableEntityHttpResponse(
		"error.extract",
		zodError,
	),
);

useBuilder()
	.createRoute("GET", "/user/{userId}")
	.extract(
		{
			params: {
				userId: zod.string(),
			},
		},
		// called when there is a zod parsing error.
		// you can return here your custom response else it will return
		// 422 http code (default is duplo's response for extract step).
		(type, key, zodError) => new InternalServerErrorHttpResponse(
			"error",
			zodError,
		),
	)
	.handler(
		(pickup) => {
			const userId = pickup("userId");

			// return userId value from request parameters
			console.log(userId);

			return new OkHttpResponse(
				"user.get",
				undefined,
			);
		},
	);
