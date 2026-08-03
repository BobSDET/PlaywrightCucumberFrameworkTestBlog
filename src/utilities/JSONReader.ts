import * as fs from "fs";

export class JSONReader {

    static exists(filePath: string): boolean 
    {
        return fs.existsSync(filePath);
    }

    static read<T = any>(filepath: string): T
    {
        if(!this.exists(filepath))
        {
            throw Error(`Json File not Found : ${filepath}`);
        }

        const content = fs.readFileSync(filepath, "utf-8");

        return JSON.parse(content);
    }

    static readarray<T = any>(filePath: string): T[]
    {
        const data = this.read(filePath);

        if(!Array.isArray(data))
        {
            throw new Error(`JSON root is not an array`);
        }

        return data;
    }

    static readObject<T = any>(filepath: string): T
    {
        const data = this.read(filepath);

        if(typeof data !== "object" || Array.isArray(data) )
        {
            throw new Error(`JSON root is not an Object`);
        }

        return data;
    }

    static getValue<T = any>(filepath: string, Key: string): T
    {
        const data = this.readObject<any>(filepath);

        if(!(Key in data))
        {
            throw new Error(`key ${Key} not found in ${filepath}`);
        }

        return data[Key]
    }

    static parse<T = any>(jsonString: string): T {

        return JSON.parse(jsonString);

    }

}