import { createProcess, ForbiddenHttpResponse, makeResponseContract, useBuilder, zod } from "@duplojs/core";
import { valideTokenCheck } from "./checker";

interface MustBeConnectedOptions {
	role: "user" | "admin";
}

export const mustBeConnectedProcess = createProcess(
	"mustBeConnected",
	{
		options: <MustBeConnectedOptions>{
			role: "user",
		},
	},
)
	.extract(
		{
			headers: {
				authorization: zod.string(),
			},
		},
		() => new ForbiddenHttpResponse("authorization.missing"),
	)
	.check(
		valideTokenCheck,
		{
			input: (pickup) => pickup("authorization"),
			result: "token.valide",
			catch: () => new ForbiddenHttpResponse("authorization.invalide"),
			indexing: "contentAuthorization",
		},
		makeResponseContract(ForbiddenHttpResponse, "authorization.invalide"),
	)
	.cut(
		({ pickup, dropper }) => {
			const { contentAuthorization, options } = pickup(["contentAuthorization", "options"]);

			if (contentAuthorization.role !== options.role) {
				return new ForbiddenHttpResponse("authorization.wrongRole");
			}

			return dropper(null);
		},
		[],
		makeResponseContract(ForbiddenHttpResponse, "authorization.wrongRole"),
	)
	.exportation(["contentAuthorization"]);

export function mustBeConnectedBuilder(options: MustBeConnectedOptions) {
	return useBuilder()
		.preflight(
			mustBeConnectedProcess,
			{
				options,
				pickup: ["contentAuthorization"],
			},
		);
}
