"use client"

import React, { useState, useMemo, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Layout from '@/components/Layout'
import ProductsSideBar from '@/components/products/ProductsSideBar'
import ProductsDisplay from '@/components/products/ProductsDisplay'
import Pagination from '@/components/products/Pagination'
import { products as allProducts } from "@/data/sampleData";

const ProductsPage = () => {
    const router = useRouter();

    const searchParams = useSearchParams();

    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedPriceRange, setSelectedPriceRange] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [sortValue, setSortValue] = useState("name");
    const [showValue, setShowValue] = useState(5);
    const [selectedType, setSelectedType] = useState("grid");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const extractCategoryFromUrl = searchParams.get("category");
        if (extractCategoryFromUrl) {
            const numericId = Number(extractCategoryFromUrl);
            if (!isNaN(numericId)) {
                setSelectedCategory(numericId);
            }
        }
    }, [searchParams])


    const filteredProducts = useMemo(() => {
        return allProducts.filter((product) => {
            // Category
            if (selectedCategory && !product.categories.includes(selectedCategory)) return false;
            // Price
            if (selectedPriceRange) {
                // Add priceRanges to ProductsPage or import from a shared file
                const priceRanges = [
                    { id: 1, min: 200000, max: 400000 },
                    { id: 2, min: 400000, max: 600000 },
                    { id: 3, min: 600000, max: 800000 },
                    { id: 4, min: 800000, max: 1000000 },
                    { id: 5, min: 1000000, max: 2000000 },
                ];
                const range = priceRanges.find((r) => r.id === selectedPriceRange);
                if (!range) return true;
                if (product.price < range.min || product.price > range.max) return false;
            }
            // Color
            if (selectedColor && (!product.colors || !product.colors.includes(selectedColor))) return false;
            return true;
        });
    }, [selectedCategory, selectedPriceRange, selectedColor]);


    const sortedProducts = useMemo(() => {
        return [...filteredProducts].sort((a, b) => {
            if (sortValue === "name") {
                return a.name.localeCompare(b.name);
            }
            if (sortValue === "priceLowHigh") {
                return a.price - b.price;
            }
            if (sortValue === "priceHighLow") {
                return b.price - a.price;
            }
            return 0;
        });
    }, [filteredProducts, sortValue]);

    const totalProducts = sortedProducts.length;
    const totalPages = Math.ceil(totalProducts / showValue);
    const currentProducts = sortedProducts.slice((showValue * (currentPage - 1)), showValue * currentPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, selectedPriceRange, selectedColor, showValue])

    return (
        <Layout>
            <div className='container'>
                <div className='flex flex-col mt-[20px] gap-[20px] px-2 md:px-0 md:gap-[50px] mb-[20px] md:mb-[50px]'>
                    <div className='mt-[20px]'>
                        <span onClick={() => router.push("/")} className='mr-[5px] text-gray-400 hover:font-semibold hover:cursor-pointer'>Home / </span>
                        <span className='text-green-600 hover:font-semibold hover:cursor-pointer'>Danh sách sản phẩm</span>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-5 gap-5'>
                        <div className='col-span-1'>
                            <ProductsSideBar
                                selectedCategory={selectedCategory}
                                selectedPriceRange={selectedPriceRange}
                                selectedColor={selectedColor}
                                setSelectedCategory={setSelectedCategory}
                                setSelectedPriceRange={setSelectedPriceRange}
                                setSelectedColor={setSelectedColor}
                            />
                        </div>

                        <hr className='md:hidden' />

                        <div className='col-span-1 md:col-span-4'>
                            <ProductsDisplay
                                products={currentProducts}
                                selectedType={selectedType}
                                setSelectedType={setSelectedType}
                                sortValue={sortValue}
                                setSortValue={setSortValue}
                                showValue={showValue}
                                setShowValue={setShowValue}
                            />
                        </div>
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default ProductsPage
