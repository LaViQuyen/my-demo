import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ReadingService {
  constructor(private httpClient: HttpClient) {}

  getAllReadingTest(): Observable<any> {
    return this.httpClient.get(`/reading`);
  }

  getById(id: number): Observable<any> {
    return this.httpClient.get(`/reading/${id}`);
  }

  createReadingTest(readingTest: any): Observable<any> {
    return this.httpClient.post(`/reading`, readingTest);
  }

  editReadingTest(readingTest: any): Observable<any> {
    return this.httpClient.put(`/reading/${readingTest.id}`, readingTest);
  }
}
