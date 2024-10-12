import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { CachService } from "../services/cach.service";


@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cachService: CachService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // check if request is cachable
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    // check if request is already in cache and return cached response if available
    const cachedResponse = this.cachService.get(request.url);
    if (cachedResponse) {
      return of(cachedResponse);
    }

    // otherwise make request and cache response for future requests
    return next.handle(request).pipe(
      tap(((event: HttpEvent<any>) => {
        // cache response
        if (event.type === HttpEventType.Response) {
          this.cachService.put(request.url, event);
        }
      })
    ));
  }
}
