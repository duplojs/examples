import { type GetTypeInput, makeResponseContract } from "@duplojs/core";
import { MyDataBase } from "@providers/myDataBase";

interface TaskInput {
	id: number;
	title: string;
}

export const taskInput = createTypeInput<TaskInput>();

const taskExistCheck = createChecker("taskExist")
	.handler(
		async(input: GetTypeInput<typeof taskInput>, output) => {
			const task = await MyDataBase.findOne(
				"task",
				{ [input.inputName]: input.value },
			);

			if (!task) {
				return output("task.notExist", null);
			} else {
				return output("task.exist", task);
			}
		},
	);

export const iWantTaskExistById = createPresetChecker(
	taskExistCheck,
	{
		result: "task.exist",
		catch: () => new NotFoundHttpResponse("task.notfound"),
		transformInput: taskInput.id,
	},
	makeResponseContract(NotFoundHttpResponse, "task.notfound"),
);

export const iWantTaskTitleIsAvailable = createPresetChecker(
	taskExistCheck,
	{
		result: "task.notExist",
		catch: () => new NotFoundHttpResponse("task.alreadyUse"),
		transformInput: taskInput.title,
	},
	makeResponseContract(NotFoundHttpResponse, "task.alreadyUse"),
);

