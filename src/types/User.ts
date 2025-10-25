export interface User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    company?: string;
    nombre?: string; // Alias para compatibilidad con UI
    avatar?: string; // URL del avatar

}
