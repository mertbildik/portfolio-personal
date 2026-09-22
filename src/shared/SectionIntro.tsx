import React from 'react';

const SectionIntro: React.FC<{
    title: React.ReactNode;
    description: React.ReactNode;
}> = ({ title, description }) => (
    <div className="flex flex-col justify-start relative z-20">
        <h2 className="text-title text-ink-strong">{title}</h2>
        <p className="mt-4 max-w-measure text-body text-ink">{description}</p>
    </div>
);

export default SectionIntro;
