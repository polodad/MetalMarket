# 🛍️ MetalMarket

MetalMarket es una plataforma de comercio electrónico moderna construida con React, Node.js y MongoDB, diseñada para la venta de productos metálicos y relacionados.

## 🚀 Características

- 🔐 Autenticación de usuarios con JWT
- 🛒 Sistema de carrito de compras
- 📱 Diseño responsive con Tailwind CSS
- 🔍 Búsqueda y filtrado de productos
- 💳 Integración con pasarelas de pago
- 📊 Panel de administración
- 🌐 API RESTful

## 🛠️ Tecnologías Utilizadas

### Frontend
- React
- TypeScript
- Tailwind CSS
- React Router
- Axios
- Redux Toolkit

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Bcrypt

## 📋 Prerrequisitos

- Node.js (v14 o superior)
- MongoDB
- npm o yarn

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/metalmarket.git
cd metalmarket
```

2. Instala las dependencias del backend:
```bash
cd backend
npm install
```

3. Instala las dependencias del frontend:
```bash
cd ../frontend
npm install
```

4. Configura las variables de entorno:

Crea un archivo `.env` en la carpeta `backend`:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/metalmarket
JWT_SECRET=tu_secreto_jwt_super_seguro
NODE_ENV=development
```

Crea un archivo `.env` en la carpeta `frontend`:
```env
VITE_API_URL=http://localhost:3001/api
```

## 🚀 Ejecución

1. Inicia el servidor backend:
```bash
cd backend
npm run dev
```

2. Inicia el servidor frontend:
```bash
cd frontend
npm run dev
```

El backend estará disponible en `http://localhost:3001`
El frontend estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
metalmarket/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── app.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── store/
    └── public/
```

## 🤝 Contribución

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## ✨ Agradecimientos

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
