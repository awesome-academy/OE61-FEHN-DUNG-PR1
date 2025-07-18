"use client"

import React, { useState } from 'react'
import { Search, Plus, Edit, Trash2, Eye, Palette } from 'lucide-react'
import { colors } from '@/data/sampleData'
import { Color } from '@/type'
import { IoMdClose } from 'react-icons/io'

const AdminColorsPage = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedColor, setSelectedColor] = useState<Color | null>(null)
    const [showModal, setShowModal] = useState(false)

    const filteredColors = colors.filter(color =>
        color.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        color.eName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        color.id.toString().includes(searchTerm)
    )

    const handleViewColor = (color: Color) => {
        setSelectedColor(color)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setSelectedColor(null)
        setShowModal(false)
    }

    const handleDeleteColor = (colorId: number) => {
        if (confirm('Bạn có chắc chắn muốn xóa màu này?')) {
            console.log('Deleting color:', colorId)
            alert('Chức năng xóa sẽ được triển khai sau')
        }
    }

    const handleEditColor = (color: Color) => {
        console.log('Editing color:', color)
        alert('Chức năng chỉnh sửa sẽ được triển khai sau')
    }

    const handleAddColor = () => {
        console.log('Adding new color')
        alert('Chức năng thêm màu sẽ được triển khai sau')
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Quản lý màu sắc</h1>
                <button
                    onClick={handleAddColor}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
                >
                    <Plus size={20} />
                    Thêm màu
                </button>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên tiếng Việt, tên tiếng Anh hoặc ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
            </div>

            {/* Empty State */}
            {filteredColors.length === 0 && (
                <div className="bg-white rounded-lg shadow-md p-12">
                    <div className="text-center">
                        <Palette className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <div className="text-gray-500 text-lg">
                            {searchTerm ? 'Không tìm thấy màu nào' : 'Không có màu nào'}
                        </div>
                    </div>
                </div>
            )}

            {/* Colors Table View (Alternative) */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Danh sách màu sắc</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Màu
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tên tiếng Việt
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tên tiếng Anh
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Mã màu
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredColors.map((color) => (
                                <tr key={color.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        #{color.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className={`w-8 h-8 rounded-full shadow-sm ${color.color}`}>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {color.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {color.eName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                            {color.color}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleViewColor(color)}
                                                className="text-blue-600 hover:text-blue-900 p-1 rounded"
                                                title="Xem chi tiết"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleEditColor(color)}
                                                className="text-green-600 hover:text-green-900 p-1 rounded"
                                                title="Chỉnh sửa"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteColor(color.id)}
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
            </div>

            {/* Color Detail Modal */}
            {showModal && selectedColor && (
                <div onClick={handleCloseModal} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div onClick={e => e.stopPropagation()} className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Chi tiết màu sắc</h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <IoMdClose className='text-[24px]' />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className='flex items-center gap-2'>
                                <label className="block text-sm font-medium text-gray-700">ID:</label>
                                <p className="text-sm text-gray-900">#{selectedColor.id}</p>
                            </div>

                            <div className='flex items-center gap-2'>
                                <label className="block text-sm font-medium text-gray-700">Tên tiếng Việt:</label>
                                <p className="text-sm text-gray-900">{selectedColor.name}</p>
                            </div>

                            <div className='flex items-center gap-2'>
                                <label className="block text-sm font-medium text-gray-700">Tên tiếng Anh:</label>
                                <p className="text-sm text-gray-900">{selectedColor.eName}</p>
                            </div>

                            <div className='flex items-center gap-2'>
                                <label className="block text-sm font-medium text-gray-700">Mã màu:</label>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-mono text-gray-900 bg-gray-100 px-3 py-1 rounded">
                                        {selectedColor.color}
                                    </span>
                                    <div
                                        className={`w-6 h-6 rounded shadow-sm ${selectedColor.color}`}
                                    ></div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Thông tin bổ sung:</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-600">RGB:</span>
                                        <span className="ml-2 text-gray-900">
                                            {selectedColor.color.length === 7 ?
                                                `${parseInt(selectedColor.color.slice(1, 3), 16)}, ${parseInt(selectedColor.color.slice(3, 5), 16)}, ${parseInt(selectedColor.color.slice(5, 7), 16)}`
                                                : 'N/A'
                                            }
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Hex:</span>
                                        <span className="ml-2 text-gray-900">{selectedColor.color}</span>
                                    </div>
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
                                    handleEditColor(selectedColor)
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

export default AdminColorsPage
