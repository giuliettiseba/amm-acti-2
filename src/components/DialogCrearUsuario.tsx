import React, {useState} from 'react';
import {
    alpha,
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
import type {DialogCrearUsuarioProps} from "../types/props/DialogCrearUsuarioProps.tsx";

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
            slotProps={{
                backdrop: {
                    sx: {
                        backdropFilter: 'blur(8px)',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)'
                    }
                }
            }}
            PaperProps={{
                sx: (theme) => ({
                    borderRadius: '20px',
                    overflow: 'visible',
                    position: 'relative',
                    // Glass effect base
                    background: theme.palette.mode === 'dark'
                        ? alpha(theme.palette.background.paper, 0.85)
                        : alpha(theme.palette.background.paper, 0.95),
                    WebkitBackdropFilter: 'blur(24px)',
                    backdropFilter: 'blur(24px)',
                    // Diffuse neon border with secondary color
                    border: `2px solid ${alpha(theme.palette.secondary.main, 0.4)}`,
                    boxShadow: `
                        0 0 30px ${alpha(theme.palette.secondary.main, 0.2)},
                        0 0 60px ${alpha(theme.palette.secondary.main, 0.15)},
                        0 0 90px ${alpha(theme.palette.secondary.main, 0.1)},
                        inset 0 0 30px ${alpha(theme.palette.secondary.main, 0.08)}
                    `,
                    // Subtle inner glow gradient
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '20px',
                        padding: '2px',
                        background: `linear-gradient(135deg,
                            ${alpha(theme.palette.secondary.main, 0.3)} 0%,
                            ${alpha(theme.palette.secondary.light, 0.2)} 50%,
                            ${alpha(theme.palette.secondary.main, 0.25)} 100%)`,
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        pointerEvents: 'none',
                        zIndex: 1
                    },
                    // Decorative glow blobs
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: '-15%',
                        top: '-15%',
                        width: '70%',
                        height: '70%',
                        pointerEvents: 'none',
                        backgroundImage: `radial-gradient(500px 400px at 30% 30%,
                            ${alpha(theme.palette.secondary.main, 0.18)} 0%,
                            transparent 50%)`,
                        zIndex: 0,
                        filter: 'blur(40px)',
                        mixBlendMode: 'screen',
                        opacity: 0.9
                    },
                    // Ensure children are above decorative elements
                    '& > *': {
                        position: 'relative',
                        zIndex: 2
                    }
                })
            }}
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
