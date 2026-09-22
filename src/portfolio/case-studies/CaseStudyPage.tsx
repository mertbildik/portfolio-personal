import React from 'react';
import { Navigate, useParams } from 'react-router';
import { PROJECTS, type CustomProject } from '../content/projects';
import CaseStudyLayout from './CaseStudyLayout';
import EmploymentCaseStudy from './templates/EmploymentCaseStudy';
import ProjectCaseStudy from './templates/ProjectCaseStudy';

/** Pages written by hand rather than driven by the shared template. */
const HAND_WRITTEN: Record<CustomProject['page'], React.LazyExoticComponent<React.ComponentType<{ project: CustomProject }>>> = {
    ofk: React.lazy(() => import('./studies/OfkCaseStudy')),
    sinerjik: React.lazy(() => import('./studies/SinerjikCaseStudy')),
    'dog-and-ride': React.lazy(() => import('./studies/DogAndRideCaseStudy')),
    adclusive: React.lazy(() => import('./studies/AdclusiveCaseStudy')),
    curvix: React.lazy(() => import('./studies/CurvixCaseStudy')),
    'gala-network': React.lazy(() => import('./studies/GalaNetworkCaseStudy')),
};

const CaseStudyPage: React.FC = () => {
    const { id = '' } = useParams();
    const project = PROJECTS.find((entry) => entry.id === id);

    if (!project) return <Navigate to="/#portfolio" replace />;

    if (project.renderer === 'template') {
        return <CaseStudyLayout homepageGrid><ProjectCaseStudy project={project} /></CaseStudyLayout>;
    }

    if (project.renderer === 'employment') {
        return <CaseStudyLayout homepageGrid><EmploymentCaseStudy data={project.employment} /></CaseStudyLayout>;
    }

    const HandWritten = HAND_WRITTEN[project.page];
    return <CaseStudyLayout><HandWritten project={project} /></CaseStudyLayout>;
};

export default CaseStudyPage;
