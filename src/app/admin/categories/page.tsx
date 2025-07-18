"use client"

import React, { useState } from 'react'
import { Search, Plus, Edit, Trash2, Eye, Package } from 'lucide-react'
import { categories, products } from '@/data/sampleData'
import { Category, Product } from '@/type'
import { IoMdClose } from "react-icons/io";
import Link from 'next/link'

const AdminCategoriesPage = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [newCategoryName, setNewCategoryName] = useState('')
    const [editCategoryName, setEditCategoryName] = useState('')

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getProductsCountByCategory = (categoryId: number): number => {
        return products.filter(product => product.categories.includes(categoryId)).length
    }

    const getProductsByCategory = (categoryId: number): Product[] => {
        return products.filter(product => product.categories.includes(categoryId))
    }

    const handleViewCategory = (category: Category) => {
        setSelectedCategory(category)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setSelectedCategory(null)
        setShowModal(false)
    }

    const handleCloseAddModal = () => {
        setShowAddModal(false)
        setNewCategoryName('')
    }

    const handleCloseEditModal = () => {
        setShowEditModal(false)
        setEditCategoryName('')
        setSelectedCategory(null)
    }

    const handleDeleteCategory = (categoryId: number) => {
        const productsCount = getProductsCountByCategory(categoryId)
        if (productsCount > 0) {
            alert(`Không thể xóa danh mục này vì có ${productsCount} sản phẩm đang sử dụng danh mục này.`)
            return
        }

        if (confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
            console.log('Deleting category:', categoryId)
            alert('Chức năng xóa sẽ được triển khai sau')
        }
    }

    const handleEditCategory = (category: Category) => {
        setSelectedCategory(category)
        setEditCategoryName(category.name)
        setShowEditModal(true)
    }

    const handleAddCategory = () => {
        setShowAddModal(true)
    }

    const handleSubmitAddCategory = (e: React.FormEvent) => {
        e.preventDefault()
        if (newCategoryName.trim()) {
            console.log('Adding new category:', newCategoryName)
            alert('Chức năng thêm danh mục sẽ được triển khai sau')
            handleCloseAddModal()
        }
    }

    const handleSubmitEditCategory = (e: React.FormEvent) => {
        e.preventDefault()
        if (editCategoryName.trim() && selectedCategory) {
            console.log('Updating category:', selectedCategory.id, 'with name:', editCategoryName)
            alert('Chức năng cập nhật danh mục sẽ được triển khai sau')
            handleCloseEditModal()
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Quản lý danh mục</h1>
                <button
                    onClick={handleAddCategory}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
                >
                    <Plus size={20} />
                    Thêm danh mục
                </button>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm danh mục..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
            </div>

            {/* Categories Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tên danh mục
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Số lượng sản phẩm
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredCategories.map((category) => (
                                <tr key={category.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        #{category.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
                                                <Package size={20} />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {category.name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                            {getProductsCountByCategory(category.id)} sản phẩm
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleViewCategory(category)}
                                                className="text-blue-600 hover:text-blue-900 p-1 rounded"
                                                title="Xem chi tiết"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleEditCategory(category)}
                                                className="text-green-600 hover:text-green-900 p-1 rounded"
                                                title="Chỉnh sửa"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCategory(category.id)}
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

                {filteredCategories.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-500">
                            {searchTerm ? 'Không tìm thấy danh mục nào' : 'Không có danh mục nào'}
                        </div>
                    </div>
                )}
            </div>

            {/* Category Detail Modal */}
            {showModal && selectedCategory && (
                <div onClick={handleCloseModal} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div onClick={e => e.stopPropagation()} className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Chi tiết danh mục</h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <IoMdClose className='text-[24px]' />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-center mb-4">
                                <div className="h-20 w-20 rounded-full bg-green-600 flex items-center justify-center text-white">
                                    <Package size={40} />
                                </div>
                            </div>

                            <div className='flex items-center gap-2'>
                                <label className="block text-sm font-medium text-gray-700">ID:</label>
                                <p className="text-sm text-gray-900">#{selectedCategory.id}</p>
                            </div>

                            <div className='flex items-center gap-2'>
                                <label className="block text-sm font-medium text-gray-700">Tên danh mục:</label>
                                <p className="text-sm text-gray-900">{selectedCategory.name}</p>
                            </div>

                            <div className='flex items-center gap-2'>
                                <label className="block text-sm font-medium text-gray-700">Số lượng sản phẩm:</label>
                                <p className="text-sm text-gray-900">{getProductsCountByCategory(selectedCategory.id)} sản phẩm</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sản phẩm trong danh mục:</label>
                                <div className="max-h-40 overflow-y-auto border rounded-lg p-2">
                                    {getProductsByCategory(selectedCategory.id).length > 0 ? (
                                        <div className="space-y-2">
                                            {getProductsByCategory(selectedCategory.id).map((product) => (
                                                <div key={product.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                                    <span className="text-sm text-gray-900">{product.name}</span>
                                                    <span className="text-xs text-gray-500">#{product.id}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500 text-center py-4">Chưa có sản phẩm nào</p>
                                    )}
                                </div>
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
                                    handleEditCategory(selectedCategory)
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

            {/* Add Category Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Thêm danh mục mới</h2>
                            <button
                                onClick={handleCloseAddModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmitAddCategory}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tên danh mục
                                </label>
                                <input
                                    type="text"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Nhập tên danh mục..."
                                    required
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={handleCloseAddModal}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Thêm danh mục
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Category Modal */}
            {showEditModal && selectedCategory && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Chỉnh sửa danh mục</h2>
                            <button
                                onClick={handleCloseEditModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmitEditCategory}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tên danh mục
                                </label>
                                <input
                                    type="text"
                                    value={editCategoryName}
                                    onChange={(e) => setEditCategoryName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Nhập tên danh mục..."
                                    required
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={handleCloseEditModal}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Cập nhật
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminCategoriesPage
