import { Routes } from "@angular/router";

import { Home } from "./home/home";

export const routes: Routes = [

  { path: 'home', component: Home },

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Redirects any unknown path (404) back to home 404
  { path: '**', redirectTo: 'home' }
];
