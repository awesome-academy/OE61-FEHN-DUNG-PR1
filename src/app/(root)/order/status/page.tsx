"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import Layout from '@/components/Layout'
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const OrderStatusPage = () => {
    const router = useRouter()
    const { currentOrder } = useSelector((state: RootState) => state.order)

    return (
        <Layout>
            <div className='container'>
                <div className='flex justify-center items-center min-h-[500px] px-2 md:px-0 py-[20px]'>
                    <div className='bg-white border rounded-lg shadow-lg p-8 max-w-md w-full text-center'>
                        {/* Success Icon */}
                        <div className='mb-6'>
                            <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                                <IoCheckmarkDoneSharp className='text-[50px] text-green-600' />
                            </div>
                            <h2 className='text-2xl font-bold text-green-600 mb-2'>Đặt hàng thành công!</h2>
                            <p className='text-gray-600'>Cảm ơn bạn đã mua hàng. Chúng tôi sẽ liên hệ với bạn sớm nhất.</p>
                        </div>

                        {/* Order Details */}
                        {currentOrder && (
                            <div className='mb-6 text-left'>
                                <div className='bg-gray-50 rounded-lg p-4 mb-4'>
                                    <h3 className='font-semibold text-gray-800 mb-2'>Thông tin đơn hàng</h3>
                                    <div className='space-y-2 text-sm'>
                                        <div className='flex justify-between'>
                                            <span className='text-gray-600'>Mã đơn hàng:</span>
                                            <span className='font-medium'>#{currentOrder.id}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span className='text-gray-600'>Tổng tiền:</span>
                                            <span className='font-medium text-green-600'>{currentOrder.totalPrice.toLocaleString()} ₫</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span className='text-gray-600'>Phương thức thanh toán:</span>
                                            <span className='font-medium'>{currentOrder.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng' : currentOrder.paymentMethod}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span className='text-gray-600'>Trạng thái:</span>
                                            <span className='font-medium text-orange-600'>Đang xử lý</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='bg-gray-50 rounded-lg p-4'>
                                    <h3 className='font-semibold text-gray-800 mb-2'>Thông tin giao hàng</h3>
                                    <div className='space-y-1 text-sm'>
                                        <p><span className='text-gray-600'>Người nhận:</span> {currentOrder.receivedUser.name}</p>
                                        <p><span className='text-gray-600'>Số điện thoại:</span> {currentOrder.receivedUser.phone}</p>
                                        <p><span className='text-gray-600'>Địa chỉ:</span> {currentOrder.receivedUser.address}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className='space-y-3'>
                            <button
                                onClick={() => router.push('/products')}
                                className='w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:opacity-75 transition-opacity'
                            >
                                Tiếp tục mua hàng
                            </button>

                            <button
                                onClick={() => router.push('/account?activeTab=orders')}
                                className='w-full py-3 bg-white text-green-600 font-semibold border border-green-600 rounded-lg hover:bg-green-50 transition-colors'
                            >
                                Xem đơn hàng của tôi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default OrderStatusPage
