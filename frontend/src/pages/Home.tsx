import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-lg">
        <h1 className="text-5xl font-bold mb-6">
          Bienvenido a MetalMarket
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Tu plataforma líder para la compra y venta de metales de alta calidad.
          Conectamos proveedores y compradores en un mercado seguro y confiable.
        </p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="bg-white text-primary-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100"
          >
            Comenzar Ahora
          </Link>
          <Link
            to="/products"
            className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-primary-600"
          >
            Ver Productos
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-primary-600">
            Proveedores Verificados
          </h3>
          <p className="text-gray-600">
            Todos nuestros proveedores pasan por un riguroso proceso de verificación
            para garantizar la calidad de los productos.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-primary-600">
            Calidad Garantizada
          </h3>
          <p className="text-gray-600">
            Cada producto es inspeccionado y certificado para asegurar los más altos
            estándares de calidad.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-primary-600">
            Transacciones Seguras
          </h3>
          <p className="text-gray-600">
            Sistema de pagos seguro y confiable para todas tus transacciones.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gray-50 p-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          ¿Listo para comenzar?
        </h2>
        <p className="text-gray-600 mb-8">
          Únete a nuestra comunidad de compradores y vendedores de metales.
        </p>
        <Link
          to="/register"
          className="bg-primary-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-primary-700"
        >
          Registrarse Ahora
        </Link>
      </section>
    </div>
  );
};

export default Home; 