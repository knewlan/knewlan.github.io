// inventory.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private readonly apiUrl = 'http://localhost:5000/inventory';

  constructor(private http: HttpClient) { }

  // Get all items
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl)
        .pipe(
           retry(2),  // retry up to 2 times if the request fails
           catchError(this.handleError)  // catch any errors
        );
  }

  // Get a specific item by ID
  getItem(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`)
        .pipe(
            retry(2),
           catchError(this.handleError)
        );
  }

  // Search for items based on a search term
  searchItems(searchTerm: string): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/search?searchTerm=${searchTerm}`)
         .pipe(
            retry(2),
            catchError(this.handleError)
        );
  }

  // Add a new item
  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item)
        .pipe(
            catchError(this.handleError)
        );
  }

    // Update an existing item
    updateItem(id: string, item: Item): Observable<Item> {
        return this.http.put<Item>(`${this.apiUrl}/${id}`, item)
           .pipe(
              catchError(this.handleError)
           );
    }

  // Delete an item by ID
  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
           .pipe(
              catchError(this.handleError)
          );
  }

    // Error handling function
    private handleError(error: HttpErrorResponse): Observable<never> {
      let errorMessage = 'An unknown error occurred!';

        if (error.error instanceof ErrorEvent) {
          // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}, Message: ${error.message}`;
         }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
    }
}