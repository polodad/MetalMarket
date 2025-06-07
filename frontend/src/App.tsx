import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import ProductPost from './pages/ProductPost';
import NotFound from './pages/NotFound';
import AccessDenied from './pages/AccessDenied';
import ErrorPage from './pages/Error';

// Componente para rutas protegidas
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

function App() {
    return (
        <NotificationProvider>
            <AuthProvider>
                <Router>
                    <div className="min-h-screen bg-gray-100">
                        <Navbar />
                        <main className="container mx-auto px-4 py-8">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route 
                                    path="/dashboard" 
                                    element={
                                        <ProtectedRoute>
                                            <Dashboard />
                                        </ProtectedRoute>
                                    } 
                                />
                                <Route path="/products" element={<ProductList />} />
                                <Route path="/products/:id" element={<ProductDetail />} />
                                <Route 
                                    path="/post-product" 
                                    element={
                                        <ProtectedRoute>
                                            <ProductPost />
                                        </ProtectedRoute>
                                    } 
                                />
                                <Route path="/not-found" element={<NotFound />} />
                                <Route path="/access-denied" element={<AccessDenied />} />
                                <Route path="/error" element={<ErrorPage />} />
                                <Route path="*" element={<Navigate to="/not-found" />} />
                            </Routes>
                        </main>
                    </div>
                </Router>
            </AuthProvider>
        </NotificationProvider>
    );
}

export default App; 