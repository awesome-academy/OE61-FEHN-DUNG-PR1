"use client"

import React, { useState } from 'react'
import { products } from '@/data/sampleData'
import ProductCard from '@/components/ProductCard';
import { CiCircleChevRight } from "react-icons/ci";
import { CiCircleChevLeft } from "react-icons/ci";

const PromotionalProducts = () => {

    const promotionalProducts = products.slice(7, 13);

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleClickPrev = () => {
        setCurrentIndex((prevIndex) => prevIndex === 0 ? promotionalProducts.length - 1 : prevIndex - 1);
    }

    const handleClickNext = () => {
        setCurrentIndex((prevIndex) => prevIndex === promotionalProducts.length - 1 ? 0 : prevIndex + 1);
    }

    return (
        <div className='flex flex-col px-2 md:px-0'>
            <div className='relative w-full pb-[10px] border-b mb-[40px] flex justify-between items-center'>
                <h2 className='text-green-600 font-semibold'>Sản phẩm khuyến mại</h2>
                <div className='absolute w-[160px] border border-green-600 bottom-[-2px]'></div>
                <div className='flex md:hidden items-center '>
                    <CiCircleChevLeft onClick={handleClickPrev} className='text-[24px] text-gray-500 hover:cursor-pointer' />
                    <CiCircleChevRight onClick={handleClickNext} className='text-[24px] text-gray-500 hover:cursor-pointer' />
                </div>
            </div>
            <div className='hidden md:grid grid-cols-1 md:grid-cols-3 gap-5'>
                {promotionalProducts.map((product) => (
                    <div key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
            <div className='grid grid-cols-1 md:hidden'>
                <ProductCard product={promotionalProducts[currentIndex]} />
            </div>
        </div>
    )
}

export default PromotionalProducts
