import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { IoMdArrowDropdown } from "react-icons/io";


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

    const navigate = useNavigate();

    return (
        <section className='w-full h-[60px] bg-[#84bb8a] z-50 sticky top-0 shadow-md'>
            <div className='container h-[60px] text-white flex justify-start items-center'>
                <TiThMenu className='text-[26px] mr-[20px]' />
                {
                    navItems.map((item, index) => (
                        <button onClick={() => navigate(`${item.url}`)} className='w-[150px] h-[60px] p-2 hover:bg-gray-500/30 hover:cursor-pointer flex justify-center items-center gap-2'>
                            {item.name}
                            {
                                item.icons && <item.icons className='text-[20px]' />
                            }
                        </button>
                    ))
                }
            </div>
        </section>
    )
}

export default Navbar
