import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Starship, Pilot } from '../../Interfaces/starships.interface';

@Component({
  selector: 'app-pilots',
  standalone: true,
  imports: [],
  templateUrl: './pilots.component.html',
})
export class PilotsComponent {
  @Input() id: number | null = null;
  starshipDetails: Starship | null = null;
  pilots: Pilot[] = [];

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
          this.pilots = [];

          this.starshipDetails.pilots.forEach((pilotUrl: string) => {
            this.apiService.getPilotByUrl(pilotUrl).subscribe((pilotDetails: Pilot) => {
              this.pilots.push(pilotDetails);
            });
          });
        });
      }
    });
  }
}

