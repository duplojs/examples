import { makeResponseContract, NotFoundHttpResponse, OkHttpResponse, useBuilder, zod, type ZodSpace } from "@duplojs/core";
import { messageSchema } from "./schema";
import { iWantUserExist } from "./checker";

useBuilder()
	.createRoute("POST", "/users/{receiverId}/messages")
	.extract({
		headers: {
			userId: zod.coerce.number(),
		},
		params: {
			receiverId: zod.coerce.number(),
		},
	})
	.presetCheck(
		iWantUserExist,
		(pickup) => pickup("userId"),
	)
	.presetCheck(
		iWantUserExist
			.rewriteIndexing("receiver")
			.redefineCatch(
				() => new NotFoundHttpResponse("receiver.notfound"),
				makeResponseContract(NotFoundHttpResponse, "receiver.notfound"),
			),
		(pickup) => pickup("receiverId"),
	)
	.extract({
		body: zod.object({
			content: zod.string(),
		}).strip(),
	})
	.handler(
		(pickup) => {
			const { user, receiver, body } = pickup(["user", "receiver", "body"]);

			const postedMessage: ZodSpace.infer<typeof messageSchema> = {
				senderId: user.id,
				receiverId: receiver.id,
				content: body.content,
				postedAt: new Date(),
			};

			return new OkHttpResponse("message.posted", postedMessage);
		},
		makeResponseContract(OkHttpResponse, "message.posted", messageSchema),
	);
