import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface ProductFiltersProps {
    onFilter: (filters: any) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ onFilter }) => {
    const formik = useFormik({
        initialValues: {
            search: '',
            category: '',
            minPrice: '',
            maxPrice: '',
            sortBy: 'newest'
        },
        validationSchema: Yup.object({
            minPrice: Yup.number().min(0, 'El precio mínimo debe ser 0'),
            maxPrice: Yup.number().min(0, 'El precio máximo debe ser 0')
                .test('max', 'El precio máximo debe ser mayor que el mínimo',
                    function(value) {
                        const minPrice = this.parent.minPrice;
                        return !value || !minPrice || Number(value) > Number(minPrice);
                    }
                )
        }),
        onSubmit: (values) => {
            onFilter(values);
        }
    });

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <form onSubmit={formik.handleSubmit} className="space-y-4">
                {/* Búsqueda */}
                <div>
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                        Buscar
                    </label>
                    <input
                        type="text"
                        id="search"
                        name="search"
                        onChange={formik.handleChange}
                        value={formik.values.search}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Buscar productos..."
                    />
                </div>

                {/* Categoría */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Categoría
                    </label>
                    <select
                        id="category"
                        name="category"
                        onChange={formik.handleChange}
                        value={formik.values.category}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">Todas las categorías</option>
                        <option value="guitars">Guitarras</option>
                        <option value="bass">Bajos</option>
                        <option value="drums">Baterías</option>
                        <option value="keyboards">Teclados</option>
                        <option value="accessories">Accesorios</option>
                    </select>
                </div>

                {/* Rango de precios */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
                            Precio mínimo
                        </label>
                        <input
                            type="number"
                            id="minPrice"
                            name="minPrice"
                            onChange={formik.handleChange}
                            value={formik.values.minPrice}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="0"
                        />
                        {formik.touched.minPrice && formik.errors.minPrice && (
                            <div className="text-red-600 text-xs mt-1">{formik.errors.minPrice}</div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
                            Precio máximo
                        </label>
                        <input
                            type="number"
                            id="maxPrice"
                            name="maxPrice"
                            onChange={formik.handleChange}
                            value={formik.values.maxPrice}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="1000"
                        />
                        {formik.touched.maxPrice && formik.errors.maxPrice && (
                            <div className="text-red-600 text-xs mt-1">{formik.errors.maxPrice}</div>
                        )}
                    </div>
                </div>

                {/* Ordenar por */}
                <div>
                    <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700">
                        Ordenar por
                    </label>
                    <select
                        id="sortBy"
                        name="sortBy"
                        onChange={formik.handleChange}
                        value={formik.values.sortBy}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="newest">Más recientes</option>
                        <option value="price_asc">Precio: menor a mayor</option>
                        <option value="price_desc">Precio: mayor a menor</option>
                        <option value="name_asc">Nombre: A-Z</option>
                        <option value="name_desc">Nombre: Z-A</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Aplicar filtros
                </button>
            </form>
        </div>
    );
};

export default ProductFilters; 