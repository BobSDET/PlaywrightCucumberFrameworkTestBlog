import { expect, Locator, Page } from '@playwright/test';
import { Logger } from '../../logger/logger';

export class BasePage {

    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //Navigate to URL

    async navigate(url: string): Promise<void> {

    Logger.info(`Navigating to ${url}`);

    await this.page.goto(url, {
        waitUntil: "domcontentloaded"
    });

}

    //* Click on an element
    
    async click(locator: Locator): Promise<void> {
        Logger.info("Clicking on element");
        await locator.click();
    }

    //Enter text into an input field
     
    async fill(locator: Locator, value: string): Promise<void> {
        Logger.info(`Entering value: ${value}`);
        await locator.fill(value);
    }

    //Check a checkbox or radio button
     
    async check(locator: Locator): Promise<void> {
        Logger.info("Checking checkbox/radio button");
        await locator.check();
    }

    //Uncheck a checkbox
     
    async uncheck(locator: Locator): Promise<void> {
        Logger.info("UnChecking checkbox/radio button");
        await locator.uncheck();
    }

    //Select a value from a dropdown
    
    async selectOption(locator: Locator, value: string): Promise<void> {
        Logger.info(`Selecting option: ${value}`);
        await locator.selectOption(value);

    }

    //Get the text of an element
     
    async getText(locator: Locator): Promise<string> {
        return (await locator.textContent()) ?? '';
    }

    //Get the value of an input field
    async getInputValue(locator: Locator): Promise<string> {
        return await locator.inputValue();
    }

    // Verify element is visible
     
    async verifyVisible(locator: Locator): Promise<void> {
        Logger.info("Verifying element visibility");
        await expect(locator).toBeVisible();
    }

    //Wait for an element to become visible
    async waitForVisible(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible' });
    }

    
}