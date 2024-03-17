import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, concatMap, map, mergeAll, of, startWith, switchMap, tap, throttleTime } from 'rxjs';
import { Movie, Pilot, Starship, Starships } from '../Interfaces/starships.interface';

@Injectable({providedIn: 'root'})

export class ApiService {

  private starshipsList = new BehaviorSubject<Starship[]>([]);
  public actualPage = 1;
  public maxPage = 4;

  private apiUrl = `https://swapi.py4e.com/api/starships/`;
  nextPageTrigger: Subject<number> = new Subject<number>();

  constructor (private http:HttpClient) {
  }


  getStarshipsList(): Observable<Starships> {
    return this.nextPageTrigger.pipe(
      throttleTime(1000),
      startWith(0),
      concatMap<number, Observable<Starships>>((): Observable<Starships> => {
        if (this.actualPage > 4) {
          return of({ count: 0, next: null as string | null, results: [] } as Starships);
        }
        return this.http.get<Starships>(`${this.apiUrl}?page=${this.actualPage++}`);
      }),
      tap((newStarships: Starships) => {
        const currentStarships = this.starshipsList.getValue();
        if (newStarships && newStarships.results) {
          this.starshipsList.next([...currentStarships, ...newStarships.results]);
        }
      }),
      switchMap(() => this.starshipsList.asObservable()),
      map((starshipsArray: Starship[]) => {
        return {
          count: starshipsArray.length,
          next: this.actualPage <= 3 ? `${this.apiUrl}?page=${this.actualPage + 1}` : null,
          results: starshipsArray
        } as Starships;
      })
    );
  }

  getStarshipInfo(id: number): Observable<Starship> {
    return this.http.get<Starship>(`${this.apiUrl}${id}/`);
  }

  getPilotByUrl(pilotUrl: string): Observable<Pilot> {
    return this.http.get<Pilot>(pilotUrl).pipe(
      map(pilot => {
        const urlParts = pilot.url.split('/');
        const id = urlParts[5];
        const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
        return { ...pilot, imageUrl };
      })
    );
  }

  getMovieByUrl(movieUrl: string): Observable<Movie> {
    return this.http.get<Movie>(movieUrl).pipe(
      map(film => {
        const urlParts = film.url.split('/');
        const id = urlParts[5];
        const imageUrl = `https://starwars-visualguide.com/assets/img/films/${id}.jpg`;
        return { ...film, imageUrl };
      })
    );
  }

}



