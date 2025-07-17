import React from 'react'
import { ReceivedUserInfo, User } from '@/type'

interface CheckInformationProps {
    currentUser: User
    receivedUserInfo: ReceivedUserInfo
    setReceivedUserInfo: (info: ReceivedUserInfo) => void
    paymentMethod: string
    setPaymentMethod: (method: string) => void
}

const CheckInformation = ({
    currentUser,
    receivedUserInfo,
    setReceivedUserInfo,
    paymentMethod,
    setPaymentMethod
}: CheckInformationProps) => {

    const handleInputChange = (field: keyof ReceivedUserInfo, value: string) => {
        setReceivedUserInfo({
            ...receivedUserInfo,
            [field]: value
        })
    }

    return (
        <div className='space-y-6'>
            {/* User Information */}
            <div className='bg-white border rounded-lg p-6 shadow-sm'>
                <h4 className='text-green-600 font-semibold mb-6 text-lg'>Thông tin người đặt</h4>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Tên</label>
                        <input
                            type='text'
                            value={currentUser?.name || ''}
                            readOnly
                            className='w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Số điện thoại</label>
                        <input
                            type='text'
                            value={currentUser?.phone || ''}
                            readOnly
                            className='w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500'
                        />
                    </div>

                    <div className='md:col-span-2'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
                        <input
                            type='email'
                            value={currentUser?.email || ''}
                            readOnly
                            className='w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500'
                        />
                    </div>
                </div>
            </div>

            {/* Delivery Information */}
            <div className='bg-white border rounded-lg p-6 shadow-sm'>
                <h4 className='text-green-600 font-semibold mb-6 text-lg'>Thông tin người nhận</h4>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <div className='flex gap-1'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Tên người nhận</label>
                            <span className='text-red-400'>*</span>
                        </div>
                        <input
                            type='text'
                            value={receivedUserInfo.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder='Nhập tên người nhận'
                            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                            required
                        />
                    </div>

                    <div>
                        <div className='flex gap-1'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Số điện thoại</label>
                            <span className='text-red-400'>*</span>
                        </div>
                        <input
                            type='tel'
                            value={receivedUserInfo.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder='Nhập số điện thoại'
                            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                            required
                        />
                    </div>

                    <div className='md:col-span-2'>
                        <div className='flex gap-1'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
                            <span className='text-red-400'>*</span>
                        </div>
                        <input
                            type='email'
                            value={receivedUserInfo.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder='Nhập email'
                            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                            required
                        />
                    </div>

                    <div className='md:col-span-2'>
                        <div className='flex gap-1'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Địa chỉ giao hàng</label>
                            <span className='text-red-400'>*</span>
                        </div>
                        <textarea
                            value={receivedUserInfo.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            placeholder='Nhập địa chỉ giao hàng'
                            rows={3}
                            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                            required
                        />
                    </div>

                    <div className='md:col-span-2'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Ghi chú</label>
                        <textarea
                            value={receivedUserInfo.note}
                            onChange={(e) => handleInputChange('note', e.target.value)}
                            placeholder='Ghi chú thêm (không bắt buộc)'
                            rows={2}
                            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                        />
                    </div>
                </div>
            </div>

            {/* Payment Method */}
            <div className='bg-white border rounded-lg p-6 shadow-sm'>
                <h4 className='text-green-600 font-semibold mb-6 text-lg'>Phương thức thanh toán</h4>

                <div className='space-y-4'>
                    <div className='flex items-center'>
                        <input
                            type='radio'
                            id='cod'
                            name='paymentMethod'
                            value='COD'
                            checked={paymentMethod === 'COD'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className='w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300'
                        />
                        <label htmlFor='cod' className='ml-3 text-sm font-medium text-gray-700'>
                            Thanh toán khi nhận hàng (COD)
                        </label>
                    </div>

                    <div className='flex items-center'>
                        <input
                            type='radio'
                            id='stripe'
                            name='paymentMethod'
                            value='stripe'
                            checked={paymentMethod === 'stripe'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className='w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300'
                        />
                        <label htmlFor='stripe' className='ml-3 text-sm font-medium text-gray-700'>
                            Thanh toán bằng thẻ tín dụng (Stripe)
                        </label>
                    </div>

                    <div className='flex items-center'>
                        <input
                            type='radio'
                            id='zalopay'
                            name='paymentMethod'
                            value='zalopay'
                            checked={paymentMethod === 'zalopay'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className='w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300'
                        />
                        <label htmlFor='zalopay' className='ml-3 text-sm font-medium text-gray-700'>
                            Thanh toán bằng ZaloPay
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckInformation
