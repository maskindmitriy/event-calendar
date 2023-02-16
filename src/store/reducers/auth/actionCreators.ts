import { AppDispatch } from "../..";
import UserService from "../../../api/UserService";
import { IUser } from "../../../models/IUser";
import { AuthActionEnum, SetErrorAction, SetIsAuthAction, SetIsLoadingAction, SetUserAction } from "./types";

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({
    type: AuthActionEnum.SET_USER, payload: user
  }),
  setIsAuth: (isAuth: boolean): SetIsAuthAction => ({
    type: AuthActionEnum.SET_IS_AUTH, payload: isAuth
  }),
  setError: (error: string): SetErrorAction => ({
    type: AuthActionEnum.SET_ERROR, payload: error
  }),
  setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({
    type: AuthActionEnum.SET_IS_LOADING, payload: isLoading
  }),
  login: (username: string, password: string): any => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true))
      setTimeout( async () => {
        const response = await UserService.getUsers()
        const mockUser = response.data.find(user =>
          user.username === username &&
          user.password === password)
        if (mockUser) {
          localStorage.setItem('auth', 'true');
          localStorage.setItem('username', mockUser.username);
          dispatch(AuthActionCreators.setUser(mockUser))
          dispatch(AuthActionCreators.setIsAuth(true))        
        } else {
          dispatch(AuthActionCreators.setError('Некорректный логин или пароль'))
        }
        dispatch(AuthActionCreators.setIsLoading(false))
      }, 1000)


    } catch (e) {
      dispatch(AuthActionCreators.setError('Произошла ошибка при логине'))
    }
  },
  logout: ():any => (dispatch: AppDispatch) => {
      dispatch(AuthActionCreators.setIsLoading(true))
      localStorage.removeItem('auth')
      localStorage.removeItem('username')
      dispatch(AuthActionCreators.setUser({} as IUser))
      dispatch(AuthActionCreators.setIsAuth(false))
  }
}