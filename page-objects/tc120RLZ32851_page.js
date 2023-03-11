const playwright = require('playwright')

class SaavasPage {
  async LETS_CODE_MULTIWINDOW() {
    return await page.goto(global.LETS_CODE_WINDOW);
  }
  async IRCTC_BaseUrl() {
    return await page.goto(global.IRCTC_URL);
  }

 async AuthBaseUrl() {
    return await page.goto(global.BASIC_AUTHEN_URL);
  }
  async LetsCodeBaseUrl() {
    return await page.goto(global.LETS_CODE_SELECTABLE);
  }
  async LetsCodeFormUrl() {
    return await page.goto(global.LETS_CODE_CALENDAR);
  }
  async saavasBaseUrl() {
    return await page.goto(global.BASE_URL);
  }
async TestLeafEnterUserName(Username)
{
  return await page.locator("//input[@id='j_idt88:name']").fill(Username);
}
async TestLeafAppendCountryName(AppendCountry)
{
  const textbox = await page.$("//input[@id='j_idt88:j_idt91']");

// Get the current value of the textbox
const currentValue = await textbox.inputValue();
console.log(currentValue);

// Append text to the current value
//const additionalText = '  India';
const newValue = currentValue + AppendCountry;

// Set the textbox's value to the new value
return await textbox.fill(currentValue + AppendCountry);
  //return await page.locator("//input[@id='j_idt88:name']").fill(AppendCountry);
}
async TestLeafCheckDisabled()
{
  const btn=await page.$("//input[@id='j_idt88:j_idt93']");
  const btnn= await btn.isDisabled();
  return expect (btnn).to.be.true;
}
async TestLeafClearText()
{
  await page.locator("//input[@id='j_idt88:j_idt95']").clear();
}
async SliderValue(SliderValue)
{
return await page.locator("//input[@id='j_idt106:slider']").fill(SliderValue);
}
  async EnterSaavaasUserName(UserName) {
    return await page.locator('[id="username"]').fill(UserName);
  }
  async EnterName1(Name1) {
    return await page.locator("//input[@id='j_idt106:auto-complete_input']").fill(Name1);
  }
  async EnterName2(Name2) {
    return await page.locator("//input[@id='j_idt106:auto-complete_input']").fill(Name2);
  }
  async EnterName3(Name3) {
    return await page.locator("//input[@id='j_idt106:auto-complete_input']").fill(Name3);
  }
  
  async Password(_password) {
    await page.locator('[id="password"]').fill(_password);
  }
  async clickSumbit() {
    await page.locator('[id="signInBtn"]').click();
  }
  async currentPageUrl() {
    return await page.url();
  }
  async HelpSymbol() {
    await page.getByRole('button', { name: 'help' }).locator('svg').click();
  }
  // async HelpSymbol() {
  //   await page.evaluateHandle(() => {
  //     const navbar = document.querySelector('body > app-root > app-home > app-header > shell-cel-navbar');
  //     if (navbar) {
  //       const iconButton = navbar.document.querySelector('div.right-container > div:nth-child(3) > div > shell-cel-icon-button');
  //       if (iconButton) {
  //         const helpicon = iconButton.document.querySelector('button');
  //         if (helpicon) {
  //           return helpicon
  //         }
  //       }
  //     }   
  //   });
  //   await helpicon.click();
  // }
  // // async HelpSymbol() {
  //   //await page.getByRole('button', { name: 'help' }).locator('svg').click();
  //   // const shadowRoot = await this.getShadowElement(selector);
  //   // const button = await shadowRoot.evaluateHandle((root) => root.querySelector('button'));
  //   // await button.click();
  //   const shadowRoot = await page.evaluateHandle((selector))
  //   const button = await shadowRoot.querySelector('button');
  //   await button.click();
  // }
  // async HelpSymbol() {
  //   const shadow2 = await page.evaluateHandle(async () => {
  //     document.querySelector('[class="right-container"]');
  //     const shadow1 = await shadow2.asElement().shadowRoot.querySelector('[class="icon-button center"]');
  //     const helpIconButton = shadow1.asElement().shadowRoot.querySelector('[class="icon-inner"]');
  //     await helpIconButton.click();
  // });


  // async HelpSymbol(selector) {
  //   const shadowRoot = await page.evaluateHandle(selector => {
  //     const element = document.querySelector(selector);
  //     return element.shadowRoot;
  //   }, selector);

  //   const button = await shadowRoot.$$('button');
  //   await button.click();
  // }
  //need to write shadowroot

  async userIDstatus() {
    return await page.locator('[id="usernameStatus"]').textContent();
  }
  async passwordStatus() {
    return await page.locator('[id="passwordStatus"]').textContent();
  }

  // async userIDstatus() {
  //   return await page.$eval('#usernameStatus', element => element.textContent);
  // }

  // async passwordStatus() {
  //   return await page.$eval('#passwordStatus', element => element.textContent);
  // }

  //**************************************** */
  async testleafUrl() {
    await page.goto('https://www.leafground.com/dashboard.xhtml');

  }
  async linkinedIn() {
    await page.goto('https://www.linkedin.com/');
  }

  async fillEmailadress() {
    await page.locator('[placeholder="E-mail Address"]').fill('kalai@annular.com');
  }

  async textmessageTeamAnnular() {
    await page.locator('textarea[role="textbox"]').fill('Team Annular');
  }

  async msgClicksumbit() {
    await page.locator('button[role="button"]:has-text("Send")').click();
  }

  async pause() {
    // Wait for 10 seconds

  }
  async take_screenshot() {
    // const ref1 = await global.page.screenshot({ path: `reports/vianame/${e.pickle}.png`, fullPage: true });//
    const ref = await global.page.screenshot({ path: `reports/TestScenario.png`, fullPage: true });

  }

  //******************* */
  async navigateToLoginScreen() {
    await page.goto('https://www.google.com/');
    //await page.locator('[aria-label="Search"]').click()
  }

  async enterTextSearchBox() {
    await page.locator('[aria-label="Search"]').click();
    await page.locator('[aria-label="Search"]').fill('linkedin');
    await page.waitForTimeout(3000)
  }

  async errormethod() {
    await page.wait('[dssfsd"Sesddarch"]').fill('linkedin')
  }

  async submitLoginForm() {
    await page.fill('#user-name', 'standard_user')
    await page.fill('#password', 'secret_sauce')
    await page.click('#login-button')
  }

  async submitLoginWithParameters(username, password) {
    await page.fill('#user-name', username)
    await page.fill('#password', password)
    await page.click('#login-button')
  }

  async assertUserIsLoggedIn() {
    await page.waitForSelector('.inventory_list')
  }

}

module.exports = { SaavasPage }
