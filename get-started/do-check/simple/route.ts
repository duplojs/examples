import { useBuilder, zod, OkHttpResponse, NotFoundHttpResponse } from "@duplojs/core";
import { userExistCheck } from ".";

useBuilder()
	.createRoute("GET", "/user/{userId}")
	.extract({
		params: {
			userId: zod.coerce.number(),
		},
	})
	.check(
		userExistCheck,
		{
			// data give to checker
			input: (pickup) => pickup("userId"),
			// result expected
			result: "user.exist",
			// index the result of checker in floor to index "user"
			indexing: "user",
			// if result is not as expected, catch function is called to return specified response
			catch: () => new NotFoundHttpResponse("user.notfound"),
		},
	)
	.handler(
		(pickup) => {
			const user = pickup("user");

			return new OkHttpResponse("user.found", user);
		},
	);
