import React from 'react'
import { ParamsProps } from '@/type'
import { products } from '@/data/sampleData';
import Layout from '@/components/Layout';
import ProductDetail from '@/components/ProductDetail';
import ProductSubInfo from '@/components/ProductSubInfo';
import SameProductCategory from '@/components/SameProductCategory';
import { redirect } from 'next/navigation';
import NotFoundComponent from '@/components/NotFoundComponent ';

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
                <div className='flex flex-col mt-[20px] gap-[20px] md:gap-[50px]'>
                    <div className='mt-[20px]'>
                        <span className='mr-[5px] text-gray-400'>Home / </span>
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
