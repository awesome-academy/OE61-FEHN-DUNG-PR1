import React from 'react'
import { IoCheckmarkDone } from "react-icons/io5";

interface CheckoutProgressProps {
    currentStep: number
}

const CheckoutProgress = ({ currentStep }: CheckoutProgressProps) => {
    const steps = [
        { number: 1, title: 'Kiểm tra đơn hàng' },
        { number: 2, title: 'Thông tin giao hàng' },
        { number: 3, title: 'Xác nhận thanh toán' }
    ]

    return (
        <div className='sticky top-20'>
            <div className='bg-white border rounded-lg p-6 shadow-sm'>
                <h4 className='text-green-600 font-semibold mb-6 text-center'>Tiến trình thanh toán</h4>

                <div className='space-y-4'>
                    {steps.map((step, index) => (
                        <div key={step.number} className='flex items-center gap-4'>
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step.number === currentStep
                                ? 'bg-green-600 text-white'
                                : step.number < currentStep
                                    ? 'bg-green-100 text-green-600'
                                    : 'bg-gray-100 text-gray-400'
                                }`}>
                                {step.number < currentStep ? (
                                    <IoCheckmarkDone />
                                ) : (
                                    step.number
                                )}
                            </div>

                            <div className=''>
                                <p className={`text-sm font-medium ${step.number === currentStep
                                    ? 'text-green-600'
                                    : step.number < currentStep
                                        ? 'text-green-600'
                                        : 'text-gray-400'
                                    }`}>
                                    {step.title}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CheckoutProgress
