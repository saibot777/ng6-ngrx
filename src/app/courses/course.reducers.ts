import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Course} from "./model/course";

export interface CoursesState extends EntityState<Course> {}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();
