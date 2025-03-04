import "@duplojs/node/globals";
import { useRouteBuilder } from "@duplojs/core";
import { generateTypeFromRoutes } from "@duplojs/types-codegen";
import "@routes";

const routes = [...useRouteBuilder.getAllCreatedRoute()];
const generatedTypes = generateTypeFromRoutes(routes);

console.log(generatedTypes);
