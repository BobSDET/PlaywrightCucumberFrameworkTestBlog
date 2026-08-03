import { Page } from "@playwright/test";


export class AssertionContex
{
    private static currentPage: Page;
    static setPage(page: Page): void
    {
        this.currentPage = page;
    }

    static getPage(): Page
    {

    if(!this.currentPage)
    {
        throw new Error("Assertion Context has not been initialized");
    }
    return this.currentPage;
}

}   
