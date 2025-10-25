/**
 * userService
 *
 * Servicio para autenticación y gestión de usuarios.
 * Proporciona métodos para iniciar sesión y crear nuevos usuarios,
 * utilizando el cliente API genérico para la comunicación con el backend.
 *
 * @module userService
 */
import {apiPost} from './apiClient';
import {API_ROUTES} from '../constants/apiRoutes';
import type {LoginCredentials, LoginResponse, User} from '../types';

export const userService = {
    /**
     * Autenticación de usuario.
     *
     * Realiza una petición POST al endpoint de login con las credenciales proporcionadas.
     *
     * @param {LoginCredentials} credentials - Credenciales de acceso (usuario y contraseña).
     * @returns {Promise<LoginResponse>} Promesa que resuelve con la respuesta de autenticación.
     */
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        return apiPost<LoginResponse>(API_ROUTES.USER_LOGIN, credentials);
    },

    /**
     * Crea un nuevo usuario.
     *
     * Realiza una petición POST al endpoint de usuarios con los datos del nuevo usuario.
     *
     * @param {Omit<User, 'id'>} user - Datos del usuario a crear (sin id).
     * @returns {Promise<User>} Promesa que resuelve con el usuario creado.
     */
    async createUser(user: Omit<User, 'id'>): Promise<User> {
        return apiPost<User>(API_ROUTES.USERS, user);
    },
};
