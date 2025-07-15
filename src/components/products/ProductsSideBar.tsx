"use client"

import React, { useState, useEffect } from 'react'
import { categories, products, colors } from '@/data/sampleData'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropupCircle } from "react-icons/io";

type PriceRange = { id: number; label: string; min: number; max: number };

const priceRanges: PriceRange[] = [
    { id: 1, label: "200.000 ₫ - 400.000 ₫", min: 200000, max: 400000 },
    { id: 2, label: "400.000 ₫ - 600.000 ₫", min: 400000, max: 600000 },
    { id: 3, label: "600.000 ₫ - 800.000 ₫", min: 600000, max: 800000 },
    { id: 4, label: "800.000 ₫ - 1.000.000 ₫", min: 800000, max: 1000000 },
    { id: 5, label: "1.000.000 ₫ - 2.000.000 ₫", min: 1000000, max: 2000000 },
];

interface ProductsSidebarProps {
    selectedCategory: number;
    selectedPriceRange: number;
    selectedColor: number;
    setSelectedCategory: (category: number) => void;
    setSelectedPriceRange: (priceRange: number) => void;
    setSelectedColor: (color: number) => void;
}

const ProductsSideBar = ({
    selectedCategory, selectedPriceRange, selectedColor, setSelectedCategory, setSelectedPriceRange, setSelectedColor
}: ProductsSidebarProps) => {

    const getCategoryCounts = (categories: any, products: any) => {
        const counts: Record<number, number> = {};
        categories.forEach((c: any) => {
            counts[c.id] = 0;
        })
        products.forEach((product: any) => {
            product.categories.forEach((catId: any) => {
                if (counts[catId] !== undefined) {
                    counts[catId]++;
                }
            })
        })
        return counts;
    }

    const categoryCounts = getCategoryCounts(categories, products);
    const [openDropMenuCategory, setOpenDropMenuCategory] = useState(true);
    const [openDropMenuPrice, setOpenDropMenuPrice] = useState(true);
    const [openDropMenuColor, setOpenDropMenuColor] = useState(true);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 600);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!isMobile) {
            setOpenDropMenuCategory(true);
            setOpenDropMenuPrice(true);
            setOpenDropMenuColor(true);
        }
    }, [isMobile]);


    return (
        <div className='flex flex-col gap-5 md:gap-10'>
            <div className='flex flex-col gap-4'>
                <div className='relative w-full pb-[10px] border-b flex justify-between items-center'>
                    <div className='flex w-full justify-between items-center'>
                        <h2 className='text-green-600 font-semibold'>Danh mục sản phẩm</h2>
                        {
                            openDropMenuCategory ? (
                                <>
                                    <IoIosArrowDropupCircle onClick={() => setOpenDropMenuCategory(!openDropMenuCategory)} className='md:hidden text-[26px] text-green-600 hover:cursor-pointer hover:text-green-600/70' />
                                </>
                            ) : (
                                <>
                                    <IoIosArrowDropdownCircle onClick={() => setOpenDropMenuCategory(!openDropMenuCategory)} className='md:hidden text-[26px] text-green-600 hover:cursor-pointer hover:text-green-600/70' />
                                </>
                            )
                        }
                    </div>
                    <div className='absolute w-[150px] border border-green-600 bottom-[-2px]'></div>
                </div>
                <div className={`flex flex-col gap-3 ${openDropMenuCategory ? 'max-h-[500px] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95'} overflow-hidden transition-all duration-300 ease-in-out`}>
                    {
                        categories.map((category) => (
                            <div onClick={() => setSelectedCategory(category.id)} key={category.id} className='flex flex-col gap-2 hover:cursor-pointer'>
                                <div className='flex items-center gap-3'>
                                    <IoIosArrowForward className={`text-[14px] ${selectedCategory === category.id ? 'text-green-600' : ' text-gray-500'}`} />
                                    <span className={`text-[14px] ${selectedCategory === category.id ? 'text-green-600 font-semibold' : ' text-gray-500'}`}>
                                        {category.name}
                                        {" "}
                                        <span className={`text-[14px] ${selectedCategory === category.id ? 'text-green-600 font-semibold' : ' text-gray-500'}`}>({categoryCounts[category.id] || 0})</span>
                                    </span>
                                </div>
                                <hr />
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='flex flex-col gap-4'>
                <div className='relative w-full pb-[10px] border-b flex justify-between items-center'>
                    <div className='flex w-full justify-between items-center'>
                        <h2 className='text-green-600 font-semibold'>Tìm theo giá</h2>
                        {
                            openDropMenuPrice ? (
                                <>
                                    <IoIosArrowDropupCircle onClick={() => setOpenDropMenuPrice(!openDropMenuPrice)} className='md:hidden text-[26px] text-green-600 hover:cursor-pointer hover:text-green-600/70' />
                                </>
                            ) : (
                                <>
                                    <IoIosArrowDropdownCircle onClick={() => setOpenDropMenuPrice(!openDropMenuPrice)} className='md:hidden text-[26px] text-green-600 hover:cursor-pointer hover:text-green-600/70' />
                                </>
                            )
                        }
                    </div>
                    <div className='absolute w-[150px] border border-green-600 bottom-[-2px]'></div>
                </div>
                <div className={`flex flex-col gap-3 ${openDropMenuPrice ? 'max-h-[500px] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95'} overflow-hidden transition-all duration-300 ease-in-out`}>
                    {
                        priceRanges.map((priceRange) => (
                            <div onClick={() => setSelectedPriceRange(priceRange.id)} key={priceRange.id} className='flex flex-col gap-2 hover:cursor-pointer'>
                                <div className='flex items-center gap-3'>
                                    <IoIosArrowForward className={`text-[14px] ${selectedPriceRange === priceRange.id ? 'text-green-600 font-semibold' : ' text-gray-500'}`} />
                                    <span className={`text-[14px] ${selectedPriceRange === priceRange.id ? 'text-green-600 font-semibold' : ' text-gray-500'}`}>
                                        {priceRange.label}
                                    </span>
                                </div>
                                <hr />
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='flex flex-col gap-4'>
                <div className='relative w-full pb-[10px] border-b flex justify-between items-center'>
                    <div className='flex w-full justify-between items-center'>
                        <h2 className='text-green-600 font-semibold'>Tìm theo màu</h2>
                        {
                            openDropMenuColor ? (
                                <>
                                    <IoIosArrowDropupCircle onClick={() => setOpenDropMenuColor(!openDropMenuColor)} className='md:hidden text-[26px] text-green-600 hover:cursor-pointer hover:text-green-600/70' />
                                </>
                            ) : (
                                <>
                                    <IoIosArrowDropdownCircle onClick={() => setOpenDropMenuColor(!openDropMenuColor)} className='md:hidden text-[26px] text-green-600 hover:cursor-pointer hover:text-green-600/70' />
                                </>
                            )
                        }
                    </div>
                    <div className='absolute w-[150px] border border-green-600 bottom-[-2px]'></div>
                </div>

                <div className={`grid grid-cols-2 gap-4 ${openDropMenuColor ? 'max-h-[500px] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95'} overflow-hidden transition-all duration-300 ease-in-out`}>
                    {
                        colors.map((color) => (
                            <div onClick={() => setSelectedColor(color.id)} key={color.id} className='hover:cursor-pointer'>
                                <div className='flex items-center gap-2'>
                                    <div className={`${color.color} w-[30px] h-[30px] rounded-full ${selectedColor === color.id ? 'border-[2px]' : ''} `}></div>
                                    <span className={`text-[14px] ${selectedColor === color.id ? 'text-green-600 font-semibold' : 'text-gray-500'}`}>{color.name}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default ProductsSideBar
