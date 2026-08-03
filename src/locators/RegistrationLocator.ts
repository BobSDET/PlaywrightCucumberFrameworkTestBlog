import { Locator, Page } from '@playwright/test';

export class RegistrationLocators {
    readonly txtName: Locator;
    readonly txtEmail: Locator;
    readonly txtPhone: Locator;
    readonly txtAddress: Locator;
    readonly radioMale: Locator;
    readonly radioFemale: Locator;
    readonly chkSunday: Locator;
    readonly chkMonday: Locator;
    readonly chkTuesday: Locator;
    readonly chkWednesday: Locator;
    readonly chkThursday: Locator;
    readonly chkFriday: Locator;
    readonly chkSaturday: Locator;
    readonly ddlCountry: Locator;
    readonly ddlColors: Locator;
    readonly ddlAnimals: Locator;

    constructor( page: Page) {

    // Text Fields
        this.txtName = page.locator('#name');
        this.txtEmail = page.locator('#email');
        this.txtPhone = page.locator('#phone');
        this.txtAddress = page.locator('#textarea');

    // Gender
   this.radioMale = page.locator('#male');
        this.radioFemale = page.locator('#female');

    // Days
    this.chkSunday = page.locator('#sunday');
        this.chkMonday = page.locator('#monday');
        this.chkTuesday = page.locator('#tuesday');
        this.chkWednesday = page.locator('#wednesday');
        this.chkThursday = page.locator('#thursday');
        this.chkFriday = page.locator('#friday');
        this.chkSaturday = page.locator('#saturday');

    // Country Dropdown
    this.ddlCountry = page.locator('#country');

    // Colors (Multi Select)
    this.ddlColors = page.locator('#colors');

    // Animals
    this.ddlAnimals = page.locator('#animals');
}

    
}