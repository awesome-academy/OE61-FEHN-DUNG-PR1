import Layout from '@/components/Layout'
import React from 'react'
import { IoIosPhonePortrait } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";

const ContactPage = () => {
    return (
        <Layout>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.390300284346!2d105.78187237503106!3d21.01706358062936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454ab43c0c4db%3A0xdb6effebd6991106!2sKeangnam%20Landmark%2072!5e0!3m2!1svi!2s!4v1751448429663!5m2!1svi!2s"
                width="100%"
                height="500"
                loading="lazy"
            ></iframe>
            <div className='container'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-[50px] px-2 md:px-0'>
                    <div className='flex flex-col gap-[20px]'>
                        <form className='flex flex-col gap-[20px] mt-[30px]'>
                            <h3 className='text-green-600 uppercase font-bold text-[20px]'>Thông tin liên hệ</h3>
                            <div className='flex flex-col gap-[20px]'>
                                <div className='flex flex-col gap-[10px] col-span-1'>
                                    <label className='text-gray-400 text-[13px]' htmlFor="username">Họ và tên <span style={{ color: 'red' }}>*</span></label>
                                    <input type="text" className='w-full border border-gray-300 p-2' />
                                </div>
                                <div className='flex flex-col gap-[10px] col-span-1'>
                                    <label className='text-gray-400 text-[13px]' htmlFor="email">Địa chỉ email <span style={{ color: 'red' }}>*</span></label>
                                    <input type="email" className='w-full border border-gray-300 p-2' />
                                </div>
                                <div className='flex flex-col gap-[10px] col-span-1'>
                                    <label className='text-gray-400 text-[13px]' htmlFor="phone">Số ĐT <span style={{ color: 'red' }}>*</span></label>
                                    <input type="text" className='w-full border border-gray-300 p-2' />
                                </div>
                                <div className='flex flex-col gap-[10px] col-span-1'>
                                    <label className='text-gray-400 text-[13px]' htmlFor="comment">Bình luận <span style={{ color: 'red' }}>*</span></label>
                                    <input type="text" className='w-full border border-gray-300 p-2 min-h-[200px]' />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='flex flex-col gap-[20px] md:mt-[50px]'>
                        <img src="./images/logo_xoa_nen.png" alt="logo image" className='w-[250px] object-cover' />
                        <p className='text-gray-500 text-[13px]'>DKT được thành lập với niềm đam mê và khát vọng thành công trong lĩnh vực Thương mại điện tử. Chúng tôi đã và đang khẳng định được vị trí hàng đầu bằng những sản phẩm</p>
                        <div className='flex flex-col gap-[10px]'>
                            <div className='flex items-center gap-2'>
                                <IoIosPhonePortrait className='text-green-600' />
                                <span className='text-gray-500'>Điện thoại:  (84-4)66.558.868</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <HiOutlineMail className='text-green-600' />
                                <span className='text-gray-500'>Email: infor@dkt.com.vn</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ContactPage
