import { iWantListExistById, iWantListNameIsAvailable } from "@checkers/list";
import { MyDataBase } from "@providers/myDataBase";
import { listSchema } from "@schemas/list";

useBuilder()
	.createRoute("GET", "/lists/{listId}")
	.extract({
		params: {
			listId: zod.coerce.number(),
		},
		query: {
			test: zod.string().optional(),
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
	.createRoute("GET", "/lists")
	.handler(
		async() => {
			const lists = await MyDataBase.find("list");

			return new OkHttpResponse("lists.get", lists);
		},
		makeResponseContract(OkHttpResponse, "lists.get", listSchema.array()),
	);
