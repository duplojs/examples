import { type GetTypeInput } from "@duplojs/core";
import { MyDataBase, type User } from "@providers/myDataBase";

interface UserExistInput {
	id: number;
	name: string;
}

const userExistInput = createTypeInput<UserExistInput>();

const userExistCheck = createChecker("userExist")
	.handler(
		async(input: GetTypeInput<typeof userExistInput>, output) => {
			const by: Partial<User> = {
				...(input.inputName === "name" && {
					name: input.value,
				}),
				...(input.inputName === "id" && {
					id: input.value,
				}),
			};

			const user = await MyDataBase.findOne(
				"user",
				by,
			);

			if (user) {
				return output("user.exist", user);
			} else {
				return output("user.notfound", null);
			}
		},
	);

export const iWantUserNameIsAvailable = createPresetChecker(
	userExistCheck,
	{
		transformInput: userExistInput.name,
		result: "user.notfound",
		catch: () => new ConflictHttpResponse("user.name.alreadyUse"),
	},
	makeResponseContract(ConflictHttpResponse, "user.name.alreadyUse"),
);

export const IWantUserExist = createPresetChecker(
	userExistCheck,
	{
		result: "user.exist",
		catch: () => new NotFoundHttpResponse("user.notfound"),
	},
	makeResponseContract(NotFoundHttpResponse, "user.notfound"),
);

export const IWantUserExistByName = IWantUserExist
	.transformInput(userExistInput.name);

export const IWantUserExistById = IWantUserExist
	.transformInput(userExistInput.id);
