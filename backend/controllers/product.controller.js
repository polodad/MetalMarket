const Product = require('../models/product.model');

// Clase para manejar la paginación
class PaginationHelper {
    constructor(page = 1, limit = 10) {
        this.page = parseInt(page, 10);
        this.limit = parseInt(limit, 10);
        this.skip = (this.page - 1) * this.limit;
    }

    getPaginationInfo(total) {
        const totalPages = Math.ceil(total / this.limit);
        return {
            currentPage: this.page,
            totalPages,
            totalItems: total,
            itemsPerPage: this.limit,
            hasNextPage: this.page < totalPages,
            hasPrevPage: this.page > 1
        };
    }
}

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
    try {
        const productData = {
            ...req.body,
            seller: req.user.id
        };

        const product = await Product.create(productData);

        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear el producto',
            error: error.message
        });
    }
};

// Obtener productos con filtros y paginación
exports.getProducts = async (req, res) => {
    try {
        const {
            search,
            category,
            minPrice,
            maxPrice,
            sortBy = 'newest',
            page = 1,
            limit = 10
        } = req.query;

        // Construir el filtro
        const filter = {};

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (category) {
            filter.category = category;
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        // Construir el ordenamiento
        let sort = {};
        switch (sortBy) {
            case 'price_asc':
                sort = { price: 1 };
                break;
            case 'price_desc':
                sort = { price: -1 };
                break;
            case 'name_asc':
                sort = { name: 1 };
                break;
            case 'name_desc':
                sort = { name: -1 };
                break;
            default: // newest
                sort = { createdAt: -1 };
        }

        // Configurar paginación
        const pagination = new PaginationHelper(page, limit);

        // Obtener total de documentos
        const total = await Product.countDocuments(filter);

        // Obtener productos paginados
        const products = await Product.find(filter)
            .sort(sort)
            .skip(pagination.skip)
            .limit(pagination.limit)
            .populate('seller', 'name email')
            .populate('category', 'name');

        res.json({
            success: true,
            data: products,
            pagination: pagination.getPaginationInfo(total)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los productos',
            error: error.message
        });
    }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('seller', 'username fullName phone');

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el producto',
            error: error.message
        });
    }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        // Verificar si el usuario es el vendedor
        if (product.seller.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para actualizar este producto'
            });
        }

        product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el producto',
            error: error.message
        });
    }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        // Verificar si el usuario es el vendedor
        if (product.seller.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para eliminar este producto'
            });
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Producto eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el producto',
            error: error.message
        });
    }
};

// Obtener productos del vendedor
exports.getSellerProducts = async (req, res) => {
    try {
        const products = await Product.find({ seller: req.user.id })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los productos del vendedor',
            error: error.message
        });
    }
};
