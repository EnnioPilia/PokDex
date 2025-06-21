import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Observable } from 'rxjs';
import { PokemonDetails } from '../../model/PokemonDetails';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  imports: [AsyncPipe, CommonModule],
  styleUrls: ['./pokemon-detail.component.scss'],
})

export class PokemonDetailComponent implements OnInit {
  public pokemonService = inject(PokemonService);

  constructor(private route: ActivatedRoute) { }

  pokemonDetails$!: Observable<PokemonDetails>;

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.pokemonDetails$ = this.pokemonService.getPokemonDetails(name);
    }
  }
}
