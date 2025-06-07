import React from 'react';

const ErrorPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-4xl font-bold mb-4">Error</h1>
    <p className="text-lg mb-4">Ha ocurrido un error inesperado.</p>
    <a href="/" className="text-indigo-600 hover:underline">Volver al inicio</a>
  </div>
);

export default ErrorPage; 