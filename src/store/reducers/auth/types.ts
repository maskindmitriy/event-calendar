import { IUser } from "../../../models/IUser";

export interface AuthState {
  isAuth: boolean;
  user: IUser;
  isLoading: boolean;
  error: string;

}

export enum AuthActionEnum {
  SET_IS_AUTH = 'SET_IS_AUTH',
  SET_ERROR = 'SET_ERROR',
  SET_USER = 'SET_USER',
  SET_IS_LOADING = 'SET_IS_LOADING'
}

export interface SetIsAuthAction {
  type: AuthActionEnum.SET_IS_AUTH
  payload: boolean;
}
export interface SetErrorAction {
  type: AuthActionEnum.SET_ERROR
  payload: string;
}
export interface SetUserAction {
  type: AuthActionEnum.SET_USER
  payload: IUser;
}
export interface SetIsLoadingAction {
  type: AuthActionEnum.SET_IS_LOADING
  payload: boolean;
}

// type Action<T, P> = { 
//   type: T, 
//   payload: P 
// }

// type setAuth = Action<Actions.SET_AUTH, boolean>


export type AuthAction = SetIsAuthAction | SetUserAction | SetErrorAction | SetIsLoadingAction // | ...Action

