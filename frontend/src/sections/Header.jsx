import React from 'react'
import HeaderImage from "../assets/images/header_image.png"
import BackgroundImage from "../assets/images/background_image.png"
import { FaSearch, FaPhoneAlt } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";

const Header = () => {
    return (
        <section style={{ backgroundImage: `url(${BackgroundImage})` }} className='w-full h-[300px]'>
            <div className=' container flex justify-between items-center'>
                <img src={HeaderImage} alt="header image" className='w-[500px] h-[300px] object-contain' />
                <div className='flex justify-center items-center gap-5'>
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
