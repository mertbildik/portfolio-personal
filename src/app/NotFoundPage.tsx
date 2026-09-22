import React from 'react';
import { Link } from 'react-router';
import PageMeta from './PageMeta';

/**
 * An unknown path used to redirect to the homepage, which erased the URL from
 * history and left the visitor to work out that the page they asked for does
 * not exist. This says so, and offers the two places worth going instead.
 */
const NotFoundPage: React.FC = () => (
    <div className="mx-auto flex w-full max-w-page flex-1 flex-col justify-center px-6 py-32">
        <PageMeta title="Page not found | Mert Bildik" />

        <span className="block font-mono text-eyebrow text-ink-low">404</span>
        <h1 className="mt-8 text-display-lg text-ink-high">This page does not exist.</h1>
        <p className="mt-8 max-w-xl text-body text-ink-body">
            The link may be out of date, or the address may have a typo in it.
        </p>

        <div className="mt-12 flex flex-wrap gap-8 border-t border-line pt-8">
            <Link
                to="/"
                className="text-button text-ink-body transition-colors duration-200 ease-out hover:text-ink-max focus-visible:text-ink-max focus-visible:outline-none"
            >
                Go to the homepage
            </Link>
            <Link
                to="/#portfolio"
                className="text-button text-ink-body transition-colors duration-200 ease-out hover:text-ink-max focus-visible:text-ink-max focus-visible:outline-none"
            >
                See selected work
            </Link>
        </div>
    </div>
);

export default NotFoundPage;
