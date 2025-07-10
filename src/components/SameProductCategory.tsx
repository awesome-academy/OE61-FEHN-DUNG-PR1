"use client";

import { Product } from '@/type';
import React, { useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { CiCircleChevRight } from "react-icons/ci";
import { CiCircleChevLeft } from "react-icons/ci";
import { products } from '@/data/sampleData';

interface SameProductCategoryProps {
    product?: Product
}

const SameProductCategory = ({ product }: SameProductCategoryProps) => {

    const productCategory = product?.categories;

    const sameCategoryProducts = products.filter(p =>
        p.id !== product?.id && // exclude the current product itself
        p.categories.some(categoryId => productCategory?.includes(categoryId))
    );

    const [currentIndex, setCurrentIndex] = useState(0);

    const [startIndex, setStartIndex] = useState(0);

    const productsPerSlide = 4;

    const desktopProducts = sameCategoryProducts.slice(
        startIndex,
        startIndex + productsPerSlide
    );

    const handleClickPrev = () => {
        setStartIndex((prev) =>
            prev - productsPerSlide < 0
                ? Math.max(sameCategoryProducts.length - productsPerSlide, 0)
                : prev - productsPerSlide
        );
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? sameCategoryProducts.length - 1 : prevIndex - 1
        );
    };

    const handleClickNext = () => {
        setStartIndex((prev) =>
            prev + productsPerSlide >= sameCategoryProducts.length
                ? 0
                : prev + productsPerSlide
        );
        setCurrentIndex((prevIndex) =>
            prevIndex === sameCategoryProducts.length - 1 ? 0 : prevIndex + 1
        );
    };




    return (
        <div className='px-2 md:px-0'>
            <div className='relative w-full pb-[10px] border-b mb-[40px] flex justify-between items-center'>
                <h2 className='text-green-600 font-semibold'>Sản phẩm mới</h2>
                <div className='absolute w-[110px] border border-green-600 bottom-[-2px]'></div>
                <div className='flex items-center '>
                    <CiCircleChevLeft onClick={handleClickPrev} className='text-[24px] text-gray-500 hover:cursor-pointer' />
                    <CiCircleChevRight onClick={handleClickNext} className='text-[24px] text-gray-500 hover:cursor-pointer' />
                </div>
            </div>
            <div className='hidden md:grid grid-cols-1 md:grid-cols-4 gap-5 transition-all'>
                {desktopProducts.map((product) => (
                    <div key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
            <div className='grid grid-cols-1 md:hidden transition-all'>
                {sameCategoryProducts.length > 0 && (
                    <ProductCard product={sameCategoryProducts[currentIndex]} />
                )}
            </div>
        </div>
    )
}

export default SameProductCategory
