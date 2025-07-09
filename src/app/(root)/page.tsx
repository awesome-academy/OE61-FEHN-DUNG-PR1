import Layout from '@/components/Layout'
import React from 'react'
import BestSellerProducts from '@/sections/BestSellerProducts'
import FeaturedProducts from '@/sections/FeaturedProducts'
import NewProducts from '@/sections/NewProducts'
import News from '@/sections/News'
import PromotionalProducts from '@/sections/PromotionalProducts'
import Banner from '@/sections/Banner'
import Hero from '@/sections/Hero'

const HomePage = () => {
    return (
        <Layout>
            {/* <Hero /> */}
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
