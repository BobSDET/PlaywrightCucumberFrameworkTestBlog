import {IWorldOptions, World, setWorldConstructor} from "@cucumber/cucumber";
import {Browser, BrowserContext, Page } from "@playwright/test";
import { RegistrationData } from "../../models/RegistrationData";
import { PageManager } from "../pages/PageManager";
import { ServiceManager } from "../../services/ServiceManager";


export class CustomWorld extends World {
    
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;

    pageManager!: PageManager;
    serviceManager!: ServiceManager;

    registrationData!: RegistrationData;

   
     constructor(options: IWorldOptions) {
        super(options);
    }

}

setWorldConstructor(CustomWorld);
