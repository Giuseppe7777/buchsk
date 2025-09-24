import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class StartupRedirectService {
  private supportedLangs = ['sk', 'uk', 'de', 'en'];

  constructor(private router: Router) {
    const currentUrl = this.router.url;
    const isRoot = currentUrl === '/' || currentUrl === '';

    if (isRoot) {
      const browserLang = navigator.language.slice(0, 2); 
      const lang = this.supportedLangs.includes(browserLang) ? browserLang : 'sk';
      void this.router.navigate([`/${lang}`]);
    }
  }
  
}
