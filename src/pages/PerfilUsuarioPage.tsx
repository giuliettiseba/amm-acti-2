/**
 * PerfilUsuarioPage
 *
 * Página de perfil de usuario.
 *
 * Muestra la información del usuario autenticado utilizando el componente PerfilUsuarioCard.
 * Si no hay usuario autenticado, muestra una alerta de advertencia.
 *
 * @component
 * @returns {JSX.Element} Página de perfil de usuario o alerta si no hay sesión.
 *
 * @example
 * <PerfilUsuarioPage />
 */
import {useAuthContext} from '../context/AuthContext';
import {Alert} from '@mui/material';
import PerfilUsuarioCard from '../components/cards/PerfilUsuarioCard.tsx';

export default function PerfilUsuarioPage() {
    const {user} = useAuthContext();

    if (!user) {
        return (
            <Alert severity="warning">
                No se encontró la sesión del usuario.
            </Alert>
        );
    }

    return (
        <PerfilUsuarioCard />
    );
}
