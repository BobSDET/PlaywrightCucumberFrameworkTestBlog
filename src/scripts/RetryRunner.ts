import { execSync } from "child_process";
import { RetryConfig } from "../config/RetryConfig";


function runCommand(command: string): boolean {
    try {
        console.log(`Execution: ${command}`);
        execSync(command, { stdio: "inherit" });
        return true;
    } 
    catch {
        return false;
    }
}

console.log("Cleaning reports...");
runCommand("npm run clean");

console.log("Generating features...");
runCommand("npm run generate-feature");

const browser = process.env.BROWSER || "chromium";
const headless = process.env.HEADLESS || "true";
const tag = process.env.TAG || "Regression";

console.log('Browser : ${browser}');
console.log('Headless : ${headless}');
console.log('Tag : ${tag}');
console.log('Max Retry : ${RetryConfig.MAX_RETRY}');

let passed = false;

for (let retry = 0; retry <= RetryConfig.MAX_RETRY; retry++)
     {

    console.log(`\n============================`);
    console.log(`Execution Attempt ${retry + 1}`);
    console.log(`============================`);

    const command =
        `npx cross-env BROWSER=${browser} HEADLESS=${headless} ` +
        `TAG=${tag} cucumber-js --config cucumber.js ` +
        `--tags "@${tag} and not @api"`;

   console.log(`Execution: ${command}`);
    passed = runCommand(command);

    if (passed) {
        console.log("\nAll tests passed.");
        break;
    }

    if(retry == RetryConfig.MAX_RETRY)
    {
    console.log('Some tests failed. Retrying...' + '(${retry + 1}/${RetryConfig.MAX_RETRY})' );
    }
    else{
        console.log("Maximum Retry Attempt Reached");
    }
    }

process.exit(passed ? 0 : 1);