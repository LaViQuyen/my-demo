import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileService {
  constructor(private httpClient: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    return this.httpClient.post<any>(`/file/upload`, formData);
  }

  generatePdfFile(type: string, htmlString: string, studentName: string, quizName: string) {
    const requestBody = {
      type,
      htmlString,
      studentName,
      quizName,
    };
    return this.httpClient.post('/file/generate-pdf', requestBody, {responseType: "text"});
  }

  deleteFile(fileName: string): Observable<any> {
    return this.httpClient.delete<any>(`/file/${fileName}`, {
      responseType: 'json',
    });
  }
}
