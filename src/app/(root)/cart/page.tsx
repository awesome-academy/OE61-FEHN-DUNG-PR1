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
                        <span onClick={() => router.push("/")} className='mr-[5px] text-gray-400 hover:cursor-pointer hover:font-semibold'>Home / </span>
                        <span className='text-green-600 hover:font-semibold hover:cursor-pointer'>Giỏ hàng</span>
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
                                    <button onClick={() => router.push("/checkout")} className='w-[120px] md:w-[160px] text-[12px] md:text-[14px] h-[50px] uppercase bg-green-600 hover:cursor-pointer hover:opacity-70 border border-green-600 text-white text-center rounded-[20px]'>Thanh toán</button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </Layout>
    )
}

export default CartPage
