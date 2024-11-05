import { ConflictHttpResponse, CreatedHttpResponse, useBuilder, zod } from "@duplojs/core";
import { compareDateCheck } from ".";

useBuilder()
	.createRoute("POST", "/event")
	.extract({
		body: zod.object({
			name: zod.string(),
			date: zod.coerce.date(),
		}).strip(),
	})
	.check(
		compareDateCheck,
		{
			input: (pickup) => ({ compared: pickup("body").date }),
			options: { compareType: "greater" }, // override default options
			result: "valid",
			catch: () => new ConflictHttpResponse("event.expire"),
		},
	)
	.handler(
		(pickup) => {
			const { name, date } = pickup("body");

			const event = {
				id: 1,
				name,
				date,
			};

			return new CreatedHttpResponse("event.created", event);
		},
	);
