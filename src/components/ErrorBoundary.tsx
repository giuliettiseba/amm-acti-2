import React, {Component, type ReactNode} from 'react';
import ErrorBoundaryNotifier from './ErrorBoundaryNotifier';

interface Props {
    children: ReactNode
}

interface State {
    hasError: boolean;
    error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
    state: State = {hasError: false};

    static getDerivedStateFromError(error: Error): State {
        return {hasError: true, error};
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error('ErrorBoundary atrapó un error', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{padding: '2rem'}}>
                    <h1>Ha ocurrido un problema.</h1>
                    <p>Intenta recargar la página o regresar al inicio.</p>
                    <a href="/">Ir al inicio</a>
                    <ErrorBoundaryNotifier error={this.state.error}/>
                </div>
            );
        }
        return this.props.children;
    }
}
