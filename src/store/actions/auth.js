import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setAuthRedirectPath = (authPath) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        authPath: authPath
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const checkAuthenticationTime = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000);
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (email, password, isSignUp) => {
    return dispach => {
        dispach(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBdcDEyodOLxq5yMXQEhhQc8MjZ0ALsXd4';
        if (!isSignUp) url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBdcDEyodOLxq5yMXQEhhQc8MjZ0ALsXd4';
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispach(authSuccess(response.data.idToken, response.data.localId));
                dispach(checkAuthenticationTime(response.data.expiresIn));
            })
            .catch(error => {
                console.log(error);
                dispach(authFail(error.response.data.error));
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        console.log(token)
        if(!token) {
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()) {
                dispatch(authLogout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthenticationTime((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
} 