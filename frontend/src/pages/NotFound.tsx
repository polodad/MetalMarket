import React from 'react';

const NotFound: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-4xl font-bold mb-4">404</h1>
    <p className="text-lg mb-4">Página no encontrada</p>
    <a href="/" className="text-indigo-600 hover:underline">Volver al inicio</a>
  </div>
);

export default NotFound; 