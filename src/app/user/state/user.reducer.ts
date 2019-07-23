import { UserActionTypes, UserActions } from './user.action';
import { User } from '../user';

export interface UserState {
    showUserMask: boolean;
    currentUser: User;
}

const initialState: UserState = {
    showUserMask: true,
    currentUser: null,
};

export function reducer(state = initialState, action: UserActions) {
    switch (action.type) {
        case UserActionTypes.showUserMask:
            return {
                ...state,
                showUserMask: action.payload,
            };
        default:
            return state;
    }
}
