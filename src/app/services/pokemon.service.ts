import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokemonListItem } from '../model/PokemonListItem';
import { PokemonDetails } from '../model/PokemonDetails';

@Injectable({
  providedIn: 'root',
})

export class PokemonService {
  private http = inject(HttpClient);
  private url = 'https://pokeapi.co/api/v2/pokemon?limit=50';

  getPokemons(): Observable<PokemonListItem[]> {
    return this.http
      .get<{ results: PokemonListItem[] }>(this.url)
      .pipe(map((response) => response.results));
  }

  getPokemonDetails(name: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
  }

  getPokemonsByType(type: string): Observable<{ name: string; url: string }[]> {
    if (!type) return this.getPokemons();

    return this.http
      .get<any>(`https://pokeapi.co/api/v2/type/${type}`)
      .pipe(
        map((response) =>
          response.pokemon.slice(0, 50).map((p: any) => p.pokemon)
        )
      );
  }
}

