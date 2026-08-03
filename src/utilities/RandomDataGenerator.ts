import { randomUUID } from "crypto";

export class RandomDataGenerator {

    private static readonly LETTERS =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    private static readonly NUMBERS = "0123456789";

    private static readonly ALPHANUMERIC = this.LETTERS + this.NUMBERS;

    private static readonly SPECIAL = "!@#$%^&*";

    static randomString(length: number = 8): string 
    {

        return this.generate(length, this.ALPHANUMERIC);

    }

    static randomAlphabetic(length: number = 8): string 
    {

        return this.generate(length, this.LETTERS);

    }

    static randomAlphanumeric(length: number = 10): string 
    {

        return this.generate(length, this.ALPHANUMERIC);

    }

    static randomNumber(length: number = 6): string 
    {

        return this.generate(length, this.NUMBERS);

    }

    static randomEmail(domain: string = "gmail.com"): string 
    {

        return `user_${Date.now()}@${domain}`;

    }

    static randomPhoneNumber(): string 
    {

        return "9" + this.randomNumber(9);

    }

    static randomPersonName(): string 
    {

        const firstNames = [
            "Hari",
            "John",
            "Emma",
            "David",
            "Sophia",
            "James",
            "Olivia"
        ];

        const lastNames = [
            "Smith",
            "Brown",
            "Miller",
            "Wilson",
            "Taylor",
            "Johnson"
        ];

        return `${this.randomItem(firstNames)} ${this.randomItem(lastNames)}`;

    }

    static randomPassword(length: number = 10): string 
    {

        return (
            this.generate(1, "ABCDEFGHIJKLMNOPQRSTUVWXYZ") +
            this.generate(1, "abcdefghijklmnopqrstuvwxyz") +
            this.generate(1, this.NUMBERS) +
            this.generate(1, this.SPECIAL) +
            this.generate(length - 4, this.ALPHANUMERIC)
        );

    }

    static randomBoolean(): boolean 
    {

        return Math.random() >= 0.5;

    }

    static randomDate(): string 
    {

        return new Date().toISOString().split("T")[0];

    }

    static randomFutureDate(days: number = 30): string 
    {

        const date = new Date();

        date.setDate(date.getDate() + days);

        return date.toISOString().split("T")[0];

    }

    static randomPastDate(days: number = 30): string 
    {

        const date = new Date();

        date.setDate(date.getDate() - days);

        return date.toISOString().split("T")[0];

    }

    static randomUUID(): string {

        return randomUUID();

    }

    private static generate(
        length: number,
        characters: string
    ): string {

        let value = "";

        for (let i = 0; i < length; i++) {

            value += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );

        }

        return value;

    }

    private static randomItem<T>(items: T[]): T {

        return items[
            Math.floor(Math.random() * items.length)
        ];

    }

}