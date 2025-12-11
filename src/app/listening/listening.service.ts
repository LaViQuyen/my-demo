import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ListeningService {
   

  constructor(private httpClient: HttpClient) {}

  getAllQuiz(): Observable<any> {
    return this.httpClient.get(` /quizzes`);
  }

  searchQuizByName(name: string): Observable<any> {
    return this.httpClient.get(` /quizzes?name_like=${name}`);
  }

  getById(id: number): Observable<any> {
    return this.httpClient.get(` /quizzes/${id}`);
  }

  createQuiz(quiz: any): Observable<any> {
    return this.httpClient.post(` /quizzes`, quiz);
  }

  editQuiz(quiz: any): Observable<any> {
    return this.httpClient.put(` /quizzes/${quiz.id}`, quiz);
  }

  deleteQuiz(quizId: number): Observable<any> {
    return this.httpClient.delete(` /quizzes/${quizId}`);
  }
}
