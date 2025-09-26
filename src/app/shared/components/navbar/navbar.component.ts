import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../../core/services/translation.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class Navbar {
  private i18n = inject(TranslationService);
  private router = inject(Router);
  private auth = inject(AuthService);

  get currentLanguage(): string {
    return this.i18n.currentLanguage;
  }

  get langs(): string[] {
    return this.i18n.availableLanguages;
  }

  isActive(lang: string): boolean {
    return this.i18n.currentLanguage === lang;
  }

  switchLanguage(lang: string): void {
    if (lang === this.i18n.currentLanguage) return;

    // 1) змінюємо мову в ngx-translate + localStorage
    this.i18n.setLanguage(lang);

    // 2) будуємо новий шлях, замінивши тільки перший сегмент (:lang)
    const tree = this.router.parseUrl(this.router.url);
    const primary = tree.root.children['primary'];
    const segments = primary?.segments.map(s => s.path) ?? [];

    if (segments.length === 0) {
      // на всяк випадок, якщо ми без сегментів — просто /:lang
      this.router.navigate(['/', lang], {
        queryParamsHandling: 'preserve',
        preserveFragment: true
      });
      return;
    }

    segments[0] = lang; // заміна поточної мови на обрану
    this.router.navigate(['/', ...segments], {
      queryParamsHandling: 'preserve',
      preserveFragment: true
    });
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  logout(): void {
    this.auth.logout();
    const lang = this.router.url.split('/')[1] || 'sk';
    this.router.navigate([`/${lang}/auth/login`]);
  }
}
