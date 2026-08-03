import { Locator, expect } from "@playwright/test";

export class Checkbox
{
    static async check(locator: Locator): Promise<void>
    {
        await locator.check();
    }

    static async Uncheck(locator: Locator): Promise<void>
    {
        await locator.uncheck();
    }

    static async ischecked(locator: Locator): Promise<boolean>
    {
        return await locator.isChecked();
    }

    static async VerifyChecked(locator: Locator): Promise<void>
    {
        const checked = await this.ischecked(locator);
        expect(checked).toBe(true);
    }

    static async VerifyUnchecked(locator: Locator): Promise<void>
    {
        const unchecked = await this.ischecked(locator);
        expect(unchecked).toBe(false);
    }

    static async checkMultiple(locators: Locator[]): Promise<void>
    {
        for(const locator of locators)

            await this.check(locator);
    }

    static async UncheckMultiple(locators: Locator[]): Promise<void>
    {
        for(const locator of locators)
            await this.Uncheck(locator);
    }

    




}