module.exports = {
  default: {
    require: [
      "src/support/**/*.ts",
  "src/stepDefinitions/**/*.ts",
  "src/hooks/**/*.ts"
    ],
    paths: [
      "generated-features/*.feature",
      
    ],
    requireModule: [
      "ts-node/register"
    ],
    format: [
      "progress",
      "json:reports/cucumber-report.json",
      "allure-cucumberjs/reporter"
    ],
    formatOptions: {
      resultsDir: "./allure-results"
    }
  }
}