import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { LoginCredentials, RegisterData } from '../services/api';

interface User {
    username: string;
    fullName: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Verificar el estado de autenticación al cargar
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Aquí podrías hacer una llamada a la API para verificar el token
                    // y obtener los datos del usuario
                    const userData = await authAPI.getCurrentUser();
                    setUser(userData);
                } catch (error) {
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (credentials: LoginCredentials) => {
        try {
            setError(null);
            const response = await authAPI.login(credentials);
            localStorage.setItem('token', response.token);
            setUser(response.user);
        } catch (error) {
            setError('Error al iniciar sesión');
            throw error;
        }
    };

    const register = async (data: RegisterData) => {
        try {
            setError(null);
            const response = await authAPI.register(data);
            localStorage.setItem('token', response.token);
            setUser(response.user);
        } catch (error) {
            setError('Error al registrar usuario');
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        authAPI.logout();
    };

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        error
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
}; 