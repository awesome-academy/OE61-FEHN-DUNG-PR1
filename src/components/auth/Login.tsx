"use client"

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Login = () => {

    const router = useRouter()

    return (
        <div className='container'>
            <div className='px-2 md:px-0'>
                <div className='mt-[20px] mb-[50px]'>
                    <span className='mr-[5px] text-gray-400'>Home / </span>
                    <span className='text-green-600'>Đăng nhập</span>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-[50px]'>
                    <div className='grid-cols-1 '>
                        <h3 className='text-green-600 uppercase font-bold text-[20px] mb-[30px]'>Thông tin cá nhân</h3>
                        <form className='flex flex-col gap-[20px] '>
                            <div className='flex flex-col gap-[5px] mb-[10px]'>
                                <label htmlFor="Email" className='text-gray-400 text-[13px]'>Email của bạn</label>
                                <input type="email" className='w-full border border-gray-300 p-2' />
                            </div>
                            <div className='flex flex-col gap-[5px] mb-[10px]'>
                                <label htmlFor="Email" className='text-gray-400 text-[13px]'>Mật khẩu</label>
                                <input type="password" className='w-full border border-gray-300 p-2' />
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
