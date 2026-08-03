import { TestDataManager } from "../utilities/TestDataManager";

(async () => {

    const data = await TestDataManager.getRegistrationData();

    console.log(data);

})();