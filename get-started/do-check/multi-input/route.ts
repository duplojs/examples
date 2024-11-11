import { useBuilder, zod, ConflictHttpResponse, OkHttpResponse, NotFoundHttpResponse, CreatedHttpResponse } from "@duplojs/core";
import { inputUserExist, userExistCheck } from ".";

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
			input: (pickup) => inputUserExist.id(pickup("userId")),
			result: "user.exist",
			indexing: "user",
			catch: () => new NotFoundHttpResponse("user.notfound"),
		},
	)
	.handler(
		(pickup) => {
			const user = pickup("user");
			return new OkHttpResponse("user.found", user);
		},
	);

useBuilder()
	.createRoute("POST", "/register")
	.extract({
		body: zod.object({
			email: zod.string().email(),
			password: zod.string(),
		}).strip(),
	})
	.check(
		userExistCheck,
		{
			input: (pickup) => inputUserExist.email(pickup("body").email),
			result: "user.notfound",
			catch: () => new ConflictHttpResponse("email.taken"),
		},
	)
	.handler(
		(pickup) => {
			const { email, password } = pickup("body");

			const user = {
				id: 1,
				email,
				password,
			};

			return new CreatedHttpResponse("user.created", user);
		},
	);
