import Layout from '@/components/Layout'
import Banner from '@/sections/Banner'
import BestSellerProducts from '@/sections/BestSellerProducts'
import FeaturedProducts from '@/sections/FeaturedProducts'
import Hero from '@/sections/Hero'
import NewProducts from '@/sections/NewProducts'
import News from '@/sections/News'
import PromotionalProducts from '@/sections/PromotionalProducts'
import React from 'react'

const HomePage = () => {
    return (
        <Layout>
            <Hero />
            <div className='container flex flex-col gap-[20px]'>
                <FeaturedProducts />
                <div className='grid grid-cols-4 gap-4'>
                    <BestSellerProducts col-span-1 />
                    <PromotionalProducts col-span-3 />
                </div>
                <Banner />
                <NewProducts />
                <News />
            </div>
        </Layout>
    )
}

export default HomePage
