const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://front.serverest.dev/",
    setupNodeEvents(on, config) {
      // event listeners, se precisar
    },
  },
  env: {
    apiUrl: "https://serverest.dev"
  },
  video: true,
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",
});
