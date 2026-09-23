import React from 'react';
import type { Project } from '../content/projects';
import { CaseStudyHeader, CaseStudySection } from './CaseStudyElements';
import CaseStudySectionNavigator from './CaseStudySectionNavigator';

/**
 * The five sections a project case study runs through, in order.
 *
 * The frame below renders the sections and feeds the section navigator from
 * this one list, so an anchor in the navigator always matches a section on the
 * page. Each study used to retype the list, and nothing checked that the ids it
 * declared were the ids it rendered.
 *
 * A study whose subject is an ongoing role rather than a shipped project runs
 * its own sections and does not use this frame.
 */
export const CASE_STUDY_SECTIONS = [
    { id: 'problem', label: 'Problem' },
    { id: 'approach', label: 'Approach' },
    { id: 'solution', label: 'Solution' },
    { id: 'output', label: 'Output' },
    { id: 'impact', label: 'Impact' },
] as const;

export type CaseStudySectionId = (typeof CASE_STUDY_SECTIONS)[number]['id'];

interface FrameSection {
    /** The line shown under the label in the section navigator. */
    description: string;
    rhythm?: React.ComponentProps<typeof CaseStudySection>['rhythm'];
    children: React.ReactNode;
}

interface CaseStudyFrameProps {
    project: Project;
    summary: string;
    role: string;
    timeline: string;
    scope: string;
    tools: string[];
    /** All five sections are required: a study cannot quietly drop one. */
    sections: Record<CaseStudySectionId, FrameSection>;
}

/** The shared shell: header, section navigator, and the five numbered sections. */
const CaseStudyFrame: React.FC<CaseStudyFrameProps> = ({
    project,
    summary,
    role,
    timeline,
    scope,
    tools,
    sections,
}) => (
    <div className="w-full">
        <CaseStudyHeader
            title={project.title}
            summary={summary}
            role={role}
            timeline={timeline}
            scope={scope}
            tools={tools}
        />

        <CaseStudySectionNavigator
            sections={CASE_STUDY_SECTIONS.map(({ id, label }) => ({
                id,
                label,
                description: sections[id].description,
            }))}
            pageKey={project.id}
        />

        <div className="space-y-16 md:space-y-20">
            {CASE_STUDY_SECTIONS.map(({ id, label }, index) => (
                <CaseStudySection
                    key={id}
                    id={id}
                    number={String(index + 1).padStart(2, '0')}
                    title={label}
                    rhythm={sections[id].rhythm}
                >
                    {sections[id].children}
                </CaseStudySection>
            ))}
        </div>
    </div>
);

export default CaseStudyFrame;
