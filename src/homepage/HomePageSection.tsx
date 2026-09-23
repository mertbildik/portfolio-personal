import React from 'react';

const HomePageSection: React.FC<{ children: React.ReactNode; id: string; hero?: boolean }> = ({
    children,
    id,
    hero = false,
}) => (
    <section id={id} className="w-full">
        <div
            className={`relative z-10 w-full max-w-page mx-auto px-6 ${hero ? 'pt-16 pb-16 md:pt-20 md:pb-20' : 'py-16 md:py-20'}`}
        >
            {children}
        </div>
    </section>
);

export default HomePageSection;
