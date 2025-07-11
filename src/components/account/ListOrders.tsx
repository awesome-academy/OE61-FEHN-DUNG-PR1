"use client"

import { RootState } from '@/redux/store';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ListOrders = () => {

    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: RootState) => state.user);

    return (
        <div className='flex flex-col gap-[20px] p-[20px]'>
            <h3 className='font-semibold text-[20px]'>Lịch sử mua hàng</h3>
            <hr />

        </div>
    )
}

export default ListOrders
