import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProduitsComponent} from './produits/produits.component';
import {ProduitDetailComponent} from './produit-detail/produit-detail.component';
import {ProduitEditComponent} from './produit-edit/produit-edit.component';
import {ProduitAjoutComponent} from './produit-ajout/produit-ajout.component';

const routes: Routes = [
  {
    path: 'produits',
    component: ProduitsComponent,
    data: { title: 'Liste de Produits' }
  },
  {
    path: 'produit-details/:id',
    component: ProduitDetailComponent,
    data: { title: 'Détails du Produit' }
  },
  {
    path: 'product-add',
    component: ProduitAjoutComponent,
    data: { title: 'Add Produit' }
  },
  {
    path: 'product-edit/:id',
    component: ProduitEditComponent,
    data: { title: 'Edit Produit' }
  },
  { path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
