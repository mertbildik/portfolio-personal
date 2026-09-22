import React from 'react';
import { Link } from 'react-router';

interface BackLinkProps {
    to: string;
    children: React.ReactNode;
    ariaLabel?: string;
}

const BackLink: React.FC<BackLinkProps> = ({ to, children, ariaLabel }) => (
    <Link
        to={to}
        className="group inline-flex items-center gap-3 w-fit text-ink transition-colors duration-120 cursor-pointer"
        aria-label={ariaLabel}
    >
        <span className="h-px w-8 bg-current transition-[width] duration-150 ease-out group-hover:w-12 group-focus-visible:w-12" />
        <span className="text-label">{children}</span>
    </Link>
);

export default BackLink;
