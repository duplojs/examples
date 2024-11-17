/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import { OkHttpResponse, Response, zod, makeResponseContract, ForbiddenHttpResponse } from "@duplojs/core";

new Response(200, "SuperInfo", zod.undefined());
// same as
new OkHttpResponse("SuperInfo", zod.undefined());
// same as
makeResponseContract(OkHttpResponse, "SuperInfo")[0];

new OkHttpResponse(
	"SuperInfo",
	zod.object({
		id: zod.string(),
		name: zod.string(),
	}),
);
// same as
makeResponseContract(
	OkHttpResponse,
	"SuperInfo",
	zod.object({
		id: zod.string(),
		name: zod.string(),
	}),
)[0];

<const>[
	new ForbiddenHttpResponse("token.expire", zod.undefined()),
	new ForbiddenHttpResponse("token.invalide", zod.undefined()),
];
// same as
makeResponseContract(ForbiddenHttpResponse, ["token.expire", "token.invalide"]);
