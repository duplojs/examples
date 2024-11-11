import { useBuilder, zod, OkHttpResponse } from "@duplojs/core";
import { iWantUserExist, iWantUserExistById } from ".";
import { inputUserExist } from "../multi-input";

useBuilder()
	.createRoute("GET", "/user/{userId}")
	.extract({
		params: {
			userId: zod.coerce.number(),
		},
	})
	.presetCheck(
		iWantUserExistById,
		(pickup) => pickup("userId"),
	)
	.handler(
		(pickup) => {
			const user = pickup("user");

			return new OkHttpResponse("user.found", user);
		},
	);

useBuilder()
	.createRoute("GET", "/user/{userId}")
	.extract({
		params: {
			userId: zod.coerce.number(),
		},
	})
	.presetCheck(
		iWantUserExistById.rewriteIndexing("currentUser"),
		(pickup) => pickup("userId"),
	)
	.handler(
		(pickup) => {
			const currentUser = pickup("currentUser");

			return new OkHttpResponse("user.found", currentUser);
		},
	);

useBuilder()
	.createRoute("GET", "/user/{userId}")
	.extract({
		params: {
			userId: zod.coerce.number(),
		},
	})
	.presetCheck(
		iWantUserExist.transformInput(inputUserExist.id),
		(pickup) => pickup("userId"),
	)
	.handler(
		(pickup) => {
			const user = pickup("user");

			return new OkHttpResponse("user.found", user);
		},
	);
