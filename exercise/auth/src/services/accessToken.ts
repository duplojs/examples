import { type ZodSpace } from "@duplojs/core";
import { envs } from "@envs";
import jwt from "jsonwebtoken";

export class AccessTockenService {
	public static schecma = zod.object({
		userId: zod.number(),
	});

	public static check(payload: string) {
		try {
			const data = jwt.verify(payload, envs.ACCESS_TOKEN_KEY);

			return this.schecma.parse(data);
		} catch {
			return false;
		}
	}

	public static generate(data: ZodSpace.infer<typeof AccessTockenService.schecma>) {
		return jwt.sign(
			data,
			envs.ACCESS_TOKEN_KEY,
			{
				expiresIn: "30m",
			},
		);
	}
}
