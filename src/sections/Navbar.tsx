import React from 'react'
import Link from 'next/link';
import { TiThMenu } from "react-icons/ti";
import { IoMdArrowDropdown } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { FaSearch, FaPhoneAlt } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";

const Navbar = () => {

    const navItems = [
        {
            name: 'TRANG CHỦ',
            url: '/',
            icons: ''
        },
        {
            name: 'GIỚI THIỆU',
            url: '/about',
            icons: ''
        },
        {
            name: 'SẢN PHẨM',
            url: '/products',
            icons: IoMdArrowDropdown
        },
        {
            name: 'SẢN PHẨM MỚI ',
            url: '/new_products',
            icons: IoMdArrowDropdown
        },
        {
            name: 'TIN TỨC',
            url: '/blog',
            icons: ''
        },
        {
            name: 'LIÊN HỆ',
            url: '/contact',
            icons: ''
        },
    ]

    const router = useRouter();

    return (
        <section className='w-full h-[60px] bg-green-600 z-50 sticky top-0 shadow-md'>
            <div className='container h-[60px] '>
                <div className='text-white h-full flex justify-between md:justify-start items-center px-2 md:px-0'>
                    <TiThMenu className='text-[20px] md:text-[24px] md:mr-[20px]' />
                    <div className='hidden md:flex'>
                        {
                            navItems.map((item, index) => (
                                <button key={index} onClick={() => router.push(`${item.url}`)} className='w-[160px] h-[60px] p-2 hover:bg-gray-500/30 hover:cursor-pointer flex justify-center items-center gap-2'>
                                    {item.name}
                                    {
                                        item.icons && <item.icons className='text-[20px]' />
                                    }
                                </button>
                            ))
                        }
                    </div>
                    <div className='flex md:hidden justify-center items-center gap-5 text-white '>
                        <FaSearch className='text-[20px]' />
                        <FaBasketShopping onClick={() => router.push("/cart")} className='text-[20px]' />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Navbar
