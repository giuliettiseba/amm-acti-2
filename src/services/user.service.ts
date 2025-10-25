import {apiPost} from './apiClient';
import {API_ROUTES} from '../constants/apiRoutes';
import type {LoginCredentials, LoginResponse, User} from '../types';

export const userService = {
    /**
     * Autenticación de usuario
     */
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        return apiPost<LoginResponse>(API_ROUTES.USER_LOGIN, credentials);
    },

    /**
     * Crea un nuevo usuario
     */
    async createUser(user: Omit<User, 'id'>): Promise<User> {
        return apiPost<User>(API_ROUTES.USERS, user);
    },
};
