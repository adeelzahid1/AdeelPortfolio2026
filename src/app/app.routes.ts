import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LogoGalleryComponent } from './pages/logo-gallery/logo-gallery';
import { NotFoundComponent } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projects', component: LogoGalleryComponent },
  { path: '**', component: NotFoundComponent },
];
