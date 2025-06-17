import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environements/environement';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly baseUrl = environment.apiUrl + '/book';

  constructor(private http: HttpClient) {}

  createBook(book: Book, file?: File): Observable<any> {
    const formData = new FormData();
    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('description', book.description);
    formData.append('published', book.published);
    formData.append('category', book.category);
    if (file) {
      formData.append('PhotoUrl', file);
    }

    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.baseUrl}/create`, formData, { headers });
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/list`); 
  }

  updateBook(id: number, book: Book, file?: File): Observable<any> {
    const formData = new FormData();

    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('description', book.description);
    formData.append('published', book.published);
    formData.append('category', book.category);

    if (file) {
      formData.append('PhotoUrl', file);
    }

    return this.http.put(`${this.baseUrl}/${id}`, formData);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
