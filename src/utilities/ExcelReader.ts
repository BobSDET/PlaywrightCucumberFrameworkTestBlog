import ExcelJS from "exceljs";

export class ExcelReader {

    static async readSheet(filePath: string, sheetName: string): Promise<any[]> {

        const workbook = new ExcelJS.Workbook();

        await workbook.xlsx.readFile(filePath);

        const worksheet = workbook.getWorksheet(sheetName);

        if (!worksheet) {
            throw new Error(`Worksheet '${sheetName}' not found.`);
        }
        const headers: string[] = [];
        const data: any[] = [];

        

        worksheet.getRow(1).eachCell((cell) => {headers.push(String(cell.value));
        });

        worksheet.eachRow((row, rowNumber) => {

            if (rowNumber === 1) return;

            const rowData: any = {};

            row.eachCell((cell, colNumber) => {
                rowData[headers[colNumber - 1]] = cell.value;
            });

            data.push(rowData);

        });

        return data;
    }

}