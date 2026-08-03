import {expect, Locator} from "@playwright/test";

export class Textbox
{
    static async Entertext(locator: Locator, text: string): Promise<void>
    {
        await locator.fill(text);
    }

    static async AppendText(locator: Locator, text: string): Promise<void>
    {
        await locator.pressSequentially(text);
    }

    static async ClearText(locator: Locator): Promise<void>
    {
        await locator.fill("");
    }

    static async GetValue(locator: Locator): Promise<string>
    {
        return await locator.inputValue()
    }

    static async VerifyValue(locator: Locator, expectedtext: string): Promise<void>
    {
        const text = await this.GetValue(locator);
        expect(text).toBe(expectedtext);
    }

    static async VerifyEmpty(locator: Locator): Promise<void>
    {
        const text = await this.GetValue(locator);
        expect(text).toBe("");
    }
}