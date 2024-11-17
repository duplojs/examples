import { useBuilder, zod, ForbiddenHttpResponse, NoContentHttpResponse } from "@duplojs/core";
import { iWantUserExistById } from "../preset";

useBuilder()
	.createRoute("DELETE", "/users/{userId}")
	.extract({
		params: {
			userId: zod.coerce.number(),
		},
	})
	.presetCheck(
		iWantUserExistById,
		(pickup) => pickup("userId"),
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
	)
	.handler(
		(pickup) => {
			const { id } = pickup("user");

			// action to delete user

			return new NoContentHttpResponse("user.deleted");
		},
	);
