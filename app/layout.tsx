import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
 
export const metadata: Metadata = {
    title: 'Vietnam Blueprint: Mô phỏng Kinh tế Vĩ mô',
    description: 'Game mô phỏng quản lý kinh tế vĩ mô Việt Nam được xây dựng với Next.js và Zustand.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.variable} font-sans min-h-screen bg-black text-white selection:bg-blue-500/30`}>
                {children}
            </body>
        </html>
    );
}
