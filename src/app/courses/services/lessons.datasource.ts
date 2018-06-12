


import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
import {Lesson} from "../model/lesson";
import {CoursesService} from "./courses.service";
import {catchError, finalize} from "rxjs/operators";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../reducers";
import {PageQuery} from "../model/page";
import {selectLessonsPage} from "../course.selectors";
import {tap} from "rxjs/internal/operators";
import {LessonsPageRequested} from "../course.actions";



export class LessonsDataSource implements DataSource<Lesson> {

    private lessonsSubject = new BehaviorSubject<Lesson[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private coursesService: CoursesService, private store: Store<AppState>) {

    }

    loadLessons(courseId: number, page: PageQuery) {

      this.store
        .pipe(
          select(selectLessonsPage(courseId, page)),
          tap(lessons => {
            if (lessons.length > 0) {
              this.lessonsSubject.next(lessons);
            } else {
                this.store.dispatch(new LessonsPageRequested({courseId, page}));
            }
          }),
          catchError(err => of([]))
        )
        .subscribe();

    }

    connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
        console.log("Connecting data source");
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
        this.loadingSubject.complete();
    }

}

