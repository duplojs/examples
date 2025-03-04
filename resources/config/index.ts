import "@duplojs/node";
import { Duplo, NotFoundHttpResponse, UnprocessableEntityHttpResponse, useProcessBuilder, useRouteBuilder } from "@duplojs/core";
import { myPlugin } from "./plugin";

const duplo = new Duplo({
	environment: "DEV",
	port: 1506,
	host: "localhost",
	plugins: [myPlugin({ disabledOptimization: true })],
	bodySizeLimit: "5mb",
	recieveFormDataOptions: {
		uploadDirectory: "/my-super-folder",
	},
});

duplo.register(...useProcessBuilder.getAllCreatedProcess());
duplo.register(...useRouteBuilder.getAllCreatedRoute());

duplo.hook("beforeRouteExecution", (request) => {
	console.log(request.method, request.path);
});

duplo.hook("onError", (request, error) => {
	console.log("Error !");
});

duplo.hook("onStart", (instance) => {
	console.log("Server is Ready !");
});

duplo.setNotfoundHandler((request) => new NotFoundHttpResponse("not_found"));

duplo.setExtractError((type, key, error) => new UnprocessableEntityHttpResponse("bad type"));

await duplo.launch();
