import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// import { Direction } from '@angular/cdk/bidi';
 import { TranslateService } from '@ngx-translate/core';
 import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

 @Injectable({
   providedIn: 'root',
 })
 export class TranslationService {
  //  dir$ = new BehaviorSubject<Direction>('ltr');
   dir$ = new BehaviorSubject<'ltr' | 'rtl'>('ltr');
   Lang$ = new BehaviorSubject<'en' | 'ar'>('en');
   defaultLang = 'en';

   constructor(
     private translateService: TranslateService,
     @Inject(PLATFORM_ID) private platformId: Object
   ) {
     if (isPlatformBrowser(this.platformId)) {
       const savedLang = localStorage.getItem('lng');
      //  this.Lang$.next(prefered_language ?? 'ar');
      this.translateService?.setDefaultLang(this.Lang$?.getValue());
      this.translateService?.use(this.Lang$?.getValue());
      this.dir$.next(this.Lang$.getValue() == 'ar' ? 'rtl' : 'ltr');
      this.dir$.next(this.dir$.getValue());
      document.getElementsByTagName('body')[0].dir = this.dir$.getValue();
       if (savedLang) {
         this.defaultLang = savedLang;
       }
       this.translateService.setDefaultLang(this.defaultLang);
       this.translateService.use(this.defaultLang);
     }
   }

   changeLang(lang: any) {
    let prefered_language = lang;
    this.Lang$.next(prefered_language ?? 'ar');
    this.translateService.setDefaultLang(this.Lang$.getValue());
    this.translateService.use(this.Lang$.getValue());
    this.dir$.next(this.Lang$.getValue() == 'ar' ? 'rtl' : 'ltr');
    this.dir$.next(this.dir$.getValue());
    document.getElementsByTagName('body')[0].dir = this.dir$.getValue();
     this.translateService.use(lang);
     if (isPlatformBrowser(this.platformId)) {
       localStorage.setItem('lng', lang);
     }
   }
 }
