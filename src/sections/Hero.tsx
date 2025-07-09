import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';

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
                    <Image src="/images/slide.png" alt="slide image 1" className='w-full h-[500px] object-cover' />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src="/images/slide2.jpg" alt="slide image 2" className='w-full h-[500px] object-cover' />
                </SwiperSlide>
            </Swiper>
        </section>
    )
}

export default Hero
