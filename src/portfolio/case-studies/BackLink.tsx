import React from 'react';
import Link from 'next/link';

interface BackLinkProps {
    to: string;
    children: React.ReactNode;
    ariaLabel?: string;
}

const BackLink: React.FC<BackLinkProps> = ({ to, children, ariaLabel }) => (
    <Link
        href={to}
        className="group inline-flex items-center gap-3 w-fit text-ink transition-colors duration-state cursor-pointer"
        aria-label={ariaLabel}
    >
        <span className="h-px w-8 bg-current transition-[width] duration-reveal ease-out group-hover:w-12 group-focus-visible:w-12" />
        <span className="text-label">{children}</span>
    </Link>
);

export default BackLink;
