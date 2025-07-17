"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link';
import { TiThMenu } from "react-icons/ti";
import { IoMdArrowDropdown, IoMdClose } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { FaSearch, FaPhoneAlt } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { categories, products } from '@/data/sampleData';
import { Product } from '@/type';

const Navbar = () => {

    const navItems = [
        {
            name: 'TRANG CHỦ',
            url: '/',
            icons: ''
        },
        {
            name: 'GIỚI THIỆU',
            url: '/about',
            icons: ''
        },
        {
            name: 'SẢN PHẨM',
            url: '/products',
            icons: IoMdArrowDropdown,
            ename: 'products'
        },
        {
            name: 'SẢN PHẨM MỚI ',
            url: '/new_products',
            icons: IoMdArrowDropdown
        },
        {
            name: 'TIN TỨC',
            url: '/blog',
            icons: ''
        },
        {
            name: 'LIÊN HỆ',
            url: '/contact',
            icons: ''
        },
    ]

    const router = useRouter();

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchPanelOpen, setSearchPanelOpen] = useState(false);

    const openMainMenu = () => {
        setIsMobileMenuOpen(true);
        setSearchPanelOpen(false);
    };

    const openSearchPanel = () => {
        setSearchPanelOpen(true);
        setIsMobileMenuOpen(false);
    };

    const closeAllPanels = () => {
        setIsMobileMenuOpen(false);
        setSearchPanelOpen(false);
    };

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
    }, []);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount)
    }

    return (
        <section className='w-full h-[60px] bg-green-600 z-50 sticky top-0 shadow-md'>
            <div className='container h-[60px] '>
                <div className='text-white h-full flex justify-between md:justify-start items-center px-2 md:px-0'>
                    <TiThMenu
                        onClick={openMainMenu}
                        className='text-[20px] md:text-[24px] md:mr-[20px] hover:cursor-pointer hover:text-gray-400'
                    />
                    <div className='hidden md:flex'>
                        {navItems.map((item, index) => (
                            item.ename === 'products' ? (
                                <div
                                    key={index}
                                    className='relative'
                                    onMouseEnter={() => setDropdownOpen(true)}
                                    onMouseLeave={() => setDropdownOpen(false)}
                                >
                                    <button onClick={() => router.push(item.url)} className='w-[160px] h-[60px] p-2 hover:bg-gray-500/30 hover:cursor-pointer flex justify-center items-center gap-2'>
                                        {item.name}
                                        {item.icons && <item.icons className='text-[20px]' />}
                                    </button>

                                    <div className={`absolute top-full left-0 w-[160px] bg-white text-black rounded-b-md shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isDropdownOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95 pointer-events-none'}`}>
                                        {categories.map((category) => (
                                            <Link
                                                key={category.id}
                                                href={`/products?category=${category.id}`}
                                                className='block px-4 py-3 text-sm hover:bg-gray-100 hover:cursor-pointer'
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                {category.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <button key={index} onClick={() => router.push(item.url)} className='w-[160px] h-[60px] p-2 hover:bg-gray-500/30 hover:cursor-pointer flex justify-center items-center gap-2'>
                                    {item.name}
                                    {item.icons && <item.icons className='text-[20px]' />}
                                </button>
                            )
                        ))}
                    </div>
                    <div className='flex md:hidden justify-center items-center gap-5 text-white '>
                        <FaSearch onClick={openSearchPanel} className='text-[20px] hover:cursor-pointer hover:text-gray-400' />
                        <FaBasketShopping onClick={() => router.push("/cart")} className='text-[20px] hover:cursor-pointer hover:text-gray-400' />
                    </div>
                </div>
            </div>
            {(isMobileMenuOpen || isSearchPanelOpen) && (
                <div
                    onClick={closeAllPanels}
                    className="fixed inset-0 bg-black/50 z-40"
                />
            )}
            <div className={`fixed top-0 left-0 w-[80%] max-w-[300px] h-full bg-white text-gray-500 p-5 z-50 shadow-lg transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <h2 className='text-2xl font-bold mb-8'>Menu</h2>
                <div className='flex flex-col gap-4'>
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.url}
                            className='text-lg p-2 rounded hover:bg-green-600 hover:text-white'
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>

            <div ref={searchContainerRef} className={`fixed top-0 right-0 w-[80%] max-w-[400px] h-full bg-white p-5 z-50 shadow-lg transition-transform duration-300 ease-in-out ${isSearchPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-2xl font-bold text-gray-700'>Tìm kiếm</h2>
                    <IoMdClose onClick={closeAllPanels} className='text-3xl text-gray-500 hover:text-red-500 cursor-pointer' />
                </div>

                {/* Thanh tìm kiếm */}
                <div className='relative'>
                    <input
                        type="text"
                        value={keyWord}
                        onChange={handleChange}
                        placeholder='Nhập tên sản phẩm...'
                        className='w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500'
                        autoFocus
                    />
                    <FaSearch className='absolute top-1/2 right-4 -translate-y-1/2 text-gray-400' />
                </div>

                {/* Kết quả tìm kiếm */}
                <div className='mt-4 h-[550px] overflow-y-scroll'>
                    {searchResults.length > 0 ? (
                        searchResults.map((product: Product) => (
                            <Link href={`/product/${product.id}`} key={product.id} className='flex justify-between items-center gap-3 p-2 my-1 hover:bg-gray-100 rounded-md' onClick={closeAllPanels}>
                                <p className='font-semibold text-gray-800 text-sm'>{product.name}</p>
                                <p className='text-red-600 text-xs'>{formatCurrency(product.price)}</p>
                            </Link>
                        ))
                    ) : (
                        keyWord && <p className='text-center text-gray-500 mt-8'>Không tìm thấy sản phẩm nào.</p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Navbar
