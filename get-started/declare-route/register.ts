import { Duplo } from "@duplojs/core";
import { myRoute } from "./route";

const duplo = new Duplo({
	environment: "TEST",
});

duplo.register(myRoute);
