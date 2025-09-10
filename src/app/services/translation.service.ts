import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translate = inject(TranslateService);
  private readonly storageKey = 'app_language';

  constructor() {
    const savedLang = localStorage.getItem(this.storageKey);
    const defaultLang = savedLang || 'sk';

    this.translate.addLangs(['en', 'sk']);
    this.translate.setFallbackLang('en');
    this.translate.use(defaultLang);
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem(this.storageKey, lang);
  }

  get currentLanguage(): string {
    return this.translate.getCurrentLang() || 'sk';
  }
}

