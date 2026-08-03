import { Locator } from "@playwright/test";
import * as fs from "fs";
export class FileUploadHelper
{
    static async fileExist(filepath: string): Promise<boolean>
    {
        return fs.existsSync(filepath);
    }

    static async UploadFile(locator: Locator, filepath: string): Promise<void>
    {
        if(!this.fileExist(filepath))
        {
            throw new Error(`File not Found: ${filepath}`);
        }
        await locator.setInputFiles(filepath);
    }

    static async UploadFiles(locator: Locator, filepaths: string[]): Promise<void>
    {
        for(const file of filepaths)
        {
        if(!this.fileExist(file))
        {
            throw new Error(`File not found: ${file}`);
        }
        }
        
        await locator.setInputFiles(filepaths);
    }

    static async clearFiles(locator: Locator): Promise<void>
    {
        await locator.setInputFiles([]);
    }

    static async VerifyUpload(locator: Locator): Promise<boolean>
    {
        const file = await locator.evaluate((input:HTMLInputElement) => input.files?.length ?? 0);

        return file > 0;
    }

}