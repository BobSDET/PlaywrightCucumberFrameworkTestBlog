import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '../Core/pages/BasePage';
import { RegistrationLocators } from '../locators/RegistrationLocator';
import { RegistrationData } from '../models/RegistrationData';
import { UIAssertions } from '../assertion/UIAssertions';

export class HomePage extends BasePage {

    readonly locators: RegistrationLocators;

    constructor(page: Page) {
        super(page);
        this.locators = new RegistrationLocators(page);
    }
    

    async enterName(name: string): Promise<void> {
        
        await this.fill(this.locators.txtName, name);
        
    }

    async enterEmail(email: string): Promise<void> {
        
        await this.fill(this.locators.txtEmail, email);
    }

    async enterPhone(phone: string): Promise<void> {
        
        await this.fill(this.locators.txtPhone, phone);
    }

    async enterAddress(address: string): Promise<void> {
        
        await this.fill(this.locators.txtAddress, address);
    }

    async selectGender(gender: string): Promise<void> {

    switch (gender.toLowerCase()) {

        case 'male':
            await this.check(this.locators.radioMale);
            break;

        case 'female':
            await this.check(this.locators.radioFemale);
            break;

        default:
            throw new Error(`Invalid gender: ${gender}`);
        }
    }

    async selectCountry(country: string): Promise<void> {
        await this.selectOption(this.locators.ddlCountry, country);
    }

    async selectDay(day: string): Promise<void> {

    const dayMap = new Map<string, Locator>([
        ['sunday', this.locators.chkSunday],
        ['monday', this.locators.chkMonday],
        ['tuesday', this.locators.chkTuesday],
        ['wednesday', this.locators.chkWednesday],
        ['thursday', this.locators.chkThursday],
        ['friday', this.locators.chkFriday],
        ['saturday', this.locators.chkSaturday]
    ]);

    const checkbox = dayMap.get(day.toLowerCase());

    if (!checkbox) {
        throw new Error(`Invalid day: ${day}`);
    }

    await this.check(checkbox);
    }

    async fillRegistrationForm(data: RegistrationData): Promise<void> 
    {

    await this.enterName(data.name);
    await this.enterEmail(data.email);
    await this.enterPhone(data.phone);
    await this.enterAddress(data.address);
    await this.selectGender(data.gender);
    await this.selectDay(data.day);
    await this.selectCountry(data.country);

    }

    async verifyName(expectedName: string): Promise<void> 
    {
       
        await UIAssertions.VerifyVisible(this.locators.txtName);
        await UIAssertions.VerifyInputValue(this.locators.txtName, expectedName)

    }
}