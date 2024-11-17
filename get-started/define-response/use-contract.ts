import { useBuilder, zod, ForbiddenHttpResponse, NoContentHttpResponse, NotFoundHttpResponse, makeResponseContract } from "@duplojs/core";
import { userExistCheck } from "../do-check/simple";

useBuilder()
	.createRoute("DELETE", "/users/{userId}")
	.extract({
		params: {
			userId: zod.coerce.number(),
		},
	})
	.check(
		userExistCheck,
		{
			input: (pickup) => pickup("userId"),
			result: "user.exist",
			indexing: "user",
			catch: () => new NotFoundHttpResponse("user.notfound"),
		},
		makeResponseContract(NotFoundHttpResponse, "user.notfound"),
	)
	.cut(
		({ pickup, dropper }) => {
			const { email } = pickup("user");

			if (email === "admin@example.com") {
				return new ForbiddenHttpResponse("userIsAdmin");
			}

			return dropper(null);
		},
		[],
		makeResponseContract(ForbiddenHttpResponse, "userIsAdmin"),
	)
	.handler(
		(pickup) => {
			const { id } = pickup("user");

			// action to delete user

			return new NoContentHttpResponse("user.deleted");
		},
		makeResponseContract(NoContentHttpResponse, "user.deleted"),
	);
