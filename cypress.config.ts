import { defineConfig } from "cypress";
import { install } from "@neuralegion/cypress-har-generator";

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      install(on);
    },
  },
});
