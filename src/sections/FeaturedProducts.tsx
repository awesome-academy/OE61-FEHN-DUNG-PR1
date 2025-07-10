import React from 'react'
import { Product } from '@/type'
import { products } from '@/data/sampleData'
import ProductCard from '@/components/ProductCard'

const FeaturedProducts = () => {
    return (
        <section className='mt-[20px] md:mt-[40px] px-2 md:px-0'>
            <div className='relative w-full pb-[10px] border-b mb-[40px]'>
                <h2 className='text-green-600 font-semibold'>Sản phẩm nổi bật</h2>
                <div className='absolute w-[120px] border border-green-600 bottom-[-2px]'></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-3 md:gap-8">
                <div className="col-span-2 row-span-2">
                    <ProductCard product={products[0]} />
                </div>
                <div>
                    <ProductCard product={products[1]} />
                </div>
                <div>
                    <ProductCard product={products[2]} />
                </div>
                <div className="col-span-2 row-span-2">
                    <ProductCard product={products[3]} />
                </div>
                <div>
                    <ProductCard product={products[4]} />
                </div>
                <div>
                    <ProductCard product={products[5]} />
                </div>
            </div>
        </section>
    )
}

export default FeaturedProducts
