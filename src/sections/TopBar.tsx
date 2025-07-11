"use client"

import React from 'react'
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaVimeoV } from "react-icons/fa";
import { FaTumblr } from "react-icons/fa";
import { LuClock9 } from "react-icons/lu";
import { FaUser } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/redux/store";
import { signOutSuccess } from '@/redux/user/userSlice';
import toast from 'react-hot-toast';
import { clearCart } from '@/redux/cart/cartSlice';

const TopBar = () => {

    const router = useRouter();
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state: RootState) => state.user);

    const handleLogout = (e: any) => {
        e.preventDefault();
        dispatch(signOutSuccess());
        dispatch(clearCart());
        toast.success("Đăng xuất thành công")
        router.push("/login")
    }

    return (
        <section className='hidden md:block w-full bg-[#4F4F4F]'>
            <div className='container h-[40px] text-white text-sm  flex justify-between items-center'>
                <div className='flex justify-center items-center gap-2'>
                    <LuClock9 />
                    <span className='mr-[20px]'>Open time: 8:00 - 18:00 Monday - Sunday</span>

                    <div className='flex justify-center items-center'>
                        <a href="#" target="_blank" rel="noopener noreferrer" className='text-[16px] px-5 h-[40px] flex justify-center items-center border-l border-r border-gray-500 text-white hover:text-gray-400'>
                            <FaFacebookF />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className='text-[16px] px-5 h-[40px] flex justify-center items-center border-r border-gray-500 text-white hover:text-gray-400'>
                            <FaTwitter />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className='text-[16px] px-5 h-[40px] flex justify-center items-center border-r border-gray-500 text-white hover:text-gray-400'>
                            <FaTumblr />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className='text-[16px] px-5 h-[40px] flex justify-center items-center border-r border-gray-500 text-white hover:text-gray-400'>
                            <FaVimeoV />
                        </a>
                    </div>
                </div>

                {
                    currentUser ? (
                        <div className='flex justify-center items-center text-gray-400'>
                            <button onClick={() => router.push('/account')} className='flex justify-center items-center gap-1 border-l border-r border-gray-500 w-[100px] h-[40px] hover:cursor-pointer hover:text-white'>
                                <IoMdSettings className='text-[12px]' />
                                <span >Tài khoản</span>
                            </button>
                            <button onClick={handleLogout} className='flex justify-center items-center gap-1 border-r border-gray-500 w-[100px] h-[40px] hover:cursor-pointer hover:text-white'>
                                <IoMdLogOut className='text-[14px]' />
                                <span>Đăng xuất</span>
                            </button>
                        </div>
                    ) : (
                        <div className='flex justify-center items-center text-gray-400'>
                            <button onClick={() => router.push('/login')} className='flex justify-center items-center gap-1 border-l border-r border-gray-500 w-[100px] h-[40px] hover:cursor-pointer hover:text-white'>
                                <FaUser className='text-[12px]' />
                                <span >Đăng nhập</span>
                            </button>
                            <button onClick={() => router.push('/signup')} className='flex justify-center items-center gap-1 border-r border-gray-500 w-[100px] h-[40px] hover:cursor-pointer hover:text-white'>
                                <FaUserPlus className='text-[14px]' />
                                <span>Đăng ký</span>
                            </button>
                        </div>
                    )
                }


            </div>
        </section>
    )
}

export default TopBar
