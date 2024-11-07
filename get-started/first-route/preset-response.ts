/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Response, OkHttpResponse } from "@duplojs/core";

// output: true
console.log(new OkHttpResponse(undefined) instanceof Response);

const presetReponse = new OkHttpResponse("OK", "Hello, World!");
// same as
const reponse = new Response(200, "OK", "Hello, World!");

class MyCustomResponse<
	GenericInformation extends string | undefined = undefined,
	GenericBody extends unknown = undefined,
> extends Response<
		typeof MyCustomResponse.code,
		GenericInformation,
		GenericBody
	> {
	public constructor(
		information: GenericInformation = undefined as GenericInformation,
		body: GenericBody = undefined as GenericBody,
	) {
		super(MyCustomResponse.code, information, body);

		this.setHeader("Cache-Control", "max-age=3600");
		this.setHeader("My-Super-Header", "my-super-value");
	}

	public static code = 200;
}

const myCustomResponse = new MyCustomResponse();
