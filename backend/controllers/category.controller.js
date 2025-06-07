const Category = require('../models/category.model');

// Obtener todas las categorías
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ isActive: true })
            .populate('subcategories')
            .sort('name');

        res.json({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las categorías',
            error: error.message
        });
    }
};

// Obtener una categoría por ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
            .populate('subcategories')
            .populate('parent');

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Categoría no encontrada'
            });
        }

        res.json({
            success: true,
            data: category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la categoría',
            error: error.message
        });
    }
};

// Crear una nueva categoría
exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json({
            success: true,
            data: category
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear la categoría',
            error: error.message
        });
    }
};

// Actualizar una categoría
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Categoría no encontrada'
            });
        }

        res.json({
            success: true,
            data: category
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar la categoría',
            error: error.message
        });
    }
};

// Eliminar una categoría
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Categoría no encontrada'
            });
        }

        // Verificar si tiene subcategorías
        const hasSubcategories = await Category.exists({ parent: req.params.id });
        if (hasSubcategories) {
            return res.status(400).json({
                success: false,
                message: 'No se puede eliminar una categoría que tiene subcategorías'
            });
        }

        // Verificar si tiene productos asociados
        const hasProducts = await Product.exists({ category: req.params.id });
        if (hasProducts) {
            return res.status(400).json({
                success: false,
                message: 'No se puede eliminar una categoría que tiene productos asociados'
            });
        }

        await category.remove();

        res.json({
            success: true,
            message: 'Categoría eliminada correctamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la categoría',
            error: error.message
        });
    }
}; 