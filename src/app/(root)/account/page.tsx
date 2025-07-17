"use client"

import React, { useState, useEffect } from 'react'
import Footer from '@/sections/Footer'
import TopBar from '@/sections/TopBar'
import AccountSidebar from '@/components/account/AccountSidebar'
import AuthenticationInformation from '@/components/account/AuthenticationInformation'
import ListOrders from '@/components/account/ListOrders'
import PersonalInformation from '@/components/account/PersonalInformation'
import { FaHome } from "react-icons/fa";
import { useRouter } from 'next/navigation'

const AccountPage = () => {

    const [activeTab, setActiveTab] = useState<string | null>("personal");
    const router = useRouter();

    const renderContent = () => {
        switch (activeTab) {
            case "personal":
                return <PersonalInformation />;
            case "auth":
                return <AuthenticationInformation />;
            case "orders":
                return <ListOrders />;
            default:
                return null;
        }
    };

    return (
        <div className='bg-gray-50'>
            <TopBar />
            <div className='container bg-gray-50'>
                <div className='py-[20px] md:pt-[20px] md:pb-[50px]'>
                    <div onClick={() => router.push("/")} className='w-[180px] h-[30px] mb-[20px] flex justify-center items-center gap-[20px] bg-green-600 text-white rounded-[20px] hover:cursor-pointer hover:opacity-75'>
                        <FaHome className='text-[20px]' />
                        <p className='text-[18px]'>Trang chủ</p>
                    </div>
                    <div className='flex flex-col md:flex-row h-full md:h-[700px] shadow-md border bg-white rounded-[20px] justify-start '>
                        <AccountSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                        <div className="flex-1">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
``
export default AccountPage
