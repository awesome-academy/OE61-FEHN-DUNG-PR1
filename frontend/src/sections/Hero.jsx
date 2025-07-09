import React from 'react'
import SlideImage from "@/assets/images/slide.png";
import SlideImage2 from "@/assets/images/slide2.jpg";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Hero = () => {
    return (
        <section>
            <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                loop={true}
                className="w-full h-full relative custom-swiper"
            >
                <SwiperSlide>
                    <img src={SlideImage} alt="slide image 1" className='w-full h-[500px] object-cover' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={SlideImage2} alt="slide image 2" className='w-full h-[500px] object-cover' />
                </SwiperSlide>
            </Swiper>
        </section>
    )
}

export default Hero
