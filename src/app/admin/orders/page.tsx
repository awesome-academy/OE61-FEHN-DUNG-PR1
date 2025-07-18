"use client"

import React, { useState } from 'react'
import { Search, Plus, Edit, Trash2, Eye, Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react'
import { orders } from '@/data/sampleData'
import { Order } from '@/type'

const AdminOrdersPage = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [statusFilter, setStatusFilter] = useState<string>('all')

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.id.toString().includes(searchTerm) ||
            order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.receivedUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.receivedUser.phone.includes(searchTerm)

        const matchesStatus = statusFilter === 'all' || order.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const handleViewOrder = (order: Order) => {
        setSelectedOrder(order)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setSelectedOrder(null)
        setShowModal(false)
    }

    const handleDeleteOrder = (orderId: number) => {
        if (confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
            console.log('Deleting order:', orderId)
            alert('Chức năng xóa sẽ được triển khai sau')
        }
    }

    const handleEditOrder = (order: Order) => {
        console.log('Editing order:', order)
        alert('Chức năng chỉnh sửa sẽ được triển khai sau')
    }

    const handleAddOrder = () => {
        console.log('Adding new order')
        alert('Chức năng thêm đơn hàng sẽ được triển khai sau')
    }

    const handleStatusChange = (orderId: number, newStatus: string) => {
        console.log('Changing status for order:', orderId, 'to:', newStatus)
        alert('Chức năng thay đổi trạng thái sẽ được triển khai sau')
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return <Clock size={16} className="text-yellow-500" />
            case 'processing':
                return <Package size={16} className="text-blue-500" />
            case 'shipping':
                return <Truck size={16} className="text-purple-500" />
            case 'delivered':
                return <CheckCircle size={16} className="text-green-500" />
            case 'cancelled':
                return <XCircle size={16} className="text-red-500" />
            default:
                return <Clock size={16} className="text-gray-500" />
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'pending':
                return 'Chờ xử lý'
            case 'processing':
                return 'Đang xử lý'
            case 'shipping':
                return 'Đang giao'
            case 'delivered':
                return 'Đã giao'
            case 'cancelled':
                return 'Đã hủy'
            default:
                return 'Không xác định'
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800'
            case 'processing':
                return 'bg-blue-100 text-blue-800'
            case 'shipping':
                return 'bg-purple-100 text-purple-800'
            case 'delivered':
                return 'bg-green-100 text-green-800'
            case 'cancelled':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN')
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Quản lý đơn hàng</h1>
                <button
                    onClick={handleAddOrder}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
                >
                    <Plus size={20} />
                    Thêm đơn hàng
                </button>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo ID, tên khách hàng, email, người nhận..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="pending">Chờ xử lý</option>
                        <option value="processing">Đang xử lý</option>
                        <option value="shipping">Đang giao</option>
                        <option value="delivered">Đã giao</option>
                        <option value="cancelled">Đã hủy</option>
                    </select>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Khách hàng
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Người nhận
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tổng tiền
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ngày đặt
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thanh toán
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        #{order.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
                                                {order.user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {order.user.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {order.user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{order.receivedUser.name}</div>
                                        <div className="text-sm text-gray-500">{order.receivedUser.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {formatCurrency(order.totalPrice)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            <span className="ml-1">{getStatusText(order.status)}</span>
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatDate(order.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <span className="capitalize">{order.paymentMethod}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleViewOrder(order)}
                                                className="text-blue-600 hover:text-blue-900 p-1 rounded"
                                                title="Xem chi tiết"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleEditOrder(order)}
                                                className="text-green-600 hover:text-green-900 p-1 rounded"
                                                title="Chỉnh sửa"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteOrder(order.id)}
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

                {filteredOrders.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-500">
                            {searchTerm || statusFilter !== 'all' ? 'Không tìm thấy đơn hàng nào' : 'Không có đơn hàng nào'}
                        </div>
                    </div>
                )}
            </div>

            {/* Order Detail Modal */}
            {showModal && selectedOrder && (
                <div onClick={handleCloseModal} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div onClick={e => e.stopPropagation()} className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Chi tiết đơn hàng #{selectedOrder.id}</h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Order Info */}
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Thông tin đơn hàng</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700">ID:</span>
                                            <span className="text-sm text-gray-900">#{selectedOrder.id}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700">Ngày đặt:</span>
                                            <span className="text-sm text-gray-900">{formatDate(selectedOrder.createdAt)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700">Trạng thái:</span>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                                                {getStatusIcon(selectedOrder.status)}
                                                <span className="ml-1">{getStatusText(selectedOrder.status)}</span>
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700">Thanh toán:</span>
                                            <span className="text-sm text-gray-900 capitalize">{selectedOrder.paymentMethod}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700">Tổng tiền:</span>
                                            <span className="text-sm font-bold text-green-600">{formatCurrency(selectedOrder.totalPrice)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Customer Info */}
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Thông tin khách hàng</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700">Tên:</span>
                                            <span className="text-sm text-gray-900">{selectedOrder.user.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700">Email:</span>
                                            <span className="text-sm text-gray-900">{selectedOrder.user.email}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700">Điện thoại:</span>
                                            <span className="text-sm text-gray-900">{selectedOrder.user.phone}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Info */}
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Thông tin giao hàng</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700">Tên người nhận:</span>
                                            <span className="text-sm text-gray-900">{selectedOrder.receivedUser.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700">Điện thoại:</span>
                                            <span className="text-sm text-gray-900">{selectedOrder.receivedUser.phone}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700">Email:</span>
                                            <span className="text-sm text-gray-900">{selectedOrder.receivedUser.email}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700">Địa chỉ:</span>
                                            <span className="text-sm text-gray-900">{selectedOrder.receivedUser.address}</span>
                                        </div>
                                        {selectedOrder.receivedUser.note && (
                                            <div className="flex justify-between">
                                                <span className="text-sm font-medium text-gray-700">Ghi chú:</span>
                                                <span className="text-sm text-gray-900">{selectedOrder.receivedUser.note}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Status Update */}
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Cập nhật trạng thái</h3>
                                    <select
                                        value={selectedOrder.status}
                                        onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        <option value="pending">Chờ xử lý</option>
                                        <option value="processing">Đang xử lý</option>
                                        <option value="shipped">Đang giao</option>
                                        <option value="delivered">Đã giao</option>
                                        <option value="cancelled">Đã hủy</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="mt-6">
                            <h3 className="font-semibold text-gray-900 mb-2">Sản phẩm trong đơn hàng</h3>
                            <div className="bg-gray-50 rounded-lg overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Sản phẩm</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Giá</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Số lượng</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {selectedOrder.items.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-4 py-2">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                                                            <Package size={16} className="text-gray-500" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                            <div className="text-sm text-gray-500">ID: {item.id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2 text-sm text-gray-900">{formatCurrency(item.price)}</td>
                                                <td className="px-4 py-2 text-sm text-gray-900">{item.quantity}</td>
                                                <td className="px-4 py-2 text-sm font-medium text-gray-900">{formatCurrency(item.price * item.quantity)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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
                                    handleEditOrder(selectedOrder)
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

export default AdminOrdersPage
