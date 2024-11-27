import { makeResponseContract, NoContentHttpResponse, OkHttpResponse, useBuilder, zod } from "@duplojs/core";
import { iWantUserExistById } from "../do-check/preset";
import { userSchema } from "./schema";
import { mustBeConnected, mustBeConnectedBuilder, mustBeConnectedProcess } from "./process";

useBuilder()
	.createRoute("GET", "/user")
	.execute(
		mustBeConnectedProcess,
		{
			pickup: ["contentAuthorization"],
		},
	)
	.presetCheck(
		iWantUserExistById,
		(pickup) => pickup("contentAuthorization").id,
	)
	.handler(
		(pickup) => {
			const { user } = pickup(["user"]);

			return new OkHttpResponse("user.getSelf", user);
		},
		makeResponseContract(OkHttpResponse, "user.getSelf", userSchema),
	);

mustBeConnected
	.createRoute("GET", "/users/{userId}")
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
			const { user } = pickup(["user"]);

			return new OkHttpResponse("user.get", user);
		},
		makeResponseContract(OkHttpResponse, "user.get", userSchema),
	);

mustBeConnectedBuilder({ role: "admin" })
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
	.handler(
		(pickup) => {
			const { user } = pickup(["user"]);

			// action

			return new NoContentHttpResponse("user.delete");
		},
		makeResponseContract(NoContentHttpResponse, "user.delete"),
	);
