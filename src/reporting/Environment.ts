import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { version as playwrightVersion } from "@playwright/test/package.json";

export class Environment {

    static generate(): void {

        const resultsFolder = path.join(process.cwd(), "allure-results");

        // Create folder if it doesn't exist
        if (!fs.existsSync(resultsFolder)) {
            fs.mkdirSync(resultsFolder, { recursive: true });
        }

        const data = `
Browser=Chromium
Environment=QA
OS=${os.type()} ${os.release()}
Node=${process.version}
Playwright=${playwrightVersion}
BaseURL=https://testautomationpractice.blogspot.com/
`;

        fs.writeFileSync(
            path.join(resultsFolder, "environment.properties"),
            data.trim()
        );

        console.log("Environment.properties created successfully.");
    }
}