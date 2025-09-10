import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageRouteService } from './services/language-route.service';
import { StartupRedirectService } from './services/startup-redirect.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  private _langRoute = inject(LanguageRouteService);
  private _startupRedirect = inject(StartupRedirectService);
}
