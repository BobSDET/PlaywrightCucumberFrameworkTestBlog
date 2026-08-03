import {expect, Page, Locator} from "@playwright/test";
import { BaseAssertion } from "./BaseAssertions";

export class UIAssertions extends BaseAssertion {
    static async VerifyVisible(locator: Locator, message?: string): Promise<void> 
    {
        this.log("Verifying Element Visibility");
        await this.executeAssertion(async() => {await expect(locator).toBeVisible();}, "Element is Vissible", "Element is Not Vissible");

    }

    static async VerifyHidden(locator: Locator): Promise<void>
    {
        this.log("Verifing Element is Hidden");
        await this.executeAssertion(async() =>{await expect(locator).toBeHidden();}, "Element is Hidden", "Element is Not Hidden");
        
    }

    static async VerifyEnabled(locator: Locator): Promise<void>
    {
        this.log("verifying Element is Enabled");
        await this.executeAssertion(async() => {await expect(locator).toBeEnabled();}, "Element is Enabled", "Element is Disabled");
    }

    static async VerifyDisabled(locator: Locator): Promise<void>
    {
        this.log("Verifying Element is Disabled");
        await this.executeAssertion(async() => {await expect(locator).toBeDisabled();}, "Element is Disabled", "Element is Not Disabled");
    }

    static async VerifyInputValue(locator: Locator, expected: string): Promise<void>
    {
        this.log("Verifying Input Value");
        await this.executeAssertion(async() => {await expect(locator).toHaveValue(expected);}, "Input Value Verified", "Input Value not Verified");
    }

    static async VerifyChecked(locator: Locator): Promise<void>
    {
        this.log("Verifying Element is Checked");
        await this.executeAssertion(async() => {await expect(locator).toBeChecked();}, "Element is Checked", "Element is not Checked");
    }

    static async VerifyUnchecked(locator: Locator): Promise<void>
    {
        this.log("Verifying Element is Unchecked");
        await this.executeAssertion(async() => {await expect(locator).not.toBeChecked();}, "Element is Unchecked", "Element is not Unchecked");
    }

    static async VerifyURL(page: Page, expected: string): Promise<void>
    {
        this.log("Verifing Page URL");
        await this.executeAssertion(async() => {await expect(page).toHaveURL(expected);}, "Page URL Verifierd", "Page URL Not Verified");
    }

    static async VerifyTitle(page: Page, expected: string): Promise<void>
    {
        this.log("Verifing Page Title");
        await this.executeAssertion(async() => {await expect(page).toHaveTitle(expected);}, "Verified Page Title", "Page Title Not Verified");
    }
        

}