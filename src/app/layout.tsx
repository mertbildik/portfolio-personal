import React from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SITE_URL } from './meta';
import '../index.css';

/*
 * Both faces are self-hosted variable fonts, so the site makes no third-party
 * requests. One file each covers weights 100-900; Inter's also carries its
 * optical-size axis, which the browser applies by font size on its own.
 * next/font preloads them and sizes the fallback to match, so text does not
 * jump when they arrive. index.css reads them through the two variables.
 */
const inter = localFont({
    src: './fonts/InterVariable.woff2',
    weight: '100 900',
    variable: '--font-inter',
});

// Data — timestamps, coordinates, counts, values — is set in this.
const geistMono = localFont({
    src: './fonts/GeistMonoVariable.woff2',
    weight: '100 900',
    variable: '--font-geist-mono',
});

export const metadata: Metadata = {
    // Resolves every relative canonical, og:url and og:image against the site.
    metadataBase: new URL(SITE_URL),
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
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

export default RootLayout;
