import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  userName: string = '';
  private sub?: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.sub = this.authService.userName$.subscribe(userName => {
      this.userName = userName;
    });
  }

  logout() {
    this.authService.logout();
  }
  
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
