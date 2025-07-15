"use client"

import React, { useState, useEffect } from 'react'
import { PiGridNineFill } from "react-icons/pi";
import { FaThList } from "react-icons/fa";
import ProductGrid from './ProductGrid';
import ProductList from './ProductList';
import UnavailableProduct from './UnavailableProduct';

const sortOptions = [
    { value: "name", label: "Tên sản phẩm" },
    { value: "priceLowHigh", label: "Giá: thấp đến cao" },
    { value: "priceHighLow", label: "Giá: cao đến thấp" },
];

const showOptions = [5, 10, 15];

interface ProductsDisplayProps {
    products: any[];
    selectedType: string;
    setSelectedType: (type: string) => void;
    sortValue: string;
    setSortValue: (v: string) => void;
    showValue: number;
    setShowValue: (v: number) => void;
}

const ProductsDisplay = ({
    products,
    selectedType,
    setSelectedType,
    sortValue,
    setSortValue,
    showValue,
    setShowValue,
}: ProductsDisplayProps) => {

    return (
        <div className='flex flex-col gap-5'>
            <img src="/images/banner.png" alt="slide image" className='hidden md:block w-full h-full object-cover' />
            <div className='hidden md:flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <PiGridNineFill onClick={() => setSelectedType("grid")} className={`text-[22px] hover:cursor-pointer ${selectedType === "grid" ? 'text-green-600' : 'text-gray-500'}`} />
                    <FaThList onClick={() => setSelectedType("list")} className={`text-[16px] hover:cursor-pointer ${selectedType === "list" ? 'text-green-600' : 'text-gray-500'}`} />
                </div>
                <div className='flex items-center gap-3'>
                    <p>Sắp xếp theo</p>
                    <select
                        className='border rounded p-2 text-[14px] text-gray-500 outline-none'
                        value={sortValue}
                        onChange={(e) => setSortValue(e.target.value)}
                    >
                        {sortOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <p>Show</p>
                    <select
                        className='border rounded p-2 text-[14px] text-gray-500 outline-none'
                        value={showValue}
                        onChange={(e) => setShowValue(Number(e.target.value))}
                    >
                        {showOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            </div>
            {products.length === 0 ? (
                <UnavailableProduct />
            ) : selectedType === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {products.map((product) => (
                        <div key={product.id}>
                            <ProductGrid product={product} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-5">
                    {products.map((product) => (
                        <div key={product.id}>
                            <ProductList product={product} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProductsDisplay
