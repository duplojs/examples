import { iWantListExistById, iWantListNameIsAvailable } from "@checkers/list";
import { makeResponseContract } from "@duplojs/core";
import { MyDataBase } from "@providers/myDataBase";
import { listSchema } from "@schemas/list";
import { taskSchema } from "@schemas/task";

useBuilder()
	.createRoute("GET", "/lists/{listId}")
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
		(pickup) => {
			const { list } = pickup(["list"]);

			return new OkHttpResponse("list.get", list);
		},
		makeResponseContract(OkHttpResponse, "list.get", listSchema),
	);

useBuilder()
	.createRoute("POST", "/lists")
	.extract({
		body: zod.object({
			name: zod.string(),
		}),
	})
	.presetCheck(
		iWantListNameIsAvailable,
		(pickup) => pickup("body").name,
	)
	.handler(
		async(pickup) => {
			const { body } = pickup(["body"]);

			const newList = await MyDataBase.create("list", body);

			return new OkHttpResponse("list.create", newList);
		},
		makeResponseContract(OkHttpResponse, "list.create", listSchema),
	);

useBuilder()
	.createRoute("PATCH", "/lists/{listId}")
	.extract({
		params: {
			listId: zod.coerce.number(),
		},
		body: zod.object({
			name: zod.string().optional(),
		}),
	})
	.presetCheck(
		iWantListExistById.rewriteIndexing("list"),
		(pickup) => pickup("listId"),
	)
	.handler(
		async(pickup) => {
			const { body, list } = pickup(["body", "list"]);

			const updatedList = await MyDataBase.update(
				"list",
				list.id,
				body,
			);

			return new CreatedHttpResponse("task.update", updatedList);
		},
		makeResponseContract(CreatedHttpResponse, "task.update", listSchema),
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
