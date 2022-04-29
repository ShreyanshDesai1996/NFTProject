import { userReducer } from './user/user.reducer';
import { UserState } from '../state/user/user.state';

export interface AppState {
  user: UserState;
  
}
export const reducers = {
    user: userReducer,
    
};
