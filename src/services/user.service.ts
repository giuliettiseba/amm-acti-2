import { apiGet, apiPost } from './apiClient';
import { API_ROUTES } from '../constants/apiRoutes';
import type { User } from '../types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export const userService = {
  /**
   * Obtiene todos los usuarios
   */
  async getUsers(): Promise<User[]> {
    return apiGet<User[]>(API_ROUTES.USERS);
  },

  /**
   * Obtiene un usuario por ID
   */
  async getUserById(id: number): Promise<User> {
    return apiGet<User>(API_ROUTES.USER_BY_ID(id));
  },

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

  /**
   * Actualiza un usuario existente
   */
  async updateUser(id: number, user: Partial<Omit<User, 'id'>>): Promise<User> {
    return apiPost<User>(API_ROUTES.USER_BY_ID(id), user);
  }
};
