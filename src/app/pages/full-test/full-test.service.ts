import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../../shared/models/result.model';

@Injectable({ providedIn: 'root' })
export class FullTestService {
  constructor(private httpClient: HttpClient) {}

  getResultById(resultId: string): Observable<any> {
    return this.httpClient.get<any>(`/results/${resultId}`);
  }

  saveCurrentTest(result: Result): Observable<any> {
    return this.httpClient.put<any>(`/results/${result.id}`, result);
  }

  submitTest(result: any): Observable<any> {
    return this.httpClient.post<any>(`/results`, result);
  }
}
