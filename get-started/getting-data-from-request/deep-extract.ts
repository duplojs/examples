import { OkHttpResponse, useBuilder, zod } from "@duplojs/core";

useBuilder()
	.createRoute("GET", "/user/{userId}")
	.extract({
		params: {
			userId: zod.string(),
		},
	})
	.handler(
		(pickup) => {
			// recovering directly the key "userId" of params object.
			const userId = pickup("userId");

			// return userId value from request parameters
			console.log(userId);

			return new OkHttpResponse(
				"user",
				undefined,
			);
		},
	);

// same as :
// (but with deeper extract level)
useBuilder()
	.createRoute("GET", "/user/{userId}")
	.extract({
		params: zod.object({
			userId: zod.string(),
		}).strip(),
	})
	.handler(
		(pickup) => {
			// recovering "params" object.
			const params = pickup("params");

			// then recovering the key "userId" of "params" object.
			console.log(params.userId);

			return new OkHttpResponse(
				"user",
				undefined,
			);
		},
	);

