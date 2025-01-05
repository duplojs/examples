import { IWantUserExistByName, iWantUserNameIsAvailable } from "@checkers/user";
import { envs } from "@envs";
import { MyDataBase } from "@providers/myDataBase";
import { AccessTockenService } from "@services/accessToken";
import bcrypt from "bcrypt";

useBuilder()
	.createRoute("POST", "/users")
	.extract({
		body: zod.object({
			name: zod.string(),
			password: zod.string(),
		}),
	})
	.presetCheck(
		iWantUserNameIsAvailable,
		(pickup) => pickup("body").name,
	)
	.handler(
		async(pickup) => {
			const { body } = pickup(["body"]);

			const hashedPassword = await bcrypt.hash(
				body.password,
				envs.SALT,
			);

			await MyDataBase.create(
				"user",
				{
					name: body.name,
					password: hashedPassword,
				},
			)
				.then(
					({ id: userId }) => MyDataBase.create(
						"personalData",
						{
							userId,
							data: "",
						},
					),
				);

			return new NoContentHttpResponse("user.created");
		},
		makeResponseContract(NoContentHttpResponse, "user.created"),
	);

useBuilder()
	.createRoute("POST", "/login")
	.extract({
		body: zod.object({
			name: zod.string(),
			password: zod.string(),
		}),
	})
	.presetCheck(
		IWantUserExistByName.rewriteIndexing("user"),
		(pickup) => pickup("body").name,
	)
	.cut(
		async({ pickup, dropper }) => {
			const { user, body } = pickup(["user", "body"]);

			const passwordMatch = await bcrypt.compare(
				body.password,
				user.password,
			);

			if (!passwordMatch) {
				return new UnauthorizedHttpResponse("password.wrong");
			}

			return dropper(null);
		},
		[],
		makeResponseContract(UnauthorizedHttpResponse, "password.wrong"),
	)
	.handler(
		(pickup) => {
			const { user } = pickup(["user"]);

			const accessToken = AccessTockenService.generate({ userId: user.id });

			return new OkHttpResponse("accessTocken.updated", accessToken);
		},
		makeResponseContract(OkHttpResponse, "accessTocken.updated", zod.string()),
	);
