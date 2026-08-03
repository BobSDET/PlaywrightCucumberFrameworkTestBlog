import * as fs from "fs";
import * as os from "os";
import { version as playwrightVersion } from "@playwright/test/package.json";

export class Environment {

    static generate(): void {

        const data = `

Browser=Chromium
Environment=QA
OS=${os.type()} ${os.release()}
Node=${process.version}
Playwright=${playwrightVersion}
BaseURL=https://testautomationpractice.blogspot.com/

`;

        fs.writeFileSync(
            "allure-results/environment.properties",
            data.trim()
        );
    }
}