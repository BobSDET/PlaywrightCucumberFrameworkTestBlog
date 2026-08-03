
export class Logger {

    private static getTimeStamp(): string {
        return new Date().toLocaleString();
    }

    static info(message: string): void {
        console.log(`[INFO]  ${this.getTimeStamp()} - ${message}`);
    }

    static pass(message: string): void {
        console.log(`[PASS]  ${this.getTimeStamp()} - ${message}`);
    }

    static warn(message: string): void {
        console.log(`[WARN]  ${this.getTimeStamp()} - ${message}`);
    }

    static error(message: string): void {
        console.log(`[ERROR] ${this.getTimeStamp()} - ${message}`);
    }

    static getFileTimeStamp(): string {

    const now = new Date();

    //return now.toISOString().replace(/:/g, "-").replace(/\..+/, "");

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;

}
}