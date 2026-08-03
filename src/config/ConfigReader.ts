import config from "./config.json";

export interface EnvironmentConfig {
    baseUrl: string;
    browser: string;
    headless: boolean;
    timeout: number;
}

export class ConfigReader {

    private static readonly environment = process.env.TEST_ENV ?? "qa";

    static getConfig(): EnvironmentConfig {

        return config[
            this.environment as keyof typeof config
            
        ];
    }
}