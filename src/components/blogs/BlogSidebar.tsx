"use client"

import React, { useState, useEffect } from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { blogs, categories, tags } from '@/data/sampleData';
import { Blog, Tag } from '@/type';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropupCircle } from "react-icons/io";

interface BlogSidebarProps {
    selectedCategory: number;
    setSelectedCategory: (category: number) => void;
    selectedTag: number;
    setSelectedTag: (tag: number) => void;
    setSelectedBlog: (blog: Blog | null) => void;
}

const BlogSidebar = ({ selectedCategory, setSelectedCategory, selectedTag, setSelectedTag, setSelectedBlog }: BlogSidebarProps) => {

    const getCategoryCounts = (categories: any, blogs: any) => {
        const counts: Record<number, number> = {};
        categories.forEach((c: any) => {
            counts[c.id] = 0;
        })
        blogs.forEach((blog: any) => {
            blog.categories.forEach((blogId: any) => {
                if (counts[blogId] !== undefined) {
                    counts[blogId]++;
                }
            })
        })
        return counts;
    }

    const categoryCounts = getCategoryCounts(categories, blogs);

    const [openDropMenuCategory, setOpenDropMenuCategory] = useState(true);
    const [openDropMenuHot, setOpenDropMenuHot] = useState(true);
    const [openDropMenuTag, setOpenDropMenuTag] = useState(true);

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
            setOpenDropMenuHot(true);
            setOpenDropMenuTag(true);
        }
    }, [isMobile])

    const handleSelectCategory = (id: number) => {
        setSelectedCategory(id);
        setSelectedBlog(null);
    }

    const handleSelectTag = (id: number) => {
        setSelectedTag(id);
        setSelectedBlog(null);
    }

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
                            <div onClick={() => handleSelectCategory(category.id)} key={category.id} className='flex flex-col gap-2 hover:cursor-pointer hover:font-semibold'>
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
                        <h2 className='text-green-600 font-semibold'>Tin tức nổi bật</h2>
                        {
                            openDropMenuHot ? (
                                <>
                                    <IoIosArrowDropupCircle onClick={() => setOpenDropMenuHot(!openDropMenuHot)} className='md:hidden text-[26px] text-green-600 hover:cursor-pointer hover:text-green-600/70' />
                                </>
                            ) : (
                                <>
                                    <IoIosArrowDropdownCircle onClick={() => setOpenDropMenuHot(!openDropMenuHot)} className='md:hidden text-[26px] text-green-600 hover:cursor-pointer hover:text-green-600/70' />
                                </>
                            )
                        }
                    </div>
                    <div className='absolute w-[110px] border border-green-600 bottom-[-2px]'></div>
                </div>
                <div className={`flex flex-col gap-3 ${openDropMenuHot ? 'max-h-[800px] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95'} overflow-hidden transition-all duration-300 ease-in-out`}>
                    {
                        blogs.map((blog: Blog) => (
                            <div onClick={() => setSelectedBlog(blog)} key={blog.id} className='group flex w-full h-[80px] gap-2 hover:cursor-pointer'>
                                <img
                                    src={blog.images[0]}
                                    alt="image"
                                    className='w-[80px] h-[80px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-105'
                                />
                                <p className='text-[13px] group-hover:font-semibold'>{blog.title}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='relative w-full pb-[10px] border-b flex justify-between items-center'>
                    <div className='flex w-full justify-between items-center'>
                        <h2 className='text-green-600 font-semibold'>Blog tag</h2>
                        {
                            openDropMenuTag ? (
                                <>
                                    <IoIosArrowDropupCircle onClick={() => setOpenDropMenuTag(!openDropMenuTag)} className='md:hidden text-[26px] text-green-600 hover:cursor-pointer hover:text-green-600/70' />
                                </>
                            ) : (
                                <>
                                    <IoIosArrowDropdownCircle onClick={() => setOpenDropMenuTag(!openDropMenuTag)} className='md:hidden text-[26px] text-green-600 hover:cursor-pointer hover:text-green-600/70' />
                                </>
                            )
                        }
                    </div>
                    <div className='absolute w-[70px] border border-green-600 bottom-[-2px]'></div>
                </div>
                <div className={`flex flex-wrap gap-3 ${openDropMenuTag ? 'max-h-[500px] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95'} overflow-hidden transition-all duration-300 ease-in-out`}>
                    {
                        tags.map((tag: Tag) => (
                            <div onClick={() => handleSelectTag(tag.id)} key={tag.id} className={`h-[40px] py-2 px-3 text-[13px] border inline-flex justify-center items-center hover:cursor-pointer hover:font-semibold ${selectedTag === tag.id ? 'bg-green-600 text-white border-green-600 hover:opacity-75' : 'bg-white text-gray-400 border-gray-400 hover:bg-gray-50'}`}>
                                {tag.name}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default BlogSidebar
