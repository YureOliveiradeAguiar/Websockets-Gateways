import { Routes } from "@angular/router";
import { ItemForm } from "@pages/item-form/item-form";
import { Items } from "@pages/items/items";

import { PageBase } from "./page-base/page-base";

export const routes: Routes = [
  {
    path: '',
    component: PageBase,
    children: [
      {
        path: 'items',
        component: Items
      },
      {
        path: 'items/new',
        component: ItemForm
      },
      { path: '', redirectTo: 'items', pathMatch: 'full' },
    ]
  },
  //=================================================

  // Redirects any unknown path (404) back to home 404
  { path: '**', redirectTo: 'items' }
];
