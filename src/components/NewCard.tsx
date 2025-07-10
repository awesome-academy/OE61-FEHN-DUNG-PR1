import React from 'react'
import { New } from '@/type'
import Link from 'next/link'

interface NewCardProps {
    item: New
}

const NewCard = ({ item }: NewCardProps) => {
    return (
        <div className='flex flex-col gap-[20px]'>
            <img src={item.images[0]} alt="news image" className='w-full h-full object-cover' />
            <span className='italic text-[12px] text-gray-400'>{item.date}</span>
            <span className='text-[13px] font-semibold text-green-600'>{item.title}</span>
            <p className='text-[12px] text-gray-500'>{item.description}</p>
            <Link href="/" className='italic text-[12px] text-green-700 hover:underline hover:cursor-pointer w-[50px]'>Đọc tiếp</Link>
        </div>
    )
}

export default NewCard
