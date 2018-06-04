import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthActionTypes, Login, Logout} from "./auth.actions";
import {tap} from "rxjs/internal/operators";
import {Router} from "@angular/router";
import {defer, of} from "rxjs";


@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private router: Router) {}

  @Effect({dispatch: false})
  login$ = this.actions$
    .pipe(
      ofType<Login>(AuthActionTypes.LoginAction),
      tap(action => localStorage.setItem('user', JSON.stringify(action.payload.user)))
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

  @Effect()
  init$ = defer(() => {
    const userData = localStorage.getItem('user');
    let e;
    if (userData) {
      return of(new Login(JSON.parse(userData)));
    } else {
      return of(new Logout(e));
    }
  });

}
