"use client"

import React from 'react'
import { CartItem, Product } from '@/type'
import { FaStarHalfAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cart/cartSlice';
import toast from 'react-hot-toast';


interface ProductProps {
    product: Product;
}

const ProductList = ({ product }: ProductProps) => {
    const rounded = Math.round(product.rating);
    const router = useRouter();
    const dispatch = useDispatch();

    const handleAddToCart = (product: Product) => {
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            images: product.images
        }
        dispatch(addToCart(cartItem));
        toast.success("Thêm sản phẩm vào giỏ hàng thành công")
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount)
    }

    return (
        <div className='flex gap-5 md:gap-10 w-full h-[300px] border'>
            <img src={product.images[0]} alt="image" className='w-[300px] h-[300px] object-cover' />
            <div className='flex flex-col gap-3 md:gap-5 py-[10px]'>
                <h4 className='text-[20px]'>{product.name}</h4>
                <div className='flex items-center gap-[5px]'>
                    {[...Array(5)].map((_, i) =>
                        i < rounded ? (
                            <FaStar key={i} className='text-yellow-500' />
                        ) : (
                            <FaStarHalfAlt key={i} className='text-yellow-500' />
                        )
                    )}
                </div>
                <p className='text-[13px]'>{product.descriptions}</p>
                <p className='text-red-600 text-[20px]'>{formatCurrency(product.price)}</p>
                <div className='flex items-center gap-4'>
                    <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-[#84bb8a] text-white w-[150px] h-[40px] px-5 py-2 rounded-xl text-sm hover:bg-green-600 hover:cursor-pointer transition"
                    >
                        MUA NGAY
                    </button>
                    <div
                        onClick={() => router.push(`/product/${product.id}`)}
                        className="bg-white w-10 h-10 rounded-full border flex justify-center items-center shadow-md cursor-pointer hover:bg-gray-200 transition"
                    >
                        <FaSearch />
                    </div>
                    <div
                        className="bg-white w-10 h-10 rounded-full border flex justify-center items-center shadow-md cursor-pointer hover:bg-gray-200 transition"
                    >
                        <FaHeart />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductList
