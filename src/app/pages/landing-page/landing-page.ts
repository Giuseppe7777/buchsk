import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/translation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, TranslatePipe, CommonModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {
  private i18n = inject(TranslationService);

  get currentLanguage(): string {
    return this.i18n.currentLanguage;
  }

  get langs(): string[] {
    return this.i18n.availableLanguages;
  }

  setLang(lang: string) {
    this.i18n.setLanguage(lang);
  }

  isActive(lang: string): boolean {
    return this.i18n.currentLanguage === lang;
  }

}
