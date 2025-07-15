"use client"

import { RootState } from '@/redux/store';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaUserEdit, FaUserCheck } from 'react-icons/fa';
import { updateStart, updateSuccess, updateFailure } from '@/redux/user/userSlice';
import toast from 'react-hot-toast';

const PersonalInformation = () => {

    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: RootState) => state.user);
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({});

    const handleChange = (e: any) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleUpdateInformation = (e: any) => {
        e.preventDefault();

        const fieldsToCheck = ['name', 'phone', 'websiteUrl'];

        const newUserInformation = {
            ...currentUser,
            ...formData
        };

        const isChanged = fieldsToCheck.some(
            key => currentUser[key] !== newUserInformation[key]
        );

        if (!isChanged) {
            toast("Không có thông tin nào được cập nhật");
            return;
        }

        try {
            dispatch(updateStart());
            dispatch(updateSuccess(newUserInformation));
            toast.success("Cập nhật thông tin thành công")
        } catch (error: any) {
            console.log(error.message);
        }
    }



    return (
        <div className='flex flex-col gap-[20px] p-[20px]'>
            <h3 className='font-semibold text-[20px]'>Thông tin cá nhân</h3>
            <hr />
            <div className='flex justify-end'>
                <button
                    onClick={(e) => {
                        if (isEditing) {
                            handleUpdateInformation(e);
                        }
                        setIsEditing(!isEditing)
                    }}
                    className={`flex w-[100px] justify-center items-center gap-2 p-2 border rounded-[10px] hover:cursor-pointer hover:opacity-80  ${isEditing ? 'bg-green-600 text-white' : ''} `}
                >
                    {isEditing ? (
                        <>
                            <FaUserCheck size={16} />
                            <span>Save</span>
                        </>
                    ) : (
                        <>
                            <FaUserEdit size={16} />
                            <span>Edit</span>
                        </>
                    )}
                </button>
            </div>
            <form>
                <div className='flex flex-col gap-[20px]'>
                    <img src={currentUser?.images} alt="avatar" className='w-[100px] h-[100px] object-cover rounded-full' />
                    <hr />
                    <div className='flex flex-col gap-2'>
                        <label className='text-gray-500' htmlFor="name">Tên</label>
                        <input onChange={handleChange} type="text" id="name" disabled={!isEditing} defaultValue={currentUser.name} className={`h-[50px] border rounded-[20px] py-2 px-4 w-full ${!isEditing ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}`} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-gray-500' htmlFor="phone">Số điện thoại</label>
                        <input onChange={handleChange} type="text" id="phone" disabled={!isEditing} defaultValue={currentUser.phone} className={`h-[50px] border rounded-[20px] py-2 px-4 w-full ${!isEditing ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}`} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-gray-500' htmlFor="websiteUrl">Website URL</label>
                        <input onChange={handleChange} type="text" id="websiteUrl" disabled={!isEditing} defaultValue={currentUser.websiteUrl} className={`h-[50px] border rounded-[20px] py-2 px-4 w-full ${!isEditing ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}`} />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PersonalInformation
