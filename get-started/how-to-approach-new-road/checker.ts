import { createPresetChecker, NotFoundHttpResponse } from "@duplojs/core";
import { userExistCheck } from "../do-check/simple";

export const iWantUserExist = createPresetChecker(
	userExistCheck,
	{
		result: "user.exist",
		catch: () => new NotFoundHttpResponse("user.notfound"),
		indexing: "user",
	},
);
