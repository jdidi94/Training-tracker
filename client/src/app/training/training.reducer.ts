
import {Action,createFeatureSelector,createSelector} from '@ngrx/store'

import { Exercise } from './exercise.model';
import {TrainingAction,SET_AVAILABLE_TRAININGS,SET_FINISHED_TRAININGS,START_TRAININGS,STOP_TRAININGS} from './training.action'
import * as  fromRoot from '../app.reducers'
export interface TrainingState {
  avalaibleExercises:Exercise[];
  finishedExercises:Exercise[];
  activeTraining:Exercise;
}
export interface State extends fromRoot.State{
  training :TrainingState

}
 const initialState:TrainingState = {
  avalaibleExercises:[],
  finishedExercises:[],
  activeTraining:null

}
// export interface TrainingState {
//   avalaibleExercises:Exercise[];
//   finishedExercises:Exercise[];
// }


export function TrainingReducer(state = initialState,action:TrainingAction){
  switch(action.type){
    case SET_AVAILABLE_TRAININGS :
      return {...state,
        avalaibleExercises:action.payload
      };
      case SET_FINISHED_TRAININGS :
    return{...state,
      finishedExercises:action.payload
    }
    case START_TRAININGS :
      return{
        ...state,
        activeTraining:{...state.avalaibleExercises.find(ex=>ex.id===action.payload)}
      }
      case STOP_TRAININGS :
        return{
          ...state,
          activeTraining:null
        }
    default:
      return state
}
  }
  export const  getTrainingState=createFeatureSelector<TrainingState>('training',)
  export const getAvailableTraining= createSelector(getTrainingState,(state:TrainingState)=>state.avalaibleExercises)
  export const getFinishedTraining=createSelector(getTrainingState,(state:TrainingState)=>state.finishedExercises)
  export const getActiveTraining= createSelector(getTrainingState,(state:TrainingState)=>state.activeTraining)
  export const getIsTraining=createSelector(getTrainingState,(state:TrainingState)=>state.activeTraining!==null)
