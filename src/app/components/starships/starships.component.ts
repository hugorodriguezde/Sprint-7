import { AsyncPipe } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { Starships } from '../../Interfaces/starships.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [AsyncPipe, ],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.scss'
})
export class StarshipsComponent implements OnInit, OnDestroy{

  public starshipsResults$!: Observable<Starships>;
  constructor(private service:ApiService,
      private router:Router) {}
  public id:string = '0';
  public urlNumbers: string[] | null = [];

  ngOnInit(): void {
    this.starshipsResults$ = this.service.getStarshipsList();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    // check if the user has scrolled to 80% of the page
    if(pos > max * 0.8 )  {
      this.service.nextPageTrigger.next(this.service.actualPage);
    }
  }

  goToStarshipInfo(url: string): void {
    const id = url.split('/').slice(-2, -1)[0];
    this.router.navigate(['/info', id]);
  }

  ngOnDestroy(): void {
    this.service.actualPage = 1;
  }
}
