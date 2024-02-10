import { Observable } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class GenericService<T> {
    private baseUrl: string = "";

    constructor(private http: HttpClient) {}

    /**
     * Sets the base URL for the API.
     * @param apiBaseUrl - the base URL for the API
     */
    setBaseUrl(apiBaseUrl: string): void {
        this.baseUrl = apiBaseUrl;
        console.log(`GENERIC SERVICE: base url set to ${this.baseUrl}`);
    }

    /**
     * Retrieves all entities of type T from the API.
     * @returns An Observable that emits an array of entities of type T.
     */
    getAll(): Observable<T[]> {
        return this.http.get<T[]>(`${this.baseUrl}/getAll`);
    }

    /**
     * Retrieves an entity of type T by its ID from the API.
     * @param id - the ID of the entity to retrieve
     * @returns An Observable that emits the entity of type T
     */
    getById(id: any): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}/getById/${id}`);
    }

    /**
     * Creates a new entity in the API.
     * @param entity - the entity to create
     * @returns An Observable that emits the created entity
     */
    create(entity: T): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}/create`, entity);
    }

    /**
     * Updates an existing entity in the API.
     * @param id - the ID of the entity to update
     * @param entity - the updated entity
     * @returns the updated entity
     */
    update(id: any, entity: T): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}/update/${id}`, entity);
    }

    /**
     * Deletes an entity of type T by its ID from the API.
     * @param id - the ID of the entity to delete
     * @returns an Observable that emits nothing
     */
    delete(id: any): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
    }

    /**
     * Retrieves the total number of entities of type T in the API.
     * @returns An Observable that emits the total number of entities of type T.
     */
    getCount(): Observable<number> {
        return this.http.get<number>(`${this.baseUrl}/count`);
    }

    /**
     * Retrieves a page of entities of type T from the API.
     * @param pageIndex - the index of the page to retrieve (zero-based)
     * @param pageSize - the size of the page to retrieve
     * @returns An Observable that emits an array of entities of type T.
     */
    getPage(pageIndex: number, pageSize: number): Observable<T[]> {
        return this.http.get<T[]>(`${this.baseUrl}/getPage/${pageIndex}/${pageSize}`);
    }
}
