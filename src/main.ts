import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { environment } from './environments/environment';

bootstrapApplication(App, {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ]
});
