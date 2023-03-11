const { Given, When, Then, defineStep } = require('@cucumber/cucumber')
const { SaavasPage } = require('../page-objects/tc120RLZ32851_page')
const { parseGherkinMessageStream } = require("@cucumber/cucumber");
const { setDefaultTimeout } = require('@cucumber/cucumber')
const timeoutData = require('../config/data.json');
const Encryptions = require('../config/encryptions');
const data = require('../config/data.json');
const playwright = require('playwright');
const ExcelJS = require('exceljs');
const { writeFile } = require('fs');
//var XLSX=require('@xlsx');
const timeout = timeoutData.waitTime;
setDefaultTimeout(timeout);

const saavaspage = new SaavasPage()
const encryptions = new Encryptions()

Given('User navigates to LetsCode WindowHandling Page', async () => {
  await saavaspage.LETS_CODE_MULTIWINDOW();
  console.log('URL is navigated');
});

Then('he performs action on multiwindow', async () => {
  const [newWindow] = await Promise.all([
    context.waitForEvent("page"),
    await page.click("//button[text()='Open Home Page']")
  ])
  await newWindow.waitForLoadState();
  const PagesOpened=newWindow.context().pages();
  console.log("No of tabs Opened are "+PagesOpened.length);
  const text=await newWindow.locator("//h1[text()=' Practice and become pro in test automation']").textContent();
  console.log(text);
  const Input=await newWindow.locator("//a[text()='Edit']").click();
  const Name=await newWindow.locator("//input[@id='fullName']").fill("annular");
 // await newWindow.close();//closes table tab
 await newWindow.goBack();
 const pratise=await newWindow.locator("//h1[contains(text(),'Practice and become pro')]");
 expect(pratise).to.exist;
 //const Multi_Select=await newWindow.locator("").click();

 //await newWindow.backButton.click();
 // await newWindow.bringToFront();//bring homepage to front
  //await newWindow.waitForTimeout(3000);
});

Given('User navigates to IRCTC Page', async () => {
  await saavaspage.IRCTC_BaseUrl();
  console.log('URL is navigated');
});
Then('Checks for Duplicate Values in ListBox', async () => {
  const Element = await page.locator("//i[@class='pi pi-server layout-menuitem-icon']").click();
  const dropdownOption = await page.locator("//i[@class='pi pi-fw pi-chevron-down layout-menuitem-icon']").click();
  //  Locate the dropdown element
  //const FavouriteUITooldropdown = await page.$('select.ui-selectonemenu');

// Find the listbox element and extract its values
const listBoxValues = await page.$$eval('select.ui-selectonemenu', options => options.map(option => option.value));

// Check for duplicates in the listbox values
const hasDuplicates = new Set(listBoxValues).size !== listBoxValues.length;

// Print the result
if (hasDuplicates) {
  console.log('The listbox contains duplicate values.');
} else {
  console.log('The listbox does not contain any duplicate values.');
}
});
Given('User navigates to Basic Authentiation', async () => {
  await saavaspage.AuthBaseUrl();
  console.log('URL is navigated');
});
Given('User navigates to TestLeaf dashboard page', async () => {
  await saavaspage.saavasBaseUrl();
  console.log('URL is navigated');
});

Given('User navigates to LetsCode Selectable Page', async () => {
  await saavaspage.LetsCodeBaseUrl();
  console.log('URL is navigated to letsCode selectable page');
});

Given('User navigates to LetsCode Form Page', async () => {
  await saavaspage.LetsCodeFormUrl();
  console.log('URL is navigated to LetsCode FormPage');
});
Then('User Checks Basic Authentiation', async () => {
const HomeButton=await page.locator("//i[@class='pi pi-home layout-menuitem-icon']").click();
const auth=await page.locator("//i[@class='pi pi-fw pi-sign-in layout-menuitem-icon']").click();
const BasicAuth=await page.locator("//span[@class='ui-button-text ui-c']").click();
 // Wait for the authentication dialog to appear
 await page.waitForSelector('dialog');
  
 // Enter the credentials into the authentication dialog
 await page.fill('input[type="text"]', 'admin');
 await page.fill('input[type="password"]', 'testleaf');
 await page.click('button[type="submit"]');
 
 // Wait for the page to reload after authentication
 await page.waitForNavigation();
});
Then('Selects the Elements one by one', async () => {
  //const selenium=await page.$("//h3[text()='Selenium']");
//await selenium.click();

await page.keyboard.press('Control');
await page.click("//h3[text()='Selenium']");
await page.click("//h3[text()='Protractor']");
await page.click("//h3[text()='Appium']");
await page.keyboard.up('Control');

});

Then('User Checks Whether he able to write data in json file', async () => {
  
// Create an object to write to the file
const data = {
  name: 'John Doe',
  age: 30,
  email: 'john.doe@example.com'
};

// Convert the object to a JSON string
const jsonData = JSON.stringify(data, null, 2);//null->no additional options r specified,2->no of indentataion(white space or tabs)

// Write the JSON data to a file
writeFile('../config/data.json', jsonData , (error) => 
{
//if (error) throw error;
  console.log('Data written to file!');
});
});
Then('Test User Handles Pagination', async () => {
 const NextButton=await page.locator("//a[@aria-label='Next Page']");
  const NextButtonClassBefore=NextButton.getAttribute('class');
  console.log(NextButtonClassBefore);
   const clas=await page.locator("//a[@class='ui-paginator-next ui-state-default ui-corner-all ui-state-disabled']");
  console.log(clas);
  while (await NextButton.isEnabled()) {

    const rows = await page.$$("//table[@role='grid']//tr");
  for (const row of rows) {
    const cells = await row.$$('td');//we r taking the table data
    for (const cell of cells) {
      const value = await cell.innerText();//and printing the values in table data 
      console.log(value);}}
      //await page.waitForTimeout(9000);
    await NextButton.click();
   // await page.waitForTimeout(9000);
    console.log("clicking");

  }


});
Then('User Handles Alert Simple Dialog', async () => {
  const globe = await page.locator("//i[@class='pi pi-globe layout-menuitem-icon']").click();
  const alertButton = await page.locator("//i[@class='pi pi-fw pi-clone layout-menuitem-icon']").click();
  const btn = await page.waitForSelector("//button[@id='j_idt88:j_idt91']")
  btn.click();
  //await page.locator("//button[@id='prompt']").click();
  const alert = await page.waitForEvent('dialog');
  const message = alert.message();
  await alert.accept();
  console.log("Message Present in Alert Box Is " + message);
  
});

Then('User Handle Alert Confirm Dialog', async () => {
 
  const btn = await page.waitForSelector("//button[@id='j_idt88:j_idt93']")
  btn.click();
  //await page.locator("//button[@id='prompt']").click();
  const alert = await page.waitForEvent('dialog');
  const message = alert.message();
  await alert.accept();
  console.log("Message Present in Alert Box Is " + message);
  //const ReturnToDashboard=await page.locator("//div[@class='layout-topbar']/a[1]").click();

});

Then('User Handle Sweet Alert', async () => {
  //  const globe=await page.locator("//i[@class='pi pi-globe layout-menuitem-icon']").click();
  //  const alertButton=await page.locator("//i[@class='pi pi-fw pi-clone layout-menuitem-icon']").click();
  const btn = await page.waitForSelector("//button[@id='j_idt88:j_idt95']")
  btn.click();
  const text = await page.locator("//p[contains(text(),'You have clicked and open a dialog that can be inspectable')]").textContent();
  console.log("Text Present  In Sweet Alert Is " + text);
  const Dismiss = await page.locator("//span[text()='Dismiss']").click();
  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
  // //await page.locator("//button[@id='prompt']").click();
  // const alert=await page.waitForEvent('dialog');
  // const message=alert.message();
  // await alert.accept();
  // console.log("Message Present in Alert Box Is "+message);
  //const ReturnToDashboard=await page.locator("//div[@class='layout-topbar']/a[1]").click();
  //p[contains(text(),'You have clicked and open a dialog that can be inspectable')]
});
Then('User Enters {string} in Name TextFeild', async (credential1) => {
  const Element = await page.locator("//i[@class='pi pi-server layout-menuitem-icon']").click();
  const TextBox = await page.locator("(//i[@class='pi pi-fw pi-check-square layout-menuitem-icon'])[1]").click();
  const Username = data[credential1];
  await saavaspage.TestLeafEnterUserName(Username);
});

Then('User Appends {string} to City TextFeild', async (credential2) => {
  const AppendCountry = data[credential2];
  await saavaspage.TestLeafAppendCountryName(AppendCountry);
});

Then('User Checks Whether CheckBox Is Disabled Or Not', async () => {
  await saavaspage.TestLeafCheckDisabled();
});

Then('User Clears The Text in the TextBox', async () => {
  await saavaspage.TestLeafClearText();
});



Then('User Reterives The Text In The TextBox', async () => {

  const TypedText = await page.$("//input[@id='j_idt88:j_idt97']");
  const TypedTextValue = await TypedText.getAttribute('value');
  console.log("Text Present in the TextBox is " + TypedTextValue)
});

Then('User Enters {string} and Check Slider Moves Accordingly Or not', async (credential3) => {
  const SliderValue = data[credential3];
  await saavaspage.SliderValue(SliderValue);
  const SliderEnteredValue = await page.locator("(//span[@tabindex=0])[87]");
  const SliderEnteredValueAttribute = await SliderEnteredValue.getAttribute('style');
  console.log("Style Value is " + SliderEnteredValueAttribute)
  if (SliderEnteredValueAttribute.includes(50)) {
    console.log("Slider Has Moved");
  }
  else {
    console.log("Slider Has Not  Moved");
  }
});

Then('User Enters Paragragh in Custom ToolBar and Converts Text into Bold', async () => {
  const textbox = await page.locator("(//div[@class='ql-editor ql-blank'])[2]").fill("fere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. ");
  await page.keyboard.press('Control+a');
  const Bold = await page.locator("(//button[@class='ql-bold'])[2]");
  await Bold.click();
  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
});

Then('User Enters {string},{string},{string} and select 5,6,7th option and delete it', async (Favourite1,Favourite2,Favourite3) => {
  const Element = await page.locator("//i[@class='pi pi-server layout-menuitem-icon']").click();
  const TextBox = await page.locator("(//i[@class='pi pi-fw pi-check-square layout-menuitem-icon'])[1]").click();
 
  const Name1=data[Favourite1];
  await saavaspage.EnterName1(Name1);
  const dropdown=await page.locator("//span[@class='ui-button-icon-primary ui-icon ui-icon-triangle-1-s']").click();
  const select5thOption=await page.locator("//span[@id='j_idt106:auto-complete_panel']/ul/li[6]").click();
  const Name2=data[Favourite2];
  await saavaspage.EnterName2(Name2);
  const dropdown1=await page.locator("//span[@class='ui-button-icon-primary ui-icon ui-icon-triangle-1-s']").click();
  const select6thOption=await page.locator("//span[@id='j_idt106:auto-complete_panel']/ul/li[7]").click();
  const Name3=data[Favourite3];
  await saavaspage.EnterName3(Name3);
  const dropdown2=await page.locator("//span[@class='ui-button-icon-primary ui-icon ui-icon-triangle-1-s']").click();
  const select7thOption=await page.locator("//span[@id='j_idt106:auto-complete_panel']/ul/li[8]").click();
  const Delete7thOption=await page.locator("(//span[@class='ui-autocomplete-token-icon ui-icon ui-icon-close'])[3]").click();
 
  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
});

Then('User Gets Tooltip Text', async () => {
  // Hover over the element that triggers the tooltip
  await page.hover("//i[@class='pi pi-globe']");

  // Wait for the tooltip to appear
  const tooltipSelector = "//a[@data-tooltip='Notifications']";
  //await page.waitForSelector(tooltipSelector);

  // Get the tooltip text
  const tooltipText = await page.textContent(tooltipSelector);

  // Print the tooltip text to the console
  console.log(`Tooltip text: ${tooltipText}`);
  
});

Then('User Checks Whether Link Is Broken Or Not', async () => {
  const Element = await page.locator("//i[@class='pi pi-server layout-menuitem-icon']").click();
  const HyperLinks=await page.locator("//i[@class='pi pi-fw pi-link layout-menuitem-icon']").click();
  const link = await page.$("//a[text()='Broken?']");
  const href = await link.getAttribute('href');

  const response = await page.goto(href);
  const status = response.status();

  if (status !== 200) {
    console.log(`The link ${href} is broken`);
  } else {
    console.log(`The link ${href} is working`);
  }
  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
});


Then('Scroll Upto a Particular Element', async () => {
  const signin = await page.$("//label[text()='2022 - All Rights Reserved']");
  expect(signin).to.exist;
  await signin.scrollIntoViewIfNeeded();
  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
});
Then('Click and Drag Element To Left', async () => {
  //const elementHandle = await page.$("//div[@id='form:conpnl']");
  //await elementHandle.click();

  //Move the element to the right using the right arrow key
  const Browser = await page.locator("//i[@class='pi pi-globe layout-menuitem-icon']").click();
  const frame = await page.locator("(//i[@class='pi pi-fw pi-calendar layout-menuitem-icon'])[1]").click();
  const elementHandle = await page.$("//div[@id='form:conpnl']");
  await elementHandle.evaluate((el) => {
    const style = window.getComputedStyle(el);
    const left = parseInt(style.left) || 0;
    el.style.left = `${left + 700}px`;
  })
});
Then('User Handles Slider Operation', async () => {


  // Click on the element to select it
  const Browser = await page.locator("//i[@class='pi pi-globe layout-menuitem-icon']").click();
  const frame = await page.locator("(//i[@class='pi pi-fw pi-calendar layout-menuitem-icon'])[1]").click();
  const elementHandle = await page.locator("(//span[@tabindex=0])[1]").click();
  //const result=expect(elementHandle).to.exist();
 

  //Move the element to the right using the right arrow key
  const keyboard = await page.keyboard;
  await keyboard.press('ArrowRight');
  await keyboard.press('ArrowRight');
  await keyboard.press('ArrowRight');
  await keyboard.press('ArrowRight');
  const text = await page.locator("(//div[@class='card'])[9]/table/tbody/tr/td/span").textContent();
  console.log(text);

const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
});

Then('Click button wait for 10s and assert whether button text has changed', async () => {
  const Element = await page.locator("//i[@class='pi pi-server layout-menuitem-icon']").click();
  const wait = await page.locator("//i[@class='pi pi-fw pi-clock layout-menuitem-icon']").click();
  const iamabouttohide = await page.locator("//span[text()='I am about to hide']");
  expect(iamabouttohide).to.exist;
  const button = await page.locator("//button[@id='j_idt87:j_idt92']").click();
  await page.waitForTimeout(10000);
  //expect (iamabouttohide).to.not.exist;
  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();

});

Then('Checks whether the button is round or not', async () => {
  const Element = await page.locator("//i[@class='pi pi-server layout-menuitem-icon']").click();
  const ButtonIcon = await page.locator("//i[@class='pi pi-fw pi-mobile layout-menuitem-icon']").click();
  const button = await page.$("//button[@id='j_idt88:j_idt108']"); // Select the button element

  const isButtonRound = await button.evaluate(button => {
    const borderRadius = getComputedStyle(button).getPropertyValue('border-radius'); // Get the value of the border-radius CSS property
    return borderRadius.endsWith('50%') || borderRadius.endsWith('999em'); // Check if the value ends with '50%' or '999em', which indicates a round button
  });

  if (isButtonRound) {
    console.log('Button is round');
  } else {
    console.log('Button is not round');
  }
  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
});

Then('User Finds Height and Width Of The Button', async () => {
  const Element = await page.locator("//i[@class='pi pi-server layout-menuitem-icon']").click();
  const ButtonIcon = await page.locator("//i[@class='pi pi-fw pi-mobile layout-menuitem-icon']").click();
  const button = await page.locator("(//span[@class='ui-button-text ui-c'])[5]");
  const buttonsrc = await button.boundingBox();
  console.log(buttonsrc.x);
  console.log(buttonsrc.y);
  console.log(buttonsrc.width);
  console.log(buttonsrc.height);
  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
});

Then('User Gets the color of the button', async () => {
  const Element = await page.locator("//i[@class='pi pi-server layout-menuitem-icon']").click();
  const ButtonIcon = await page.locator("//i[@class='pi pi-fw pi-mobile layout-menuitem-icon']").click();
  const button = await page.$("(//span[text()='Success'])[1]"); // Select the button element

  const buttonBgColorBeforeHover = await button.evaluate(button => getComputedStyle(button).getPropertyValue('background-color')); // Get the background-color property before hover

  await button.hover(); // Hover over the button using the built-in hover function

  const buttonBgColorAfterHover = await button.evaluate(button => getComputedStyle(button).getPropertyValue('background-color')); // Get the background-color property after hover

  console.log(`Button background color before hover: ${buttonBgColorBeforeHover}`);
  console.log(`Button background color after hover: ${buttonBgColorAfterHover}`);
  if (`Button background color before hover: ${buttonBgColorBeforeHover}` == `Button background color after hover: ${buttonBgColorAfterHover}`) {
    console.log("Color not changed")
  }
  else {
    console.log("Color  changed")
  }
const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();

});


Then('Assert whether checkbox is selected or not', async () => {
  const checkbox = await page.$("(//input[@type='checkbox'])[1]").isChecked();
  expect(checkbox).to.be.true;
  // const button = await page.$('#noEdit');

  // // Check if the element is enabled or not
  // const isEnabled = await button.isEnabled();

  // // Assert that the element is enabled
  // expect(isEnabled).to.be.false;

  // const textbox = await page.$('#dontwrite');

  // // Check if the element is enabled or not
  // const isEditable = await textbox.isEditable();

  // // Assert that the element is enabled
  // expect(isEditable).to.be.false;

  //const checkbox=await page.locator("//*[text()='Notification']/following::div[3]/div[2]").click();
  //const isChecked = await checkbox.getProperty('checked').jsonValue();
  //const afterchecked=await page.locator("//div[@class='ui-chkbox-box ui-widget ui-corner-all ui-state-default ui-state-active ui-state-hover']")
  // Assert that the checkbox is selected
  //expect(isChecked).to.equal(true);
  //const isChecked = await page.locator("//div[@class='ui-chkbox-box ui-widget ui-corner-all ui-state-default ui-state-active ui-state-hover']").isChecked().toBeTruthy();
  //expect(isChecked).to.be.true;
  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
});




Then('User Read Values From Excel', async () => {
  // const Misc=await page.locator("//i[@class='pi pi-circle-off layout-menuitem-icon']").click();
  // const file=await page.locator("//i[@class='pi pi-fw pi-file layout-menuitem-icon']").click();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('config/datasheet.xlsx');
  const worksheet = workbook.getWorksheet('Sheet2');
    const cell = worksheet.getCell(7,4);
  const value = cell.value;
  const rows = worksheet.getRows(1, 2, 3, 4, 5, 6); // Reads rows 1 and 2
  rows.forEach(row => {
    console.log(row.getCell(5).value);
    console.log(row.getCell(4).value);
    console.log(row.getCell(3).value); // Reads the first cell in each row
    console.log(row.getCell(2).value);
    console.log(row.getCell(1).value);

  });
  //const ReturnToDashboard=await page.locator("//div[@class='layout-topbar']/a[1]").click();
});
Then('User Write Values In Excel File', async () => {

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet2');
  worksheet.addRow([1, 'Annular', 'MANAGING DIRECTOR']);
  worksheet.addRow([2, 'Annular', 'SelvaKugan']);
  worksheet.addRow([3, 'Annular', 'sellamuthu']);
  worksheet.addRow([4, 'Annular', 'Ajith']);
  worksheet.addRow([5, 'Annular', 'Krishna']);
  worksheet.addRow([6, 'Annular', 'Francis']);
  worksheet.addRow([7, 'Annular', 'Kalai']);
  worksheet.addRow([8, 'Annular', 'Kanishka']);
  await workbook.xlsx.writeFile('config/datasheet.xlsx');
  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
});


// Then('Select Eletronics,ComputerPeriphals and Currency detectors', async () => {
//   await page.locator("//button[text()='✕']").click();
//   await page.locator("//div[text()='Electronics']").hover();
//   await page.locator("//a[text()='Computer Peripherals']").hover();
//   await page.locator("//a[text()='Currency Detectors']").click();

// });
// Then('Change Language to Tamil and Assert it', async () => {
//   await page.locator("(//span[@class='nav-line-2'])[1]").hover();
//   await page.locator("(//span[contains(text(),'தமிழ்')])[1]").click();
//   const tamiltext = await page.locator("//span[contains(text(),' உங்கள் முகவரியைத் தேர்ந்தெடுக்கவும்')]");
//   expect(tamiltext).to.exist;


// });


// Then('Hover Allow Signin and select your seller Account', async () => {
//   await page.locator("//div[@id='nav-tools']/a[2]").hover();
//   const YourAccount = await page.$$("//div[@id='nav-al-your-account']");
//   for (const Account of YourAccount) {
//     console.log("Your Account Has " + await Account.textContent());

//   }
//   // await page.locator("//span[text()='Your Seller Account']").click();

// });
Then('User Selects All CheckBoxes 1 by1', async () => {

  const CheckBoxes = await page.$$("//div[@class='ui-chkbox-box ui-widget ui-corner-all ui-state-default']");

  for (const CheckBox of CheckBoxes) {
    console.log(await CheckBox.click());
  }
});

Then('Handle DropDown', async () => {
  const Element = await page.locator("//i[@class='pi pi-server layout-menuitem-icon']").click();
  const dropdownOption = await page.locator("//i[@class='pi pi-fw pi-chevron-down layout-menuitem-icon']").click();
  //  Locate the dropdown element
  const FavouriteUITooldropdown = await page.$('select.ui-selectonemenu');//select option with classname
  // // Click on the dropdown to open it
  await FavouriteUITooldropdown.click();//click the dropdown 1st
  await FavouriteUITooldropdown.selectOption({ label: 'Playwright' });//select the option using label

  //code for selecting Preferred Country
  const SelectCountrydropdown = await page.$("//label[@id='j_idt87:country_label']");//select option with classname
  expect(SelectCountrydropdown).to.exist;
  await SelectCountrydropdown.click();//click the dropdown 1st
  const country = await page.locator("//div[@class='ui-selectonemenu-items-wrapper']/ul/li[4]").click();


  const ChooseCourse = await page.$("//span[@class='ui-button-icon-primary ui-icon ui-icon-triangle-1-s']");
  await ChooseCourse.click();
  const MyFavouriteCourse = await page.locator("//ul[@class='ui-autocomplete-items ui-autocomplete-list ui-widget-content ui-widget ui-corner-all ui-helper-reset']/li[4]").click();

  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
});
Then('User Opens Multiple Window and Print Table', async () => {
 
  const globe = await page.locator("//i[@class='pi pi-globe layout-menuitem-icon']").click();
  const window = await page.locator("//i[@class='pi pi-fw pi-window-maximize layout-menuitem-icon']").click();

  const [newWindow] = await Promise.all([
    context.waitForEvent("page"),
    await page.click("//span[text()='Open Multiple']")
  ])
  await newWindow.waitForLoadState();
  const PagesOpened=newWindow.context().pages();
  console.log("No of tabs Opened are "+PagesOpened.length)
  expect(newWindow.url()).contain("table");



  const rows = await newWindow.$$("//table[@role='grid']//tr[6]");
  for (const row of rows) {
    const cells = await row.$$('td');//we r taking the table data
    for (const cell of cells) {
      const value = await cell.innerText();//and printing the values in table data 
      console.log(value);
    }
  
  }
 await newWindow.close();//closes table tab
  await page.bringToFront();//bring homepage to front



  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
});
Then('User Uploads File into the page', async () => {
  const Misc = await page.locator("//i[@class='pi pi-circle-off layout-menuitem-icon']").click();
  const file = await page.locator("//li[@id='menuform:m_file']").click();

  await page.locator("(//input[@type='file'])[1]").setInputFiles(["config/ppple.txt"]);
  //OR
  //await page.setInputFiles("(//input[@type='file'])[1]", ["Desktop/ppple.txt"])

  //
});

Then('User Checks Whether the File is Uploaded Or Not', async () => {
  const UploadedFileName = await page.locator("//span[@class='ui-fileupload-filename']").textContent();
  console.log("Uploaded File Name is " + UploadedFileName);
  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
});

Then('User Downloads File from the page', async () => {
  const Misc = await page.locator("//i[@class='pi pi-circle-off layout-menuitem-icon']").click();
  const file = await page.locator("//li[@id='menuform:m_file']").click();
  const download = await Promise.all([
    page.waitForEvent("download"),
    page.click("//span[text()='Download']")//click the download button

  ])

  //this 2 lines used to download file inside playwright itself
  const path = await download[0].path();
  console.log(path);
  const fileName = download[0].suggestedFilename();
  //await download[0].saveAs(fileName);
  await download[0].saveAs('../reports/Downloads/TestLeaf Logo.png');
  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();

});

Then('User Handling Nested Frame', async () => {
  const Browser = await page.locator("//i[@class='pi pi-globe layout-menuitem-icon']").click();
  const FrameButton = await page.locator("//li[@id='menuform:m_frame']").click();
  const AllFrames = page.frames();
  console.log("No Of Frames are " + AllFrames.length);//return no of frames in page
  const frame1 = await page.frameLocator("iframe[src='default.xhtml']")

  // Click on the button inside the frame
  await frame1.locator("(//button[@id='Click'])[1]").click();
  console.log("button clicked");
  // const frame2= await frame1.frameLocator("iframe[src='nested.xhtml']");
  // console.log("Enterd into frame 2");
  // const button=await frame2.locator("//button[text()='Count Frames']");

  const frame3 = await page.frameLocator("iframe[src='page.xhtml']");
  console.log("Enterd into frame 3");
  const frame4 = await frame3.frameLocator("iframe[src='framebutton.xhtml']")
  console.log("Enterd into frame 4");


  await frame4.locator("#Click").click();


  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
  //  const frame = await page.frame({ name: 'firstFr' });//name of the frame
  //  const FirstName=await frame.$(".input ng-pristine ng-invalid ng-touched");
  //  await FirstName.type('Hello, World!');

});

Then('User Handles Drag and Drop', async () => {

const Browser = await page.locator("//i[@class='pi pi-globe layout-menuitem-icon']").click();
  const Drag = await page.locator("(//i[@class='pi pi-fw pi-calendar layout-menuitem-icon'])[1]").click();
  //const btn=await page.waitForSelector("//button[@id='prompt']")
  const sourceLocator = page.locator("//div[@id='form:drag_content']");
  const targetLocator = page.locator("//span[text()='Droppable Target']");
  const sourceBoundingBox = await sourceLocator.boundingBox();//gets x,y co-ordinates and width and height 
  const targetBoundingBox = await targetLocator.boundingBox();
  const sourceX = sourceBoundingBox.x + sourceBoundingBox.width / 2;//gets x-coordinate and width/2 means it moves to center 
  const sourceY = sourceBoundingBox.y + sourceBoundingBox.height / 2;//gets y-coordinate and height/2 means it moves to center
  const targetX = targetBoundingBox.x + targetBoundingBox.width / 2;//gets x-coordinate and width/2 means it moves to center
  const targetY = targetBoundingBox.y + targetBoundingBox.height / 2;
  await page.mouse.move(sourceX, sourceY);//from->moving src 
  await page.mouse.down();
  await page.mouse.move(targetX, targetY);//to target->
  await page.mouse.up();

  const ReturnToDashboard = await page.locator("//div[@class='layout-topbar']/a[1]").click();
  
});



Then('User Handle Prompt Box', async () => {
  //   const globe=await page.locator("//i[@class='pi pi-globe layout-menuitem-icon']").click();
  //  const alertButton=await page.locator("//i[@class='pi pi-fw pi-clone layout-menuitem-icon']").click();
  const btn = await page.waitForSelector("//button[@id='j_idt88:j_idt104']")
  btn.click();
  //await page.locator("//button[@id='prompt']").click();
  const alert = await page.waitForEvent('dialog');
  const message = alert.message();
  await alert.accept("Annular");
  const result = await page.locator("//span[contains(text(),'User entered name as')]");
  const res = result.textContent();
  console.log("Result is " + res);



 

  







  //await page.click('#accept');
  //await page.locator("//button[text()='Simple Alert']").click();
  // 

  //console.log(` \ Alert Message is : ${message} `);


  // Select all the checkboxes on the page that have the "myCheckboxClass" class
  // const  = await page.$$("//div[@id='j_idt105_content']//div[contains(@class,'ui-chkbox-box ui-widget ui-corner-all ui-state')]");


  // for (const checkbox of checkboxes) {
  //   console.log(await checkbox.click());
  //  //expect(await checkbox.isChecked()).to.be.true;
  // }


  // // Loop through each checkbox and click it
  // await checkboxes.forEach(async (checkbox) => {
  //   await checkbox.click();

  // // Assert that all checkboxes are checked
  // await checkboxes.forEach(async (checkbox) => {
  //   expect(await checkbox.isChecked()).to.be.true;
  // });

  // });

});





