import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', { username, password},httpOptions);
  }

  register(username: string, email: string, password: string, shiftId: string, departmentId: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup',{username,email,password,shiftId,departmentId}, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
  
  registerUpdate(username: string, email: string, password: string, shiftId: string, departmentId: string, userId : string): Observable<any> {
    return this.http.post(AUTH_API + 'signupUpdate',{username,email,password,shiftId,departmentId,userId}, httpOptions);
  }

  deleteUser(userId : string): Observable<any> {
    return this.http.post(AUTH_API + 'deleteUser',{userId}, httpOptions);
  }
  
}