import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            MetalMarket
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-primary-600">
              Productos
            </Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-primary-600">
              Dashboard
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-primary-600"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 