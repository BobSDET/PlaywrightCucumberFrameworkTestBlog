import { BrowserManager } from "../browser/BrowserManager";
import { ConfigReader } from "../../config/ConfigReader";
import { CustomWorld } from "../world/CustomWorld";
import { PageManager } from "../pages/PageManager";
import { ServiceManager } from "../../services/ServiceManager";
import { Logger } from "../../logger/logger";

export class DriverFactory {

    static async initialize(world: CustomWorld): Promise<void> {

        const config = ConfigReader.getConfig();
        

        const browserName = process.env.BROWSER || config.browser || "chromium";

        // Use headless mode in Jenkins/CI
        const headless =
    process.env.HEADLESS !== undefined
        ? process.env.HEADLESS.toLowerCase() === "true"
        : config.headless;

        Logger.info(`Browser: ${browserName}`);
    Logger.info(`Headless: ${headless}`);
    Logger.info(`CI: ${process.env.CI}`);

        world.browser = await BrowserManager.launchBrowser(browserName, config.headless);

        world.context = await BrowserManager.createContext(world.browser);

        world.page = await world.context.newPage();

        world.pageManager = new PageManager(world.page);
        world.serviceManager = new ServiceManager(world.pageManager);

    }

    static async quit(world: CustomWorld): Promise<void>{

    if (world.browser) {
            await BrowserManager.closeBrowser(world.browser);
        }

    }

}