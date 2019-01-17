import { sheets_v4 } from 'googleapis';
import { google } from 'googleapis';
import dotenv from 'dotenv';


export const buildSheetsClient =  (): SheetsClient => {
    return google.sheets({
        version: 'v4',
        auth: dotenv.env.process.SHEET_AUTH
    });
};

export type SheetsClient = sheets_v4.Sheets;


export type SpreadsheetValuesResponse = string[][];

export interface SheetSource {
    client: SheetsClient;
    sheetId: string;
    range: string;
}


export function loadSheet({ sheetId, range, client }: SheetSource): Promise<SpreadsheetValuesResponse> {
    return client.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range,
    }).then((response) => (response.data.values!));
}

const builtClient = buildSheetsClient();

const sheet = {
    sheetId: dotenv.env.process.SHEET_ID,
    range: "A2:J65",
    client: builtClient

};

async function run() {
   const data = await loadSheet(sheet);
    console.log("data", data);
    const reducer = (acc: any, curr: any): any => {
        const answer =  {
            title: curr[4],
            tag: curr[5],
            position: {management: curr[6],
                frontend: curr[7],
                backend: curr[8],
                devops: curr[9] }
        };
        const questions = [...acc, {
                id: curr[0],
                selectionType: curr[1],
                correlation: curr[2],
                question: curr[3],
                answers: [answer],
            }];

        return questions;
    };
    const testResult = data.reduce(reducer, {});
console.log("test result", testResult);
}
run();

