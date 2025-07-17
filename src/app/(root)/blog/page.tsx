"use client"

import React, { useState, useMemo, useEffect } from 'react'
import Layout from '@/components/Layout'
import { useRouter } from 'next/navigation'
import BlogSidebar from '@/components/blogs/BlogSidebar'
import ListBlogs from '@/components/blogs/ListBlogs'
import { blogs as allBlogs } from '@/data/sampleData';
import Pagination from '@/components/products/Pagination'
import BlogDetail from '@/components/blogs/BlogDetail'
import { Blog } from '@/type'
import BlogComment from '@/components/blogs/BlogComment'

const BlogPage = () => {

    const router = useRouter();

    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedTag, setSelectedTag] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

    const filteredBlogs = useMemo(() => {
        return allBlogs.filter((blog) => {
            if (selectedCategory && !blog.categories.includes(selectedCategory)) return false;
            if (selectedTag && !blog.tags.includes(selectedTag)) return false;
            return true;
        })
    }, [selectedCategory, selectedTag])

    const totalBlogs = filteredBlogs.length;
    const totalPages = Math.ceil(totalBlogs / 3);
    const currentBlogs = filteredBlogs.slice(3 * (currentPage - 1), 3 * currentPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, selectedTag])

    const handleSelectBlog = (blogId: number) => {
        const findBlog = allBlogs.find((blog: Blog) => blog.id === blogId);
        setSelectedBlog(findBlog || null);
    }

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 600);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Layout>
            <div className='container'>
                <div className='flex flex-col mt-[20px] gap-[20px] px-2 md:px-0 md:gap-[50px] mb-[20px] md:mb-[50px]'>
                    <div className='mt-[20px]'>
                        <span onClick={() => router.push("/")} className='mr-[5px] text-gray-400 hover:font-semibold hover:cursor-pointer'>Home / </span>
                        <span className='text-green-600 hover:font-semibold hover:cursor-pointer'>Tin tức</span>
                    </div>
                    {isMobile && selectedBlog ? (
                        <div className='flex flex-col gap-[20px]'>
                            <BlogDetail setSelectedCategory={setSelectedCategory} selectedBlog={selectedBlog} onBack={() => setSelectedBlog(null)} />
                            <BlogComment selectedBlog={selectedBlog} />
                        </div>
                    ) : (
                        <div className='flex flex-col gap-[20px]'>
                            <div className='grid grid-cols-1 md:grid-cols-6 gap-1 md:gap-10'>
                                <div className={`col-span-1 md:col-span-2 ${isMobile && selectedBlog ? 'hidden' : ''}`}>
                                    <BlogSidebar
                                        selectedCategory={selectedCategory}
                                        setSelectedCategory={setSelectedCategory}
                                        selectedTag={selectedTag}
                                        setSelectedTag={setSelectedTag}
                                        setSelectedBlog={setSelectedBlog}
                                    />
                                </div>
                                <hr className='md:hidden my-[20px]' />
                                <div className={`col-span-1 md:col-span-4`}>
                                    {selectedBlog ? (
                                        <div className='flex flex-col gap-[20px] md:gap-[50px]'>
                                            <BlogDetail setSelectedCategory={setSelectedCategory} selectedBlog={selectedBlog} onBack={() => setSelectedBlog(null)} />
                                            <BlogComment selectedBlog={selectedBlog} />
                                        </div>
                                    ) : (
                                        <ListBlogs blogs={currentBlogs} handleSelectBlog={handleSelectBlog} />
                                    )}
                                </div>
                            </div>
                            {!selectedBlog && (
                                <Pagination
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    totalPages={totalPages}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default BlogPage
