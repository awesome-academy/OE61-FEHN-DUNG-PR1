"use client"

import React, { useState } from 'react'
import { news } from "@/data/sampleData"
import NewCard from "@/components/NewCard"

const News = () => {

    const sliceNews = news.slice(0, 3);

    return (
        <div className='hidden md:flex flex-col px-2 md:px-0 mb-[20px] md:mb-[50px]'>
            <div className='relative w-full pb-[10px] border-b mb-[40px]'>
                <h2 className='text-green-600 font-semibold'>Tin tức</h2>
                <div className='absolute w-[120px] border border-green-600 bottom-[-2px]'></div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {sliceNews.map((item) => (
                    <div key={item.id}>
                        <NewCard item={item} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default News
