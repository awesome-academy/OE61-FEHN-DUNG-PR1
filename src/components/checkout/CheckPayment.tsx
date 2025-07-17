import React from 'react'
import { ReceivedUserInfo } from '@/type'

interface CheckPaymentProps {
    totalPrice: number
    taxAmount: number
    shippingAmount: number
    finalTotal: number
    paymentMethod: string
    receivedUserInfo: ReceivedUserInfo
    onPlaceOrder: () => void
}

const CheckPayment: React.FC<CheckPaymentProps> = ({
    totalPrice,
    taxAmount,
    shippingAmount,
    finalTotal,
    paymentMethod,
    receivedUserInfo,
    onPlaceOrder
}) => {
    const getPaymentMethodText = (method: string) => {
        switch (method) {
            case 'COD':
                return 'Thanh toán khi nhận hàng (COD)'
            case 'stripe':
                return 'Thanh toán bằng thẻ tín dụng (Stripe)'
            case 'zalopay':
                return 'Thanh toán bằng ZaloPay'
            default:
                return method
        }
    }

    const isFormValid = () => {
        return receivedUserInfo.name &&
            receivedUserInfo.phone &&
            receivedUserInfo.email &&
            receivedUserInfo.address
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount)
    }

    return (
        <div className='space-y-6'>
            {/* Order Summary */}
            <div className='bg-white border rounded-lg p-6 shadow-sm'>
                <h4 className='text-green-600 font-semibold mb-6 text-lg'>Tóm tắt đơn hàng</h4>

                <div className='space-y-4'>
                    <div className='flex justify-between items-center py-2 border-b'>
                        <span className='text-gray-700'>Tổng tiền sản phẩm:</span>
                        <span className='font-medium'>{formatCurrency(totalPrice)}</span>
                    </div>

                    <div className='flex justify-between items-center py-2 border-b'>
                        <span className='text-gray-700'>Thuế (VAT 10%):</span>
                        <span className='font-medium'>{formatCurrency(taxAmount)}</span>
                    </div>

                    <div className='flex justify-between items-center py-2 border-b'>
                        <span className='text-gray-700'>Phí vận chuyển:</span>
                        <span className='font-medium'>{formatCurrency(shippingAmount)}</span>
                    </div>

                    <div className='flex justify-between items-center py-3 border-t-2 border-green-600'>
                        <span className='text-lg font-semibold text-green-600'>Tổng phải thanh toán:</span>
                        <span className='text-lg font-bold text-green-600'>{formatCurrency(finalTotal)}</span>
                    </div>
                </div>
            </div>

            {/* Delivery Information Summary */}
            <div className='bg-white border rounded-lg p-6 shadow-sm'>
                <h4 className='text-green-600 font-semibold mb-6 text-lg'>Thông tin giao hàng</h4>

                <div className='space-y-3'>
                    <div>
                        <span className='text-sm font-medium text-gray-700'>Người nhận: </span>
                        <span className='text-sm text-gray-900'>{receivedUserInfo.name}</span>
                    </div>

                    <div>
                        <span className='text-sm font-medium text-gray-700'>Số điện thoại: </span>
                        <span className='text-sm text-gray-900'>{receivedUserInfo.phone}</span>
                    </div>

                    <div>
                        <span className='text-sm font-medium text-gray-700'>Email: </span>
                        <span className='text-sm text-gray-900'>{receivedUserInfo.email}</span>
                    </div>

                    <div>
                        <span className='text-sm font-medium text-gray-700'>Địa chỉ: </span>
                        <span className='text-sm text-gray-900'>{receivedUserInfo.address}</span>
                    </div>

                    {receivedUserInfo.note && (
                        <div>
                            <span className='text-sm font-medium text-gray-700'>Ghi chú: </span>
                            <span className='text-sm text-gray-900'>{receivedUserInfo.note}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Payment Method Summary */}
            <div className='bg-white border rounded-lg p-6 shadow-sm'>
                <h4 className='text-green-600 font-semibold mb-6 text-lg'>Phương thức thanh toán</h4>

                <div className='flex items-center gap-3'>
                    <div className='w-3 h-3 bg-green-600 rounded-full'></div>
                    <span className='text-gray-900'>{getPaymentMethodText(paymentMethod)}</span>
                </div>
            </div>

            {/* Place Order Button */}
            <div className='bg-white border rounded-lg p-6 shadow-sm'>
                <div className='text-center'>
                    <button
                        onClick={onPlaceOrder}
                        disabled={!isFormValid()}
                        className='w-full md:w-auto px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:opacity-75 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-lg'
                    >
                        Đặt hàng ngay
                    </button>

                    {!isFormValid() && (
                        <p className='text-red-500 text-sm mt-2'>
                            Vui lòng điền đầy đủ thông tin bắt buộc
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CheckPayment
