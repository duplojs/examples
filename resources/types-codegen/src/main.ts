import "@duplojs/node/globals";
import { Duplo, useRouteBuilder } from "@duplojs/core";

import "@routes";

const duplo = new Duplo({
	environment: "TEST",
});

duplo.register(...useRouteBuilder.getAllCreatedRoute());
