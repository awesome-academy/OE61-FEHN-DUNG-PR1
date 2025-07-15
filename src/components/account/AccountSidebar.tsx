"use client"

import React, { useState, useEffect } from 'react'
import { FaUser } from "react-icons/fa";
import { GrSecure } from "react-icons/gr";
import { RiBillLine } from "react-icons/ri";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropupCircle } from "react-icons/io";

interface AccountSidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const AccountSidebar = ({ activeTab, setActiveTab }: AccountSidebarProps) => {

    const [openDropMenu, setOpenDropMenu] = useState(true);



    return (
        <div className='w-full md:w-[250px] h-full border-b md:border-r md:border-b-0 border-gray-300 p-[20px] flex flex-col gap-[30px]'>
            <div className='flex justify-between items-center'>
                <h2 className='text-[20px] font-semibold'>Quản lý tài khoản</h2>
                {
                    openDropMenu ? (
                        <>
                            <IoIosArrowDropupCircle onClick={() => setOpenDropMenu(!openDropMenu)} className='md:hidden text-[26px] text-green-600 hover:cursor-pointer hover:text-green-600/70' />
                        </>
                    ) : (
                        <>
                            <IoIosArrowDropdownCircle onClick={() => setOpenDropMenu(!openDropMenu)} className='md:hidden text-[26px] text-green-600 hover:cursor-pointer hover:text-green-600/70' />
                        </>
                    )
                }
            </div>
            <div className={`${openDropMenu ? 'max-h-[300px] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95'} overflow-hidden transition-all duration-300 ease-in-out`}>
                <button onClick={() => setActiveTab("personal")} className={`${activeTab === "personal" ? 'bg-gray-100 border rounded-[10px] text-black' : 'text-gray-500'} flex justify-start items-center hover:bg-gray-200 hover:border hover:rounded-[10px] hover:cursor-pointer p-[10px] gap-2 w-full`}>
                    <FaUser className={`${activeTab === "personal" ? 'text-black' : 'text-gray-500'}`} />
                    <p>Thông tin cá nhân</p>
                </button>
                <button onClick={() => setActiveTab("auth")} className={`${activeTab === "auth" ? 'bg-gray-100 border rounded-[10px] text-black' : 'text-gray-500'} flex justify-start items-center hover:bg-gray-200 hover:border hover:rounded-[10px] hover:cursor-pointer p-[10px] gap-2 w-full`}>
                    <GrSecure className={`${activeTab === "auth" ? 'text-black' : 'text-gray-500'}`} />
                    <p>Emails & Mật khẩu</p>
                </button>
                <button onClick={() => setActiveTab("orders")} className={`${activeTab === "orders" ? 'bg-gray-100 border rounded-[10px] text-black' : 'text-gray-500'} flex justify-start items-center hover:bg-gray-200 hover:border hover:rounded-[10px] hover:cursor-pointer p-[10px] gap-2 w-full`}>
                    <RiBillLine className={`${activeTab === "orders" ? 'text-black' : 'text-gray-500'}`} />
                    <p>Lịch sử mua hàng</p>
                </button>
            </div>
        </div>
    )
}

export default AccountSidebar
