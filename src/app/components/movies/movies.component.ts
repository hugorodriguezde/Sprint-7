import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Starship } from '../../Interfaces/starships.interface';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [],
  templateUrl: './movies.component.html',

})
export class MoviesComponent implements OnInit {
  getMovies(getMovies: any) {
    throw new Error('Method not implemented.');
  }
  @Input() id: number | null = null;
  starshipDetails: any = {};
  movies: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      if (this.id) {
        this.apiService.getStarshipInfo(Number(this.id)).subscribe((details: Starship) => {
          this.starshipDetails = details;
          this.movies = [];


          this.starshipDetails.films.forEach((movieUrl: string) => {
            this.apiService.getMovieByUrl(movieUrl).subscribe((movieDetails: any) => {
              this.movies.push(movieDetails);
            });
          });


        });
      }
    });
  }
}
