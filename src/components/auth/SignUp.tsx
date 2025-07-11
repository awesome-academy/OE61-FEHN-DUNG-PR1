"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

const SignUp = () => {
    return (
        <div className='container'>

            <div className='px-2 md:px-0 mb-[20px] md:mb-[50px]'>
                <div className='mt-[20px] mb-[50px]'>
                    <span className='mr-[5px] text-gray-400'>Home / </span>
                    <span className='text-green-600'>Đăng ký</span>
                </div>

                <form className='flex flex-col gap-[20px] max-w-[1000px]'>
                    <h3 className='text-green-600 uppercase font-bold text-[20px] mb-[10px] md:mb-[30px]'>Thông tin cá nhân</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-[50px]'>
                        <div className='flex flex-col gap-[10px] col-span-1'>
                            <label className='text-gray-400 text-[13px]' htmlFor="username">Họ và tên <span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className='w-full border border-gray-300 p-2' />
                        </div>
                        <div className='flex flex-col gap-[10px] col-span-1'>
                            <label className='text-gray-400 text-[13px]' htmlFor="phone">Số ĐT <span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className='w-full border border-gray-300 p-2' />
                        </div>
                        <div className='flex flex-col gap-[10px] col-span-1'>
                            <label className='text-gray-400 text-[13px]' htmlFor="email">Địa chỉ email <span style={{ color: 'red' }}>*</span></label>
                            <input type="email" className='w-full border border-gray-300 p-2' />
                        </div>
                        <div className='flex flex-col gap-[10px] col-span-1'>
                            <label className='text-gray-400 text-[13px]' htmlFor="website">Website của bạn <span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className='w-full border border-gray-300 p-2' />
                        </div>
                        <div className='flex justify-start items-center gap-[10px]'>
                            <input type="checkbox" />
                            <span className='text-[13px] text-gray-400'>Đăng ký nhận thông tin qua email</span>
                        </div>
                    </div>
                </form>

                <form className='flex flex-col gap-[20px] max-w-[1000px] mt-[50px]'>
                    <h3 className='text-green-600 uppercase font-bold text-[20px] mb-[10px] md:mb-[30px]'>Thông tin tài khoản</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-[50px]'>
                        <div className='flex flex-col gap-[10px] col-span-1'>
                            <label className='text-gray-400 text-[13px]' htmlFor="username">Mật khẩu <span style={{ color: 'red' }}>*</span></label>
                            <input type="password" className='w-full border border-gray-300 p-2' />
                        </div>
                        <div className='flex flex-col gap-[10px] col-span-1'>
                            <label className='text-gray-400 text-[13px]' htmlFor="phone">Nhập lại mật khẩu <span style={{ color: 'red' }}>*</span></label>
                            <input type="password" className='w-full border border-gray-300 p-2' />
                        </div>
                    </div>
                </form>

                <div className='flex items-center gap-[30px] mt-[50px]'>
                    <button className='w-[160px] h-[40px] uppercase flex justify-center items-center bg-white border border-green-600 rounded-[20px] text-green-600'>quay lại</button>
                    <button className='w-[160px] h-[40px] uppercase flex justify-center items-center bg-green-600 border border-green-600 rounded-[20px] text-white'>đăng ký</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp
