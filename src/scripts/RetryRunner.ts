import { execSync } from "child_process";
import { RetryConfig } from "../config/RetryConfig";

function runCommand(command: string): boolean {
    try {
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

let passed = false;

for (let retry = 0; retry <= RetryConfig.MAX_RETRY; retry++)
     {

    console.log(`\n============================`);
    console.log(`Execution Attempt ${retry + 1}`);
    console.log(`============================`);

    passed = runCommand("npm run chrome");

    if (passed) {
        console.log("All tests passed.");
        break;
    }

    console.log("Some tests failed.");
    }

process.exit(passed ? 0 : 1);