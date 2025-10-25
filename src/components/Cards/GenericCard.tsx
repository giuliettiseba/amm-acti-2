/**
 * GenericCard
 *
 * Tarjeta visual reutilizable con efecto glassmorphism, adaptable para productos, libros, salas, etc.
 * Permite mostrar imagen, título, subtítulo, categoría (como chip flotante), descripción, precio y acciones.
 * Incluye animación de aparición, botón de acción principal, botón de detalles y soporte para skeleton.
 *
 * @component
 * @param props - Propiedades de la tarjeta.
 * @param props.title - Título principal de la tarjeta.
 * @param props.subtitle - Subtítulo o autor/categoría secundaria.
 * @param props.category - Categoría o etiqueta, mostrada como chip flotante.
 * @param props.description - Descripción breve o sinopsis.
 * @param props.price - Precio numérico (opcional).
 * @param props.image - URL de la imagen de portada (opcional).
 * @param props.addToCart - Callback para acción principal (añadir al carrito/reservar).
 * @param props.addToCartText - Texto del botón de acción principal.
 * @param props.showDetails - Callback para mostrar detalles (opcional).
 * @param props.isVisible - Si la tarjeta debe mostrarse (para animación).
 * @param props.skeleton - Si debe renderizarse como skeleton (carga).
 * @param props.children - Elementos hijos adicionales (opcional).
 *
 * @returns {JSX.Element} Tarjeta visual con glass effect y acciones.
 *
 * @example
 * <GenericCard
 *   title="Libro de Ejemplo"
 *   subtitle="Autor Ejemplo"
 *   category="Novela"
 *   description="Una sinopsis breve."
 *   price={19.99}
 *   image="/portada.jpg"
 *   addToCart={() => {}}
 *   addToCartText="Añadir al carrito"
 *   showDetails={() => {}}
 *   isVisible={true}
 * />
 */

import {alpha, styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import {Button, Fade, Grow, useThemeProps} from "@mui/material";
import React from "react";
import type {GenericCardProps} from "../../types/props/GenericCardProps.tsx";
import type {GenericCardState} from "../../types/GenericCardState.tsx";


const GenericCardRoot = styled(Card, {
    name: 'GenericCard',
    slot: 'root',
})<{ ownerState: GenericCardState }>(({theme}) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),
    padding: theme.spacing(3, 4),
    borderRadius: 20,
    overflow: 'hidden',
    cursor: 'pointer',
    // Glass base: slightly less opaque so background shows through
    background: theme.palette.mode === 'dark'
        ? alpha(theme.palette.background.paper, 0.06)
        : alpha(theme.palette.background.paper, 0.48),
    WebkitBackdropFilter: 'blur(16px)',
    backdropFilter: 'blur(16px)',
    // subtle border and inset shadow for depth
    border: `1px solid ${alpha(theme.palette.background.paper, 0.12)}`,
    // use a soft shadow tinted by primary color for theme-consistent depth
    boxShadow: `0 24px 40px ${alpha(theme.palette.primary.main, 0.12)}`,
    letterSpacing: '-0.025em',
    fontWeight: 600,
    // Quadratic ease for smooth, natural motion
    transition: 'none', // No animation by default
    '&:hover': {
        transform: 'translateY(-1px) scale(1.02)',
        boxShadow: `0 42px 100px ${alpha(theme.palette.primary.main, 0.28)}`,
        borderColor: alpha(theme.palette.primary.main, 0.3),
        transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.35s ease',
    },

    // Glass bright shine effect on hover
    '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
        // Much more subtle, transparent, and diagonal radial gradient
        background: `radial-gradient(circle at var(--shine-x, 60%) var(--shine-y, 0%), ${alpha(theme.palette.common.white, 0.10)} 0%, ${alpha(theme.palette.common.white, 0.04)} 40%, transparent 80%)`,
        opacity: 0,
        transition: 'none',
    },
    '&:hover:before': {
        opacity: 1,
        transition: 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },

    // decorative soft blobs: left secondary blob right primary blob
    '&:after': {
        content: '""',
        position: 'absolute',
        left: '-18%',
        top: '-5%',
        width: '80%',
        height: '130%',
        pointerEvents: 'none',
        backgroundImage: `radial-gradient(600px 400px at 8% 50%, ${alpha(theme.palette.secondary.main, 0.18)} 0%, transparent 35%), radial-gradient(500px 300px at 95% 70%, ${alpha(theme.palette.primary.main, 0.12)} 0%, transparent 30%)`,
        zIndex: 0,
        filter: 'blur(22px) saturate(1.1)',
        mixBlendMode: 'screen',
        opacity: 0.95,
        transition: 'none', // No animation by default
    },
    '&:hover:after': {
        filter: 'blur(28px) saturate(1.3)',
        opacity: 1,
        transition: 'filter 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.35s ease',
    },

    // ensure children are above decorative pseudo elements
    '& > *': {
        position: 'relative',
        zIndex: 3,
    },

    variants: [
        {
            props: {
                variant: 'outlined',
            },
            style: {
                border: `1px solid ${alpha(theme.palette.background.paper, 0.24)}`,
                boxShadow: 'none',
            },
        },
    ],
    ...theme.applyStyles('dark', {
        // keep slight translucency in dark mode
        background: alpha(theme.palette.background.paper, 0.06),
    }),
}));

// Image slot: uses ownerState.image as background
const GenericCardImage = styled('div')<{ ownerState: GenericCardState }>(({ownerState, theme}) => {
    const isSvg = ownerState?.image?.toLowerCase().endsWith('.svg');
    return {
        width: '100%',
        height: 160,
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
        // use background palette so the fallback matches theme
        backgroundColor: theme.palette.background.default,
        backgroundImage: ownerState?.image ? `url(${ownerState.image})` : undefined,
        backgroundSize: isSvg ? 'contain' : 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        cursor: 'pointer',
        transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        // If SVG, apply primary color filter
        ...(isSvg && {
            filter: `brightness(0) saturate(100%) invert(${theme.palette.mode === 'dark' ? '70%' : '40%'}) sepia(100%) hue-rotate(${theme.palette.primary.main === '#1976d2' ? '200deg' : '180deg'}) saturate(300%)`,
            backgroundColor: 'transparent',
        }),
        '&:hover': {
            transform: 'scale(1.08)',
        },
    };
});

// small helper to normalize text tokens: { primary, secondary }
function getTextTokens(theme: any) {
    // Use the explicit tokens requested: theme.palette.text and theme.palette.textDim
    const p = theme.palette as any;
    const primary = p.text ?? (p.text?.primary ?? theme.palette.text?.primary ?? theme.palette.text ?? '#000');
    const secondary = p.textDim ?? (p.text?.dim ?? theme.palette.text?.secondary ?? theme.palette.textDim ?? '#666');
    return {primary, secondary};
}

// Title slot
const GenericCardTitle = styled('div')<{ ownerState: GenericCardState }>(({theme}) => {
    const text = getTextTokens(theme);
    return ({
        ...theme.typography.h6,
        fontWeight: 800,
        // use theme text primary color
        color: text.primary,
        textShadow: `0 1px 0 ${alpha(text.secondary || theme.palette.background.default || theme.palette.background.paper, 0.12)}`,
        transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), color 0.3s ease',
        '&:hover': {
            transform: 'translateX(2px)',
            color: theme.palette.primary.main,
        },
    });
});

// Subtitle slot
const GenericCardSubtitle = styled('div')<{ ownerState: GenericCardState }>(({theme}) => {
    const text = getTextTokens(theme);
    return ({
        ...theme.typography.subtitle2,
        color: text.secondary,
    });
});

// Description slot
const GenericCardDescription = styled('div')<{ ownerState: GenericCardState }>(({theme}) => {
    const text = getTextTokens(theme);
    return ({
        ...theme.typography.body2,
        color: text.secondary,
    });
});

// Price slot
const GenericCardPrice = styled('div')<{ ownerState: GenericCardState }>(({theme}) => ({
    ...theme.typography.subtitle1,
    fontWeight: 800,
    color: theme.palette.primary.main,
    transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), color 0.3s ease',
    '&:hover': {
        transform: 'scale(1.01)',
        color: theme.palette.primary.dark,
    },
}));

// Category chip-button floating top-left
const GenericCardCategory = styled('button')<{ ownerState: GenericCardState }>(({theme}) => ({
    position: 'absolute',
    top: theme.spacing(1.5),
    left: theme.spacing(1.5),
    zIndex: 50,
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    padding: `${theme.spacing(0.25)} ${theme.spacing(1)}`,
    borderRadius: 9999,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText || '#fff',
    border: 'none',
    cursor: 'pointer',
    fontFamily: theme.typography.fontFamily,
    fontSize: '0.75rem',
    fontWeight: 600,
    boxShadow: theme.shadows[1],
    // Quadratic ease for smooth motion
    transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), background-color 0.3s ease',
    '&:hover': {
        transform: 'translateY(-3px) scale(1.05)',
        boxShadow: theme.shadows[4],
        backgroundColor: theme.palette.primary.dark,
    },
    '&:active': {
        transform: 'translateY(-1px) scale(1.02)',
        boxShadow: theme.shadows[2],
    },
    '&:focus': {
        outline: 'none',
        boxShadow: `0 0 0 3px ${theme.palette.action.focus}`,
    },
}));

export const GenericCard = React.forwardRef<HTMLDivElement, GenericCardProps>(
    function GenericCard(inProps, ref) {
        const props = useThemeProps({props: inProps, name: 'GenericCard'});
        const {
            title,
            subtitle,
            description,
            price,
            variant,
            isVisible,
            image,
            category,
            addToCartText,
            addToCart,
            showDetails,
            ...other
        } = props;

        const ownerState: GenericCardState = {...props, variant};

        // Mouse position tracking for shine effect
        const cardRef = React.useRef<HTMLDivElement>(null);

        // Actualiza el gradiente de brillo según la posición del puntero
        function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
            const card = cardRef.current;
            if (!card) return;
            const rect = card.getBoundingClientRect();
            // Normaliza la posición del puntero respecto a la card
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--shine-x', `${x}%`);
            card.style.setProperty('--shine-y', `${y}%`);
        }
        // Al salir, resetea el gradiente a un valor diagonal sutil
        function handleMouseLeave() {
            const card = cardRef.current;
            if (!card) return;
            card.style.setProperty('--shine-x', '60%');
            card.style.setProperty('--shine-y', '0%');
        }

        function addToCartHandler() {
            if (addToCart) {
                addToCart()
            }

        }

        return (
            <Grow
                in={isVisible}
                timeout={{
                    enter: 500,
                    exit: 300
                }}
                style={{
                    transformOrigin: 'center bottom',
                    transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
            >
                <Fade
                    in={isVisible}
                    timeout={{
                        enter: 600,
                        exit: 300
                    }}
                >
                    <GenericCardRoot
                        ref={node => {
                            cardRef.current = node;
                            if (typeof ref === 'function') ref(node);
                            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
                        }}
                        ownerState={ownerState}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        {...other}
                    >
                        {(category? <GenericCardCategory ownerState={ownerState}>{category}</GenericCardCategory> : null)}
                        {image ? <GenericCardImage ownerState={ownerState} onClick={showDetails}/> : null}
                        {title ? <GenericCardTitle ownerState={ownerState}>{title}</GenericCardTitle> : null}
                        {subtitle ? <GenericCardSubtitle ownerState={ownerState}>{subtitle}</GenericCardSubtitle> : null}
                        {description ? <GenericCardDescription ownerState={ownerState}>{description}</GenericCardDescription> : null}
                        {(price ? <GenericCardPrice ownerState={ownerState}>${price?.toFixed(2)}</GenericCardPrice> : null)}
                        {(addToCart ? <Button onClick={addToCartHandler}>{addToCartText || "Agregar Al Carrito"}</Button> : null)}
                    </GenericCardRoot>
                </Fade>
            </Grow>
        );
    },
);
