import { Locator, expect, Page } from "@playwright/test";

export class WaitHelper {

    static async waitForVisible(locator: Locator): Promise<void> 
    {

        await locator.waitFor({state: "visible"});

    }

    static async waitForHidden(locator: Locator): Promise<void>
    {

        await locator.waitFor({state: "hidden"});

    }

    static async waitForEnabled(locator: Locator): Promise<void>
     {

        await expect(locator).toBeEnabled();

    }

    static async waitForDisabled(locator: Locator): Promise<void> 
    {

        await expect(locator).toBeDisabled();

    }

    static async waitForText(locator: Locator, expectedText: string): Promise<void> 
    {

        await expect(locator).toHaveText(expectedText);

    }

    static async waitForURL(page: Page, expectedURL: string | RegExp): Promise<void> 
    {

        await page.waitForURL(expectedURL);

    }

    static async waitForLoadState(page: Page, state:| "load" | "domcontentloaded" | "networkidle" = "load"): Promise<void>
     {

        await page.waitForLoadState(state);

    }

    static async waitForNetworkIdle(page: Page): Promise<void> 
    {

        await page.waitForLoadState("networkidle");

    }

    static async waitForCount(locator: Locator, expectedCount: number): Promise<void> 
    {

        await expect(locator).toHaveCount(expectedCount);

    }

}