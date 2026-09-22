import React from 'react';
import { Link } from 'react-router';
import PageMeta from './PageMeta';

/**
 * An unknown path used to redirect to the homepage, which erased the URL from
 * history and left the visitor to work out that the page they asked for does
 * not exist. This says so, and offers the two places worth going instead.
 */
const NotFoundPage: React.FC = () => (
    <div className="mx-auto flex w-full max-w-page flex-1 flex-col justify-center px-6 py-24">
        <PageMeta title="Page not found | Mert Bildik" />

        <span className="block font-mono text-data text-ink-quiet">404</span>
        <h1 className="mt-2 text-display text-ink-strong">This page does not exist.</h1>
        <p className="mt-4 max-w-measure text-body text-ink">
            The link may be out of date, or the address may have a typo in it.
        </p>

        <div className="mt-8 flex flex-wrap gap-6 rule-t pt-6">
            <Link
                to="/"
                className="text-label text-ink transition-colors duration-120 ease-out hover:text-ink-loud focus-visible:text-ink-loud focus-visible:outline-none"
            >
                Go to the homepage
            </Link>
            <Link
                to="/#portfolio"
                className="text-label text-ink transition-colors duration-120 ease-out hover:text-ink-loud focus-visible:text-ink-loud focus-visible:outline-none"
            >
                See selected work
            </Link>
        </div>
    </div>
);

export default NotFoundPage;
