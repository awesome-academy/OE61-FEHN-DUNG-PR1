"use client"

import React, { useState, useEffect } from 'react'
import { FaRegCalendarMinus } from "react-icons/fa";
import { LuClock9 } from "react-icons/lu";
import { FaRegCommentDots } from "react-icons/fa";
import { comments as mockComments, users as mockUsers } from '@/data/sampleData';
import { Blog, Comment } from '@/type';

interface BlogCommentProps {
    selectedBlog: Blog;
}

const BlogComment = ({ selectedBlog }: BlogCommentProps) => {

    const commentCount = mockComments.filter(comment => comment.blogId === selectedBlog.id).length;
    const [comments, setComments] = useState<any>([]);

    const handleFetchBlogComment = () => {
        const findComments = mockComments.filter((comment: Comment) => comment.blogId === selectedBlog.id);

        const commentsWithUserInfo = findComments.map((comment: Comment) => {
            const user = mockUsers.find((user) => user.id === comment.userId);
            return {
                ...comment,
                userName: user?.name,
                userAvatar: user?.images
            }
        })

        setComments(commentsWithUserInfo);
    }

    useEffect(() => {
        if (selectedBlog) {
            handleFetchBlogComment();
        }
    }, [selectedBlog])

    console.log(comments)


    return (
        <div className='flex flex-col gap-[30px]'>
            <h3 className='uppercase text-gray-500 font-semibold'>bình luận ({commentCount})</h3>
            <div className='flex flex-col gap-[20px]'>
                {comments.map((comment: any, index: any) => (
                    <div key={comment.id} className='flex flex-col gap-[20px]'>
                        <div className={`flex w-full items-center gap-[10px] md:gap-[20px] ${index % 2 === 0 ? 'justify-between' : 'justify-end'}`}>
                            <div className='flex items-center gap-[10px] md:gap-[20px]'>
                                <img src={comment.userAvatar} alt="avatar" className='w-[80px] h-[80px] rounded-full object-cover' />
                                <div className='flex flex-col gap-[10px]'>
                                    <h5 className='text-[14px] font-semibold'>{comment.userName}</h5>
                                    <p className='text-[14px] text-gray-500'>{comment.content}</p>
                                    <p className='text-[14px] text-gray-500'>{comment.date}</p>
                                </div>
                            </div>
                            <p className='text-[14px] underline hover:cursor-pointer hover:font-semibold'>Trả lời</p>
                        </div>
                        <hr />
                    </div>
                ))}
            </div>
            <h3 className='uppercase text-gray-500 font-semibold'>viết bình luận</h3>
            <div className='flex flex-col gap-5'>
                <div className='flex flex-col md:flex-row md:justify-between items-center gap-5 md:gap-0'>
                    <input type="text" placeholder='Họ và tên: ' className='border border-gray-400 p-3 text-[14px] w-full md:w-[240px]' />
                    <input type="email" placeholder='Email: ' className='border border-gray-400 p-3 text-[14px] w-full md:w-[240px]' />
                    <input type="text" placeholder='Phone: ' className='border border-gray-400 p-3 text-[14px] w-full md:w-[240px]' />
                </div>
                <textarea id="" placeholder='Bình luận' className='border border-gray-400 p-3 text-[14px] h-[200px]'></textarea>
                <div className='w-full flex justify-end'>
                    <div className='w-[150px] h-[50px] mb-[20px] flex justify-center items-center gap-[20px] bg-green-600 text-white rounded-[20px] hover:cursor-pointer hover:opacity-75'>Gửi</div>
                </div>
            </div>
        </div>
    )
}

export default BlogComment
