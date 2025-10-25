/**
 * CafeteriaPage
 *
 * Página de la cafetería que permite explorar categorías de productos y ver productos de cada categoría.
 *
 * - Muestra categorías de productos con animación secuencial y permite seleccionar una para ver sus productos.
 * - Muestra productos de la categoría seleccionada con animación secuencial.
 * - Permite agregar productos al carrito.
 * - Maneja estados de carga, error y vacíos para categorías y productos.
 * - Utiliza GenericCard para mostrar categorías y productos, y CardSkeleton para estados de carga.
 *
 * @component
 * @returns {JSX.Element} Página de la cafetería con categorías, productos y manejo de estados.
 *
 * @example
 * <CafeteriaPage />
 */
import {useEffect, useState} from 'react';
import {useCafeteria, useSkeletonDelay} from '../hooks';
import EmptyState from '../components/EmptyState';
import {Alert, Box, Button, Grid, IconButton, Typography} from '@mui/material';
import {ArrowBack, LocalCafe, Refresh} from '@mui/icons-material';
import {GenericCard} from "../components/Cards/GenericCard.tsx";
import {CardSkeleton} from "../components/Skeleton.tsx";
import {useOrder} from "../context/OrderContext.tsx";

export default function CafeteriaPage() {
    // Estado para la categoría seleccionada
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
    // Estado para índices de categorías visibles (animación secuencial)
    const [visibleCategorias, setVisibleCategorias] = useState<number[]>([]);
    // Estado para índices de productos visibles (animación secuencial)
    const [visibleProductos, setVisibleProductos] = useState<number[]>([]);
    const {agregarProducto} = useOrder();

    // Hook de cafetería para obtener categorías y productos
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

    // Controla el retardo de los esqueletos de carga
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

    /**
     * Maneja el click en una categoría para mostrar sus productos.
     * @param {string} nombreCategoria - Nombre de la categoría seleccionada.
     */
    const handleCategoriaClick = async (nombreCategoria: string) => {
        setCategoriaSeleccionada(nombreCategoria);
        await loadProductosByCategoria(nombreCategoria);
    };

    /**
     * Maneja el click para volver a la vista de categorías.
     */
    const handleVolverCategorias = () => {
        setCategoriaSeleccionada(null);
        clearProductos();
    };

    /**
     * Refetch dinámico según la vista actual (categorías o productos).
     */
    const refetch = categoriaSeleccionada ?
        () => loadProductosByCategoria(categoriaSeleccionada) :
        refetchCategorias;

    /**
     * Error dinámico según la vista actual (categorías o productos).
     */
    const error = categoriaSeleccionada ? errorProductos : errorCategorias;

    return (
        <Box sx={{maxWidth: 1200, mx: 'auto'}}>
            <Box sx={{mb: 4, alignItems: 'center', textAlign: 'center'}}>
                {/* Header */}
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
                    {!errorCategorias && showSkeletonCategorias && (
                        <CardSkeleton visible={true}/>
                    )}

                    {!showSkeletonCategorias && !loadingCategorias && !errorCategorias && categorias && categorias.length > 0 && (
                        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                            {categorias.map((categoria, index) => (
                                <Grid key={index} size={{xs: 2, sm: 4, md: 4}}>
                                    <GenericCard
                                        sx={{height: '100%'}}
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
                    {!errorProductos && showSkeletonProductos && (
                        <CardSkeleton visible={true}/>
                    )}

                    {!showSkeletonProductos && !loadingProductos && !errorProductos && productos && productos.length > 0 && (
                        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                            {productos.map((producto, index) => (
                                <Grid key={index} size={{xs: 2, sm: 4, md: 4}}>
                                    <GenericCard
                                        key={producto.id}
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
