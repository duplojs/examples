import { IWantUserExistById, IWantUserNameIsAvailable } from "@checkers/user";
import { userSchema } from "@schemas/user";
import { IgnoreByTypeCodegenDescription } from "@duplojs/types-codegen";
import { MyDataBase } from "@providers/myDataBase";

useBuilder()
	.createRoute("GET", "/users/{userId}")
	.extract(
		{
			headers: {
				authorization: zod.string(),
			},
		},
		undefined,
		new IgnoreByTypeCodegenDescription(),
	)
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

useBuilder()
	.createRoute("POST", "/users", new IgnoreByTypeCodegenDescription())
	.extract({
		body: zod.object({
			name: zod.string(),
			email: zod.string(),
		}),
	})
	.presetCheck(
		IWantUserNameIsAvailable,
		(pickup) => pickup("body").name,
	)
	.handler(
		async(pickup) => {
			const { name, email } = pickup("body");

			const createdUser = await MyDataBase.create(
				"user",
				{
					name,
					email,
				},
			);

			return new OkHttpResponse("user.create", createdUser);
		},
		makeResponseContract(OkHttpResponse, "user.create", userSchema),
	);
