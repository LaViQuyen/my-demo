import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Quiz } from '../../shared/models/quiz.model';

@Injectable()
export class QuizService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get(`/quizzes`);
  }

  searchByName(name: string): Observable<any> {
    return this.httpClient.get(`/quizzes?name_like=${name}`);
  }

  getAllQuizzesByFolderId(folderId: string): Observable<Quiz[]> {
    return this.httpClient.get<Quiz[]>(`/quizzes?folderId=${folderId}`).pipe(
      tap((results: Quiz[]) => {
        results.sort((a, b) => a.order! - b.order!);
      }),
    );
  }

  getById(id: number): Observable<any> {
    return this.httpClient.get(`/quizzes/${id}`);
  }

  create(quiz: Quiz): Observable<any> {
    return this.httpClient.post(`/quizzes`, quiz);
  }

  edit(quiz: Quiz): Observable<any> {
    return this.httpClient.put(`/quizzes/${quiz.id}`, quiz);
  }

  updateIndex(quizIds: string[]) {
    const requestBody = {
      quizIds: quizIds,
    };
    return this.httpClient.patch<Quiz[]>('/quizz/update-index', requestBody);
  }

  moveToFolder(
    quizIds: string[],
    folderId: string | undefined,
  ): Observable<Quiz[]> {
    const requestBody = {
      quizIds: quizIds,
      folderId: folderId,
    };
    return this.httpClient.patch<Quiz[]>('/quizz/move', requestBody);
  }

  delete(quizId: string): Observable<any> {
    return this.httpClient.delete(`/quizzes/${quizId}`);
  }
}
