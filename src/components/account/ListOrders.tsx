"use client"

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Order } from '@/type'
import Image from 'next/image'
import { clearOrders } from '@/redux/order/orderSlice'
import { BsClipboard2X } from "react-icons/bs";

const ListOrders = () => {
    const [selectedTab, setSelectedTab] = useState('all')
    const { orders } = useSelector((state: RootState) => state.order)

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getStatusDisplay = (status: string) => {
        switch (status) {
            case 'pending':
                return { color: 'bg-yellow-100 text-yellow-800', text: 'Chờ xác nhận' }
            case 'confirmed':
                return { color: 'bg-blue-100 text-blue-800', text: 'Đã xác nhận' }
            case 'shipping':
                return { color: 'bg-purple-100 text-purple-800', text: 'Đang giao hàng' }
            case 'delivered':
                return { color: 'bg-green-100 text-green-800', text: 'Đã giao hàng' }
            case 'cancelled':
                return { color: 'bg-red-100 text-red-800', text: 'Đã hủy' }
            default:
                return { color: 'bg-gray-100 text-gray-800', text: 'Không xác định' }
        }
    }

    const filteredOrders = orders.filter(order => {
        if (selectedTab === 'all') return true
        return order.status === selectedTab
    })

    const tabs = [
        { key: 'all', label: 'Tất cả', count: orders.length },
        { key: 'pending', label: 'Chờ xác nhận', count: orders.filter(o => o.status === 'pending').length },
        { key: 'confirmed', label: 'Đã xác nhận', count: orders.filter(o => o.status === 'confirmed').length },
        { key: 'shipping', label: 'Đang giao', count: orders.filter(o => o.status === 'shipping').length },
        { key: 'delivered', label: 'Đã giao', count: orders.filter(o => o.status === 'delivered').length },
        { key: 'cancelled', label: 'Đã hủy', count: orders.filter(o => o.status === 'cancelled').length }
    ]

    return (
        <div className='flex flex-col gap-[20px] p-[20px] h-full overflow-y-auto'>
            <h3 className='font-semibold text-[20px]'>Lịch sử mua hàng</h3>
            <hr />

            {/* Order Status Tabs */}
            <div className='bg-gray-50 rounded-lg p-1'>
                <div className='flex flex-wrap gap-1'>
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setSelectedTab(tab.key)}
                            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${selectedTab === tab.key
                                ? 'bg-green-600 text-white shadow-sm'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                        >
                            {tab.label}
                            <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${selectedTab === tab.key
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 text-gray-600'
                                }`}>
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders List */}
            <div className='flex-1 overflow-y-auto'>
                {filteredOrders.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-12'>
                        <div className='mb-4'>
                            <BsClipboard2X className='text-[50px] text-gray-400' />
                        </div>
                        <h3 className='text-lg font-medium text-gray-900 mb-2'>Chưa có đơn hàng</h3>
                        <p className='text-gray-500 text-center'>Bạn chưa có đơn hàng nào trong danh mục này.</p>
                    </div>
                ) : (
                    <div className='space-y-4'>
                        {filteredOrders.map((order: Order) => {
                            const statusDisplay = getStatusDisplay(order.status)

                            return (
                                <div key={order.id} className='bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200'>
                                    {/* Order Header */}
                                    <div className='p-4 border-b border-gray-200'>
                                        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                                            <div className='flex items-center gap-3'>
                                                <div>
                                                    <h4 className='text-base font-semibold text-gray-900'>
                                                        Đơn hàng #{order.id}
                                                    </h4>
                                                    <p className='text-xs text-gray-500'>
                                                        {formatDate(order.createdAt)}
                                                    </p>
                                                </div>
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusDisplay.color}`}>
                                                    {statusDisplay.text}
                                                </span>
                                            </div>
                                            <div className='text-right'>
                                                <p className='text-xs text-gray-500'>Tổng tiền</p>
                                                <p className='text-base font-semibold text-green-600'>
                                                    {formatCurrency(order.totalPrice)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className='p-4'>
                                        <div className='space-y-3'>
                                            {order.items.map((item) => (
                                                <div key={`${item.id}-${item.orderId}`} className='flex items-center gap-3 py-2 border-b border-gray-100 last:border-b-0'>
                                                    <div className='flex-shrink-0'>
                                                        <Image
                                                            src={item.images[0]}
                                                            alt={item.name}
                                                            width={60}
                                                            height={60}
                                                            className='w-15 h-15 object-cover rounded-md border border-gray-200'
                                                        />
                                                    </div>
                                                    <div className='flex-1 min-w-0'>
                                                        <h5 className='font-medium text-gray-900 text-sm truncate'>{item.name}</h5>
                                                        <p className='text-xs text-gray-500 mt-1'>
                                                            Số lượng: {item.quantity}
                                                        </p>
                                                        <p className='text-sm font-medium text-green-600 mt-1'>
                                                            {formatCurrency(item.price)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Order Info */}
                                        <div className='mt-4 pt-4 border-t border-gray-200'>
                                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                                                <div>
                                                    <h6 className='font-medium text-gray-900 mb-2 text-sm'>Thông tin người nhận</h6>
                                                    <div className='text-xs text-gray-600 space-y-1'>
                                                        <p><span className='font-medium'>Tên:</span> {order.receivedUser.name}</p>
                                                        <p><span className='font-medium'>SĐT:</span> {order.receivedUser.phone}</p>
                                                        <p><span className='font-medium'>Email:</span> {order.receivedUser.email}</p>
                                                        <p><span className='font-medium'>Địa chỉ:</span> {order.receivedUser.address}</p>
                                                        {order.receivedUser.note && (
                                                            <p><span className='font-medium'>Ghi chú:</span> {order.receivedUser.note}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h6 className='font-medium text-gray-900 mb-2 text-sm'>Thông tin thanh toán</h6>
                                                    <div className='text-xs text-gray-600 space-y-1'>
                                                        <p><span className='font-medium'>Phương thức:</span> {order.paymentMethod === 'COD' ? 'COD' : 'Online'}</p>
                                                        <p><span className='font-medium'>Tổng tiền:</span> <span className='text-green-600 font-semibold'>{formatCurrency(order.totalPrice)}</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ListOrders