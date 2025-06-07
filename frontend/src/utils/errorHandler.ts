import { AxiosError } from 'axios';
import { useNotification } from '../context/NotificationContext';

interface ErrorResponse {
    success: boolean;
    message: string;
    error?: string;
    errors?: { [key: string]: string[] };
}

export class AppError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public errors?: { [key: string]: string[] }
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export const handleApiError = (error: unknown): AppError => {
    if (error instanceof AppError) {
        return error;
    }

    if (error instanceof AxiosError) {
        const response = error.response?.data as ErrorResponse;
        
        if (response?.errors) {
            // Error de validación
            return new AppError(
                'Error de validación',
                error.response?.status,
                response.errors
            );
        }

        if (response?.message) {
            // Error del servidor
            return new AppError(
                response.message,
                error.response?.status
            );
        }

        if (error.code === 'ECONNABORTED') {
            return new AppError(
                'La solicitud ha excedido el tiempo de espera',
                408
            );
        }

        if (!error.response) {
            return new AppError(
                'Error de conexión. Por favor, verifica tu conexión a internet',
                0
            );
        }
    }

    // Error desconocido
    return new AppError(
        'Ha ocurrido un error inesperado',
        500
    );
};

export const useErrorHandler = () => {
    const { addNotification } = useNotification();

    const handleError = (error: unknown) => {
        const appError = handleApiError(error);

        // Mostrar notificación
        addNotification({
            type: 'error',
            message: appError.message,
            duration: 5000
        });

        // Si hay errores de validación, mostrarlos
        if (appError.errors) {
            Object.entries(appError.errors).forEach(([field, messages]) => {
                messages.forEach(message => {
                    addNotification({
                        type: 'error',
                        message: `${field}: ${message}`,
                        duration: 5000
                    });
                });
            });
        }

        // Manejar errores específicos
        switch (appError.statusCode) {
            case 401:
                // Redirigir al login
                window.location.href = '/login';
                break;
            case 403:
                // Redirigir a página de acceso denegado
                window.location.href = '/access-denied';
                break;
            case 404:
                // Redirigir a página 404
                window.location.href = '/not-found';
                break;
            case 500:
                // Redirigir a página de error
                window.location.href = '/error';
                break;
        }

        return appError;
    };

    return { handleError };
}; 