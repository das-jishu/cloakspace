import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthguardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.auth.getLoggedInUser().pipe(map((item => {
      if (item[2] === 'none')
        this.router.navigate(['/']);
      return item[2] === "none" ? false : true;
    })));
  }
}