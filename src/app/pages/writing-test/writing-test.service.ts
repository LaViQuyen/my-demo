import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Writing } from '../../shared/models/writing.model';

@Injectable({ providedIn: 'root' })
export class WritingService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get(`/writings`);
  }

  getAllResults(): Observable<any> {
    return this.httpClient.get('/writings-result');
  }

  searchResultByStudentName(name: string): Observable<any> {
    return this.httpClient.get(`/writings-result?studentName_like=${name}`);
  }

  getResultById(id: number): Observable<any> {
    return this.httpClient.get(`/writings-result/${id}`);
  }

  deleteResult(id: string): Observable<any> {
    return this.httpClient.delete(`/writings-result/${id}`);
  }

  searchByName(name: string): Observable<any> {
    return this.httpClient.get(`/writings?name_like=${name}`);
  }

  getById(id: string): Observable<any> {
    return this.httpClient.get(`/writings/${id}`);
  }

  create(writing: Writing): Observable<any> {
    return this.httpClient.post(`/writings`, writing);
  }

  submit(writing: Writing): Observable<any> {
    return this.httpClient.post(`/writings-result`, writing);
  }

  edit(writing: Writing): Observable<any> {
    return this.httpClient.put(`/writings/${writing.id}`, writing);
  }

  editWritingResult(writing: Writing): Observable<any> {
    return this.httpClient.put(`/writings-result/${writing.id}`, writing);
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`/writings/${id}`);
  }
}
