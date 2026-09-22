import React from 'react';
import { Navigate, useParams } from 'react-router';
import { PROJECTS, type Project } from '../content/projects';
import CaseStudyLayout from './CaseStudyLayout';

type StudyComponent = React.LazyExoticComponent<React.ComponentType<{ project: Project }>>;

/**
 * Every case study is a hand-written page, registered here by project id.
 * `width` picks the page frame: the wide shell, or the narrow homepage column
 * for studies that are mostly text and data rather than screenshots.
 */
const STUDIES: Record<string, { component: StudyComponent; width: 'page' | 'shell' }> = {
    ofk: { component: React.lazy(() => import('./studies/OfkCaseStudy')), width: 'shell' },
    sinerjik: { component: React.lazy(() => import('./studies/SinerjikCaseStudy')), width: 'shell' },
    'dog-and-ride': { component: React.lazy(() => import('./studies/DogAndRideCaseStudy')), width: 'shell' },
    adclusive: { component: React.lazy(() => import('./studies/AdclusiveCaseStudy')), width: 'shell' },
    mckinsey: { component: React.lazy(() => import('./studies/McKinseyCaseStudy')), width: 'page' },
};

const CaseStudyPage: React.FC = () => {
    const { id = '' } = useParams();
    const project = PROJECTS.find((entry) => entry.id === id);
    const study = STUDIES[id];

    if (!project || !study) return <Navigate to="/#portfolio" replace />;

    const Study = study.component;
    return (
        <CaseStudyLayout width={study.width}>
            <Study project={project} />
        </CaseStudyLayout>
    );
};

export default CaseStudyPage;
