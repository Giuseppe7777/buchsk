import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslationService } from './translation.service';

@Injectable({ providedIn: 'root' })
export class LanguageRouteService {
  constructor(private router: Router, private i18n: TranslationService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const lang = this.router.url.split('/')[1];
        if (this.i18n.availableLanguages.includes(lang)) {
          this.i18n.setLanguage(lang);
        }
      });
  }
}
