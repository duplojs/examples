import { type GetTypeInput } from "@duplojs/core";
import { MyDataBase } from "@providers/myDataBase";

interface ListInput {
	id: number;
	name: string;
}

export const listInput = createTypeInput<ListInput>();

const listExistCheck = createChecker("listExist")
	.handler(
		async(input: GetTypeInput<typeof listInput>, output) => {
			const list = await MyDataBase.findOne(
				"list",
				{ [input.inputName]: input.value },
			);

			if (!list) {
				return output("list.notExist", null);
			} else {
				return output("list.exist", list);
			}
		},
	);

export const iWantListExistById = createPresetChecker(
	listExistCheck,
	{
		result: "list.exist",
		catch: () => new NotFoundHttpResponse("list.notfound"),
		transformInput: listInput.id,
	},
	makeResponseContract(NotFoundHttpResponse, "list.notfound"),
);

export const iWantListNameIsAvailable = createPresetChecker(
	listExistCheck,
	{
		result: "list.notExist",
		catch: () => new ConflictHttpResponse("list.alreadyUse"),
		transformInput: listInput.name,
	},
	makeResponseContract(ConflictHttpResponse, "list.alreadyUse"),
);

