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

  // Caching data with local storage

  // caching users
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
    // console.log('cache hit');
    return of(JSON.parse(localStorage.getItem('cachedUsers')!));
  }

    // caching user posts
    getCachedUserPosts(userId: number) {
      const cachedUserPosts = localStorage.getItem('cachedUserPosts' + userId);
      if (!cachedUserPosts) {
        console.log('cache miss');
        return this.http.get(this.apiUrl + 'posts?userId=' + userId)
        .pipe(
          tap((posts) => {
            localStorage.setItem('cachedUserPosts' + userId, JSON.stringify(posts));
          })
        );
      }
      // console.log('cache hit');
      return of(JSON.parse(localStorage.getItem('cachedUserPosts' + userId)!));
    }

    // caching post comments
    getCachedPostComments(postId: number) {
      const cachedPostComments = localStorage.getItem('cachedPostComments' + postId);
      if (!cachedPostComments) {
        console.log('cache miss');
        return this.http.get(this.apiUrl + 'comments?postId=' + postId)
        .pipe(
          tap((comments) => {
            localStorage.setItem('cachedPostComments' + postId, JSON.stringify(comments));
          })
        );
      }
      // console.log('cache hit');
      return of(JSON.parse(localStorage.getItem('cachedPostComments' + postId)!));
    }
}
