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

export const IWantUserExistById = createPresetChecker(
	userExistCheck,
	{
		transformInput: userExistInput.id,
		result: "user.exist",
		catch: () => new NotFoundHttpResponse("user.notfound"),
		indexing: "user",
	},
	makeResponseContract(NotFoundHttpResponse, "user.notfound"),
);
