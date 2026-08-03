
import { Logger } from "../logger/logger";
import { AssertionContex } from "./AssertionContext";
import * as fs from "fs";
import * as path from "path";
import * as allure from "allure-js-commons";


export abstract class BaseAssertion 
{
    public static log(message: string): void
    {
        Logger.info(message);
    }

    public static async executeAssertion(action: () => void | Promise<void>, successmessage: string, failuremessage: string): Promise<void>
    {
        const starttime = Date.now();
         const page = AssertionContex.getPage();

        try
        {
            await action();
            Logger.pass(successmessage);
        }

        catch(error)
        {
            Logger.error(failuremessage);
            const folder = path.join("reports", "assertions");
            if(!fs.existsSync(folder))
            {
                fs.mkdirSync(folder, {recursive: true});
            }

            const screenshotName = `Assertion_${Date.now()}.png`;
            const screenshotPath = path.join(folder, screenshotName);
            
            await page.screenshot({path: screenshotPath, fullPage : true});
            Logger.error(`Assertion Screenshot ${screenshotPath}`);

            await allure.attachment("Assertion Failure Screenshot", fs.readFileSync(screenshotPath), "image/png");
            
            throw error;
        }
        
        finally
        {
            const endtime = Date.now();
            Logger.info(`Execution Time : ${starttime - endtime}ms`)
        }

    }

}