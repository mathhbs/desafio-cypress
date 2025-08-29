const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://front.serverest.dev/",
    retries: { runMode: 2, openMode: 0 },
    specPattern: "cypress/e2e/**/*.cy.js",
    video: true,
    viewportWidth: 1366,
    viewportHeight: 800,
  },
  env: {
    apiUrl: "https://serverest.dev",
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: false,   // não gera HTML aqui
    json: true,    // gera JSON por spec
    timestamp: "ddmmyyyy_HHMMss"
  }
});

