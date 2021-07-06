
import {AuthAction,SET_AUTHENTICATED,SET_UNAUTHENTICATED} from './auth.action'
export interface State {
  isAthenticated:boolean
}
 const initialState:State={
  isAthenticated:false
}
export function authReducer(state = initialState,action:AuthAction){
  switch(action.type){
    case SET_AUTHENTICATED :
      return {
        isAthenticated:true
      };
      case SET_UNAUTHENTICATED :
    return{
      isAthenticated:false
    }
    default:
      return state
}
  }
  export const getIsAuth= (state:State)=>state.isAthenticated
