import { expect, Locator } from "@playwright/test";

export class Button {

    static async click(
        locator: Locator
    ): Promise<void> {

        await locator.click();

    }

    static async doubleClick(
        locator: Locator
    ): Promise<void> {

        await locator.dblclick();

    }

    static async rightClick(
        locator: Locator
    ): Promise<void> {

        await locator.click({
            button: "right"
        });

    }

    static async hover(
        locator: Locator
    ): Promise<void> {

        await locator.hover();

    }

    static async verifyEnabled(
        locator: Locator
    ): Promise<void> {

        await expect(locator).toBeEnabled();

    }

    static async verifyDisabled(
        locator: Locator
    ): Promise<void> {

        await expect(locator).toBeDisabled();

    }

    static async verifyVisible(
        locator: Locator
    ): Promise<void> {

        await expect(locator).toBeVisible();

    }

    static async verifyHidden(
        locator: Locator
    ): Promise<void> {

        await expect(locator).toBeHidden();

    }

}