import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppChoosequizDmlaModule } from './app-choosequiz-dmla-root/app-choosequiz-dmla.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppChoosequizDmlaModule)
  .catch(err => console.error(err));
