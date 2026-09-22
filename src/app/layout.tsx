import React from 'react';
import type { Metadata } from 'next';
import { preload } from 'react-dom';
import { SITE_URL } from './meta';
import '../index.css';

export const metadata: Metadata = {
    // Resolves every relative canonical, og:url and og:image against the site.
    metadataBase: new URL(SITE_URL),
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    preload('/fonts/InterVariable.woff2', { as: 'font', type: 'font/woff2', crossOrigin: '' });

    return (
        <html lang="en">
            <body>
                {/* Layout only. Ink, font and selection come from `body` in index.css,
                    so the document default is the reading ink. */}
                <div className="flex flex-col min-h-screen relative">
                    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-canvas canvas-atmosphere" />
                    <main className="flex-1 w-full relative z-10 flex flex-col">{children}</main>
                </div>
            </body>
        </html>
    );
};

export default RootLayout;
