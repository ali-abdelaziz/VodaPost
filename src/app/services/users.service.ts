import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environment/environment';
import { User } from '../models/user.model';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl = environment.api;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(this.apiUrl + 'users');
  }

  getUserPosts(userId: number) {
    return this.http.get(this.apiUrl + 'posts?userId=' + userId);
  }

  getPostComments(postId: number) {
    return this.http.get(this.apiUrl + 'comments?postId=' + postId);
  }

  // Caching data with local storage
  getCachedUsers() {
    const cachedUsers = localStorage.getItem('cachedUsers');
    if (!cachedUsers) {
      console.log('cache miss');
      return this.http.get<User[]>(this.apiUrl + 'users')
      .pipe(
        tap((users) => {
          localStorage.setItem('cachedUsers', JSON.stringify(users));
        })
      );
    }
    console.log('cache hit');
    return of(JSON.parse(localStorage.getItem('cachedUsers')!));
  }
}
