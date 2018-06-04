
import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {AllCoursesLoaded, CourseActionTypes, CourseLoaded, CourseRequested} from "./course.actions";
import {map, mergeMap} from "rxjs/internal/operators";
import {CoursesService} from "./services/courses.service";

@Injectable()
export class CourseEffects {

  constructor(private actions$: Actions, private coursesService: CoursesService) {}

  @Effect()
  loadCourse$ = this.actions$.pipe(
    ofType<CourseRequested>(CourseActionTypes.CourseRequested),
    mergeMap(action => this.coursesService.findCourseById(action.payload.courseId)),
    map(course => new CourseLoaded({course}))
  );

  @Effect()
  loadAllCourses$ = this.actions$
    .pipe(
      ofType<CourseRequested>(CourseActionTypes.CourseRequested),
      mergeMap(action => this.coursesService.findAllCourses()),
      map(courses => new AllCoursesLoaded({courses}))
    );

}
