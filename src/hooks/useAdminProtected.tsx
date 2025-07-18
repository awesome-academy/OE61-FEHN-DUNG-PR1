"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


const AdminProtected = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter();

    const { currentUser, isLoggedIn } = useSelector((state: RootState) => state.user);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace("/login");
            setIsAuthenticated(false);
        } else if (currentUser.role !== "admin") {
            router.push("/error/unauthorized");
            setIsAuthenticated(false);
        } else {
            setIsAuthenticated(true);
        }
    }, [currentUser, router]);

    if (isAuthenticated === null) return null;

    return <>{children}</>;
}

export default AdminProtected;
