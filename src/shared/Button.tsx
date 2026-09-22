import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const BASE =
    'group inline-flex min-h-11 items-center gap-3 rounded-full border border-edge px-5 text-label text-ink transition-[color,background-color,border-color] duration-120 ease-out hover:border-edge-strong hover:bg-hover hover:text-ink-loud focus-visible:border-edge-strong focus-visible:bg-hover focus-visible:text-ink-loud focus-visible:outline-none';

type LinkProps = {
    href: string;
    external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

type NativeProps = {
    href?: undefined;
    external?: never;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonProps = (LinkProps | NativeProps) & { children: React.ReactNode };

const Button: React.FC<ButtonProps> = (props) => {
    if (props.href !== undefined) {
        const { href, external = false, children, className = '', ...rest } = props;
        return (
            <a
                href={href}
                className={`${BASE} ${className}`}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                {...rest}
            >
                {children}
                {external && <ArrowUpRight size={16} aria-hidden="true" />}
            </a>
        );
    }

    const { children, className = '', type = 'button', ...rest } = props;
    return (
        <button type={type} className={`${BASE} ${className}`} {...rest}>
            {children}
        </button>
    );
};

export default Button;
