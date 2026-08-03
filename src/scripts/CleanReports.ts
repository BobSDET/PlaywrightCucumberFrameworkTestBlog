import * as fs from "fs";
import * as path from "path";

const folder = ["allure-report", "allure-results", "reports/screenshots", "reports/traces", "generated-feature"]

folder.forEach(folder => {
    const folderpath = path.join(process.cwd(), folder);

    if(fs.existsSync(folderpath)){
        fs.rmSync(folderpath, {recursive: true, force: true});
    }

    fs.mkdirSync(folderpath, {recursive: true});
});

console.log("Old Reports Cleaned Successfully");