"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import {
    Users,
    Package,
    Tag,
    ShoppingCart,
    BarChart3,
    Menu,
    Minimize,
    Palette,
    ArchiveX,
    User,
    ChevronUp,
    ChevronDown,
    LogOut,
    Settings
} from 'lucide-react'
import { signOutSuccess } from '@/redux/user/userSlice'
import toast from 'react-hot-toast'

const AdminSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
    const [showAccountModal, setShowAccountModal] = useState(false)

    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.user);

    const navItems = [
        {
            name: 'Thống kê',
            url: '/admin',
            icon: BarChart3,
            exact: true
        },
        {
            name: 'Người dùng',
            url: '/admin/users',
            icon: Users
        },
        {
            name: 'Sản phẩm',
            url: '/admin/products',
            icon: Package
        },
        {
            name: 'Màu sắc',
            url: '/admin/colors',
            icon: Palette
        },
        {
            name: 'Danh mục',
            url: '/admin/categories',
            icon: ArchiveX
        },
        {
            name: 'Thẻ',
            url: '/admin/tags',
            icon: Tag
        },
        {
            name: 'Đơn hàng',
            url: '/admin/orders',
            icon: ShoppingCart
        }
    ]

    const isActive = (item: any) => {
        if (item.exact) {
            return pathname === item.url
        }
        return pathname.startsWith(item.url)
    }

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed)
    }

    const toggleMobileSidebar = () => {
        setIsMobileOpen(!isMobileOpen)
    }

    const toggleAccountMenu = () => {
        setIsAccountMenuOpen(!isAccountMenuOpen)
    }

    const handleLogout = () => {
        router.push("/");
        setTimeout(() => {
            dispatch(signOutSuccess());
            toast.success("Đăng xuất thành công");
            setIsAccountMenuOpen(false);
            setIsMobileOpen(false);
        }, 100);
    }


    const handleAccountClick = () => {
        setShowAccountModal(true)
        setIsAccountMenuOpen(false)
        setIsMobileOpen(false)
    }

    const closeAccountModal = () => {
        setShowAccountModal(false)
    }

    return (
        <>
            <button
                onClick={toggleMobileSidebar}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-green-600 text-white rounded-lg shadow-lg"
            >
                <Menu size={20} />
            </button>

            {isMobileOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={toggleMobileSidebar}
                />
            )}

            <div className={`fixed md:relative
                ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} transition-all duration-300 ease-in-out 
                ${isCollapsed ? 'w-16' : 'w-64'} h-full bg-white shadow-lg z-50 flex flex-col`}
            >
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        {!isCollapsed && (
                            <h2 className="text-xl font-bold text-green-600">Admin Panel</h2>
                        )}
                        <button
                            onClick={isCollapsed ? toggleSidebar : toggleSidebar}
                            className="hidden md:block p-2 rounded-lg hover:bg-gray-100"
                        >
                            {isCollapsed ? <Menu size={20} className='hover:cursor-pointer' /> : <Minimize size={20} className='hover:cursor-pointer' />}
                        </button>
                        <button
                            onClick={toggleMobileSidebar}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                        >
                            <Minimize size={20} className='hover:cursor-pointer' />
                        </button>
                    </div>
                </div>

                <nav className="flex-1 py-4">
                    <ul className="space-y-2 px-2">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.url}
                                        onClick={() => setIsMobileOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                                                    ${isActive(item)
                                                ? 'bg-green-600 text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <Icon size={20} />
                                        {!isCollapsed && (
                                            <span className="font-medium">{item.name}</span>
                                        )}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                {/* Account Section */}
                <div className="border-t border-gray-200 p-2">
                    <div className="relative">
                        <button
                            onClick={toggleAccountMenu}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            <User size={20} />
                            {!isCollapsed && (
                                <>
                                    <div className="flex-1 text-left">
                                        <div className="font-medium">{currentUser?.name || 'Admin'}</div>
                                        <div className="text-sm text-gray-500">{currentUser?.email || 'admin@example.com'}</div>
                                    </div>
                                    {isAccountMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </>
                            )}
                        </button>

                        {/* Account Submenu */}
                        {isAccountMenuOpen && !isCollapsed && (
                            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                                <button
                                    onClick={handleAccountClick}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <Settings size={16} />
                                    <span>Tài khoản</span>
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 transition-colors rounded-b-lg"
                                >
                                    <LogOut size={16} />
                                    <span>Đăng xuất</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Account Modal */}
            {showAccountModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Thông tin tài khoản</h3>
                            <button
                                onClick={closeAccountModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ×
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tên
                                </label>
                                <input
                                    type="text"
                                    value={currentUser?.name || ''}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={currentUser?.email || ''}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Vai trò
                                </label>
                                <input
                                    type="text"
                                    value={currentUser?.role || 'Admin'}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                onClick={closeAccountModal}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Đóng
                            </button>
                            <button
                                onClick={closeAccountModal}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                Chỉnh sửa
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default AdminSidebar
