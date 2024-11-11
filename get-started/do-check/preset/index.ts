import { createPresetChecker, NotFoundHttpResponse } from "@duplojs/core";
import { inputUserExist, userExistCheck } from "../multi-input";

export const iWantUserExist = createPresetChecker(
	userExistCheck,
	{
		result: "user.exist",
		catch: () => new NotFoundHttpResponse("user.notfound"),
		indexing: "user",
	},
);

export const iWantUserExistById = createPresetChecker(
	userExistCheck,
	{
		result: "user.exist",
		catch: () => new NotFoundHttpResponse("user.notfound"),
		indexing: "user",
		transformInput: (input: number) => ({
			inputName: <const>"id",
			value: input,
		}),
	},
);

export const iWantUserExistByEmail = createPresetChecker(
	userExistCheck,
	{
		result: "user.exist",
		catch: () => new NotFoundHttpResponse("user.notfound"),
		transformInput: inputUserExist.email,
	},
);
