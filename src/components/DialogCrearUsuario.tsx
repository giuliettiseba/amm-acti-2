import React, {useState} from 'react';
import {
    Alert,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@mui/material';
import {userService} from '../services/user.service';
import type {User} from '../types';

interface DialogCrearUsuarioProps {
    open: boolean;
    onClose: () => void;
    onSuccess?: (user: User) => void;
}

export default function DialogCrearUsuario({open, onClose, onSuccess}: DialogCrearUsuarioProps) {
    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        company: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({...form, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        if (form.password !== form.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        setLoading(true);
        try {
            const user = await userService.createUser({
                username: form.username,
                password: form.password,
                firstName: form.firstName,
                lastName: form.lastName,
                phoneNumber: form.phoneNumber,
                email: form.email,
                company: form.company
            });
            setSuccess(true);
            if (onSuccess) onSuccess(user);
            setTimeout(() => {
                setSuccess(false);
                onClose();
            }, 1200);
        } catch (e: any) {
            setError(e?.message || 'Error al crear usuario');
        } finally {
            setLoading(false);
        }
    }

    function handleClose() {
        setForm({
            username: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            company: ''
        });
        setError(null);
        setSuccess(false);
        onClose();
    }

    return (
        <Dialog
            open={open}
            onClose={(_event, reason) => {
                if (reason !== 'backdropClick') handleClose();
            }}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>Crear usuario</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Usuario"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Contraseña"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Confirmar contraseña"
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Nombre"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Apellido"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Teléfono"
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        type="email"
                    />
                    <TextField
                        label="Empresa"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    {error && <Alert severity="error" sx={{mt: 2}}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{mt: 2}}>Usuario creado correctamente</Alert>}
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} disabled={loading}>Cancelar</Button>
                <Button onClick={handleSubmit} variant="contained" disabled={loading}
                        startIcon={loading ? <CircularProgress size={18}/> : null}>
                    Crear usuario
                </Button>
            </DialogActions>
        </Dialog>
    );
}
