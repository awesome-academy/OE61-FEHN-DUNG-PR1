import React from 'react'
import { ParamsProps } from '@/type'
import { products } from '@/data/sampleData';
import Layout from '@/components/Layout';
import ProductDetail from '@/components/ProductDetail';
import ProductSubInfo from '@/components/ProductSubInfo';
import SameProductCategory from '@/components/SameProductCategory';
import { redirect } from 'next/navigation';
import NotFoundComponent from '@/components/NotFoundComponent ';
import Link from 'next/link';

const ProductDetailPage = async ({ params }: ParamsProps) => {

    const { id } = await params;

    const numericId = Number(id);

    const findProduct = products.find((product) => product.id === numericId);
    if (!findProduct) {
        return (
            <Layout>
                <div className='container'>
                    <NotFoundComponent />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className='container'>
                <div className='flex flex-col mt-[20px] gap-[20px] md:gap-[50px] mb-[20px] md:mb-[50px]'>
                    <div className='mt-[20px]'>
                        <Link href='/'>
                            <span className='mr-[5px] text-gray-400 hover:cursor-pointer'>Home / </span>
                        </Link>
                        <span className='text-green-600'>{findProduct?.name}</span>
                    </div>
                    <ProductDetail product={findProduct} />
                    <ProductSubInfo product={findProduct} />
                    <SameProductCategory product={findProduct} />
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetailPage
