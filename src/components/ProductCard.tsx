"use client"

import React from 'react'
import { CartItem, Product } from '@/type'
import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/cart/cartSlice';
import toast from 'react-hot-toast';
import { RootState } from '@/redux/store';


interface ProductProps {
    product: Product;
}

const ProductCard = ({ product }: ProductProps) => {
    const rounded = Math.round(product.rating);
    const router = useRouter();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: RootState) => state.user);

    const handleAddToCart = (e: React.MouseEvent, product: Product) => {
        e.stopPropagation();
        if (!currentUser) {
            toast("Vui lòng đăng nhập trước khi mua hàng");
            router.push("/login");
            return;
        }

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
        <div onClick={() => router.push(`/product/${product.id}`)} className='relative border group overflow-hidden'>
            {product.isNew || product.discount > 0 ? (
                <div className="absolute top-5 left-5 w-10 h-10 flex justify-center items-center rounded-full text-white font-semibold text-sm z-20">
                    {product.isNew ? (
                        <div className="bg-[#84bb8a] w-full h-full flex justify-center items-center rounded-full bg-opacity-90">
                            New
                        </div>
                    ) : (
                        <div className="bg-[#c74040] w-full h-full flex justify-center items-center rounded-full bg-opacity-90">
                            -{product.discount}%
                        </div>
                    )}
                </div>
            ) : null}
            {/* Image section */}
            <div className='relative w-full aspect-square flex items-center justify-center'>
                <img
                    src={product.images[0]}
                    alt="image"
                    className='w-full h-full object-cover transition-transform duration-300'
                />
                {/* Hover overlay */}
                <div className="
                    absolute inset-0
                    bg-black/30
                    flex items-center justify-center gap-3
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                    z-10
                ">
                    <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="bg-[#84bb8a] text-white w-[120px] px-5 py-2 rounded-xl text-sm hover:bg-green-600 hover:cursor-pointer transition"
                    >
                        MUA NGAY
                    </button>
                    <div
                        onClick={() => router.push(`/product/${product.id}`)}
                        className="bg-white w-10 h-10 rounded-full flex justify-center items-center shadow-md cursor-pointer hover:bg-gray-200 transition"
                    >
                        <FaSearch />
                    </div>
                </div>
            </div>
            {/* Info section */}
            <div className='flex flex-col items-center gap-3 py-3 bg-white'>
                <span>{product.name}</span>
                <div className='flex justify-center items-center gap-[5px]'>
                    {[...Array(5)].map((_, i) =>
                        i < rounded ? (
                            <FaStar key={i} className='text-yellow-500' />
                        ) : (
                            <FaStarHalfAlt key={i} className='text-yellow-500' />
                        )
                    )}
                </div>
                <div className='flex justify-center items-center gap-[10px]'>
                    <span className='text-red-500'>{formatCurrency(product.price)}</span>
                    <span className='line-through text-gray-500 text-[12px]'>{formatCurrency(product.estimatedPrice)}</span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
