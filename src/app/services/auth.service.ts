import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  private API_URL = 'http://localhost:3002/api';
  private sessionToken: string | null = null;

  ngOnInit() {
    this.checkAuthenticationStatus();
  }
  constructor(private http: HttpClient) {
    const sessionToken = localStorage.getItem('token');
    if (sessionToken) {
      const userName:any = localStorage.getItem('userName');
      this.userNameSubject.next(userName);
      this.sessionToken = sessionToken;
    }
  }


  get token() {
    return this.sessionToken;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token != null;
  }

  private userNameSubject = new BehaviorSubject<string>('');
  userName$ = this.userNameSubject.asObservable();

  register(user: any) {
    return this.http.post(`${this.API_URL}/user/register`, user).pipe(
      tap((res: any) => {
        this.userNameSubject.next(user.name);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userName', user.name);
      })

    );
  }

  login(user: any) {
    return this.http.post(`${this.API_URL}/user/login`, user).pipe(
      tap((res: any) => {
        console.log(res);
        console.log(res.userName);
        this.userNameSubject.next(res.data.userName);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userName', res.data.userName);
      })
    );
  }

  logout() {
    this.userNameSubject.next('');
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

checkAuthenticationStatus() {
  const sessionToken = localStorage.getItem('token');
  if (sessionToken) {
    const userName = localStorage.getItem('userName');
    if (userName) {
      this.userNameSubject.next(userName);
    }
    this.sessionToken = sessionToken;
  }
}
}
