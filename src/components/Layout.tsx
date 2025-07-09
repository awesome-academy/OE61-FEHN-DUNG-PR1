"use client"

import React from 'react'
import TopBar from "@/sections/TopBar"
import Header from '@/sections/Header'
import Navbar from '@/sections/Navbar'
import Footer from '@/sections/Footer'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <TopBar />
            <Header />
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout
