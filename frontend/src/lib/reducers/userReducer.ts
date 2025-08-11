'use client';

import {UnknownAction} from "redux";

export const initialState = {
    token: '',
    user: {

    }
}

const UserReducer = (
    state: object = initialState,
    actions: any
) : any => {
    const { payload, type } = actions;

    console.log('t', type)

    switch (type) {
        case 'user/setProps':
            window && window.localStorage.setItem(
                'user',
                JSON.stringify({
                    ...state,
                    ...payload,
                })
            );

            console.log('payload', payload)

            return {
                ...state,
                ...payload,
            };
        default:
            return state;
    }
}

export default UserReducer;