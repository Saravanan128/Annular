const playwright = require('playwright')
const { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout, AfterStep } = require('@cucumber/cucumber')
const timeoutData = require('../config/data.json');;

const traceRecorder = true

const timeout = timeoutData.waitTime;
setDefaultTimeout(timeout);

BeforeAll(async () => {
  global.browser = await playwright['chromium'].launch({ headless: false, slowMo: 1000 });
  console.log('Browser has launched')
})

AfterAll(async () => {
  await global.browser.close()
  console.log('Browser has Closed')
})

Before(async function (scenario) {
 global.context = await global.browser.newContext({ viewport: { width: 1280, height: 720, } })
  
  //  global.context = await global.browser.newContext({
  // viewport: {
  //   width: 1280,
  //   height: 720,
  // },
  // recordVideo: {
  //   dir: `./report_cucumber/videos/${scenario.pickle.name}.webm`
  // },
  // })

  if (traceRecorder == true) { await global.context.tracing.start({ screenshots: true, snapshots: true }); }
  global.page = await global.context.newPage();
  // await global.page.viewport({ width: 1280, height: 720 });
})

After(async () => {
  await global.page.close()
  await global.context.close()
  console.log('context and page has closed')
})

After(async function (scenario) {
  if (scenario.result.status === Status.PASSED) {
    // console.log('Passed  scenarios name has printed ==>  ' + `${scenario.pickle.name}`)
    if (traceRecorder == true) { const trace = await global.context.tracing.stop({ path: `./reports/trace/${scenario.pickle.name}.zip` }); }
  }

  else {
    const ref = await global.page.screenshot({ path: `reports/failedScreenshot/${scenario.pickle.name}.png`, fullPage: true });
    // console.log('Failed  scenarios name has printed and screenShots taken  ==>  /' + `${scenario.pickle.name}`)
    this.attach(ref, 'image/png', scenario.pickle.name);
    if (traceRecorder == true) { const trace = await global.context.tracing.stop({ path: `./reports/trace/${scenario.pickle.name}.zip` }); }

  }
})