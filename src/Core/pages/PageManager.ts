import { Page } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";

export class PageManager {

    readonly homePage: HomePage;

    constructor(page: Page) {

        this.homePage = new HomePage(page);

    }

}