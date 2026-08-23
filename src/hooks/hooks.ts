import { Before, After, Status } from "@cucumber/cucumber";
import { CustomWorld } from "../Core/world/CustomWorld";
import { Logger } from "../logger/logger";
import * as path from "path";
import { Environment } from "../reporting/Environment";
import * as fs from "fs";
import { RetryConfig } from "../config/RetryConfig";
import { DriverFactory } from "../Core/driver/DriverFactory";
import { AssertionContex } from "../assertion/AssertionContext";
import * as allure from "allure-js-commons";

Before({ tags: "not @api" }, async function (scenario) 
{
    try{
         const world = this as CustomWorld;

        const browser = process.env.BROWSER || "chromium";
    const headless = process.env.HEADLESS || "true";
    const ci = process.env.CI || "false";

    await allure.parameter("Browser", browser);
    await allure.parameter("Headless", headless);
    await allure.parameter("CI", ci);

    //await allure.parameter("Browser", process.env.BROWSER ?? "unknown");
        //await allure.parameter("Headless", process.env.HEADLESS ?? "false");
        //await allure.parameter("CI", process.env.CI ?? "false");
            
      
    console.log("================================================");
    console.log("Scenario Name:", scenario.pickle.name,); 
    console.log("================================================");

    Logger.info("========== Test Started ==========");

    Environment.generate();
    await DriverFactory.initialize(world);
   
    AssertionContex.setPage(world.page);

    Logger.pass("Browser initialization completed");
    
    
    await allure.attachment("Framework Test", "Hello Allure", {contentType: "text/plain", fileExtension: "txt"});

    }
    catch (error)
    {
        console.error("before hook failed");
        console.error(error);

        throw error;
    }


});

After({ tags: "not @api" }, async function (scenario) {
    const world = this as CustomWorld;

    console.log(`Finished: ${scenario.pickle.name} -> ${scenario.result?.status}`);

    if (scenario.result?.status === Status.FAILED) {

        const currentRetry = Number(process.env.RETRY_COUNT ?? "0");

        if (currentRetry < RetryConfig.MAX_RETRY) 
        {

            Logger.info(`Retrying ${scenario.pickle.name} (${currentRetry + 1}/${RetryConfig.MAX_RETRY})`);
        }   

        const screenshotName =
            `${scenario.pickle.name.replace(/\s+/g, "_")}_${Logger.getFileTimeStamp()}.png`;

        const screenshotPath = path.join("reports", "screenshots", screenshotName);
  
        const buffer = await world.page.screenshot({fullPage: true});
        
    await allure.attachment("Failure Screenshot", buffer, {contentType: "image/png", fileExtension: "png"});

        console.log("================================");    
        console.log("Actual Error:");
        console.log(scenario.result?.message);
        console.log("================================");
        Logger.error(`Scenario Failed: ${scenario.pickle.name}`);
        Logger.error(`Screenshot saved at: ${screenshotPath}`);

        const traceName =`${scenario.pickle.name.replace(/\s+/g, "_")}_${Logger.getFileTimeStamp()}.zip`;

        const tracePath = path.join("reports", "traces", traceName);

        await world.context.tracing.stop({path: tracePath});

        await allure.attachment("Playwright Trace",
        fs.readFileSync(tracePath),
        {
        contentType: "application/zip",
        fileExtension: "zip"
            });
         
        Logger.error(`Trace saved at: ${tracePath}`);

    } 
    
    else {

        await world.context.tracing.stop();

    }

     await DriverFactory.quit(world);
    

    Logger.pass("========== Test Finished ==========");
});
