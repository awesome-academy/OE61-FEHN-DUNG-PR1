import React from 'react'
import { CartItem } from '@/type'
import Image from 'next/image'

interface CheckOrderItemsProps {
    items: CartItem[]
}

const CheckOrderItems = ({ items }: CheckOrderItemsProps) => {

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount)
    }

    return (
        <div className='bg-white border rounded-lg p-6 shadow-sm'>
            <h4 className='text-green-600 font-semibold mb-6 text-lg'>Kiểm tra đơn hàng</h4>

            <div className='space-y-4'>
                {items.map((item) => (
                    <div key={item.id} className='flex items-center gap-4 p-4 border-b last:border-b-0'>
                        <div className='flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden'>
                            <Image
                                src={item.images[0] || '/placeholder-image.jpg'}
                                alt={item.name}
                                width={64}
                                height={64}
                                className='w-full h-full object-cover'
                            />
                        </div>

                        <div className='flex-1'>
                            <h5 className='font-medium text-gray-900 mb-1'>{item.name}</h5>
                            <p className='text-sm text-gray-500'>Đơn giá: {formatCurrency(item.price)}</p>
                            <p className='text-sm text-gray-500'>Số lượng: {item.quantity}</p>
                        </div>

                        <div className='text-right'>
                            <p className='font-semibold text-green-600'>
                                {formatCurrency(item.price * item.quantity)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='mt-6 pt-4 border-t'>
                <div className='flex justify-between items-center'>
                    <span className='text-lg font-semibold text-gray-900'>Tổng tạm tính:</span>
                    <span className='text-lg font-semibold text-green-600'>
                        {formatCurrency(items.reduce((total, item) => total + (item.price * item.quantity), 0))}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CheckOrderItems
