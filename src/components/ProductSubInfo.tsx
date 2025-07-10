"use client";

import { Product } from '@/type';
import React, { useState } from 'react'

interface ProductSubInfoProps {
    product?: Product
}

const ProductSubInfo = ({ product }: ProductSubInfoProps) => {

    const [activeTab, setActiveTab] = useState(1);


    return (
        <div className='flex flex-col px-2 md:px-0'>
            <div className='grid grid-cols-3'>
                <div onClick={() => setActiveTab(1)} className={`uppercase text-[12px] md:text-[14px] p-[10px] transition-all hover:cursor-pointer text-center ${activeTab === 1 ? 'border-t border-t-gray-800 border-x text-green-600' : 'border-b'}`}>thông tin sản phẩm</div>
                <div onClick={() => setActiveTab(2)} className={`uppercase text-[12px] md:text-[14px] p-[10px] transition-all hover:cursor-pointer text-center ${activeTab === 2 ? 'border-t border-t-gray-800 border-x text-green-600' : 'border-b'}`}>khách hàng đánh giá</div>
                <div onClick={() => setActiveTab(3)} className={`uppercase text-[12px] md:text-[14px] p-[10px] transition-all hover:cursor-pointer text-center ${activeTab === 3 ? 'border-t border-t-gray-800 border-x text-green-600' : 'border-b'}`}>thẻ tag</div>
            </div>

            {
                activeTab === 1 && (
                    <div className='p-[10px] md:p-[20px] flex flex-col gap-[15px] text-[13px] border border-t-0'>
                        <span>Tên phổ thông: {product?.commonName}</span>
                        <span>Tên khoa học: {product?.scientificName}</span>
                        <span>Họ thực vật: {product?.botanicalFamily}</span>
                        <span>Chiều cao: {product?.height}</span>
                        <span>Mô tả: {product?.descriptions}</span>
                    </div>
                )
            }

            {
                activeTab === 2 && (
                    <div className='p-[10px] md:p-[20px] flex flex-col gap-[15px] text-[13px] border border-t-0'>
                        <span>KH danh gia</span>
                    </div>
                )
            }

            {
                activeTab === 3 && (
                    <div className='p-[10px] md:p-[20px] flex flex-col gap-[15px] text-[13px] border border-t-0'>
                        <span>The tag</span>
                    </div>
                )
            }

        </div>
    )
}

export default ProductSubInfo
