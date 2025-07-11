"use client"

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RootState } from '@/redux/store'
import CartList from '@/components/CartList'
import Layout from '@/components/Layout'
import { GiShoppingCart } from "react-icons/gi";

const CartPage = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const { items, cartCount, totalPrice } = useSelector((state: RootState) => state.cart);

    return (
        <Layout>
            <div className='container '>
                <div className='flex flex-col mt-[20px] gap-[20px] md:gap-[50px] px-2 md:px-0 mb-[20px] md:mb-[50px]'>
                    <div>
                        <span className='mr-[5px] text-gray-400'>Home / </span>
                        <span className='text-green-600'>Giỏ hàng</span>
                    </div>
                    <h3 className='text-green-600 uppercase font-bold text-[20px]'>Giỏ hàng</h3>

                    {
                        items.length === 0 ? (
                            <div className='flex flex-col gap-[20px] mx-auto justify-center items-center w-[300px] md:w-[500px] h-[200px] md:h-[300px] border rounded-[10px] shadow-md'>
                                <h3 className='text-red-400 uppercase text-[20px] font-semibold'>giỏ hàng trống!</h3>
                                <p className='uppercase text-[18px]'>mua sắm tại đây</p>
                                <GiShoppingCart onClick={() => router.push("/products")} className='text-green-600 text-[40px] hover:cursor-pointer hover:opacity-75' />
                            </div>
                        ) : (
                            <div className='flex flex-col items-end gap-[20px] md:gap-[50px]'>
                                <CartList items={items} />
                                <div className='flex justify-end items-center gap-[20px]'>
                                    <button className='w-[120px] md:w-[160px] text-[12px] md:text-[14px] h-[50px] uppercase bg-white hover:cursor-pointer hover:opacity-70 border border-green-600 text-green-600 text-center rounded-[20px]'>hủy đơn hàng</button>
                                    <button className='w-[120px] md:w-[160px] text-[12px] md:text-[14px] h-[50px] uppercase bg-green-600 hover:cursor-pointer hover:opacity-70 border border-green-600 text-white text-center rounded-[20px]'>tiếp tục mua</button>
                                </div>
                                <div className='flex justify-end'>
                                    <div className='grid grid-cols-3'>
                                        <div className='col-span-2 w-[200px] md:w-[360px] h-[80px] md:h-[100px] border uppercase font-semibold text-[12px] md:text-[16px] text-green-600 flex justify-center items-center'>
                                            tổng tiền (chưa thuế)
                                        </div>
                                        <div className='col-span-1 w-[80px] md:w-[180px] h-[80px] md:h-[100px] border border-l-0 uppercase font-semibold text-[12px] md:text-[16px] text-green-600 flex justify-center items-center'>
                                            {totalPrice} &#x20AB;
                                        </div>
                                        <div className='col-span-2 w-[200px] md:w-[360px] h-[80px] md:h-[100px] border uppercase font-semibold text-[12px] md:text-[16px] text-green-600 flex justify-center items-center'>
                                            thuế (vat 10%)
                                        </div>
                                        <div className='col-span-1 w-[80px] md:w-[180px] h-[80px] md:h-[100px] border border-l-0 uppercase font-semibold text-[12px] md:text-[16px] text-green-600 flex justify-center items-center'>
                                            27000 &#x20AB;
                                        </div>
                                        <div className='col-span-2 w-[200px] md:w-[360px] h-[80px] md:h-[100px] border uppercase font-semibold text-[12px] md:text-[16px] text-green-600 flex justify-center items-center'>
                                            tổng phải thanh toán
                                        </div>
                                        <div className='col-span-1 w-[80px] md:w-[180px] h-[80px] md:h-[100px] border border-l-0 uppercase font-semibold text-[12px] md:text-[16px] text-green-600 flex justify-center items-center'>
                                            {totalPrice + 27000} &#x20AB;
                                        </div>
                                    </div>
                                </div>
                                <button className='w-[120px] md:w-[160px] h-[50px] text-[12px] md:text-[14px] uppercase bg-green-600 hover:cursor-pointer hover:opacity-70 border border-green-600 text-white text-center rounded-[20px]'>thanh toán</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </Layout>
    )
}

export default CartPage
