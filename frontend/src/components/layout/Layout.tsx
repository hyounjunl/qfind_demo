// src/components/layout/Layout.tsx
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    // Initialize from localStorage with a default of false (closed)
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        // Check if we're in a browser environment
        if (typeof window !== 'undefined') {
            const savedState = localStorage.getItem('sidebarState');
            return savedState !== null ? JSON.parse(savedState) : false;
        }
        return false; // Default for server-side rendering
    });

    // Save to localStorage whenever the state changes
    useEffect(() => {
        localStorage.setItem('sidebarState', JSON.stringify(isSidebarOpen));
    }, [isSidebarOpen]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar with transition */}
                <div
                    className={`transform transition-all duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        } absolute md:relative z-10 md:z-0 h-[calc(100vh-64px)] w-64 bg-white shadow-lg`}
                >
                    <Sidebar />
                </div>

                {/* Overlay for mobile */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
                        onClick={toggleSidebar}
                    />
                )}

                {/* Main content */}
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;