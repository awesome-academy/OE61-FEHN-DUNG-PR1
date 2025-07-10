import React, { useState } from 'react'
import { Product } from '@/type'
import { products } from '@/data/sampleData'
import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

interface ProductRowProps {
    product: Product;
}

const ProductRow = ({ product }: ProductRowProps) => (
    <div className='flex justify-start items-center gap-[15px] border-b p-[16px]'>
        <img src={product.images[0]} alt="image" className='w-[100px] h-[100px] object-cover' />
        <div className='flex flex-col gap-[10px]'>
            <span className='text-[14px]'>{product.name}</span>
            <div className='flex justify-start items-center gap-[2px]'>
                {[...Array(5)].map((_, i) =>
                    i < Math.round(product.rating) ? (
                        <FaStar key={i} className='text-yellow-500' />
                    ) : (
                        <FaStarHalfAlt key={i} className='text-yellow-500' />
                    )
                )}
            </div>
            <span className='text-red-500'>{product.price} &#x20AB;</span>
        </div>
    </div>
);

export default ProductRow;
