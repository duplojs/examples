import { IWantUserExistById } from "@checkers/user";
import { userSchema } from "@schemas/user";

useBuilder()
	.createRoute("GET", "/users/{userId}")
	.extract({
		params: {
			userId: zod.coerce.number(),
		},
	})
	.presetCheck(
		IWantUserExistById,
		(pickup) => pickup("userId"),
	)
	.handler(
		(pickup) => {
			const { id, name, email } = pickup("user");
			return new OkHttpResponse("user.found", {
				id,
				name,
				email,
			});
		},
		makeResponseContract(OkHttpResponse, "user.found", userSchema),
	);
