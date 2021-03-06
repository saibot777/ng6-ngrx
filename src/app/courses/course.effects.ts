import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  AllCoursesLoaded, AllCoursesRequested, CourseActionTypes, CourseLoaded, CourseRequested, LessonsPageLoaded,
  LessonsPageRequested
} from './course.actions';
import {throwError} from 'rxjs';
import {catchError, filter, map, mergeMap, withLatestFrom} from "rxjs/operators";
import {CoursesService} from './services/courses.service';
import {AppState} from '../reducers';
import {select, Store} from '@ngrx/store';
import {allCoursesLoaded} from './course.selectors';

@Injectable()
export class CourseEffects {

  @Effect()
  loadCourse$ = this.actions$
    .pipe(
      ofType<CourseRequested>(CourseActionTypes.CourseRequested),
      mergeMap(action => this.coursesService.findCourseById(action.payload.courseId)),
      map(course => new CourseLoaded({course})),
      catchError(err => {
        console.log('error loading course ', err);
        return throwError(err);
      })

  );

  @Effect()
  loadAllCourses$ = this.actions$
    .pipe(
      ofType<AllCoursesRequested>(CourseActionTypes.AllCoursesRequested),
      withLatestFrom(this.store.pipe(select(allCoursesLoaded))),
      filter(([action, allCoursesLoaded]) => !allCoursesLoaded),
      mergeMap(() => this.coursesService.findAllCourses()),
      map(courses => new AllCoursesLoaded({courses})),
      catchError(err => {
        console.log('error loading all courses ', err);
        return throwError(err);
      })
    );

  @Effect()
  loadLessons$ = this.actions$
    .pipe(
      ofType<LessonsPageRequested>(CourseActionTypes.LessonsPageRequested),
      mergeMap(({payload}) => this.coursesService.findLessons(payload.courseId, payload.page.pageIndex, payload.page.pageSize)),
      map(lessons => new LessonsPageLoaded({lessons}))
    );


  constructor(private actions$: Actions, private coursesService: CoursesService,
              private store: Store<AppState>) {

  }

}
