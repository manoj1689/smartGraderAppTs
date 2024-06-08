// src/utils/tokenUtils.ts

import { JWT_TOKEN_KEY,EMAIL_ID_KEY,LOGGED_IN_KEY } from '../constants/Constants';

export const getToken = (): string | null => {
    return localStorage.getItem(JWT_TOKEN_KEY);
};

export const setToken = (token: string): void => {
    localStorage.setItem(JWT_TOKEN_KEY, token);
};

export const removeToken = (): void => {
    localStorage.removeItem(JWT_TOKEN_KEY);
};

export const getEmail = (): string | null => {
    return localStorage.getItem(EMAIL_ID_KEY);
};

export const setEmail = (emailId: string): void => {
    localStorage.setItem(EMAIL_ID_KEY, emailId);
};

export const removeEmail = (): void => {
    localStorage.removeItem(EMAIL_ID_KEY);
};

export const getLogged = (): boolean => {
    const loggedIn = localStorage.getItem(LOGGED_IN_KEY);
    return loggedIn ? JSON.parse(loggedIn) : false;
  };

export const setLogged = (loggedIn: boolean): void => {
    localStorage.setItem(LOGGED_IN_KEY,  JSON.stringify(loggedIn));
};

export const removeLogged = (): void => {
    localStorage.removeItem(LOGGED_IN_KEY);
};
