import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiRoutes } from 'src/constants/api-routes';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DocumentAttached } from '../../../models/document-attached.model';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private readonly baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`;
  private fileNameMaps: Map<string, string> = new Map<string, string>();
  constructor(private httpClient: HttpClient) { }


  uploadFile(fileToUpload: any) {
    const input = new FormData();
    input.append('FindingEvidences', fileToUpload);
    input.append('OutputFileName', fileToUpload.name);
    return this.httpClient.post(`${this.baseUrl}/${apiRoutes.file.base}`, input, {responseType: 'text'})
      .pipe(
        tap((serverFileName: string) => {
          fileToUpload.serverName = serverFileName;
          this.fileNameMaps.set(fileToUpload.name, serverFileName);
        })
      );
  }

  uploadDocument(NewDocument) : Observable<DocumentAttached> {
    const formData = new FormData();
    formData.append('documentEvidence', NewDocument.documentEvidence, NewDocument.documentEvidence.name)
    NewDocument.documentEvidence = [];

    for (var prop in NewDocument){
      formData.append(prop, NewDocument[prop]);
    }

    return this.httpClient.post<DocumentAttached>(`${this.baseUrl}/${apiRoutes.document.base}`, formData);
  }

  newVersionDocument(NewDocument) : Observable<DocumentAttached> {
    const formData = new FormData();
    formData.append('documentEvidence', NewDocument.documentEvidence, NewDocument.documentEvidence.name)
    NewDocument.documentEvidence = [];

    for (var prop in NewDocument){
      formData.append(prop, NewDocument[prop]);
    }

    return this.httpClient.put<DocumentAttached>(`${this.baseUrl}/${apiRoutes.document.base}`, formData);
  }

  deleteFile(fileName: string) {
    return this.httpClient.delete(`${this.baseUrl}/${apiRoutes.file.base}/${fileName}`);
  }
}
