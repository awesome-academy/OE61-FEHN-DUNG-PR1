"use client"

import React, { useState } from 'react'
import { Search, Plus, Edit, Trash2, Eye, Tag } from 'lucide-react'
import { tags, blogs } from '@/data/sampleData'
import { Tag as TagType, Blog } from '@/type'
import { IoMdClose } from "react-icons/io";

const AdminTagsPage = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedTag, setSelectedTag] = useState<TagType | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [newTagName, setNewTagName] = useState('')
    const [editTagName, setEditTagName] = useState('')

    const filteredTags = tags.filter(tag =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getBlogsCountByTag = (tagId: number): number => {
        return blogs.filter(blog => blog.tags.includes(tagId)).length
    }

    const getBlogsByTag = (tagId: number): Blog[] => {
        return blogs.filter(blog => blog.tags.includes(tagId))
    }

    const handleViewTag = (tag: TagType) => {
        setSelectedTag(tag)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setSelectedTag(null)
        setShowModal(false)
    }

    const handleCloseAddModal = () => {
        setShowAddModal(false)
        setNewTagName('')
    }

    const handleCloseEditModal = () => {
        setShowEditModal(false)
        setEditTagName('')
        setSelectedTag(null)
    }

    const handleDeleteTag = (tagId: number) => {
        const blogsCount = getBlogsCountByTag(tagId)
        if (blogsCount > 0) {
            alert(`Không thể xóa tag này vì có ${blogsCount} bài viết đang sử dụng tag này.`)
            return
        }

        if (confirm('Bạn có chắc chắn muốn xóa tag này?')) {
            console.log('Deleting tag:', tagId)
            alert('Chức năng xóa sẽ được triển khai sau')
        }
    }

    const handleEditTag = (tag: TagType) => {
        setSelectedTag(tag)
        setEditTagName(tag.name)
        setShowEditModal(true)
    }

    const handleAddTag = () => {
        setShowAddModal(true)
    }

    const handleSubmitAddTag = (e: React.FormEvent) => {
        e.preventDefault()
        if (newTagName.trim()) {
            const existingTag = tags.find(tag => tag.name.toLowerCase() === newTagName.toLowerCase())
            if (existingTag) {
                alert('Tag này đã tồn tại!')
                return
            }

            console.log('Adding new tag:', newTagName)
            alert('Chức năng thêm tag sẽ được triển khai sau')
            handleCloseAddModal()
        }
    }

    const handleSubmitEditTag = (e: React.FormEvent) => {
        e.preventDefault()
        if (editTagName.trim() && selectedTag) {
            const existingTag = tags.find(tag =>
                tag.name.toLowerCase() === editTagName.toLowerCase() && tag.id !== selectedTag.id
            )
            if (existingTag) {
                alert('Tag này đã tồn tại!')
                return
            }

            console.log('Updating tag:', selectedTag.id, 'with name:', editTagName)
            alert('Chức năng cập nhật tag sẽ được triển khai sau')
            handleCloseEditModal()
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Quản lý thẻ tag</h1>
                <button
                    onClick={handleAddTag}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
                >
                    <Plus size={20} />
                    Thêm tag
                </button>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm tag..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
            </div>

            {/* Tags Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tên tag
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Số lượng bài viết
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredTags.map((tag) => (
                                <tr key={tag.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        #{tag.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
                                                <Tag size={20} />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {tag.name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                            {getBlogsCountByTag(tag.id)} bài viết
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleViewTag(tag)}
                                                className="text-blue-600 hover:text-blue-900 p-1 rounded"
                                                title="Xem chi tiết"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleEditTag(tag)}
                                                className="text-green-600 hover:text-green-900 p-1 rounded"
                                                title="Chỉnh sửa"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteTag(tag.id)}
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

                {filteredTags.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-500">
                            {searchTerm ? 'Không tìm thấy tag nào' : 'Không có tag nào'}
                        </div>
                    </div>
                )}
            </div>

            {/* Tag Detail Modal */}
            {showModal && selectedTag && (
                <div onClick={handleCloseModal} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div onClick={e => e.stopPropagation()} className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Chi tiết tag</h2>
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
                                    <Tag size={40} />
                                </div>
                            </div>

                            <div className='flex items-center gap-2'>
                                <label className="block text-sm font-medium text-gray-700">ID:</label>
                                <p className="text-sm text-gray-900">#{selectedTag.id}</p>
                            </div>

                            <div className='flex items-center gap-2'>
                                <label className="block text-sm font-medium text-gray-700">Tên tag:</label>
                                <p className="text-sm text-gray-900">{selectedTag.name}</p>
                            </div>

                            <div className='flex items-center gap-2'>
                                <label className="block text-sm font-medium text-gray-700">Số lượng bài viết:</label>
                                <p className="text-sm text-gray-900">{getBlogsCountByTag(selectedTag.id)} bài viết</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Bài viết sử dụng tag này:</label>
                                <div className="max-h-60 overflow-y-auto border rounded-lg p-2">
                                    {getBlogsByTag(selectedTag.id).length > 0 ? (
                                        <div className="space-y-3">
                                            {getBlogsByTag(selectedTag.id).map((blog) => (
                                                <div key={blog.id} className="p-3 bg-gray-50 rounded-lg">
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex-1">
                                                            <h4 className="font-medium text-gray-900">{blog.title}</h4>
                                                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                                                {blog.description}
                                                            </p>
                                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                                <span>#{blog.id}</span>
                                                                <span>{blog.date}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500 text-center py-8">Chưa có bài viết nào sử dụng tag này</p>
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
                                    handleEditTag(selectedTag)
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

            {/* Add Tag Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Thêm tag mới</h2>
                            <button
                                onClick={handleCloseAddModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <IoMdClose className='text-[24px]' />
                            </button>
                        </div>

                        <form onSubmit={handleSubmitAddTag}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tên tag
                                </label>
                                <input
                                    type="text"
                                    value={newTagName}
                                    onChange={(e) => setNewTagName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Nhập tên tag..."
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
                                    Thêm tag
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Tag Modal */}
            {showEditModal && selectedTag && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Chỉnh sửa tag</h2>
                            <button
                                onClick={handleCloseEditModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <IoMdClose className='text-[24px]' />
                            </button>
                        </div>

                        <form onSubmit={handleSubmitEditTag}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tên tag
                                </label>
                                <input
                                    type="text"
                                    value={editTagName}
                                    onChange={(e) => setEditTagName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Nhập tên tag..."
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

export default AdminTagsPage
