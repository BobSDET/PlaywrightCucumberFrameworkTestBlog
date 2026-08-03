import { BrowserManager } from "../Core/browser/BrowserManager";
import { HomePage } from "../pages/HomePage";
import { TestDataManager } from "../utilities/TestDataManager";
import { ConfigReader } from "../config/ConfigReader";


(async () => {

    const config = ConfigReader.getConfig();

    const browser = await BrowserManager.launchBrowser(config.browser, config.headless);

    const context = await BrowserManager.createContext(browser);

    const page = await context.newPage();

    const homePage = new HomePage(page);

    
    await homePage.navigate(config.baseUrl);

    const data = await TestDataManager.getRegistrationDataById("TC002");

    await homePage.fillRegistrationForm(data);

    console.log("Form filled successfully.");

    await browser.close();

})();