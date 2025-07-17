"use client"

import React, { useState, useEffect, useRef } from 'react'
import { FaSearch, FaPhoneAlt } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from "@/redux/store";
import { carts, products } from '@/data/sampleData';
import { setCartStart, setCartSuccess } from '@/redux/cart/cartSlice';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Product } from '@/type';

const Header = () => {

    const router = useRouter();
    const dispatch = useDispatch();

    const { cartCount, isLoaded } = useSelector((state: RootState) => state.cart);
    const { currentUser } = useSelector((state: RootState) => state.user);

    const handleGetUserCart = () => {
        const findCart = carts.find((cart) => cart.userId === currentUser?.id);

        if (!findCart) {
            toast.error("Người dùng này chưa có giỏ hàng")
            return;
        }

        try {
            dispatch(setCartSuccess({ products: findCart.products }))
        } catch (error: any) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (currentUser && !isLoaded) {
            handleGetUserCart();
        }
    }, [currentUser])

    const [keyWord, setKeyWord] = useState("");
    const [searchResults, setSearchResults] = useState<any>([]);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: any) => {
        setKeyWord(e.target.value);
    }

    const handleSearchProducts = () => {
        if (!keyWord.trim()) {
            setSearchResults([]);
            return;
        }
        const debounceTimer = setTimeout(() => {
            const regex = new RegExp(keyWord.trim(), 'i');

            const results = products.filter((product: Product) => regex.test(product.name));

            setSearchResults(results);
        }, 300);
        return () => clearTimeout(debounceTimer);
    }

    useEffect(() => {
        handleSearchProducts();
    }, [keyWord])

    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
                setSearchResults([]);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount)
    }

    return (
        <section
            className="w-full h-[300px] bg-center"
            style={{ backgroundImage: "url('/images/background_image.png')" }}
        >
            <div className='container h-full flex justify-between items-center'>
                <Image src="/images/header_image.png" alt="header image" width={500} height={300} className='object-contain hidden md:block' />
                <Image src="/images/header_image2.png" alt="header image" width={500} height={300} className='object-contain md:hidden' />
                <div className='hidden md:flex justify-center items-center gap-5'>
                    <div ref={searchContainerRef} className='relative flex flex-col justify-center items-center gap-2'>
                        <div className='flex justify-center items-center gap-2 text-gray-500 text-[14px]'>
                            <FaPhoneAlt className='text-gray-400 text-[14px]' />
                            <span>HỖ TRỢ : (04) 6674 2332 - (04) 3786 8904</span>
                        </div>
                        <div className='bg-white rounded-[20px] py-3 px-6 h-[40px] flex justify-between items-center gap-2 w-[350px]'>
                            <input onChange={handleChange} type="text" placeholder='Tìm kiếm ...' className='border-r border-gray-300 w-[270px]' />
                            <button>
                                <FaSearch className='text-gray-400 text-[14px]' />
                            </button>
                        </div>
                        {
                            searchResults.length > 0 && (
                                <div className='absolute top-full mt-2 w-[350px] max-h-[300px] overflow-y-scroll bg-white rounded-md shadow-lg z-100'>
                                    {
                                        searchResults.map((product: Product) => (
                                            <Link
                                                href={`/product/${product.id}`}
                                                key={product.id}
                                                className='flex items-center gap-4 p-3 hover:bg-gray-100'
                                                onClick={() => setSearchResults([])}
                                            >
                                                <div className='flex w-full justify-between items-center'>
                                                    <p className='font-semibold text-gray-800'>{product.name}</p>
                                                    <p className='text-red-500 text-sm'>{formatCurrency(product.price)}</p>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                    {
                        currentUser && (
                            <div onClick={() => router.push("/cart")} className='flex justify-center items-center gap-2 hover:cursor-pointer'>
                                <FaBasketShopping className='text-[16px]' />
                                <span className='text-[16px]'> {cartCount} Sản phẩm</span>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default Header
