import { Component, inject, Input } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [AsyncPipe, RouterModule, CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent {

  availableTypes = ['Fire', 'Water', 'Grass', 'Electric', 'Normal', 'Bug', 'Psychic', 'Fighting', 'Poison', 'Ground', 'Rock', 'Ghost'];

  @Input() pokemon!: { name: string; url: string };

  private selectedType$ = new BehaviorSubject<string>('');
  private searchTerm$ = new BehaviorSubject<string>('');
  private sortDirection$ = new BehaviorSubject<'asc' | 'desc'>('asc');
  private pokemonService = inject(PokemonService);

  pokemons$ = this.selectedType$.pipe(
    switchMap(type => this.pokemonService.getPokemonsByType(type))
  );

  filteredPokemons$ = combineLatest([
    this.pokemons$,
    this.searchTerm$,
    this.sortDirection$
  ]).pipe(
    map(([pokemons, searchTerm, direction]) =>
      pokemons
        .filter(p =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => this.sortByName(a, b, direction))
    )
  );

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm$.next(input.value);
  }

  onSort(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.sortDirection$.next(select.value as 'asc' | 'desc');
  }

  onTypeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedType$.next(select.value);
  }

  private sortByName(
    a: { name: string },
    b: { name: string },
    direction: 'asc' | 'desc'
  ): number {
    return direction === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  }

  public trackByName(index: number, pokemon: { name: string }): string {
    return pokemon.name;
  }

  formatId(id: string): string {
    return id.padStart(3, '0');
  }

  getIdFromUrl(url: string): string {
    return url.split('/').filter(Boolean).pop()!;
  }
}
