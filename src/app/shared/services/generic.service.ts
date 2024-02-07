import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenericService<T> {
  private baseUrl: string = '';

  constructor(private http: HttpClient) {}

  setBaseUrl(apiBaseUrl: string): void {
    this.baseUrl = apiBaseUrl;
    console.log(`GENERIC SERVICE: base url set to ${this.baseUrl}`);
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/getAll`);
  }

  getById(id: any): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/getById/${id}`);
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/create`, entity);
  }

  update(id: any, entity: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/update/${id}`, entity);
  }

  delete(id: any): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  getCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  getPage(pageIndex: number, pageSize: number): Observable<T[]> {
    return this.http.get<T[]>(
      `${this.baseUrl}/getPage/${pageIndex}/${pageSize}`
    );
  }
}
