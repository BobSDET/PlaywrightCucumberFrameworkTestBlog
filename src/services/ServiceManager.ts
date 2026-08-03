import { PageManager } from "../Core/pages/PageManager";
import { RegistrationService } from "./RegistrationService";

export class ServiceManager {

    readonly registrationService: RegistrationService;

    constructor(pageManager: PageManager) {

        this.registrationService = new RegistrationService(pageManager.homePage);

    }

}