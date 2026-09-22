import React from 'react';

const ActionCircle: React.FC<{ children: React.ReactNode; small?: boolean }> = ({
    children,
    small = false,
}) => (
    <span
        aria-hidden="true"
        className={`${small ? 'w-10 h-10' : 'w-12 h-12'} rounded-full border border-line flex items-center justify-center text-ink-high group-hover:bg-ink-max group-hover:text-canvas group-focus-visible:bg-ink-max group-focus-visible:text-canvas group-active:scale-95 group-disabled:bg-transparent group-disabled:text-ink-high transition-[background-color,color,transform] duration-150 ease-entrance shrink-0 ml-4`}
    >
        {children}
    </span>
);

export default ActionCircle;
