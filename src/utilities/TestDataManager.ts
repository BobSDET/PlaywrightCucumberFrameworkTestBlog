import { ExcelReader } from "./ExcelReader";
import { RegistrationData } from "../models/RegistrationData";

export class TestDataManager {

    static async getRunnableTestCaseIds(): Promise<string[]> {

    const data = await this.getRegistrationData();

    return data.map(row => row.tcId);

    }

    static async getRegistrationData(): Promise<RegistrationData[]> {

        const data = await ExcelReader.readSheet("src/data/Registration.xlsx", "Registration");

        const filteredData = data.filter(row => String(row.Run).toUpperCase() == "Y");

        return filteredData.map((row) => ({

            tcId: String(row.TC_ID),
            run: String(row.Run),
            tag: String(row.Tag),
            name: String(row.Name),
            email: String(row.Email),
            phone: String(row.Phone),
            address: String(row.Address),
            gender: String(row.Gender),
            day: String(row.Day),
            country: String(row.Country)

        }));
    }

    static async getRegistrationDataById(tcId: string): Promise<RegistrationData> 
    {

    const data = await this.getRegistrationData();

    const testData = data.find(
        row => row.tcId.toUpperCase() === tcId.toUpperCase()
    );

    if (!testData) {
        throw new Error(`Test Case '${tcId}' not found.`);
    }

    return testData;
}
}