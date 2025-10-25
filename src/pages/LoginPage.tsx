/**
 * LoginPage
 *
 * Página de inicio de sesión para el usuario.
 *
 * Permite al usuario autenticarse introduciendo su nombre de usuario y contraseña.
 * Incluye manejo de errores, estado de carga, y la opción de crear un nuevo usuario mediante un diálogo modal.
 * Si el usuario ya está autenticado, redirige automáticamente al perfil.
 *
 * @component
 * @returns {JSX.Element | null} Página de login o null si el usuario ya está autenticado.
 *
 * @example
 * <LoginPage />
 */
import {useLocation, useNavigate} from 'react-router-dom';
import {type FormEvent, useEffect, useState} from 'react';
import {useAuthContext} from '../context/AuthContext';
import LoginCard from '../components/Cards/LoginCard.tsx';
import DialogCrearUsuario from '../components/DialogCrearUsuario';

export default function LoginPage() {
    // Obtiene funciones y estado de autenticación del contexto
    const {login, isAuthenticated} = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation() as any;
    // Estado para los campos del formulario y control de UI
    const [username, setUsername] = useState('usuario');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [openCrearUsuario, setOpenCrearUsuario] = useState(false);
    const [usuarioCreado, setUsuarioCreado] = useState<string | null>(null);

    // Redirige al perfil si ya está autenticado
    useEffect(() => {
        if (isAuthenticated) navigate('/perfil', {replace: true});
    }, [isAuthenticated, navigate]);

    /**
     * Maneja el envío del formulario de login.
     * Llama a la función de login y gestiona redirección y errores.
     * @param {FormEvent} e - Evento de formulario.
     */
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await login(username, password);
            const redirectTo = location.state?.from || '/perfil';
            navigate(redirectTo, {replace: true});
        } catch (e: any) {
            setError(e?.message || 'Error en login');
        } finally {
            setLoading(false);
        }
    }

    // Si ya está autenticado, no muestra nada
    if (isAuthenticated) return null;

    return (
        <LoginCard
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            error={error}
            loading={loading}
            onSubmit={handleSubmit}
            usuarioCreado={usuarioCreado}
            onOpenCrearUsuario={() => setOpenCrearUsuario(true)}
        >
            <DialogCrearUsuario
                open={openCrearUsuario}
                onClose={() => setOpenCrearUsuario(false)}
                onSuccess={(user) => {
                    setUsuarioCreado(`Usuario '${user.username}' creado correctamente. Ahora puedes iniciar sesión.`);
                    setOpenCrearUsuario(false);
                }}
            />
        </LoginCard>
    );
}
