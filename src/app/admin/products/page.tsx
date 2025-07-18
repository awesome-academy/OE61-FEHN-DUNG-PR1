"use client"

import React, { useEffect, useState, use } from 'react'
import { Search, Plus, Edit, Trash2, Eye, Star, Package } from 'lucide-react'
import { products, categories, colors } from '@/data/sampleData'
import { Product, Category, Color } from '@/type'
import { IoMdClose } from "react-icons/io";

const AdminProductsPage = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showModal, setShowModal] = useState(false);


    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.scientificName.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCategory = selectedCategory === '' ||
            product.categories.includes(parseInt(selectedCategory))

        return matchesSearch && matchesCategory
    })

    const getCategoryNames = (categoryIds: number[]) => {
        return categoryIds.map(id => {
            const category = categories.find(cat => cat.id === id)
            return category ? category.name : 'Unknown'
        }).join(', ')
    }

    const getColorNames = (colorIds: number[]) => {
        return colorIds.map(id => {
            const color = colors.find(col => col.id === id)
            return color ? color.name : 'Unknown'
        }).join(', ')
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount)
    }

    const handleViewProduct = (product: Product) => {
        setSelectedProduct(product)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setSelectedProduct(null)
        setShowModal(false)
    }

    const handleDeleteProduct = (productId: number) => {
        if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            console.log('Deleting product:', productId)
            alert('Chức năng xóa sẽ được triển khai sau')
        }
    }

    const handleEditProduct = (product: Product) => {
        console.log('Editing product:', product)
        alert('Chức năng chỉnh sửa sẽ được triển khai sau')
    }

    const handleAddProduct = () => {
        console.log('Adding new product')
        alert('Chức năng thêm sản phẩm sẽ được triển khai sau')
    }



    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Quản lý sản phẩm</h1>
                <button
                    onClick={handleAddProduct}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
                >
                    <Plus size={20} />
                    Thêm sản phẩm
                </button>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên, tên thường gọi, tên khoa học..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="md:w-48">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">Tất cả danh mục</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id.toString()}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Sản phẩm
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Giá
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Kho
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Đánh giá
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Danh mục
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                                                <img src={product.images[0]} alt="image" className="w-full h-full rounded-[20px]" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {product.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {product.commonName}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {formatCurrency(product.price)}
                                        </div>
                                        {product.discount > 0 && (
                                            <div className="text-xs text-gray-500 line-through">
                                                {formatCurrency(product.estimatedPrice)}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className={`text-sm ${product.stock > 0 ? 'text-gray-900' : 'text-red-600'}`}>
                                            {product.stock} sản phẩm
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                            <span className="ml-1 text-sm text-gray-900">
                                                {product.rating}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 max-w-32 truncate">
                                            {getCategoryNames(product.categories)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            {product.isNew && (
                                                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                                    Mới
                                                </span>
                                            )}
                                            {product.stock === 0 && (
                                                <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                                                    Hết hàng
                                                </span>
                                            )}
                                            {product.discount > 0 && (
                                                <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                                                    -{product.discount}%
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleViewProduct(product)}
                                                className="text-blue-600 hover:text-blue-900 p-1 rounded"
                                                title="Xem chi tiết"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleEditProduct(product)}
                                                className="text-green-600 hover:text-green-900 p-1 rounded"
                                                title="Chỉnh sửa"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="text-red-600 hover:text-red-900 p-1 rounded"
                                                title="Xóa"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-500">
                            {searchTerm || selectedCategory ? 'Không tìm thấy sản phẩm nào' : 'Không có sản phẩm nào'}
                        </div>
                    </div>
                )}
            </div>

            {/* Product Detail Modal */}
            {showModal && selectedProduct && (
                <div onClick={handleCloseModal} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div onClick={e => e.stopPropagation()} className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Chi tiết sản phẩm</h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600 hover:cursor-pointer"
                            >
                                <IoMdClose className='text-[24px]' />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ID:</label>
                                    <p className="text-sm text-gray-900">#{selectedProduct.id}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm:</label>
                                    <p className="text-sm text-gray-900">{selectedProduct.name}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên thường gọi:</label>
                                    <p className="text-sm text-gray-900">{selectedProduct.commonName}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên khoa học:</label>
                                    <p className="text-sm text-gray-900 italic">{selectedProduct.scientificName}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá bán:</label>
                                    <p className="text-sm text-gray-900">{formatCurrency(selectedProduct.price)}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá ước tính:</label>
                                    <p className="text-sm text-gray-900">{formatCurrency(selectedProduct.estimatedPrice)}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng tồn kho:</label>
                                    <p className="text-sm text-gray-900">{selectedProduct.stock}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Giảm giá:</label>
                                    <p className="text-sm text-gray-900">{selectedProduct.discount}%</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Đánh giá:</label>
                                    <div className="flex items-center">
                                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                        <span className="ml-1 text-sm text-gray-900">
                                            {selectedProduct.rating}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Chiều cao:</label>
                                    <p className="text-sm text-gray-900">{selectedProduct.height}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Xuất xứ:</label>
                                    <p className="text-sm text-gray-900">{selectedProduct.origin}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Họ thực vật:</label>
                                    <p className="text-sm text-gray-900">{selectedProduct.botanicalFamily}</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục:</label>
                                <p className="text-sm text-gray-900">{getCategoryNames(selectedProduct.categories)}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Màu sắc:</label>
                                <p className="text-sm text-gray-900">{getColorNames(selectedProduct.colors)}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả:</label>
                                <p className="text-sm text-gray-900">{selectedProduct.descriptions}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái:</label>
                                <div className="flex items-center gap-2">
                                    {selectedProduct.isNew && (
                                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                            Sản phẩm mới
                                        </span>
                                    )}
                                    {selectedProduct.stock === 0 && (
                                        <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                                            Hết hàng
                                        </span>
                                    )}
                                    {selectedProduct.discount > 0 && (
                                        <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                                            Giảm giá {selectedProduct.discount}%
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh:</label>
                                <img src={selectedProduct.images[0]} alt="image" className='w-[200px] h-[200px] object-cover rounded-[10px]' />
                            </div>

                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Đóng
                            </button>
                            <button
                                onClick={() => {
                                    handleEditProduct(selectedProduct)
                                    handleCloseModal()
                                }}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Chỉnh sửa
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminProductsPage
