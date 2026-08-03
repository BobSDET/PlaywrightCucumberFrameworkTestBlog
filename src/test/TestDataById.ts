import { TestDataManager } from "../utilities/TestDataManager";

(async() => {
    const data = await TestDataManager.getRegistrationDataById("TC002");

    console.log(data);
} )();