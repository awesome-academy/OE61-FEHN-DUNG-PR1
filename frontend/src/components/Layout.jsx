import Footer from '@/sections/Footer'
import Header from '@/sections/Header'
import Navbar from '@/sections/Navbar'
import TopBar from '@/sections/TopBar'
import React from 'react'

const Layout = ({ children }) => {
    return (
        <div>
            <TopBar />
            <Header />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
        </div>
    )
}

export default Layout
