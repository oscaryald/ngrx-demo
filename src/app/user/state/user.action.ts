import { Action } from '@ngrx/store';

export enum UserActionTypes {
    showUserMask = '[User] toggle user mask'
}

export class ShowUserMask implements Action {
    readonly type = UserActionTypes.showUserMask;

    constructor(public payload: boolean) {}
}

export type UserActions = ShowUserMask;
