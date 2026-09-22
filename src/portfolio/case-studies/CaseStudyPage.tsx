import React from 'react';
import type { Project, ProjectId } from '../content/projects';
import CaseStudyLayout from './CaseStudyLayout';
import AdclusiveCaseStudy from './studies/AdclusiveCaseStudy';
import DogAndRideCaseStudy from './studies/DogAndRideCaseStudy';
import McKinseyCaseStudy from './studies/McKinseyCaseStudy';
import OfkCaseStudy from './studies/OfkCaseStudy';
import SinerjikCaseStudy from './studies/SinerjikCaseStudy';

type StudyComponent = React.ComponentType<{ project: Project }>;

/**
 * Every case study is a hand-written page, registered here by project id.
 * `width` picks the page frame: the wide shell, or the narrow homepage column
 * for studies that are mostly text and data rather than screenshots.
 *
 * Keyed to ProjectId, so a project in the index without a page here is a
 * compile error rather than a card that silently bounces back to the work list.
 */
const STUDIES: Record<ProjectId, { component: StudyComponent; width: 'page' | 'shell' }> = {
    ofk: { component: OfkCaseStudy, width: 'shell' },
    sinerjik: { component: SinerjikCaseStudy, width: 'shell' },
    'dog-and-ride': { component: DogAndRideCaseStudy, width: 'shell' },
    adclusive: { component: AdclusiveCaseStudy, width: 'shell' },
    mckinsey: { component: McKinseyCaseStudy, width: 'page' },
};

const CaseStudyPage: React.FC<{ project: Project }> = ({ project }) => {
    const study = STUDIES[project.id];
    const Study = study.component;
    return (
        <CaseStudyLayout width={study.width}>
            <Study project={project} />
        </CaseStudyLayout>
    );
};

export default CaseStudyPage;
