import * as fs from "fs";
import * as path from "path";
import { TestDataManager } from "./TestDataManager";


export class FeatureGenerator {
    

    static async generateRegistrationFeature(): Promise<void> {

    const data = await TestDataManager.getRegistrationData();

    let featureContent = `Feature: Registration Form

`;

    data.forEach(test => {

        featureContent += `
${test.tag}
Scenario: Fill registration form - ${test.tcId}

Given User launches the Test Automation Practice application
When User fills registration form using "${test.tcId}"
Then Registration details should be entered successfully`;

    });

    const outputDir = path.join(process.cwd(), "generated-features");

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const featurePath = path.join(
        outputDir,
        "Registration.feature"
    );

    fs.writeFileSync(featurePath, featureContent);

    console.log("Feature generated successfully.");
    console.log(featurePath);

}

}

    

