import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Item } from "@models/item.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
// A front-end service connects to the CRUD endpoints in the backend
export class ItemsService {
  private readonly apiUrl = 'http://localhost:3000/items';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl); // http://localhost:3000/items
  }

  getById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`); // http://localhost:3000/items/<id>
  }

  create(data: Partial<Item>): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, data); // http://localhost:3000/items/<data>
  }

  update(id: number, data: Partial<Item>): Observable<Item> {
    return this.http.patch<Item>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
