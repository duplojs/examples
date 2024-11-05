import { useBuilder, zod, OkHttpResponse, NotFoundHttpResponse } from "@duplojs/core";
import { userExistCheck } from ".";

useBuilder()
	.createRoute("GET", "/user/{id}")
	.extract({
		params: {
			userId: zod.coerce.number(),
		},
	})
	.check(
		userExistCheck,
		{
			input: (pickup) => pickup("userId"), // data give to checker
			result: "user.exist", // result expected
			indexing: "user", // index the result of checker in floor to index "user"
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
