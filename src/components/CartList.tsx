"use client"

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RootState } from '@/redux/store'
import Image from 'next/image'
import { FaRegTrashCan } from "react-icons/fa6";
import { removeFromCart, toggleCartItem } from "@/redux/cart/cartSlice"
import toast from 'react-hot-toast'

interface CartListProps {
    items: any
}

const CartList = ({ items }: CartListProps) => {

    const dispatch = useDispatch();

    const handleToggleCartItem = (id: number, actionType: "inc" | "dec") => {
        dispatch(toggleCartItem({ id, actionType }));
        toast.success("Cập nhật giỏ hàng thành công")
    }

    const handleRemoteFromCart = (id: number) => {
        dispatch(removeFromCart({ id }));
        toast.success("Xóa sản phẩm khỏi giỏ hàng thành công")
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount)
    }

    return (
        <table className='w-full'>
            <thead>
                <tr>
                    <th className='border text-white bg-green-600 text-[12px] md:text-[16px] uppercase h-[50px] hidden md:block'>
                        <div className='flex w-full h-full justify-center items-center'>
                            Hình ảnh
                        </div>
                    </th>
                    <th className='border text-white bg-green-600 text-[12px] md:text-[16px] uppercase h-[50px]'>
                        <div className='flex w-full h-full justify-center items-center'>
                            Tên sản phẩm
                        </div>
                    </th>
                    <th className='border text-white bg-green-600 text-[12px] md:text-[16px] uppercase h-[50px]'>
                        <div className='flex w-full h-full justify-center items-center'>
                            Đơn giá
                        </div>
                    </th>
                    <th className='border text-white bg-green-600 text-[12px] md:text-[16px] uppercase h-[50px]'>
                        <div className='flex w-full h-full justify-center items-center'>
                            Số lượng
                        </div>
                    </th>
                    <th className='border text-white bg-green-600 text-[12px] md:text-[16px] uppercase h-[50px]'>
                        <div className='flex w-full h-full justify-center items-center'>
                            Thành tiền
                        </div>
                    </th>
                    <th className='border text-white bg-green-600 text-[12px] md:text-[16px] uppercase h-[50px]'>
                        <div className='flex w-full h-full justify-center items-center'>
                            Xóa
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {items.map((item: any) => (
                    <tr key={item.id} className=''>
                        <td className='p-3 border hidden md:block'>
                            <div className='flex justify-center items-center'>
                                <Image src={item?.images[0]} alt="image" width={60} height={100} className='object-contain w-full h-full' />
                            </div>
                        </td>
                        <td className='text-center text-[12px] md:text-[16px] uppercase text-green-600 border'>{item?.name}</td>
                        <td className='text-center text-[12px] md:text-[16px] border'>{formatCurrency(item?.price)}</td>
                        <td className='border'>
                            <div className='flex justify-center items-center gap-1 py-2'>
                                <div onClick={() => handleToggleCartItem(item.id, "dec")} className='hover:cursor-pointer hover:bg-black/10 w-[20px] h-[20px] md:w-[40px] md:h-[40px] flex justify-center items-center border'>-</div>

                                <div className='border w-[20px] h-[20px] md:w-[40px] md:h-[40px] text-[12px] md:text-[16px] flex justify-center items-center'>
                                    {item?.quantity}
                                </div>

                                <div onClick={() => handleToggleCartItem(item.id, "inc")} className='hover:cursor-pointer hover:bg-black/10 w-[20px] h-[20px] md:w-[40px] md:h-[40px] flex justify-center items-center border'>+</div>

                            </div>
                        </td>
                        <td className='text-center text-[12px] md:text-[16px] border'>{formatCurrency(item?.price * item?.quantity)}</td>
                        <td className='border'>
                            <div className='flex justify-center items-center'>
                                <FaRegTrashCan onClick={() => handleRemoteFromCart(item.id)} className='text-[12px] md:text-[16px] hover:cursor-pointer text-red-500 hover:opacity-70' />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default CartList
