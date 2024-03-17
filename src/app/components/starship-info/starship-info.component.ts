import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { Starship, } from '../../Interfaces/starships.interface';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { PilotsComponent } from '../pilots/pilots.component';
import { MoviesComponent } from '../movies/movies.component';


@Component({
  selector: 'app-starship-info',
  standalone: true,
  imports: [AsyncPipe, PilotsComponent, MoviesComponent],
  templateUrl: './starship-info.component.html',
  styleUrl: './starship-info.component.scss'
})

export class StarshipInfoComponent implements OnInit {
  @Input() starshipInfo!: Starship;
  public starshipsResults$!: Observable<Starship>;
  public id: number | null = null;

  constructor(private service:ApiService, private route:ActivatedRoute) {}

  public starshipImageUrl = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = Number(id); // Set id property
      this.starshipsResults$ = this.service.getStarshipInfo(this.id);
      this.starshipImageUrl = `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
    }
  }

    imgError(event: any) {
      event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
    }

}

