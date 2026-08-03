import { BrowserManager } from "../browser/BrowserManager";
import { ConfigReader } from "../../config/ConfigReader";
import { CustomWorld } from "../world/CustomWorld";
import { PageManager } from "../pages/PageManager";
import { ServiceManager } from "../../services/ServiceManager";

export class DriverFactory {

    static async initialize(world: CustomWorld): Promise<void> {

        const config = ConfigReader.getConfig();

        const browserName = process.env.BROWSER || config.browser || "chromium";

        world.browser = await BrowserManager.launchBrowser(browserName, config.headless);

        world.context = await BrowserManager.createContext(world.browser);

        world.page = await world.context.newPage();

        world.pageManager = new PageManager(world.page);
        world.serviceManager = new ServiceManager(world.pageManager);

    }

    static async quit(world: CustomWorld): Promise<void>{

    await BrowserManager.closeBrowser(world.browser);

    }

}