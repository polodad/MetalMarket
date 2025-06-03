import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Tipo para los productos
interface Product {
  id: string;
  name: string;
  type: string;
  quality: string;
  price: number;
  location: string;
  seller: string;
  image: string;
}

const ProductList: React.FC = () => {
  const [filters, setFilters] = useState({
    type: '',
    quality: '',
    minPrice: '',
    maxPrice: '',
    location: '',
  });

  // Datos de ejemplo (esto vendría del backend)
  const products: Product[] = [
    {
      id: '1',
      name: 'Cobre de alta pureza',
      type: 'Cobre',
      quality: 'Alta',
      price: 8500,
      location: 'Madrid, España',
      seller: 'Metales Premium S.L.',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: '2',
      name: 'Aluminio industrial',
      type: 'Aluminio',
      quality: 'Media',
      price: 2500,
      location: 'Barcelona, España',
      seller: 'Aluminios del Norte',
      image: 'https://via.placeholder.com/300x200',
    },
    // Añadir más productos de ejemplo aquí
  ];

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredProducts = products.filter(product => {
    return (
      (!filters.type || product.type.toLowerCase().includes(filters.type.toLowerCase())) &&
      (!filters.quality || product.quality === filters.quality) &&
      (!filters.minPrice || product.price >= Number(filters.minPrice)) &&
      (!filters.maxPrice || product.price <= Number(filters.maxPrice)) &&
      (!filters.location || product.location.toLowerCase().includes(filters.location.toLowerCase()))
    );
  });

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtros */}
        <div className="w-full md:w-64 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Filtros</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo de metal</label>
              <input
                type="text"
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Cobre, Aluminio..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Calidad</label>
              <select
                name="quality"
                value={filters.quality}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">Todas</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Precio mínimo</label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Precio máximo</label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Ubicación</label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Ciudad, País..."
              />
            </div>
          </div>
        </div>

        {/* Lista de productos */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{product.type}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-primary-600 font-semibold">
                      {product.price.toLocaleString('es-ES', {
                        style: 'currency',
                        currency: 'EUR'
                      })}
                    </span>
                    <span className="text-sm text-gray-500">{product.location}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Vendedor: {product.seller}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList; 