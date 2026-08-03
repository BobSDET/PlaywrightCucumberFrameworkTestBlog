import { HomePage } from "../pages/HomePage";
import { TestDataManager } from "../utilities/TestDataManager";
import { RegistrationData } from "../models/RegistrationData";

export class RegistrationService {

    constructor(private homePage: HomePage) {}

    async fillRegistration(tcId: string): Promise<RegistrationData> {

        const data = await TestDataManager.getRegistrationDataById(tcId);

        await this.homePage.fillRegistrationForm(data);

        return data;
    }

    async verifyRegistration(data: RegistrationData): Promise<void> {

        await this.homePage.verifyName(data.name);

    }

}