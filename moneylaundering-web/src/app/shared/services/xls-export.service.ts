import { AngularCsv } from 'angular7-csv/dist/Angular-csv'
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';  

@Injectable({
  providedIn: 'root'
})

export class XlsExportService {

  constructor() { }  

  public exportToFile(expJson: any[], expTitle: string, expFormat: string): void {  

    if (expFormat=='CSV')
    {
      const csvOptions = {
        fieldSeparator: ';' ,
        quoteStrings: '"',
        decimalseparator: ',',
        showLabels: false,
        showTitle: false,
        title: '',
        useBom: false,
        noDownload: false,
        headers: Object.keys(expJson[0])
        }; 
        new  AngularCsv(expJson, expTitle, csvOptions);  
    }
    else
    {
      const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(expJson, { header: Object.keys(expJson[0]) });
      const workBook: XLSX.WorkBook = XLSX.utils.book_new();  
      XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1');
      XLSX.writeFile(workBook,expTitle+'.xlsx');
    }

  }

}
