import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Page not found | Mert Bildik' };

/**
 * An unknown path used to redirect to the homepage, which erased the URL from
 * history and left the visitor to work out that the page they asked for does
 * not exist. This says so, and offers the two places worth going instead.
 */
const NotFoundPage: React.FC = () => (
    <div className="mx-auto flex w-full max-w-page flex-1 flex-col justify-center px-6 py-24">
        <span className="block font-mono text-data text-ink-secondary">404</span>
        <h1 className="mt-2 text-display text-ink-large">This page does not exist.</h1>
        <p className="mt-4 max-w-measure text-body text-ink">
            The link may be out of date, or the address may have a typo in it.
        </p>

        <div className="mt-8 flex flex-wrap gap-6 rule-t pt-6">
            <Link
                href="/"
                className="text-label text-ink decoration-ink-secondary underline-offset-4 hover:underline"
            >
                Go to the homepage
            </Link>
            <Link
                href="/#portfolio"
                className="text-label text-ink decoration-ink-secondary underline-offset-4 hover:underline"
            >
                See selected work
            </Link>
        </div>
    </div>
);

export default NotFoundPage;
