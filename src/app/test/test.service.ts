import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../../common/models/result.model';

@Injectable({ providedIn: 'root' })
export class TestService {
  constructor(private httpClient: HttpClient) {}

  getResultByStudentName(studentName: string): Observable<any> {
    return this.httpClient.get(`/results?studentName_like=${studentName}`);
  }

  getResultById(resultId: string): Observable<any> {
    return this.httpClient.get<any>(`/results/${resultId}`);
  }

  deleteResultById(resultId: string): Observable<any> {
    return this.httpClient.delete<any>(`/results/${resultId}`);
  }

  saveCurrentTest(result: Result): Observable<any> {
    return this.httpClient.put<any>(`/results/${result.id}`, result);
  }

  submitTest(result: any): Observable<any> {
    return this.httpClient.post<any>(`/results`, result);
  }
}
