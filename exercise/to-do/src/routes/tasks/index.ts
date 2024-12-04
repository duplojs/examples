import { iWantListExistById } from "@checkers/list";
import { iWantTaskExistById, iWantTaskTitleIsAvailable } from "@checkers/task";
import { makeResponseContract } from "@duplojs/core";
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
	.createRoute("POST", "/tasks")
	.extract({
		body: zod.object({
			listId: zod.number(),
			title: zod.string(),
			description: zod.string(),
			completed: zod.boolean(),
		}),
	})
	.presetCheck(
		iWantListExistById,
		(pickup) => pickup("body").listId,
	)
	.presetCheck(
		iWantTaskTitleIsAvailable,
		(pickup) => pickup("body").title,
	)
	.handler(
		async(pickup) => {
			const { body } = pickup(["body"]);

			const newTask = await MyDataBase.create("task", body);

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
	.handler(
		async(pickup) => {
			const { body, task } = pickup(["body", "task"]);

			const updatedTask = await MyDataBase.update(
				"task",
				task.id,
				body,
			);

			return new CreatedHttpResponse("task.update", updatedTask);
		},
		makeResponseContract(CreatedHttpResponse, "task.update", taskSchema),
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
