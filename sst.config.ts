import { SSTConfig } from "sst";
// import { API } from "./stacks/apiKey-api"
import { API } from "./stacks/authenticated_api"
import { Container } from "./stacks/ecs_fargate";
import { CDKandSST } from "./stacks/cdk_with_sst";

export default {
  config(_input) {
    return {
      name: "sst-recipes",
      region: "us-east-1",
    };
  },
  stacks(app) {
    if (app.stage !== "prod") {
      app.setDefaultRemovalPolicy("destroy");
    }
    app.stack(API);
  }
} satisfies SSTConfig;
