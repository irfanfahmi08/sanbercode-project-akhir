const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    baseUrl: "https://opensource-demo.orangehrmlive.com/web/index.php"
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
