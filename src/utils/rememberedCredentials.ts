// src/utils/rememberedCredentials.ts

import { REMEMBERED_EMAIL_KEY, REMEMBERED_PASSWORD_KEY,REMEMBERED_PASSWORD_EMAIL_KEY } from '../constants/constants';

export const getRememberedEmail = (): string | null => {
    return localStorage.getItem(REMEMBERED_EMAIL_KEY);
};

export const setRememberedEmail = (email: string): void => {
    localStorage.setItem(REMEMBERED_EMAIL_KEY, email);
};

export const removeRememberedEmail = (): void => {
    localStorage.removeItem(REMEMBERED_EMAIL_KEY);
};

export const getRememberedPassword = (): string | null => {
    return localStorage.getItem(REMEMBERED_PASSWORD_KEY);
};

export const setRememberedPassword = (email: string): void => {
    localStorage.setItem(REMEMBERED_PASSWORD_KEY, email);
};

export const removeRememberedPassword = (): void => {
    localStorage.removeItem(REMEMBERED_PASSWORD_KEY);
};

export const getRememberedPasswordEmail = (): string | null => {
    return localStorage.getItem(REMEMBERED_PASSWORD_EMAIL_KEY);
};

export const setRememberedPasswordEmail = (email: string): void => {
    localStorage.setItem(REMEMBERED_PASSWORD_EMAIL_KEY, email);
};

export const removeRememberedPasswordEmail = (): void => {
    localStorage.removeItem(REMEMBERED_PASSWORD_EMAIL_KEY);
};
