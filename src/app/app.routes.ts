import { Routes } from '@angular/router';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

export const routes: Routes = [
  { path: '', component: PokemonListComponent }, // <-- Ici ta page principale
  { path: 'pokemon/:name', component: PokemonDetailComponent },
  { path: '**', redirectTo: '' }, // redirige toutes les routes inconnues vers la liste
];