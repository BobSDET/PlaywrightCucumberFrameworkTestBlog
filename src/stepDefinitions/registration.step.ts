import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../Core/world/CustomWorld';
import { ConfigReader } from '../config/ConfigReader';
import { Logger } from '../logger/logger';




Given('User launches the Test Automation Practice application', async function () {
    const world = this as CustomWorld;
    const config = ConfigReader.getConfig();
    
    await world.pageManager.homePage.navigate(config.baseUrl);

});

When('User fills registration form using {string}', async function (tcId: string) {
    const world = this as CustomWorld;
        
        Logger.info(`Executing Test Case : ${tcId}`);
       world.registrationData = await world.serviceManager.registrationService.fillRegistration(tcId);

    }
);

Then('Registration details should be entered successfully', async function () {

        const world = this as CustomWorld;
        
    await world.serviceManager.registrationService.verifyRegistration(world.registrationData);

});