import { Duplo, useRouteBuilder } from "@duplojs/core";
import "./route";

const duplo = new Duplo({
	environment: "TEST",
});

duplo.register(...useRouteBuilder.getAllCreatedRoute());
