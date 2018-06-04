import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthActionTypes, Login, Logout} from "./auth.actions";
import {tap} from "rxjs/internal/operators";
import {Router} from "@angular/router";


@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private router: Router) {}

  @Effect({dispatch: false})
  login$ = this.actions$
    .pipe(
      ofType<Login>(AuthActionTypes.LoginAction),
      tap(action => localStorage.setItem('user', JSON.stringify(action.user)))
    );

  @Effect({dispatch: false})
  logout$ =  this.actions$
    .pipe(
      ofType<Logout>(AuthActionTypes.LogoutAction),
      tap(() => {
        localStorage.removeItem('user');
        this.router.navigateByUrl('/login');
      })
    );
}
