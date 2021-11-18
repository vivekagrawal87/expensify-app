import authReducer from '../../reducers/auth';

test('sould set uid for login', () => {
    const action = {
        type: 'LOGIN',
        uid: '12345'
    }

    const state = authReducer({}, action);
    expect(state.uid).toBe(action.uid);
});

test('should clear uid for logout', () => {
    const action = {
        type: 'LOGOUT'
    }

    const state = authReducer({ uid: '12345'}, action);
    expect(state).toEqual({});
});