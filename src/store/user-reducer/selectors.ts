import {State} from '../../types/state.ts';
import {ReducerName} from '../../types/reducer-name.ts';

export const selectUserData = (state: State) => state[ReducerName.User].userData;
export const selectAuthStatus = (state: State) => state[ReducerName.User].authStatus;
