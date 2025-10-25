import type {LoginContext} from './LoginContext.ts';

export interface AuthResponse {
    usuario: LoginContext;
    token: string;
}
