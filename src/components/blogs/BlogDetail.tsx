"use client"

import React, { useState, useEffect } from 'react'
import { FaRegCalendarMinus } from "react-icons/fa";
import { LuClock9 } from "react-icons/lu";
import { FaRegCommentDots } from "react-icons/fa";
import { comments } from '@/data/sampleData';
import { Blog, Comment } from '@/type';
import { IoReturnUpBack } from "react-icons/io5";

interface BlogDetailProps {
    selectedBlog: Blog;
    onBack: () => void;
    setSelectedCategory: (categoryId: number) => void;
}

const BlogDetail = ({ selectedBlog, onBack, setSelectedCategory }: BlogDetailProps) => {

    const formatDate = (date: string) => {
        const match = date.match(/ngày (\d{1,2}), tháng (\d{1,2}), năm (\d{4})/);
        if (!match) return '';
        let [, day, month, year] = match;
        day = day.padStart(2, '0');
        month = month.padStart(2, '0');
        return `${day}/${month}/${year}`;
    };

    const commentCount = comments.filter(comment => comment.blogId === selectedBlog.id).length;

    return (
        <div className='flex flex-col gap-5'>
            <div onClick={onBack} className='w-[180px] h-[30px] mb-[20px] flex justify-center items-center gap-[20px] bg-green-600 text-white rounded-[20px] hover:cursor-pointer hover:opacity-75'>
                <IoReturnUpBack className='text-[20px]' />
                <p className='text-[18px]'>Quay lại</p>
            </div>
            <h4 className='font-semibold text-[20px]'>{selectedBlog.title}</h4>
            <div className='flex items-center gap-3'>
                <div className='flex items-center gap-2'>
                    <FaRegCalendarMinus className='text-green-600 text-[13px]' />
                    <span className='text-[14px] text-gray-400'>{formatDate(selectedBlog.date)}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <LuClock9 className='text-green-600 text-[13px]' />
                    <span className='text-[14px] text-gray-400'>{selectedBlog.created_at}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <FaRegCommentDots className='text-green-600 text-[13px]' />
                    <span className='text-[14px] text-gray-400'>{commentCount}</span>
                </div>
            </div>
            <img src={selectedBlog.images[0]} alt="image" className='w-full h-full object-cover' />
            <p className='text-[14px] text-gray-500'>{selectedBlog.description}</p>
            <p className='text-[14px] text-gray-500'>{selectedBlog.contents}</p>
        </div>
    )
}

export default BlogDetail
