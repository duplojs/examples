import { IWantUserExistById } from "@checkers/user";
import { createProcess } from "@duplojs/core";
import { AccessTockenService } from "@services/accessToken";

export const mustBeConnnectedProcess = createProcess("mustBeConnnected")
	.extract({
		headers: {
			"access-token": zod.string().optional(),
		},
	})
	.cut(
		({ pickup, dropper }) => {
			const accessToken = pickup("access-token");

			if (!accessToken) {
				return new ForbiddenHttpResponse("accessToken.missing");
			}

			return dropper({
				accessToken,
			});
		},
		["accessToken"],
		makeResponseContract(ForbiddenHttpResponse, "accessToken.missing"),
	)
	.cut(
		({ pickup, dropper }) => {
			const accessToken = pickup("accessToken");

			const data = AccessTockenService.check(accessToken);

			if (!data) {
				return new ForbiddenHttpResponse("accessToken.invalide");
			}

			return dropper({
				accessTokenContent: data,
			});
		},
		["accessTokenContent"],
		makeResponseContract(ForbiddenHttpResponse, "accessToken.invalide"),
	)
	.presetCheck(
		IWantUserExistById.rewriteIndexing("currentUser"),
		(pickup) => pickup("accessTokenContent").userId,
	)
	.exportation(["currentUser"]);

export function mustBeConnectedBuilder() {
	return useBuilder()
		.preflight(
			mustBeConnnectedProcess,
			{
				pickup: ["currentUser"],
			},
		);
}
