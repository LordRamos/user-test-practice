
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { User } from '../models/user';
import { TokenStorageService } from './token-storage.service';
@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }
    getUsers() {
        const headers = new HttpHeaders()
            .set('Authorization', "Bearer " + this.tokenStorageService.getAccessToken);
        return this.http.get<User[]>(`${environment.apiUrl}users/`, { headers });
    }
    getUser(id: number) {
        const headers = new HttpHeaders()
            .set('Authorization', "Bearer " + this.tokenStorageService.getAccessToken);
        return this.http.get<User>(`${environment.apiUrl}users/${id}`, { headers });
    }
    updateUser(id, user: User) {
        const headers = new HttpHeaders()
            .set('Authorization', "Bearer " + this.tokenStorageService.getAccessToken);
        return this.http.put<User>(`${environment.apiUrl}users/${id}/`, user, { headers });
    }
    createUser(user: User) {
        const headers = new HttpHeaders()
            .set('Authorization', "Bearer " + this.tokenStorageService.getAccessToken);
        // return this.http.post<User>(`${environment.apiUrl}users/`, user, { headers });
        return this.http.post<User>(`${environment.apiUrl}users/`, user, { headers });
    }
    deleteUser(id: number) {
        const headers = new HttpHeaders()
            .set('Authorization', "Bearer " + this.tokenStorageService.getAccessToken);
        return this.http.delete<User>(`${environment.apiUrl}users/${id}`, { headers });
    }
}
