const common = `
    --require setup/assertions.js
    --require setup/hooks.js
    --require step-definitions/**/*.step.js
    --require config
    --format summary  
    --require progress-bar
    --require package.json  
    --require playwright.config.js  
    --publish-quiet  
    --format @cucumber/pretty-formatter
    --format json:report_cucumber/cucumber-html-report.json
    --format html:report_cucumber/cucumber-html-report.html     
    `

module.exports = {
  //default: `${common} features/**/*.feature`,
  default: `${common} features/BaiscAuthentication.feature`,
}