import { CreatedHttpResponse, useBuilder, zod } from "@duplojs/core";

useBuilder()
	.createRoute("POST", "/user")
	.extract({
		// You can access "Request" properties, defined in the Request object
		// returned by useBuilder function, in the object your giving to extract method.
		body: zod.object({
			userName: zod.string(),
			email: zod.string(),
			age: zod.coerce.string(),
		// using strip method to remove ts(2589) error, doesn't change default behavior.
		}).strip(),
		// if schema parsing returns an error its returning 422 http code.
	})
	.handler(
		(pickup) => {
			const { userName, email, age } = pickup("body");

			const user = {
				id: 1,
				userName,
				email,
				age,
			};

			return new CreatedHttpResponse(
				"user.created",
				// return the user created.
				user,
			);
		},
	);

