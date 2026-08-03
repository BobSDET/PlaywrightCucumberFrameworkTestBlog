export class DateUtils 
{

    static today(): string 
    {
        return this.format(new Date());
    }

    static currentDateTime(): string {

        const now = new Date();

        return `${this.format(now)} ${now.toTimeString().split(" ")[0]}`;

    }

    static currentTimestamp(): number {

        return Date.now();

    }

    static format(date: Date): string {

        const year = date.getFullYear();

        const month = String(date.getMonth() + 1)
            .padStart(2, "0");

        const day = String(date.getDate())
            .padStart(2, "0");

        return `${year}-${month}-${day}`;

    }

    static addDays(days: number): string 
    {

        const date = new Date();

        date.setDate(date.getDate() + days);

        return this.format(date);

    }

    static subtractDays(days: number): string 
    {

        const date = new Date();

        date.setDate(date.getDate() - days);

        return this.format(date);

    }

    static addMonths(months: number): string 
    {

        const date = new Date();

        date.setMonth(date.getMonth() + months);

        return this.format(date);

    }

    static subtractMonths(months: number): string 
    {

        const date = new Date();

        date.setMonth(date.getMonth() - months);

        return this.format(date);

    }

    static addYears(years: number): string 
    {

        const date = new Date();

        date.setFullYear(date.getFullYear() + years);

        return this.format(date);

    }

    static subtractYears(years: number): string 
    {

        const date = new Date();

        date.setFullYear(date.getFullYear() - years);

        return this.format(date);

    }

    static firstDayOfMonth(): string 
    {

        const date = new Date();

        return this.format(
            new Date(
                date.getFullYear(),
                date.getMonth(),
                1
            )
        );

    }

    static lastDayOfMonth(): string 
    {

        const date = new Date();

        return this.format(
            new Date(date.getFullYear(), date.getMonth() + 1, 0)
        );

    }

    static dayOfWeek(date: Date = new Date()): string {

        return date.toLocaleDateString(
            "en-US",
            {
                weekday: "long"
            }
        );

    }

    static isWeekend(date: Date = new Date()): boolean {

        const day = date.getDay();

        return day === 0 || day === 6;

    }

    static differenceInDays(
        startDate: Date,
        endDate: Date
    ): number {

        const milliseconds =
            endDate.getTime() - startDate.getTime();

        return Math.floor(
            milliseconds / (1000 * 60 * 60 * 24)
        );

    }

    static isToday(date: Date): boolean {

        return this.format(date) === this.today();

    }

}