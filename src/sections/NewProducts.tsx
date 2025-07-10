"use client"

import React, { useState } from 'react'
import { products } from '@/data/sampleData'
import ProductCard from '@/components/ProductCard'
import { CiCircleChevRight } from "react-icons/ci";
import { CiCircleChevLeft } from "react-icons/ci";

const NewProducts = () => {

    const newProducts = products.filter((product) => product.isNew);

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleClickPrev = () => {
        setCurrentIndex((prevIndex) => prevIndex === 0 ? newProducts.length - 1 : prevIndex - 1);
    }

    const handleClickNext = () => {
        setCurrentIndex((prevIndex) => prevIndex === newProducts.length - 1 ? 0 : prevIndex + 1);
    }


    return (
        <div className='mt-[20px] md:mt-[40px] px-2 md:px-0'>
            <div className='relative w-full pb-[10px] border-b mb-[40px] flex justify-between items-center'>
                <h2 className='text-green-600 font-semibold'>Sản phẩm mới</h2>
                <div className='absolute w-[110px] border border-green-600 bottom-[-2px]'></div>
                <div className='flex md:hidden items-center '>
                    <CiCircleChevLeft onClick={handleClickPrev} className='text-[24px] text-gray-500 hover:cursor-pointer' />
                    <CiCircleChevRight onClick={handleClickNext} className='text-[24px] text-gray-500 hover:cursor-pointer' />
                </div>
            </div>
            <div className='hidden md:grid grid-cols-1 md:grid-cols-4 gap-5'>
                {newProducts.map((product) => (
                    <div key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
            <div className='grid grid-cols-1 md:hidden'>
                <ProductCard product={newProducts[currentIndex]} />
            </div>
        </div>
    )
}

export default NewProducts
