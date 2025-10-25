import {useEffect, useState} from 'react';
import {useCafeteria, useOrder, useSkeletonDelay} from '../hooks';
import EmptyState from '../components/EmptyState';
import {Alert, Box, Button, Grid, IconButton, Typography} from '@mui/material';
import {ArrowBack, LocalCafe, Refresh} from '@mui/icons-material';
import {GenericCard} from "../components/GenericCard.tsx";
import {CardSkeleton} from "../components/Skeleton.tsx";

export default function CafeteriaPage() {
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
    const [visibleCategorias, setVisibleCategorias] = useState<number[]>([]);
    const [visibleProductos, setVisibleProductos] = useState<number[]>([]);
    const {agregarProducto} = useOrder();

    // Usar el hook específico de cafetería
    const {
        categorias,
        productos,
        loadingCategorias,
        loadingProductos,
        errorCategorias,
        errorProductos,
        refetchCategorias,
        refetchProductos,
        loadProductosByCategoria,
        clearProductos
    } = useCafeteria();

    const showSkeletonCategorias = useSkeletonDelay(loadingCategorias);
    const showSkeletonProductos = useSkeletonDelay(loadingProductos);

    // Efecto para mostrar categorías con animación secuencial
    useEffect(() => {
        if (!loadingCategorias && categorias && categorias.length > 0 && !showSkeletonCategorias) {
            setVisibleCategorias([]);
            categorias.forEach((_, index) => {
                setTimeout(() => {
                    setVisibleCategorias(prev => [...prev, index]);
                }, index * 150); // 150ms de delay entre cada elemento
            });
        }
    }, [loadingCategorias, categorias, showSkeletonCategorias]);

    // Efecto para mostrar productos con animación secuencial
    useEffect(() => {
        if (!loadingProductos && productos && productos.length > 0 && !showSkeletonProductos) {
            setVisibleProductos([]);
            productos.forEach((_, index) => {
                setTimeout(() => {
                    setVisibleProductos(prev => [...prev, index]);
                }, index * 100); // 100ms de delay entre cada elemento
            });
        }
    }, [loadingProductos, productos, showSkeletonProductos]);

    // Resetear animaciones al cambiar de vista
    useEffect(() => {
        if (loadingCategorias) {
            setVisibleCategorias([]);
        }
        if (loadingProductos) {
            setVisibleProductos([]);
        }
    }, [loadingCategorias, loadingProductos]);

    const handleCategoriaClick = async (nombreCategoria: string) => {
        setCategoriaSeleccionada(nombreCategoria);
        await loadProductosByCategoria(nombreCategoria);
    };

    const handleVolverCategorias = () => {
        setCategoriaSeleccionada(null);
        clearProductos();
    };

    const refetch = categoriaSeleccionada ?
        () => loadProductosByCategoria(categoriaSeleccionada) :
        refetchCategorias;
    const error = categoriaSeleccionada ? errorProductos : errorCategorias;

    return (
        <Box sx={{maxWidth: 1200, mx: 'auto'}}>
            <Box sx={{mb: 4, alignItems: 'center', textAlign: 'center'}}>


                <Box sx={{display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center'}}>
                    {categoriaSeleccionada && (
                        <IconButton onClick={handleVolverCategorias} color="primary">
                            <ArrowBack/>
                        </IconButton>
                    )}
                    <Typography variant="h4" component="h2" sx={{fontWeight: 600, mb: 1}}>
                        {categoriaSeleccionada ? categoriaSeleccionada : 'Cafetería'}
                    </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{mb: 3}}>
                    {categoriaSeleccionada
                        ? 'Selecciona un producto de esta categoría'
                        : 'Explora nuestras categorías de productos'
                    }
                </Typography>
            </Box>
            {/* Header */}


            {/* Error handling */}
            {error && (
                <Alert severity="error" sx={{mb: 3}}>
                    <Typography variant="h6">Error al cargar</Typography>
                    <Typography variant="body2">{error}</Typography>
                    <Button variant="contained" onClick={refetch} sx={{mt: 2}}>
                        Reintentar
                    </Button>
                </Alert>
            )}

            {/* Vista de Categorías */}
            {!categoriaSeleccionada && (
                <>
                    {showSkeletonCategorias && !errorCategorias && (
                        <CardSkeleton/>

                    )}

                    {!loadingCategorias && !errorCategorias && categorias && categorias.length > 0 && (
                        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                            {categorias.map((categoria, index) => (
                                <Grid key={index} size={{xs: 2, sm: 4, md: 4}}>
                                    <GenericCard
                                        itemType={"Categoría"}
                                        title={categoria.nombre}
                                        description={categoria.descripcion}
                                        image={categoria.imagen}
                                        isVisible={visibleCategorias.includes(index)}
                                        showDetails={() => handleCategoriaClick(categoria.nombre)}
                                    />

                                </Grid>
                            ))}
                        </Grid>
                    )}

                    {!loadingCategorias && !errorCategorias && (!categorias || categorias.length === 0) && (
                        <EmptyState
                            title="Sin categorías"
                            description="Aún no hay categorías disponibles en la cafetería."
                            icon={<LocalCafe/>}
                            action={
                                <Button variant="outlined" onClick={refetchCategorias} startIcon={<Refresh/>}>
                                    Actualizar
                                </Button>
                            }
                        />
                    )}
                </>
            )}

            {/* Vista de Productos */}
            {categoriaSeleccionada && (
                <>
                    {showSkeletonProductos && !errorProductos && (
                        <CardSkeleton/>
                    )}

                    {!loadingProductos && !errorProductos && productos && productos.length > 0 && (
                        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                            {productos.map((producto, index) => (
                                <Grid key={index} size={{xs: 2, sm: 4, md: 4}}>
                                    <GenericCard
                                        key={producto.id}
                                        itemType={"Producto"}
                                        title={producto.name}
                                        subtitle={producto.category}
                                        description={producto.description}
                                        price={producto.price}
                                        image={producto.image}
                                        showDetails={() => {

                                        }}
                                        addToCart={() => agregarProducto(producto)}
                                        isVisible={visibleProductos.includes(index)}
                                    />

                                </Grid>
                            ))}
                        </Grid>

                    )}

                    {!loadingProductos && !errorProductos && (!productos || productos.length === 0) && (
                        <EmptyState
                            title="Sin productos"
                            description={`No hay productos disponibles en la categoría "${categoriaSeleccionada}".`}
                            icon={<LocalCafe/>}
                            action={
                                <Button variant="outlined" onClick={refetchProductos} startIcon={<Refresh/>}>
                                    Actualizar
                                </Button>
                            }
                        />
                    )}
                </>
            )}
        </Box>
    );
}
