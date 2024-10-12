import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CachService {
  private cach: Map<string, any> = new Map();

  constructor() { }

  put(url: string, response: any) {
    console.log('cache miss', url);
    this.cach.set(url, response);
}

  get(url: string) {
    console.log('cache hit', url);
    return this.cach.get(url);
}

  clear() {
    this.cach.clear();
}

}
