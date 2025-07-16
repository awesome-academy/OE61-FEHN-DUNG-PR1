"use client"

import React, { useState, useEffect } from 'react'
import { Blog, Comment } from '@/type';
import { FaRegCalendarMinus } from "react-icons/fa";
import { LuClock9 } from "react-icons/lu";
import { FaRegCommentDots } from "react-icons/fa";
import { comments } from '@/data/sampleData';
import UnavailableProduct from '../products/UnavailableProduct';

interface ListBlogsProps {
    blogs: Blog[];
    handleSelectBlog: (blogId: number) => void;
}

const ListBlogs = ({ blogs, handleSelectBlog }: ListBlogsProps) => {

    const formatDate = (date: string) => {
        const match = date.match(/ngày (\d{1,2}), tháng (\d{1,2}), năm (\d{4})/);
        if (!match) return '';
        let [, day, month, year] = match;
        day = day.padStart(2, '0');
        month = month.padStart(2, '0');
        return `${day}/${month}/${year}`;
    };

    const getCommentCounts = (blogs: Blog[], comments: Comment[]) => {
        const counts: Record<number, number> = {};
        blogs.forEach((blog: Blog) => {
            counts[blog.id] = 0;
        })
        comments.forEach((comment: Comment) => {
            if (counts[comment.blogId] !== undefined) {
                counts[comment.blogId]++;
            }
        })
        return counts;
    }

    const commentCounts = getCommentCounts(blogs, comments);


    return (
        <>
            {
                blogs.length === 0 ? (
                    <UnavailableProduct />
                ) : (
                    <div className='flex flex-col gap-10'>
                        {
                            blogs.map((blog: Blog) => (
                                <div onClick={() => handleSelectBlog(blog.id)} key={blog.id} className='flex flex-col gap-5 hover:cursor-pointer'>
                                    <h4 className='font-semibold'>{blog.title}</h4>
                                    <div className='flex items-center gap-3'>
                                        <div className='flex items-center gap-2'>
                                            <FaRegCalendarMinus className='text-green-600 text-[13px]' />
                                            <span className='text-[14px] text-gray-400'>{formatDate(blog.date)}</span>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <LuClock9 className='text-green-600 text-[13px]' />
                                            <span className='text-[14px] text-gray-400'>{blog.created_at}</span>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <FaRegCommentDots className='text-green-600 text-[13px]' />
                                            <span className='text-[14px] text-gray-400'>{commentCounts[blog.id]}</span>
                                        </div>
                                    </div>
                                    <img src={blog.images[0]} alt="image" className='w-full h-full object-cover' />
                                    <p className='text-[14px] text-gray-500'>{blog.description}</p>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}

export default ListBlogs
