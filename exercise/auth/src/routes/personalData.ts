import { MyDataBase } from "@providers/myDataBase";
import { personalDataSchema } from "@schemas/personalData";
import { mustBeConnectedBuilder } from "@security/mustBeConnected";

mustBeConnectedBuilder()
	.createRoute("GET", "/personal-data")
	.handler(
		async(pickup) => {
			const { currentUser } = pickup(["currentUser"]);

			const personalDataEntity = await MyDataBase.findOneOrThrow(
				"personalData",
				{ userId: currentUser.id },
			);

			return new OkHttpResponse(
				"personalData.get",
				{
					data: personalDataEntity.data,
				},
			);
		},
		makeResponseContract(OkHttpResponse, "personalData.get", personalDataSchema),
	);

mustBeConnectedBuilder()
	.createRoute("PUT", "/personal-data")
	.extract({
		body: zod.string(),
	})
	.handler(
		async(pickup) => {
			const { body: personalData, currentUser } = pickup(["body", "currentUser"]);

			await MyDataBase.update(
				"personalData",
				currentUser.id,
				{ data: personalData },
			);

			return new OkHttpResponse(
				"personalData.get",
				{
					data: personalData,
				},
			);
		},
		makeResponseContract(OkHttpResponse, "personalData.get", personalDataSchema),
	);
