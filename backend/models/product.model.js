const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['hierro', 'acero', 'aluminio', 'cobre', 'bronce', 'otros']
    },
    condition: {
        type: String,
        required: true,
        enum: ['nuevo', 'usado', 'reciclado']
    },
    weight: {
        type: Number,
        required: true,
        min: 0
    },
    unit: {
        type: String,
        required: true,
        enum: ['kg', 'g', 'ton']
    },
    images: [{
        type: String,
        required: true
    }],
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    location: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['disponible', 'vendido', 'reservado'],
        default: 'disponible'
    },
    specifications: {
        material: String,
        dimensions: String,
        purity: String,
        grade: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Índices para búsquedas más eficientes
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, status: 1 });
productSchema.index({ seller: 1 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
