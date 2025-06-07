import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Configuración base de axios
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 segundos de timeout
});

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar respuestas
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
        
        // Si el error es 401 y no es una petición de refresh token
        if (error.response?.status === 401 && 
            originalRequest?.url !== '/auth/refresh-token' && 
            !originalRequest?._retry) {
            
            originalRequest._retry = true;
            
            try {
                // Intentar refrescar el token
                const newToken = await authAPI.refreshToken();
                
                // Actualizar el header de la petición original
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                }
                
                // Reintentar la petición original
                return api.request(originalRequest);
            } catch (refreshError) {
                // Si falla el refresh token, cerrar sesión
                localStorage.removeItem('token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);

// Tipos de datos
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    seller: string;
}

// Funciones de autenticación
export const authAPI = {
    login: async (credentials: LoginCredentials) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },
    register: async (data: RegisterData) => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
    },
    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },
    refreshToken: async () => {
        const response = await api.post('/auth/refresh-token');
        const { token } = response.data;
        localStorage.setItem('token', token);
        return token;
    }
};

// Funciones de productos
export const productsAPI = {
    getAll: async () => {
        const response = await api.get('/products');
        return response.data;
    },
    getById: async (id: string) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },
    create: async (product: Omit<Product, 'id'>) => {
        const response = await api.post('/products', product);
        return response.data;
    },
    update: async (id: string, product: Partial<Product>) => {
        const response = await api.put(`/products/${id}`, product);
        return response.data;
    },
    delete: async (id: string) => {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    },
};

// Función de utilidad para manejar errores
export const handleApiError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string }>;
        if (axiosError.response?.data?.message) {
            return axiosError.response.data.message;
        }
        if (axiosError.message) {
            return axiosError.message;
        }
    }
    return 'Ha ocurrido un error inesperado';
};

export default api; 