import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, HttpClientModule,],
  templateUrl: './app.component.html',
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'StarWars';
  constructor(private authService: AuthService) {} // Fix typo in constructor parameter name
  ngOnInit() {
    this.authService.checkAuthenticationStatus();
  }
}
