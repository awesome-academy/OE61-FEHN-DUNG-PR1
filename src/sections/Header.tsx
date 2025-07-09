import React from 'react'
import { FaSearch, FaPhoneAlt } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import Image from 'next/image';

const Header = () => {
    return (
        <section
            className="w-full h-[300px] bg-center"
            style={{ backgroundImage: "url('/images/background_image.png')" }}
        >
            <div className='container h-full flex justify-between items-center'>
                <Image src="/images/header_image.png" alt="header image" width={500} height={300} className='object-contain hidden md:block' />
                <Image src="/images/header_image2.png" alt="header image" width={500} height={300} className='object-contain md:hidden' />
                <div className='hidden md:flex justify-center items-center gap-5'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <div className='flex justify-center items-center gap-2 text-gray-500 text-[14px]'>
                            <FaPhoneAlt className='text-gray-400 text-[14px]' />
                            <span>HỖ TRỢ : (04) 6674 2332 - (04) 3786 8904</span>
                        </div>
                        <div className='bg-white rounded-[20px] py-3 px-6 h-[40px] flex justify-between items-center gap-2 w-[350px]'>
                            <input type="text" placeholder='Tìm kiếm ...' className='border-r border-gray-300 w-[270px]' />
                            <button>
                                <FaSearch className='text-gray-400 text-[14px]' />
                            </button>
                        </div>
                    </div>
                    <div className='flex justify-center items-center gap-3'>
                        <FaBasketShopping className='text-[16px]' />
                        <span>Sản phẩm</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header
