"use client"

import React, { useState } from 'react'
import { products } from '@/data/sampleData'
import ProductRow from '@/components/ProductRow';
import { CiCircleChevRight } from "react-icons/ci";
import { CiCircleChevLeft } from "react-icons/ci";

const BestSellerProducts = () => {

    const hotProducts = products.slice(-6);
    const [currentIndex, setCurrentIndex] = useState(0);

    const total = hotProducts.length;

    const getIndex = (idx: any) => (idx + total) % total;

    const handleClickPrev = () => {
        setCurrentIndex((prevIndex) => getIndex(prevIndex - 1));
    }

    const handleClickNext = () => {
        setCurrentIndex((prevIndex) => getIndex(prevIndex + 1));
    }

    const mobileProducts = [
        hotProducts[getIndex(currentIndex)],
        hotProducts[getIndex(currentIndex + 1)],
        hotProducts[getIndex(currentIndex + 2)],
    ];

    return (
        <div className='flex flex-col px-2 md:px-0'>
            <div className='relative w-full pb-[10px] border-b mb-[40px] flex justify-between items-center'>
                <h2 className='text-green-600 font-semibold'>Sản phẩm mua nhiều</h2>
                <div className='absolute w-[150px] border border-green-600 bottom-[-2px]'></div>
                <div className='flex md:hidden items-center z-10'>
                    <button onClick={handleClickPrev}><CiCircleChevLeft className='text-[24px] text-gray-500 hover:cursor-pointer' /></button>
                    <button onClick={handleClickNext}><CiCircleChevRight className='text-[24px] text-gray-500 hover:cursor-pointer' /></button>
                </div>
            </div>

            <div className='border flex flex-col'>
                <div className="hidden md:flex flex-col">
                    {hotProducts.map((product) => (
                        <ProductRow key={product.id} product={product} />
                    ))}
                </div>
                <div className="flex md:hidden flex-col">
                    {mobileProducts.map((product) =>
                        <ProductRow key={product.id} product={product} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default BestSellerProducts
