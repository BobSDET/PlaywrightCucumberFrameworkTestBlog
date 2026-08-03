import { Locator, expect } from "@playwright/test";
import { text } from "node:stream/consumers";


export class Dropdown
{

    static async selectByText(locator: Locator, text: string): Promise<void>
    {
        await locator.selectOption({label: text});

    }

    static async selectByValue(locator: Locator, value: string): Promise<void>
    {
        await locator.selectOption({label: value});
    }

    static async selectByIndex(locator: Locator, index: number): Promise<void>
    {
        await locator.selectOption({index})
    }

    static async getSelectedText(locator: Locator): Promise<string>
    {
        const selectedoptions = locator.locator('option:checked');

        return(await selectedoptions.textContent())?.trim()??"";
    }

    static async verifySelectedText(locator: Locator, expectedText: string): Promise<void> 
    {

        const actualText = await this.getSelectedText(locator);
        expect(actualText).toBe(expectedText);
    }

    static async getOptions(locator: Locator): Promise<string[]>
    {
        const Option = await locator.locator('option').allTextContents();
        return Option.map(Option => Option.trim());
    }

    static async verifyOptionExist(locator: Locator, expected: string): Promise<void>
    {
        const option = await this.getOptions(locator);
         expect(option).toContain(expected);
    }

    static async selectMultiple(locator: Locator, values: string[]): Promise<void>
    {
        await locator.selectOption(values);
    }

    static async clearOptions(locator: Locator): Promise<void>
    {
        await locator.selectOption([]);
    }

}