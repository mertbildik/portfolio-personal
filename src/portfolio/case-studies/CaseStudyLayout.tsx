import React from 'react';

const CaseStudyLayout: React.FC<{ children: React.ReactNode; width?: 'page' | 'shell' }> = ({
    children,
    width = 'shell',
}) => {
    return (
        <div
            className={`case-study w-full mx-auto px-6 pb-24 flex-1 flex flex-col ${
                width === 'page'
                    ? 'max-w-page pt-16 md:pt-20'
                    : 'max-w-shell md:px-12 lg:pl-32 lg:pr-20 xl:px-32 pt-20'
            }`}
        >
            {children}
        </div>
    );
};

export default CaseStudyLayout;
