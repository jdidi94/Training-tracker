import {Action} from '@ngrx/store'
import { Exercise } from './exercise.model'

export const SET_AVAILABLE_TRAININGS= "[Training] SET_AVAILABLE_TRAININGS"
export const  SET_FINISHED_TRAININGS="[Training] SET_FINISHED_TRAININGS"
export const  START_TRAININGS="[Training] START_TRAININGS"
export const  STOP_TRAININGS="[Training] STOP_TRAININGS"


export class SetAvalaibleTraining implements  Action{
  readonly type = SET_AVAILABLE_TRAININGS
  constructor(public payload:Exercise[]){}

}
export class SetFinishedTraining implements  Action{
  readonly type = SET_FINISHED_TRAININGS
  constructor(public payload:Exercise[]){}

}
export class StartTraining implements  Action{
  readonly type = START_TRAININGS
  constructor(public payload:string){}


}
export class StopTraining implements  Action{
  readonly type = STOP_TRAININGS

}
export type TrainingAction=SetAvalaibleTraining|SetFinishedTraining|StartTraining|StopTraining
