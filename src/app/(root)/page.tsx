import Layout from '@/components/Layout'
import React from 'react'
import BestSellerProducts from '@/sections/BestSellerProducts'
import FeaturedProducts from '@/sections/FeaturedProducts'
import NewProducts from '@/sections/NewProducts'
import News from '@/sections/News'
import PromotionalProducts from '@/sections/PromotionalProducts'
import Banner from '@/sections/Banner'
import Hero from '@/sections/Hero'
import PopUp from '@/components/PopUp'

const HomePage = () => {
    return (
        <Layout>
            <PopUp />
            <Hero />
            <div className='container flex flex-col gap-[20px]'>
                <FeaturedProducts />
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-[20px] md:mt-[40px]'>
                    <div className='md:col-span-1'>
                        <BestSellerProducts />
                    </div>
                    <div className='md:col-span-3'>
                        <PromotionalProducts />
                    </div>
                </div>
                <Banner />
                <NewProducts />
                <News />
            </div>
        </Layout>
    )
}

export default HomePage
