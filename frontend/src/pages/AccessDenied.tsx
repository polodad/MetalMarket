import React from 'react';

const AccessDenied: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-4xl font-bold mb-4">Acceso Denegado</h1>
    <p className="text-lg mb-4">No tienes permisos para ver esta página.</p>
    <a href="/" className="text-indigo-600 hover:underline">Volver al inicio</a>
  </div>
);

export default AccessDenied; 