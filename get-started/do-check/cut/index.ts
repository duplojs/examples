import { useBuilder, zod, OkHttpResponse } from "@duplojs/core";
import { iWantUserExistByEmail } from "../preset";

useBuilder()
	.createRoute("POST", "/login")
	.extract({
		body: zod.object({
			email: zod.string(),
			password: zod.string()
		}).strip(),
	})
	.presetCheck(
		iWantUserExistByEmail,
		(pickup) => pickup("body").email,
	)
	.cut(
		({ pickup, dropper }) => {
			const { password } = pickup("user");

			return {
				token: "MySuperToken"
			}
		},
		["token"],
	)
	.handler(
		(pickup) => {
			const user = pickup("user");

			return new OkHttpResponse("user.found", user);
		},
	);