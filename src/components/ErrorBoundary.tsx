import React, {Component} from 'react';
import ErrorBoundaryNotifier from './ErrorBoundaryNotifier';
import type {ErrorBoundaryProps} from "../types/props/ErrorBoundaryProps.tsx";

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {hasError: false};

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
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
