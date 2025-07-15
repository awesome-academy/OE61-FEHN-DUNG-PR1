"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/utils/checkAuthentication'
import toast from 'react-hot-toast'
import { signInSuccess, signInFailure, signInStart } from '@/redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'


const Login = () => {

    const router = useRouter();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e: any) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleLogin = (e: any) => {
        e.preventDefault();
        const { email, password } = formData;
        dispatch(signInStart());

        try {
            const result = login({ email, password });
            if (!result.success) {
                toast.error(result.message);
                dispatch(signInFailure(result.message));
            } else {
                toast.success(result.message);
                dispatch(signInSuccess(result.data));
                router.push("/");
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <div className='container'>
            <div className='px-2 md:px-0 mb-[20px] md:mb-[50px]'>
                <div className='mt-[20px] mb-[50px]'>
                    <span className='mr-[5px] text-gray-400'>Home / </span>
                    <span className='text-green-600'>Đăng nhập</span>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-[50px]'>
                    <div className='grid-cols-1 '>
                        <h3 className='text-green-600 uppercase font-bold text-[20px] mb-[30px]'>Thông tin cá nhân</h3>
                        <form onSubmit={handleLogin} className='flex flex-col gap-[20px] '>
                            <div className='flex flex-col gap-[5px] mb-[10px]'>
                                <label htmlFor="Email" className='text-gray-400 text-[13px]'>Email của bạn</label>
                                <input onChange={handleChange} required id="email" type="email" className='w-full border border-gray-300 p-2' />
                            </div>
                            <div className='flex flex-col gap-[5px] mb-[10px]'>
                                <label htmlFor="Email" className='text-gray-400 text-[13px]'>Mật khẩu</label>
                                <input onChange={handleChange} required id="password" type="password" className='w-full border border-gray-300 p-2' />
                            </div>
                            <div className='flex justify-start items-center gap-[10px]'>
                                <input type="checkbox" />
                                <span className='text-[13px]'>Ghi nhớ tài khoản</span>
                                <span className='italic underline text-[13px] text-gray-600'>Bạn quên mật khẩu</span>
                            </div>
                            <button type='submit' className='w-[200px] h-[50px] bg-green-600 hover:opacity-60 hover:cursor-pointer text-white flex justify-center items-center p-2 rounded-[20px] uppercase'>
                                đăng nhập
                            </button>
                        </form>

                    </div>
                    <div className='grid-cols-1'>
                        <h3 className='text-green-600 uppercase font-bold text-[20px] mb-[20px]'>Bạn chưa có tài khoản ?</h3>
                        <p className='text-[13px] text-gray-500 mb-[50px]'>Đăng ký tài khoản ngay để có thể mua hàng nhanh chóng và dễ dàng hơn. Ngoài ra còn có rất nhiều chính sách và ưu đãi cho các thành viên.</p>
                        <button onClick={() => router.push("/signup")} className='w-[200px] h-[50px] bg-green-600 hover:opacity-60 hover:cursor-pointer text-white flex justify-center items-center p-2 rounded-[20px] uppercase'>
                            đăng ký
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
