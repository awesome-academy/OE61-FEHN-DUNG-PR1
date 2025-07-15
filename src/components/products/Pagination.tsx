"use client"

import React, { useState, useEffect } from 'react'

interface PaginationProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
}

const Pagination = ({ currentPage, setCurrentPage, totalPages }: PaginationProps) => {

    if (totalPages <= 1) return null;

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);

    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);

    return (
        <div className="flex justify-end items-center gap-2 mt-4">
            <button
                className="border w-[120px] h-[50px] p-2 flex justify-center items-center hover:bg-gray-50"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
            >
                Trang trước
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    className={`border w-[50px] h-[50px] p-2 flex justify-center items-center ${page === currentPage ? "bg-green-600 text-white hover:opacity-75" : "hover:bg-gray-50"
                        }`}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </button>
            ))}
            <button
                className="border w-[120px] h-[50px] p-2 flex justify-center items-center hover:bg-gray-50"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
            >
                Trang cuối
            </button>
        </div>
    );
}

export default Pagination
