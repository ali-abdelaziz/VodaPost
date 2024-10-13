import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { CachingInterceptor } from './interceptors/http-interceptor';
import { CachService } from './services/cach.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
      BrowserAnimationsModule
    ),
    provideHttpClient( withInterceptorsFromDi() ),
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: CachingInterceptor,
    //   multi: true
    // },
    CachService
  ]
};
