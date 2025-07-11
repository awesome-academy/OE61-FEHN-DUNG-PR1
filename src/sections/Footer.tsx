import React from 'react'
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaVimeoV } from "react-icons/fa";
import { FaTumblr } from "react-icons/fa";
import { BsSendFill } from "react-icons/bs";
import { IoIosPhonePortrait } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { FaAngleRight } from "react-icons/fa";
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className='w-full bg-[#4F4F4F]'>
            <div className='container'>
                <div className='flex flex-col md:flex-row gap-5 justify-center md:justify-between items-start md:items-center py-5 px-2 md:px-0'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-green-600 md:text-gray-300 uppercase'>kênh thông tin từ chúng tôi : </span>
                        <div className='flex justify-start items-center gap-5'>
                            <a href="#" target="_blank" rel="noopener noreferrer" className='text-[20px] md:text-[16px] flex justify-center items-center text-gray-300 hover:text-white'>
                                <FaFacebookF />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className='text-[20px] md:text-[16px] flex justify-center items-center text-gray-300 hover:text-white'>
                                <FaTwitter />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className='text-[20px] md:text-[16px] flex justify-center items-center text-gray-300 hover:text-white'>
                                <FaTumblr />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className='text-[20px] md:text-[16px] flex justify-center items-center text-gray-300 hover:text-white'>
                                <FaVimeoV />
                            </a>
                        </div>

                    </div>
                    <div className='flex md:flex-col gap-1 uppercase text-green-600 md:text-gray-300'>
                        <span>đăng ký nhận</span>
                        <span>email từ chúng tôi</span>
                    </div>
                    <div className='flex'>
                        <input type="email" className='w-[350px] md:w-[400px] bg-white h-[30px]' />
                        <button className='w-[30px] h-[30px] flex justify-center items-center p-2 bg-[#84bb8a]'>
                            <BsSendFill className='text-white' />
                        </button>
                    </div>
                </div>
            </div>

            <div className='border-b border-gray-400'></div>

            <div className="container text-gray-300">
                <div className='flex flex-col md:flex-row justify-center md:justify-between items-start md:items-center py-10 px-2 md:px-0'>
                    <div className='flex flex-col gap-2 max-w-[340px]'>
                        <Image src="/images/logo_xoa_nen.png" alt="Logo Xoa Nen" width={300} height={200} className='object-cover' />
                        <p className='text-[15px] md:text-[12px]'>Green shop được thành lập từ 8/2010 được sự tin tưởng của khác
                            hàng trong suốt thời gian hoạt động đến nay cửa hàng ngày một phát
                            triển</p>
                        <div className='hidden md:flex items-center gap-2'>
                            <IoIosPhonePortrait className='text-green-600' />
                            <span>Điện thoại:  (84-4)66.558.868</span>
                        </div>
                        <div className='hidden md:flex items-center gap-2'>
                            <HiOutlineMail className='text-green-600' />
                            <span>Email: infor@dkt.com.vn</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 mt-[50px] md:mt-0'>
                        <h5 className='uppercase text-green-600 font-semibold mb-[10px] md:mb-[30px]'>thông tin khách hàng</h5>
                        <span className='flex items-center gap-1 text-[15px] md:text-[13px]'>
                            <FaAngleRight />
                            <p>Tài khoản của tôi</p>
                        </span>
                        <span className='flex items-center gap-1 text-[15px] md:text-[13px]'>
                            <FaAngleRight />
                            <p>Sản phẩm yêu thích</p>
                        </span>
                        <span className='flex items-center gap-1 text-[15px] md:text-[13px]'>
                            <FaAngleRight />
                            <p>Lịch sử mua hàng</p>
                        </span>
                        <span className='flex items-center gap-1 text-[15px] md:text-[13px]'>
                            <FaAngleRight />
                            <p>Chính sách đổi trả</p>
                        </span>
                        <span className='flex items-center gap-1 text-[15px] md:text-[13px]'>
                            <FaAngleRight />
                            <p>Góp ý, khiếu nại</p>
                        </span>
                    </div>
                    <div className='flex flex-col md:flex-row justify-center md:justify-between items-start md:items-center gap-10'>
                        <div className='flex flex-col gap-4 mt-[50px] md:mt-0'>
                            <h5 className='uppercase text-green-600 font-semibold mb-[10px] md:mb-[30px]'>hỗ trợ dịch vụ</h5>
                            <span className='flex items-center gap-1 text-[15px] md:text-[13px]'>
                                <FaAngleRight />
                                <p>Hệ thống cửa hàng</p>
                            </span>
                            <span className='flex items-center gap-1 text-[15px] md:text-[13px]'>
                                <FaAngleRight />
                                <p>Hướng dẫn mua hàng</p>
                            </span>
                            <span className='flex items-center gap-1 text-[15px] md:text-[13px]'>
                                <FaAngleRight />
                                <p>Hướng dẫn thanh toán</p>
                            </span>
                            <span className='flex items-center gap-1 text-[15px] md:text-[13px]'>
                                <FaAngleRight />
                                <p>Tích điểm đổi quà</p>
                            </span>
                            <span className='flex items-center gap-1 text-[15px] md:text-[13px]'>
                                <FaAngleRight />
                                <p>Câu hỏi thường gặp</p>
                            </span>
                        </div>
                        <div className='flex flex-col gap-4 mt-[50px] md:mt-0'>
                            <h5 className='uppercase text-green-600 font-semibold mb-[10px] md:mb-[30px]'>chính sách ưu đãi</h5>
                            <span className='flex items-center gap-1 text-[15px] md:text-[13px]'>
                                <FaAngleRight />
                                <p>Chính sách giao hàng</p>
                            </span>
                            <span className='flex items-center gap-1 text-[15px] md:text-[13px]'>
                                <FaAngleRight />
                                <p>Chính sách đổi trả sản phẩm</p>
                            </span>
                            <span className='flex items-center gap-1 text-[15px] md:text-[13px]'>
                                <FaAngleRight />
                                <p>Chính sách bảo hành</p>
                            </span>
                            <span className='flex items-center gap-1 text-[15px] md:text-[13px]'>
                                <FaAngleRight />
                                <p>Giới thiệu sản phẩm mới</p>
                            </span>
                            <span className='flex items-center gap-1 text-[15px] md:text-[13px]'>
                                <FaAngleRight />
                                <p>Chính sách trả góp</p>
                            </span>
                        </div>
                        <div className='flex flex-col gap-4 mt-[50px] md:mt-0'>
                            <h5 className='uppercase text-green-600 font-semibold mb-[10px] md:mb-[30px]'>tin tức</h5>
                            <span className='flex items-center gap-1 text-[15px] md:text-[13px]'>
                                <FaAngleRight />
                                <p>Tin mới</p>
                            </span>
                            <span className='flex items-center gap-1 text-[15px] md:text-[13px]'>
                                <FaAngleRight />
                                <p>Khuyến mại</p>
                            </span>
                            <span className='flex items-center gap-1 text-[15px] md:text-[13px]'>
                                <FaAngleRight />
                                <p>Tuyển dụng</p>
                            </span>
                            <span className='flex items-center gap-1 text-[15px] md:text-[13px]'>
                                <FaAngleRight />
                                <p>Download</p>
                            </span>
                            <span className='flex items-center gap-1 text-[15px] md:text-[13px]'>
                                <FaAngleRight />
                                <p>Tags</p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='border-b border-gray-400'></div>

            <div className='hidden md:block container text-gray-300'>
                <div className='flex justify-between items-center py-5 px-2 md:px-0'>
                    <div>
                        <ul className='flex gap-3 text-[12px]'>
                            <li>Sitemap</li>
                            <li>Danh mục sản phẩm</li>
                            <li>Hợp tác</li>
                            <li>Thông tin liên hệ</li>
                            <li>Câu hỏi thường gặp</li>
                        </ul>
                    </div>
                    <span className='text-[12px]'>Powered by Green Shop</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
