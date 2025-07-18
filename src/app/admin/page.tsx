"use client"

import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line
} from 'recharts'
import { Users, Package, ShoppingCart, DollarSign } from 'lucide-react'
import { orders, users, products } from '@/data/sampleData'

const AdminPage = () => {
    const totalUsers = users.length
    const totalProducts = products.length
    const totalOrders = orders.length
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0)

    // Order status distribution
    const orderStatusData = orders.reduce((acc: any, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1
        return acc
    }, {})

    const pieData = Object.entries(orderStatusData).map(([status, count]) => ({
        name: status,
        value: count
    }))

    // Monthly orders (simplified - using created date)
    const monthlyOrders = orders.reduce((acc: any, order) => {
        const month = new Date(order.createdAt).getMonth()
        const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month]
        acc[monthName] = (acc[monthName] || 0) + 1
        return acc
    }, {})

    const monthlyData = Object.entries(monthlyOrders).map(([month, count]) => ({
        month,
        orders: count
    }))

    // Top products by orders
    const productOrders = orders.flatMap(order => order.items)
        .reduce((acc: any, item) => {
            acc[item.name] = (acc[item.name] || 0) + item.quantity
            return acc
        }, {})

    const topProducts = Object.entries(productOrders)
        .sort(([, a], [, b]) => (b as number) - (a as number))
        .slice(0, 5)
        .map(([name, quantity]) => ({
            name: name.length > 20 ? name.substring(0, 20) + '...' : name,
            quantity
        }))

    const colors = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6']

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Thống kê tổng quan</h1>
                <div className="text-sm text-gray-500">
                    Cập nhật: {new Date().toLocaleDateString('vi-VN')}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Tổng người dùng</p>
                            <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-full">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Tổng sản phẩm</p>
                            <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-full">
                            <Package className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Tổng đơn hàng</p>
                            <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-full">
                            <ShoppingCart className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Tổng doanh thu</p>
                            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
                        </div>
                        <div className="bg-yellow-100 p-3 rounded-full">
                            <DollarSign className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Order Status Distribution */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-4">Phân bổ trạng thái đơn hàng</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Monthly Orders */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-4">Đơn hàng theo tháng</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Top 5 sản phẩm bán chạy</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topProducts}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="quantity" fill="#10b981" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Đơn hàng gần đây</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">Khách hàng</th>
                                <th className="px-4 py-2 text-left">Tổng tiền</th>
                                <th className="px-4 py-2 text-left">Trạng thái</th>
                                <th className="px-4 py-2 text-left">Ngày tạo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.slice(0, 10).map((order) => (
                                <tr key={order.id} className="border-b">
                                    <td className="px-4 py-2">#{order.id}</td>
                                    <td className="px-4 py-2">{order.user.name}</td>
                                    <td className="px-4 py-2">{formatCurrency(order.totalPrice)}</td>
                                    <td className="px-4 py-2">
                                        <span className={`px-2 py-1 rounded-full text-xs ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminPage
