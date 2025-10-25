import {useAuthContext} from '../context/AuthContext';
import {Alert} from '@mui/material';
import PerfilUsuarioComponent from '../components/PerfilUsuarioComponent';

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
        <PerfilUsuarioComponent />
    );
}
