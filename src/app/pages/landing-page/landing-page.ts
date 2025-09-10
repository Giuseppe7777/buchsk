import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {
  private i18n = inject(TranslationService);

  // показуємо рівно ті мови, що в тебе є (sk/en)
  langs = ['sk', 'en', 'ua', 'de'];

  setLang(lang: string) {
    this.i18n.setLanguage(lang);
  }

  isActive(lang: string): boolean {
    return this.i18n.currentLanguage === lang;
  }
}
