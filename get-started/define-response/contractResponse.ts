/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import { OkHttpResponse, Response, zod, makeResponseContract, ForbiddenHttpResponse } from "@duplojs/core";

new Response(200, "SuperInfo", zod.undefined());
// same as
new OkHttpResponse("SuperInfo", zod.undefined());

new OkHttpResponse(
	"SuperInfo",
	zod.object({
		id: zod.string(),
		name: zod.string(),
	}),
);

<const>[
	new ForbiddenHttpResponse("token.expire", zod.undefined()),
	new ForbiddenHttpResponse("token.invalide", zod.undefined()),
];
// same as
makeResponseContract(ForbiddenHttpResponse, ["token.expire", "token.invalide"], zod.undefined());
