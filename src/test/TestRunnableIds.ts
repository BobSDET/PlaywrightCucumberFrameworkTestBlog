import { TestDataManager } from "../utilities/TestDataManager";

(async () => {

    const ids = await TestDataManager.getRunnableTestCaseIds();

    console.log(ids);

})();