import React from 'react';

const ActionCircle: React.FC<{ children: React.ReactNode; small?: boolean }> = ({
    children,
    small = false,
}) => (
    <span
        aria-hidden="true"
        className={`${small ? 'w-10 h-10' : 'w-12 h-12'} rounded-full border border-edge flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-canvas group-focus-visible:bg-ink group-focus-visible:text-canvas group-active:scale-97 group-disabled:bg-transparent group-disabled:text-ink transition-[background-color,color,transform] duration-100 ease-out shrink-0 ml-4`}
    >
        {children}
    </span>
);

export default ActionCircle;
