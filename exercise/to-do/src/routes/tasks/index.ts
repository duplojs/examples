import { iWantListExistById } from "@checkers/list";
import { iWantTaskExistById, iWantTaskTitleIsAvailable } from "@checkers/task";
import { MyDataBase } from "@providers/myDataBase";
import { taskSchema } from "@schemas/task";

useBuilder()
	.createRoute("GET", "/tasks/{taskId}")
	.extract({
		params: {
			taskId: zod.coerce.number(),
		},
	})
	.presetCheck(
		iWantTaskExistById.rewriteIndexing("task"),
		(pickup) => pickup("taskId"),
	)
	.handler(
		(pickup) => {
			const { task } = pickup(["task"]);
			return new OkHttpResponse("task.get", task);
		},
		makeResponseContract(OkHttpResponse, "task.get", taskSchema),
	);

useBuilder()
	.createRoute("POST", "/lists/{listId}/tasks")
	.extract({
		params: {
			listId: zod.number(),
		},
		body: zod.object({
			title: zod.string(),
			description: zod.string(),
		}),
	})
	.presetCheck(
		iWantListExistById.rewriteIndexing("list"),
		(pickup) => pickup("listId"),
	)
	.presetCheck(
		iWantTaskTitleIsAvailable,
		(pickup) => pickup("body").title,
	)
	.handler(
		async(pickup) => {
			const { body, list } = pickup(["body", "list"]);

			const newTask = await MyDataBase.create(
				"task",
				{
					...body,
					listId: list.id,
					completed: false,
				},
			);

			return new CreatedHttpResponse("task.create", newTask);
		},
		makeResponseContract(CreatedHttpResponse, "task.create", taskSchema),
	);

useBuilder()
	.createRoute("PATCH", "/tasks/{taskId}")
	.extract({
		params: {
			taskId: zod.coerce.number(),
		},
		body: zod.object({
			title: zod.string().optional(),
			description: zod.string().optional(),
			completed: zod.boolean().optional(),
		}),
	})
	.presetCheck(
		iWantTaskExistById.rewriteIndexing("task"),
		(pickup) => pickup("taskId"),
	)
	.presetCheck(
		iWantTaskTitleIsAvailable,
		(pickup) => pickup("body").title,
	)
	.handler(
		async(pickup) => {
			const { body, task } = pickup(["body", "task"]);

			const updatedTask = await MyDataBase.update(
				"task",
				task.id,
				body,
			);

			return new OkHttpResponse("task.update", updatedTask);
		},
		makeResponseContract(OkHttpResponse, "task.update", taskSchema),
	);

useBuilder()
	.createRoute("GET", "/lists/{listId}/tasks")
	.extract({
		params: {
			listId: zod.coerce.number(),
		},
	})
	.presetCheck(
		iWantListExistById.rewriteIndexing("list"),
		(pickup) => pickup("listId"),
	)
	.handler(
		async(pickup) => {
			const { list } = pickup(["list"]);

			const tasks = await MyDataBase.find("task", { listId: list.id });

			return new OkHttpResponse("list.tasks.get", tasks);
		},
		makeResponseContract(OkHttpResponse, "list.tasks.get", taskSchema.array()),
	);
