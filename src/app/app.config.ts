import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { CachingInterceptor } from './interceptors/http-interceptor';
import { CachService } from './services/cach.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
 import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
      BrowserAnimationsModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
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

// export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
//   return new TranslateHttpLoader(http);
// }
