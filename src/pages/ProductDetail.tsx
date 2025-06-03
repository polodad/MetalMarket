import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  type: string;
  quality: string;
  price: number;
  location: string;
  seller: string;
  image: string;
  description: string;
  specifications: {
    purity: string;
    weight: string;
    dimensions: string;
    certification: string;
  };
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);

  // Datos de ejemplo (esto vendría del backend)
  const product: Product = {
    id: '1',
    name: 'Cobre de alta pureza',
    type: 'Cobre',
    quality: 'Alta',
    price: 8500,
    location: 'Madrid, España',
    seller: 'Metales Premium S.L.',
    image: 'https://via.placeholder.com/800x600',
    description: 'Cobre de alta pureza (99.99%) ideal para aplicaciones industriales y eléctricas. Certificado y garantizado.',
    specifications: {
      purity: '99.99%',
      weight: '1000 kg',
      dimensions: '100x50x50 cm',
      certification: 'ISO 9001',
    },
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleContact = () => {
    // Implementar lógica de contacto
    console.log('Contactar al vendedor');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Imagen del producto */}
          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Información del producto */}
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-primary-600">
                {product.price.toLocaleString('es-ES', {
                  style: 'currency',
                  currency: 'EUR'
                })}
              </span>
              <span className="ml-2 text-sm text-gray-500">por tonelada</span>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Tipo</h3>
                <p className="text-gray-800">{product.type}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Calidad</h3>
                <p className="text-gray-800">{product.quality}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Ubicación</h3>
                <p className="text-gray-800">{product.location}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Vendedor</h3>
                <p className="text-gray-800">{product.seller}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Cantidad (toneladas)</h3>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-24 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div className="space-y-4">
              <button
                onClick={handleContact}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Contactar al vendedor
              </button>
            </div>
          </div>
        </div>

        {/* Especificaciones y descripción */}
        <div className="p-8 border-t border-gray-200">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Descripción</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Especificaciones</h2>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Pureza</dt>
                  <dd className="text-gray-800">{product.specifications.purity}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Peso</dt>
                  <dd className="text-gray-800">{product.specifications.weight}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Dimensiones</dt>
                  <dd className="text-gray-800">{product.specifications.dimensions}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Certificación</dt>
                  <dd className="text-gray-800">{product.specifications.certification}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 