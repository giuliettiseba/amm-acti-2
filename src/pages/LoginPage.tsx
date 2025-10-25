import {useLocation, useNavigate} from 'react-router-dom';
import {type FormEvent, useEffect, useState} from 'react';
import {useAuthContext} from '../context/AuthContext';
import LoginCard from '../components/LoginCard';
import DialogCrearUsuario from '../components/DialogCrearUsuario';

export default function LoginPage() {
    const {login, isAuthenticated} = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation() as any;
    const [username, setUsername] = useState('usuario');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [openCrearUsuario, setOpenCrearUsuario] = useState(false);
    const [usuarioCreado, setUsuarioCreado] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated) navigate('/perfil', {replace: true});
    }, [isAuthenticated, navigate]);

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
