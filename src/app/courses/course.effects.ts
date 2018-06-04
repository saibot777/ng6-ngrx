
import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Course} from "./model/course";
import {CourseActionTypes, CourseLoaded} from "./course.actions";
import {map, mergeMap} from "rxjs/internal/operators";
import {CoursesService} from "./services/courses.service";

@Injectable()
export class CourseEffects {

  constructor(private actions$: Actions, private coursesService: CoursesService) {}

  @Effect()
  loadCourse$ = this.actions$.pipe(
    ofType<Course>(CourseActionTypes.CourseRequested),
    mergeMap(action => this.coursesService.findCourseById(action.payload)),
    map(course => new CourseLoaded({course}))
  );

}