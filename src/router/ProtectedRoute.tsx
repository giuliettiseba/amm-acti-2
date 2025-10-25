import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useAuthContext} from '../context/AuthContext';

export function ProtectedRoute() {
    const {isAuthenticated, loading} = useAuthContext();
    const location = useLocation();

    if (loading) return <p>Cargando sesión...</p>;
    if (!isAuthenticated) return <Navigate to="/login" replace state={{from: location.pathname}}/>;
    return <Outlet/>;
}
