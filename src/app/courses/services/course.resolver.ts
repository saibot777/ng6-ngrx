import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Course} from "../model/course";
import {Observable} from "rxjs";
import {CoursesService} from "./courses.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../reducers";



@Injectable()
export class CourseResolver implements Resolve<Course> {

    constructor(private coursesService: CoursesService, private store: Store<AppState>) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
        return this.coursesService.findCourseById(route.params['id']);
    }

}

