import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Folder } from '../../common/models/folder.model';

@Injectable()
export class FolderService {
  private apiUrl = '/folders';
  http = inject(HttpClient);

  getFolders(): Observable<Folder[]> {
    return this.http.get<Folder[]>(this.apiUrl);
  }

  getFolder(id: string): Observable<Folder> {
    return this.http.get<Folder>(`${this.apiUrl}/${id}`);
  }

  createFolder(folder: Folder): Observable<Folder> {
    return this.http.post<Folder>(this.apiUrl, folder);
  }

  updateFolder(id: string, folder: Folder): Observable<Folder> {
    return this.http.put<Folder>(`/folders/${id}`, folder);
  }

  deleteFolder(id: string): Observable<Folder> {
    return this.http.delete<Folder>(`${this.apiUrl}/${id}`);
  }
}
