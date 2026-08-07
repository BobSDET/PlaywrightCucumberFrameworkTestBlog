import {Browser, BrowserType, BrowserContext, chromium, firefox, webkit, LaunchOptions} from "@playwright/test";
import { Logger } from "../../logger/logger";


export class BrowserManager {

    static async launchBrowser( browserName: string, headless: boolean): Promise<Browser> 
    {
        Logger.info(`Launching ${browserName} browser`);
        let browserType: BrowserType;

        switch (browserName.toLowerCase()) {

            case "firefox":
                browserType = firefox;
                break;

            case "webkit":
                browserType = webkit;
                break;

            case "chromium":
            default:
                browserType = chromium;
                break;
          
        }

        const browser = await browserType.launch({headless});
        const launchOptions: LaunchOptions = {headless};

        // CI/Jenkins configuration
    if (process.env.CI === "true") {

        Logger.info("CI environment detected");

        if (browserName.toLowerCase() === "firefox") {
            launchOptions.args = [
                "-headless"
            ];
        }
    }

        Logger.pass(`${browserName} browser launched successfully`);

        return browser;
    }

    static async createContext(browser: Browser): Promise<BrowserContext> {

    Logger.info("Creating browser context");
    Logger.info(`Browser connected: ${browser.isConnected()}`);

    const context = await browser.newContext({
        viewport: {
            width: 1920,
            height: 1080
        }
    });

    Logger.pass("Browser context created successfully");

    Logger.info(`Browser connected after context creation: ${browser.isConnected()}`);

    return context

  

}

    static async closeBrowser(browser: Browser): Promise<void> {

    if (browser) {

        Logger.info("Closing browser");

        await browser.close();

        Logger.pass("Browser closed successfully");

    }

}
}