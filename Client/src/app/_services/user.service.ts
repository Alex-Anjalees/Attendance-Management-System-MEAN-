import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})

export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { withCredentials: true });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
  
  getDashboard(): Observable<any> {
    return this.http.get(API_URL + 'dashboard', { responseType: 'text' });
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(API_URL + 'getAllUsers');
  }

  getAllShifts(): Observable<any[]> {
    return this.http.get<any[]>(API_URL + 'getAllShifts');
  }

  addShift(shiftForm: any): Observable<any> {
    const formValues = shiftForm.value;
    return this.http.post(API_URL + 'addShift',formValues,httpOptions);
  }
  
  getAllPositions(): Observable<any[]> {
    return this.http.get<any[]>(API_URL + 'getAllPositions');
  }
  
  addPositions(positionForm: any): Observable<any> {
    const formValues = positionForm.value;
    return this.http.post(API_URL + 'addPositions',formValues,httpOptions);
  }
  
  saveAllAttendance(attendanceValues: any): Observable<any> {
    return this.http.post(API_URL + 'saveAllAttendance',attendanceValues,httpOptions);
  }

  getAllAttendance(): Observable<any[]> {
    return this.http.get<any[]>(API_URL + 'getAllAttendance');
  }
  
  updateShift(shiftForm: any): Observable<any> {
    const formValues = shiftForm;    
    return this.http.post(API_URL + 'updateShift',formValues,httpOptions);
  }
  
  deleteShift(shiftId : string): Observable<any> {
    return this.http.post(API_URL + 'deleteShift',{shiftId}, httpOptions);
  }
  
  updatePosition(positionForm: any): Observable<any> {
    const formValues = positionForm; 
    return this.http.post(API_URL + 'updatePosition',formValues,httpOptions);
  }
  
  deletePosition(positionId : string): Observable<any> {
    return this.http.post(API_URL + 'deletePosition',{positionId}, httpOptions);
  }
  
  getAttendanceByUserId(userId: string): Observable<any[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<any[]>(API_URL + 'getAttendanceByUserId', { params: params });
  }
  
  getUserById(userId: string): Observable<any[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<any[]>(API_URL + 'getUserById', { params: params });
  }
  
  getUserByShiftId(shiftId: string): Observable<any[]> {
    const params = new HttpParams().set('shiftId', shiftId);
    return this.http.get<any[]>(API_URL + 'getUserByShiftId', { params: params });
  }
  
  getUserByDepartmentId(departmentId: string): Observable<any[]> {
    const params = new HttpParams().set('departmentId', departmentId);
    return this.http.get<any[]>(API_URL + 'getUserByDepartmentId', { params: params });
  }
  
  getAttendanceByDepartmentId(departmentId: string): Observable<any[]> {
    const params = new HttpParams().set('departmentId', departmentId);
    return this.http.get<any[]>(API_URL + 'getAttendanceByDepartmentId', { params: params });
  }
}