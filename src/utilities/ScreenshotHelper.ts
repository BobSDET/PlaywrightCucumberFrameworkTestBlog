import { Locator, Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

export class ScreenshotHelper 
{

    private static readonly SCREENSHOT_DIR = path.join(process.cwd(), "reports","screenshots");

    private static ensureDirectory(): void 
    {

        if (!fs.existsSync(this.SCREENSHOT_DIR)) {

            fs.mkdirSync(
                this.SCREENSHOT_DIR,
                {
                    recursive: true
                }
            );

        }

    }

    private static getTimestamp(): string 
    {

        const now = new Date();

        const year = now.getFullYear();

        const month = String(
            now.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            now.getDate()
        ).padStart(2, "0");

        const hour = String(
            now.getHours()
        ).padStart(2, "0");

        const minute = String(
            now.getMinutes()
        ).padStart(2, "0");

        const second = String(
            now.getSeconds()
        ).padStart(2, "0");

        return `${year}-${month}-${day}_${hour}-${minute}-${second}`;

    }

    private static getScreenshotPath(
        fileName: string
    ): string {

        this.ensureDirectory();

        const sanitizedFileName =
            fileName.replace(/[\\/:*?"<>|]/g, "_");

        return path.join(
            this.SCREENSHOT_DIR,
            `${sanitizedFileName}_${this.getTimestamp()}.png`
        );

    }

    static async capturePage(
        page: Page,
        fileName: string
    ): Promise<string> {

        const filePath =
            this.getScreenshotPath(fileName);

        await page.screenshot({

            path: filePath

        });

        return filePath;

    }

    static async captureFullPage(
        page: Page,
        fileName: string
    ): Promise<string> {

        const filePath =
            this.getScreenshotPath(fileName);

        await page.screenshot({

            path: filePath,

            fullPage: true

        });

        return filePath;

    }

    static async captureElement(
        locator: Locator,
        fileName: string
    ): Promise<string> {

        const filePath =
            this.getScreenshotPath(fileName);

        await locator.screenshot({

            path: filePath

        });

        return filePath;

    }

    static async captureOnFailure(
        page: Page,
        scenarioName: string
    ): Promise<string> {

        return await this.captureFullPage(
            page,
            `${scenarioName}_FAILED`
        );

    }

}