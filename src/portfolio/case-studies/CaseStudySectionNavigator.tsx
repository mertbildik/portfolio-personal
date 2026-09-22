import React, { useEffect, useState } from 'react';

interface Section {
    id: string;
    label: string;
    description: string;
}

const CaseStudySectionNavigator: React.FC<{ sections: readonly Section[]; pageKey: string }> = ({
    sections,
    pageKey,
}) => {
    const [activeSection, setActiveSection] = useState(sections[0].id);

    useEffect(() => {
        let frame: number | null = null;
        const update = () => {
            if (frame !== null) return;
            frame = window.requestAnimationFrame(() => {
                frame = null;
                const threshold = window.innerHeight * 0.3;
                let current = sections[0].id;
                for (const section of sections) {
                    const element = document.getElementById(section.id);
                    if (element && element.getBoundingClientRect().top <= threshold)
                        current = section.id;
                }
                setActiveSection(current);
            });
        };

        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
            if (frame !== null) window.cancelAnimationFrame(frame);
        };
    }, [pageKey, sections]);

    return (
        <nav
            aria-label="Case study sections"
            className="group fixed right-0 top-1/2 z-20 hidden h-80 w-8 -translate-y-1/2 lg:block"
        >
            <div
                aria-hidden="true"
                className="absolute right-0 top-1/2 flex -translate-y-1/2 flex-col items-end gap-3 pr-2 transition-opacity duration-200 ease-entrance group-hover:opacity-0 group-focus-within:opacity-0"
            >
                {sections.map((section) => (
                    <span
                        key={section.id}
                        className={`h-px ${activeSection === section.id ? 'w-5 bg-ink-high' : 'w-2 bg-ink-low'}`}
                    />
                ))}
            </div>

            <div className="pointer-events-none absolute right-0 top-1/2 w-40 -translate-y-1/2 translate-x-2 rounded-l-md border-y border-l border-line bg-canvas p-3 opacity-0 transition-[opacity,transform] duration-200 ease-entrance group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-x-0 group-focus-within:opacity-100 xl:w-56">
                <span className="block px-3 pb-2 text-eyebrow text-ink-low">Sections</span>
                {sections.map((section) => (
                    <a
                        key={section.id}
                        href={`#${section.id}`}
                        aria-label={section.label}
                        aria-current={activeSection === section.id ? 'location' : undefined}
                        className={`flex gap-3 rounded-md px-3 py-2.5 focus-visible:bg-fill focus-visible:outline-none transition-[color,background-color] duration-200 ease-out ${
                            activeSection === section.id
                                ? 'bg-fill text-ink-max'
                                : 'text-ink-low hover:text-ink-high focus-visible:text-ink-high'
                        }`}
                    >
                        <span
                            className={`mt-2 h-1 w-1 shrink-0 rounded-full ${
                                activeSection === section.id ? 'bg-ink-high' : 'bg-ink-low'
                            }`}
                        />
                        <span>
                            <span className="block text-button">{section.label}</span>
                            <span className="mt-1 block text-caption text-ink-low">
                                {section.description}
                            </span>
                        </span>
                    </a>
                ))}
            </div>
        </nav>
    );
};

export default CaseStudySectionNavigator;
