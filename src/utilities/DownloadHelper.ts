import {Download, Page} from "@playwright/test";
import { execFileSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

export class DownloadHelper
{
    static async waitForDownload(page: Page): Promise<Download>
    {
        return await page.waitForEvent("download");
    }

    static async saveDownload(download: Download, DownloadFolder: string): Promise<string>
    {
        if(!fs.existsSync(DownloadFolder))
        {
            fs.mkdirSync(DownloadFolder, {recursive: true});
        }

        const filepath = path.join(DownloadFolder, download.suggestedFilename());

        await download.saveAs(DownloadFolder);
        return filepath;

    }

    static async getSuggestedFilename(download: Download): Promise<string>
    {
        return download.suggestedFilename();
    }

    static async VerifyDownload(filepath: string): Promise<boolean>
    {
        return fs.existsSync(filepath);
    }

    static async deleteDownload(filepath: string): Promise<void>
    {
        if(fs.existsSync(filepath))
        {
            fs.unlinkSync(filepath);
        }
    }
}
