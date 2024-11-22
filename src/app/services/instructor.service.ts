import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private apiUrl = 'http://localhost:8080/instructor/add-instructor';

  constructor(private http: HttpClient) {}

  addInstructor(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
