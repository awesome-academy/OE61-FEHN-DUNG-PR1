"use client";

import { Product } from '@/type';
import React, { useState } from 'react'
import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { LuSquarePlus } from "react-icons/lu";

interface ProductDetailProps {
    product?: Product
}

const ProductDetail = ({ product }: ProductDetailProps) => {

    const [mainImage, setMainImage] = useState(product?.images[0]);
    const [quantity, setQuantity] = useState(1);

    const rounded = Math.round(product?.rating || 0);

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    }

    const handleDecreaseQuantity = () => {
        if (quantity == 1) {
            return;
        } else {
            setQuantity(quantity - 1);
        }
    }


    return (
        <div className='grid grid-cols-1 md:grid-cols-5 gap-10 px-2 md:px-0'>
            <div className='col-span-1 md:col-span-2 w-full'>
                <div className='grid grid-cols-5 gap-[10px]'>
                    <div className='col-span-5'>
                        <img src={mainImage} alt="image" className='w-full h-full object-cover transition-all' />
                    </div>
                    {product?.images
                        .filter((img) => img !== mainImage)
                        .map((img, idx) => (
                            <button
                                key={img}
                                onClick={() => setMainImage(img)}
                                className={`aspect-square w-full flex items-center justify-center overflow-hidden transition-all`}
                                style={{ outline: "none" }}
                            >
                                <img
                                    src={img}
                                    alt={`thumb-${idx}`}
                                    className="object-cover w-full h-full"
                                />
                            </button>
                        ))}
                </div>
            </div>
            <div className='col-span-1 md:col-span-3 w-full'>
                <div className='flex flex-col w-full gap-[20px]'>
                    <div className='flex flex-col gap-[20px]'>
                        <h3>{product?.name}</h3>
                        <div className='flex items-center gap-[5px]'>
                            {[...Array(5)].map((_, i) =>
                                i < rounded ? (
                                    <FaStar key={i} className='text-yellow-500' />
                                ) : (
                                    <FaStarHalfAlt key={i} className='text-yellow-500' />
                                )
                            )}
                        </div>
                        <div className='flex items-center gap-[10px]'>
                            <span className='text-red-500 font-semibold text-[20px]'>{product?.price} &#x20AB;</span>
                            <span className='text-gray-500 line-through text-[14px]'>{product?.estimatedPrice} &#x20AB;</span>
                        </div>
                    </div>

                    <hr />

                    <p >{product?.descriptions}</p>

                    <hr />

                    <div className='flex items-center'>
                        <p className='mr-[20px]'>Số lượng</p>
                        <div onClick={handleDecreaseQuantity} className='hover:cursor-pointer hover:bg-black/10 w-[40px] h-[40px] flex justify-center items-center border mr-[5px]'>-</div>
                        <div className='w-[40px] h-[40px] flex justify-center items-center border mr-[5px]'>{quantity}</div>
                        <div onClick={handleIncreaseQuantity} className='hover:cursor-pointer hover:bg-black/10 w-[40px] h-[40px] flex justify-center items-center border mr-[5px]'>+</div>
                    </div>

                    <hr />

                    <div className='flex items-center gap-[15px]'>
                        <button className='w-[150px] h-[40px] border border-green-600 rounded-[20px] bg-green-600 text-white uppercase flex justify-center items-center'>mua ngay</button>
                        <button className='w-[40px] h-[40px] border border-gray-300 rounded-full flex justify-center items-center'>
                            <FaSearch className='text-gray-600' />
                        </button>
                        <button className='w-[40px] h-[40px] border border-gray-300 rounded-full flex justify-center items-center'>
                            <FaHeart className='text-gray-600' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
