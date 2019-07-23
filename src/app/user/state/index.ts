import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';
import * as fromRoot from '../../state/app.state';

export interface State extends fromRoot.State {
    user: UserState;
}

// Selectors
const getProductFeatureState = createFeatureSelector<UserState>('user');

export const getShowUserMask = createSelector(
    getProductFeatureState,
    state => state.showUserMask
);

export const getСurrentUser = createSelector(
    getProductFeatureState,
    state => state.currentUser
);
