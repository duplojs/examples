import { MyDataBase } from "@providers/myDataBase";
import { productSchema } from "@schemas/product";

useBuilder()
	.createRoute("GET", "/products")
	.handler(
		async() => {
			const products = await MyDataBase.find("product");

			return new OkHttpResponse("products.found", products);
		},
		makeResponseContract(OkHttpResponse, "products.found", productSchema.array()),
	);
