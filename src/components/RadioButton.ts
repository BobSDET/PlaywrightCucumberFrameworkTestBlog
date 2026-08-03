import { expect, Locator, Page } from "@playwright/test";

export class RadioButton
{
    static async select(locator: Locator): Promise<void>
    {
        await locator.check();
    }

    static async isSelected(locator: Locator): Promise<boolean>
    {
        return await locator.isChecked()
    }

    static async VerifySelected(locator: Locator): Promise<void>
    {
        const selected = this.isSelected(locator);
        expect(selected).toBe(true);
    }

    static async SelectByValue(page: Page, groupselector: string, value: string): Promise<void>
    {
        const radio = page.locator(`${groupselector}[value=${value}]`);
        await this.select(radio);
    }

    static async getSelectedValue(page: Page, groupselector: string): Promise<string>
    {
        const radio = page.locator(`${groupselector}:checked`);
        return (await radio.getAttribute("value"))?? "";
    }

}

