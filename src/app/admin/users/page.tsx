"use client"

import React, { useState } from 'react'
import { Search, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { users } from '@/data/sampleData'
import { User } from '@/type'
import { IoMdClose } from "react-icons/io";

const AdminUsersPage = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
    )

    const handleViewUser = (user: User) => {
        setSelectedUser(user)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setSelectedUser(null)
        setShowModal(false)
        setShowPassword(false)
    }

    const handleDeleteUser = (userId: number) => {
        if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            console.log('Deleting user:', userId)
            alert('Chức năng xóa sẽ được triển khai sau')
        }
    }

    const handleEditUser = (user: User) => {
        console.log('Editing user:', user)
        alert('Chức năng chỉnh sửa sẽ được triển khai sau')
    }

    const handleAddUser = () => {
        console.log('Adding new user')
        alert('Chức năng thêm người dùng sẽ được triển khai sau')
    }



    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h1>
                <button
                    onClick={handleAddUser}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors hover:cursor-pointer"
                >
                    <Plus size={20} />
                    Thêm người dùng
                </button>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tên người dùng
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Số điện thoại
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Website
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        #{user.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user.name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {user.phone}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {user.websiteUrl ? (
                                            <a
                                                href={user.websiteUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-600 hover:text-green-800 hover:underline"
                                            >
                                                {user.websiteUrl}
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">Không có</span>
                                        )}
                                    </td>
                                    <td>
                                        {user.role === "customer" && (
                                            <div className='px-2 py-1 flex justify-center items-center w-[80px] text-xs bg-green-100 text-green-800 rounded-full'>
                                                {user.role}
                                            </div>
                                        )}
                                        {user.role === "admin" && (
                                            <div className='px-2 py-1 flex justify-center items-center w-[80px] text-xs bg-red-100 text-red-800 rounded-full'>
                                                {user.role}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleViewUser(user)}
                                                className="text-blue-600 hover:text-blue-900 p-1 rounded"
                                                title="Xem chi tiết"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleEditUser(user)}
                                                className="text-green-600 hover:text-green-900 p-1 rounded"
                                                title="Chỉnh sửa"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user.id)}
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

                {filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-500">
                            {searchTerm ? 'Không tìm thấy người dùng nào' : 'Không có người dùng nào'}
                        </div>
                    </div>
                )}
            </div>

            {/* User Detail Modal */}
            {showModal && selectedUser && (
                <div onClick={handleCloseModal} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div onClick={e => e.stopPropagation()} className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Chi tiết người dùng</h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <IoMdClose className='text-[24px]' />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-center mb-4">
                                <div className="h-20 w-20 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl font-semibold">
                                    {selectedUser.name.charAt(0).toUpperCase()}
                                </div>
                            </div>

                            <div className='flex items-center gap-2'>
                                <label className="block text-sm font-medium text-gray-700">ID:</label>
                                <p className="text-sm text-gray-900">#{selectedUser.id}</p>
                            </div>

                            <div className='flex items-center gap-2'>
                                <label className="block text-sm font-medium text-gray-700">Tên:</label>
                                <p className="text-sm text-gray-900">{selectedUser.name}</p>
                            </div>

                            <div className='flex items-center gap-2'>
                                <label className="block text-sm font-medium text-gray-700">Email:</label>
                                <p className="text-sm text-gray-900">{selectedUser.email}</p>
                            </div>

                            <div className='flex items-center gap-2'>
                                <label className="block text-sm font-medium text-gray-700">Số điện thoại:</label>
                                <p className="text-sm text-gray-900">{selectedUser.phone}</p>
                            </div>

                            <div className='flex items-center gap-2'>
                                <label className="block text-sm font-medium text-gray-700">Website:</label>
                                <p className="text-sm text-gray-900">
                                    {selectedUser.websiteUrl ? (
                                        <a
                                            href={selectedUser.websiteUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-600 hover:text-green-800 hover:underline"
                                        >
                                            {selectedUser.websiteUrl}
                                        </a>
                                    ) : (
                                        <span className="text-gray-400">Không có</span>
                                    )}
                                </p>
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
                                    handleEditUser(selectedUser)
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

export default AdminUsersPage
