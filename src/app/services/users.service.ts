import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environment/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl = environment.api;

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(this.apiUrl + 'users');
  }

  getUserPosts(userId: number) {
    return this.http.get(this.apiUrl + 'posts?userId=' + userId);
  }
}
