"use client"

import React, { useState, useEffect } from 'react'
import { IoIosSend } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";

const PopUp = () => {

    const [showPopUp, setShowPopUp] = useState(true);
    const [dontShowAgain, setDontShowAgain] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const dontShow = localStorage.getItem("popupDontShow");
            if (dontShow === "true") {
                setShowPopUp(false);
            }
        }
    }, []);

    const handleClose = (e: any) => {
        e.preventDefault();
        if (dontShowAgain) {
            localStorage.setItem("popupDontShow", "true");
        }
        setShowPopUp(false);
    }

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            if (dontShowAgain) {
                localStorage.setItem("popupDontShow", "true");
            }
            setShowPopUp(false);
        }
    }

    return (
        <AnimatePresence>
            {
                showPopUp && (
                    <motion.div
                        className="fixed inset-0 flex justify-center items-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleBackdropClick}
                    >
                        <motion.div
                            onClick={e => e.stopPropagation()}
                            className='relative w-[340px] md:w-[800px] h-[350px] md:h-[400px] flex justify-center items-center p-5 bg-[#F0EDEA] shadow-md'
                        >
                            <button
                                onClick={handleClose}
                                className="absolute top-2 right-2 text-green-600 hover:cursor-pointer hover:opacity-75"
                            >
                                <MdOutlineClose className='text-[24px]' />
                            </button>
                            <img src="/images/pop_up.png" alt="pop up image" className='hidden md:block w-[150px] md:w-[400px] h-[250px] object-cover' />
                            <div className='flex flex-col gap-[20px] md:gap-[30px]'>
                                <h3 className='text-[20px] md:text-[24px] text-gray-500 font-semibold'>Nhận tin tức từ chúng tôi</h3>
                                <h3 className='uppercase font-semibold text-[20px] text-green-600'>đăng ký email ngay hôm nay</h3>
                                <div className='flex items-center'>
                                    <input type="text" placeholder='Nhập email của bạn vào đây' className='w-full h-[40px] p-3 bg-white' />
                                    <button className='w-[40px] h-[40px] flex justify-center items-center p-2 bg-green-600 hover:cursor-pointer hover:opacity-75'>
                                        <IoIosSend className='text-[18px] text-white' />
                                    </button>
                                </div>
                                <p className='text-gray-500'>Đăng ký email ngay hôm nay để nhận các thông tin về sự kiện và các chương trình giảm giá từ chúng tôi</p>
                                <div className='flex items-center gap-3'>
                                    <input
                                        type="checkbox"
                                        checked={dontShowAgain}
                                        onChange={e => setDontShowAgain(e.target.checked)}
                                    />
                                    <p className='text-gray-500'>Không hiển thị lại thông báo này nữa</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

export default PopUp
