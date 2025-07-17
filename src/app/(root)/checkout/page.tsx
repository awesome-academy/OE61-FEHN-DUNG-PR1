"use client"

import Layout from '@/components/Layout'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RootState } from '@/redux/store'
import { removeOrderedItem } from '@/redux/cart/cartSlice'
import { createOrderSuccess } from '@/redux/order/orderSlice'
import CheckoutProgress from '@/components/checkout/CheckoutProgress'
import CheckOrderItems from '@/components/checkout/CheckOrderItems'
import CheckInformation from '@/components/checkout/CheckInformation'
import CheckPayment from '@/components/checkout/CheckPayment'
import { ReceivedUserInfo, Order } from '@/type'
import toast from 'react-hot-toast'

const CheckoutPage = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const [receivedUserInfo, setReceivedUserInfo] = useState<ReceivedUserInfo>({
        name: '',
        phone: '',
        email: '',
        address: '',
        note: ''
    })
    const [paymentMethod, setPaymentMethod] = useState('COD')

    const { items, totalPrice } = useSelector((state: RootState) => state.cart)
    const { currentUser } = useSelector((state: RootState) => state.user)

    const taxAmount = 27000;
    const shippingAmount = 20000;
    const finalTotal = totalPrice + taxAmount + shippingAmount;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateInfo = (info: ReceivedUserInfo) => {
        if (!info.name.trim()) return "Vui lòng nhập tên người nhận";
        if (!info.phone.trim()) return "Vui lòng nhập số điện thoại người nhận";
        if (!info.email.trim()) return "Vui lòng nhập email người nhận";
        if (!emailRegex.test(info.email)) return "Email không hợp lệ";
        if (!info.address.trim()) return "Vui lòng nhập địa chỉ giao hàng";
        return null;
    }

    const handleNextStep = () => {
        if (currentStep === 2) {
            const error = validateInfo(receivedUserInfo);
            if (error) {
                toast.error(error);
                return;
            }
        }

        if (currentStep < 3) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handlePlaceOrder = () => {
        const newOrder: Order = {
            id: Date.now(),
            user: currentUser,
            receivedUser: receivedUserInfo,
            items: items.map(item => ({
                ...item,
                orderId: Date.now(),
                orderDate: new Date().toISOString()
            })),
            totalPrice: finalTotal,
            status: 'pending',
            createdAt: new Date().toISOString(),
            paymentMethod: paymentMethod
        }

        items.forEach(item => {
            dispatch(removeOrderedItem(item))
        })

        dispatch(createOrderSuccess({ order: newOrder }))

        router.push('/order/status')
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <CheckOrderItems items={items} />
            case 2:
                return (
                    <CheckInformation
                        currentUser={currentUser}
                        receivedUserInfo={receivedUserInfo}
                        setReceivedUserInfo={setReceivedUserInfo}
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                    />
                )
            case 3:
                return (
                    <CheckPayment
                        totalPrice={totalPrice}
                        taxAmount={taxAmount}
                        shippingAmount={shippingAmount}
                        finalTotal={finalTotal}
                        paymentMethod={paymentMethod}
                        receivedUserInfo={receivedUserInfo}
                        onPlaceOrder={handlePlaceOrder}
                    />
                )
            default:
                return null
        }
    }

    return (
        <Layout>
            <div className='container'>
                <div className='flex mt-[20px] gap-[20px] md:gap-[50px] px-2 md:px-0 mb-[20px] md:mb-[50px]'>
                    <div className='w-full'>
                        <div className='mb-6'>
                            <span onClick={() => router.push("/")} className='mr-[5px] text-gray-400 hover:font-semibold hover:cursor-pointer'>Home / </span>
                            <span onClick={() => router.push("/cart")} className='mr-[5px] text-gray-400 hover:font-semibold hover:cursor-pointer'>Giỏ hàng / </span>
                            <span className='text-green-600 hover:font-semibold hover:cursor-pointer'>Thanh toán</span>
                        </div>

                        <h3 className='text-green-600 uppercase font-bold text-[20px] mb-8'>Thanh toán</h3>

                        {/* Progress Bar on mobiel  screen */}
                        <div className='block md:hidden mb-4'>
                            <CheckoutProgress currentStep={currentStep} />
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
                            <div className='md:col-span-3'>
                                {renderStepContent()}

                                {/* Navigation Buttons */}
                                <div className='flex justify-between mt-8'>
                                    <button
                                        onClick={handlePrevStep}
                                        disabled={currentStep === 1}
                                        className='px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                                    >
                                        Quay lại
                                    </button>

                                    {currentStep < 3 ? (
                                        <button
                                            onClick={handleNextStep}
                                            className='px-6 py-3 bg-green-600 text-white rounded-lg hover:opacity-75 hover:cursor-pointer'
                                        >
                                            Tiếp tục
                                        </button>
                                    ) : null}
                                </div>
                            </div>

                            {/* Progress Bar on md screen */}
                            <div className='hidden md:block md:col-span-1'>
                                <CheckoutProgress currentStep={currentStep} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CheckoutPage
