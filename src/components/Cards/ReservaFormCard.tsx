import {alpha, Card, CardContent, Box, Button, Divider, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography, CircularProgress} from '@mui/material';
import type {SelectChangeEvent} from '@mui/material/Select';
import React from 'react';

/**
 * ReservaFormCard
 *
 * Muestra el formulario de reserva de sala en una tarjeta.
 *
 * @param {object} props
 * @param {boolean} props.loading - Indica si el formulario está en estado de carga.
 * @param {object} props.formData - Datos del formulario de reserva.
 * @param {function} props.handleInputChange - Función para manejar cambios en los campos de texto.
 * @param {function} props.handlePreferencesChange - Función para manejar cambios en las preferencias adicionales.
 * @param {function} props.handleSubmit - Función para manejar el envío del formulario.
 * @param {string[]} props.preferencesOptions - Opciones de preferencias adicionales.
 * @param {function} props.navigate - Función de navegación (por ejemplo, useNavigate de react-router).
 * @returns {JSX.Element}
 */
export default function ReservaFormCard({
    loading,
    formData,
    handleInputChange,
    handlePreferencesChange,
    handleSubmit,
    preferencesOptions,
    navigate
}: {
    loading: boolean,
    formData: any,
    handleInputChange: (field: string, value: string | number) => void,
    handlePreferencesChange: (event: SelectChangeEvent<string[]>) => void,
    handleSubmit: (e: React.FormEvent) => void,
    preferencesOptions: string[],
    navigate: any
}) {
    return (
        <Card sx={(theme) => ({
            mt: 3,
            borderRadius: '20px',
            background: theme.palette.mode === 'dark'
                ? alpha(theme.palette.background.paper, 0.85)
                : alpha(theme.palette.background.paper, 0.95),
            WebkitBackdropFilter: 'blur(24px)',
            backdropFilter: 'blur(24px)',
            border: `2px solid ${alpha(theme.palette.secondary.main, 0.4)}`,
            boxShadow: `
                0 0 30px ${alpha(theme.palette.secondary.main, 0.2)},
                0 0 60px ${alpha(theme.palette.secondary.main, 0.15)},
                0 0 90px ${alpha(theme.palette.secondary.main, 0.1)},
                inset 0 0 30px ${alpha(theme.palette.secondary.main, 0.08)}
            `,
            transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            '&:hover': {
                borderColor: alpha(theme.palette.secondary.main, 0.5),
                boxShadow: `
                    0 0 40px ${alpha(theme.palette.secondary.main, 0.25)},
                    0 0 80px ${alpha(theme.palette.secondary.main, 0.2)},
                    0 0 120px ${alpha(theme.palette.secondary.main, 0.15)},
                    inset 0 0 40px ${alpha(theme.palette.secondary.main, 0.1)}
                `,
            }
        })}>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h6" sx={{mb: 2, fontWeight: 600}}>
                        Datos de la Reserva
                    </Typography>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                        <TextField
                            label="Fecha de inicio"
                            type="datetime-local"
                            value={formData.startDate}
                            onChange={e => handleInputChange('startDate', e.target.value)}
                            InputLabelProps={{shrink: true}}
                            required
                        />
                        <TextField
                            label="Fecha de fin"
                            type="datetime-local"
                            value={formData.endDate}
                            onChange={e => handleInputChange('endDate', e.target.value)}
                            InputLabelProps={{shrink: true}}
                            required
                        />
                        <FormControl>
                            <InputLabel id="preferences-label">Preferencias adicionales</InputLabel>
                            <Select
                                labelId="preferences-label"
                                multiple
                                value={formData.additionalPreferences}
                                onChange={handlePreferencesChange}
                                input={<OutlinedInput label="Preferencias adicionales"/>}
                                renderValue={(selected) => (selected as string[]).join(', ')}
                            >
                                {preferencesOptions.map(option => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Divider sx={{my: 3}}/>
                    <Box sx={{display: 'flex', gap: 2, justifyContent: 'flex-end'}}>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/coworking')}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit"/> : 'Reservar'}
                        </Button>
                    </Box>
                </form>
            </CardContent>
        </Card>
    );
}

