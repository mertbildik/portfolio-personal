/**
 * The catalogue's own furniture.
 *
 * Built from the system it documents — the same ink ramp, the same eleven type
 * tokens, the same single radius — so the pages are themselves a use of the
 * system rather than a description of it. The one liberty taken is the sidebar
 * grid, which the site itself has no need for.
 *
 * Development only — see src/design/DesignRoute.tsx.
 */
import React from 'react';
import { Link, NavLink } from 'react-router';
import { NAV, neighbours } from './nav';

export const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="mx-auto flex w-full max-w-shell flex-col lg:flex-row">
        {/* The border belongs to the full-height column; only the contents stick.
            Putting h-screen on the bordered element would end the rule at the fold. */}
        <aside className="border-b border-edge lg:w-64 lg:shrink-0 lg:border-r lg:border-b-0">
            <div className="px-6 py-10 lg:sticky lg:top-0 lg:max-h-screen lg:overflow-y-auto lg:px-8">
                <Link
                    to="/design"
                    className="block text-heading text-ink transition-colors duration-120 ease-out"
                >
                    Design system
                </Link>
                <p className="mt-2 font-mono text-data text-ink-secondary">
                    Mert Bildik · local only
                </p>

                <nav aria-label="Design system" className="mt-10 flex flex-col gap-8">
                    {NAV.map((group, index) => (
                        <div key={group.title ?? index}>
                            {group.title && (
                                <p className="mb-3 text-label text-ink-secondary">{group.title}</p>
                            )}
                            <ul className="flex flex-col gap-2">
                                {group.entries.map((entry) => (
                                    <li key={entry.path}>
                                        <NavLink
                                            to={entry.path}
                                            end={entry.path === '/design'}
                                            className={({ isActive }) =>
                                                `block text-small transition-colors duration-120 ease-out focus-visible:outline-none ${
                                                    isActive ? 'text-ink' : 'text-ink'
                                                }`
                                            }
                                        >
                                            {entry.label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>

                <Link
                    to="/"
                    className="mt-12 inline-block text-small text-ink-secondary transition-colors duration-120 ease-out hover:text-ink focus-visible:text-ink"
                >
                    ← Back to the site
                </Link>
            </div>
        </aside>

        <main className="min-w-0 flex-1 px-6 pt-12 pb-24 lg:px-16 lg:pt-16">
            <div className="max-w-4xl">{children}</div>
        </main>
    </div>
);

export const PageHeader: React.FC<{
    crumb: string;
    title: string;
    lede: string;
}> = ({ crumb, title, lede }) => (
    <header>
        <p className="text-label text-ink-secondary">{crumb}</p>
        <h1 className="mt-2 text-title text-ink-large">{title}</h1>
        <p className="mt-4 max-w-measure text-body text-ink">{lede}</p>
    </header>
);

export const Chapter: React.FC<{
    id: string;
    title: string;
    lede?: string;
    children: React.ReactNode;
}> = ({ id, title, lede, children }) => (
    <section id={id} className="mt-16 scroll-mt-12 rule-t pt-8">
        <h2 className="text-heading text-ink">{title}</h2>
        {lede && <p className="mt-2 max-w-measure text-small text-ink">{lede}</p>}
        <div className="mt-6">{children}</div>
    </section>
);

/** A small label above a specimen or a demo. */
export const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="mb-4 text-label text-ink-secondary">{children}</p>
);

/** A token name, a value, a class — anything that is data rather than prose. */
export const Mono: React.FC<{ children: React.ReactNode; bright?: boolean }> = ({
    children,
    bright = false,
}) => (
    <code className={`font-mono text-data ${bright ? 'text-ink' : 'text-ink-secondary'}`}>
        {children}
    </code>
);

/**
 * The ground a live example sits on: the canvas itself, inside the one resting
 * border. What is shown is what the site shows.
 */
export const Frame: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className = '',
}) => (
    <div className={`rounded-md border border-edge px-6 py-8 md:px-8 ${className}`}>{children}</div>
);

export const Table: React.FC<{
    columns: string[];
    rows: React.ReactNode[][];
}> = ({ columns, rows }) => (
    <div className="overflow-x-auto">
        <table className="w-full min-w-xl border-collapse text-left">
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th
                            key={column}
                            className="border-b border-edge pr-6 pb-3 text-label font-normal text-ink-secondary"
                        >
                            {column}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-edge align-top">
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="py-3 pr-6 text-small text-ink last:pr-0">
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

/** The short statements that close a page: what the rule actually is. */
export const Rules: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
    <ul className="flex max-w-measure flex-col gap-2">
        {items.map((item, index) => (
            <li key={index} className="flex gap-4 text-small text-ink">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-secondary" />
                <span>{item}</span>
            </li>
        ))}
    </ul>
);

export const PageFoot: React.FC<{ path: string }> = ({ path }) => {
    const { previous, next } = neighbours(path);
    const link = 'group flex flex-col gap-1 text-ink transition-colors duration-120 ease-out';

    return (
        <nav
            aria-label="Neighbouring pages"
            className="mt-20 flex justify-between gap-8 rule-t pt-8"
        >
            {previous ? (
                <Link to={previous.path} className={link}>
                    <span className="text-label text-ink-secondary">Previous</span>
                    <span className="text-label">{previous.label}</span>
                </Link>
            ) : (
                <span />
            )}
            {next && (
                <Link to={next.path} className={`${link} items-end text-right`}>
                    <span className="text-label text-ink-secondary">Next</span>
                    <span className="text-label">{next.label}</span>
                </Link>
            )}
        </nav>
    );
};
