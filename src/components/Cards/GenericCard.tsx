import {alpha, styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import {Button, Fade, useThemeProps} from "@mui/material";
import React from "react";
import type {GenericCardProps} from "../../types/props/GenericCardProps.tsx";


interface GenericCardState extends GenericCardProps {
    // …key value pairs for the internal state that you want to style the slot
    // but don't want to expose to the users
    otherValue?: string;
}


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
    transition: 'transform 0.20s cubic-bezier(.2,.8,.2,1), box-shadow 0.18s ease',
    '&:hover': {
        transform: 'translateY(-10px)',
        boxShadow: `0 38px 90px ${alpha(theme.palette.primary.main, 0.22)}`,
    },

    // inner subtle highlight (top-left) and a faint inner stroke
    '&:before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: 20,
        pointerEvents: 'none',
        // use theme background for the highlight so it adapts
        background: `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.08)} 0%, ${alpha(theme.palette.background.paper, 0.03)} 35%, ${alpha(theme.palette.background.default, 0)} 100%)`,
        boxShadow: `inset 0 1px 0 ${alpha(theme.palette.background.paper, 0.04)}, inset 0 -6px 24px ${alpha(theme.palette.background.default, 0.03)}`,
        zIndex: 1,
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
const GenericCardImage = styled('div')<{ ownerState: GenericCardState }>(({ownerState, theme}) => ({
    width: '100%',
    height: 160,
    borderRadius: theme.shape.borderRadius,
    // use background palette so the fallback matches theme
    backgroundColor: theme.palette.background.default,
    backgroundImage: ownerState?.image ? `url(${ownerState.image})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));

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
    transition: 'transform 0.12s ease, box-shadow 0.12s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme.shadows[3],
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
            category,
            addToCartText,
            addToCart,
            showDetails,
            ...other
        } = props;

        const ownerState: GenericCardState = {...props, variant};

        function addToCartHandler() {
            if (addToCart) {
                addToCart()
            }

        }

        return (
            <Fade in={isVisible} timeout={100}>
                <GenericCardRoot ref={ref} ownerState={ownerState} {...other}
                >
                    {(category &&
                        <GenericCardCategory ownerState={ownerState}>{category}</GenericCardCategory>
                    )}
                    <GenericCardImage ownerState={ownerState}
                                      onClick={showDetails}
                    />
                    {title ? <GenericCardTitle ownerState={ownerState}>{title}</GenericCardTitle> : null}
                    {subtitle ? <GenericCardSubtitle ownerState={ownerState}>{subtitle}</GenericCardSubtitle> : null}
                    {description ?
                        <GenericCardDescription ownerState={ownerState}>{description}</GenericCardDescription> : null}

                    {(price &&
                        <GenericCardPrice ownerState={ownerState}>${price?.toFixed(2)}</GenericCardPrice>
                    )}

                    {(addToCart &&
                        <Button onClick={addToCartHandler}>{addToCartText || "Agregar Al Carrito"}</Button>
                    )}
                </GenericCardRoot>
            </Fade>
        );
    },
);
