import { Injectable } from '@angular/core';

export interface AppConfig {
  API: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: AppConfig | null = null;

  loadConfig(): Promise<void> {
    return fetch('/config.json')
      .then(res => {
        if (!res.ok) {
          throw new Error(`Could not load config.json (status ${res.status})`);
        }
        return res.json();
      })
      .then((config: AppConfig) => {
        this.config = config;
      });
  }

  get apiUrl(): string {
    if (!this.config) {
      throw new Error('Config not loaded!');
    }
    return this.config.API;
  }
}
