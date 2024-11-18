import { makeResponseContract, OkHttpResponse, useBuilder } from "@duplojs/core";
import { messageSchema } from "./schema";

useBuilder()
	.createRoute("POST", "/messages")
	.handler(
		(pickup) => {
			const {} = pickup([]);
			// action to post message

			return new OkHttpResponse("message.posted");
		},
		makeResponseContract(OkHttpResponse, "message.posted", messageSchema),
	);
