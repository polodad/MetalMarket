import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  type: 'buyer' | 'seller';
  company?: string;
  location: string;
}

interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  status: 'active' | 'sold' | 'pending';
  date: string;
}

const Dashboard: React.FC = () => {
  // Datos de ejemplo (esto vendría del backend)
  const user: User = {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    type: 'seller',
    company: 'Metales Premium S.L.',
    location: 'Madrid, España',
  };

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'messages'>('overview');

  // Datos de ejemplo para productos
  const products: Product[] = [
    {
      id: '1',
      name: 'Cobre de alta pureza',
      type: 'Cobre',
      price: 8500,
      status: 'active',
      date: '2024-01-15',
    },
    {
      id: '2',
      name: 'Aluminio industrial',
      type: 'Aluminio',
      price: 2500,
      status: 'pending',
      date: '2024-01-14',
    },
  ];

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Productos Activos</h3>
        <p className="text-3xl font-bold text-primary-600">12</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Ventas Totales</h3>
        <p className="text-3xl font-bold text-primary-600">€45,000</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Mensajes Nuevos</h3>
        <p className="text-3xl font-bold text-primary-600">3</p>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Mis Productos</h2>
          <Link
            to="/products/new"
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
          >
            Añadir Producto
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Producto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map(product => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{product.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {product.price.toLocaleString('es-ES', {
                      style: 'currency',
                      currency: 'EUR'
                    })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.status === 'active' ? 'bg-green-100 text-green-800' :
                    product.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {product.status === 'active' ? 'Activo' :
                     product.status === 'pending' ? 'Pendiente' : 'Vendido'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(product.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-primary-600 hover:text-primary-900 mr-4">
                    Editar
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">
          Bienvenido, {user.name}
          {user.type === 'seller' && ` - ${user.company}`}
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`${
              activeTab === 'overview'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Resumen
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`${
              activeTab === 'products'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Productos
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`${
              activeTab === 'orders'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Pedidos
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`${
              activeTab === 'messages'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Mensajes
          </button>
        </nav>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'products' && renderProducts()}
        {activeTab === 'orders' && (
          <div className="text-center py-12">
            <p className="text-gray-500">No hay pedidos activos</p>
          </div>
        )}
        {activeTab === 'messages' && (
          <div className="text-center py-12">
            <p className="text-gray-500">No hay mensajes nuevos</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 