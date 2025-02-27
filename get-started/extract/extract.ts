import { zod, useBuilder } from "@duplojs/core";

export const myFunctionName = useBuilder()
	.createRoute("GET", "/my-path/{id}")
	.extract({
		params: {
			id: zod.number(),
		},
		query: {
			page: zod.coerce.number(),
		},
		body: {
			youpi: zod.string(),
			isYoupi: zod.boolean(),
		},
	})
	.handler(
		(pickup) => {
			pickup("id"); // "id" en paramètre de l'uri (uri parameter)
			pickup("youpi"); // "youpi" du body
			pickup("isYoupi"); // "isYoupi" du body
			pickup("page"); // "page" du paramètre de la requête (query parameter)
		},
	);

//on peut aussi faire
export const myFunctionName2 = useBuilder()
	.createRoute("GET", "/my-path/{id}")
	.extract({
		params: {
			id: zod.number(),
		},
		query: {
			page: zod.coerce.number(),
		},
		body: zod.object({
			youpi: zod.string(),
			isYoupi: zod.boolean(),
		}),
	})
	.handler(
		(pickup) => {
			pickup("id"); // "id" en paramètre de l'uri (uri parameter)
			pickup("body"); // body de la requête (objet contenant "youpi" et "isYoupi")
			pickup("page"); // "page" du paramètre de la requête (query parameter)
		},
	);
