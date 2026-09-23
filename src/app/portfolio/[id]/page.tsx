import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { COVERS } from '../../../portfolio/assets/covers';
import CaseStudyPage from '../../../portfolio/case-studies/CaseStudyPage';
import { PROJECTS } from '../../../portfolio/content/projects';
import { projectMeta, toMetadata } from '../../meta';

interface Props {
    params: Promise<{ id: string }>;
}

const find = (id: string) => PROJECTS.find((entry) => entry.id === id);

/** Every study is built ahead of time; only ids outside the index reach the server. */
export const generateStaticParams = () => PROJECTS.map((project) => ({ id: project.id }));

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const project = find((await params).id);
    if (!project) return {};

    const meta = projectMeta(project);
    return toMetadata(meta, meta.cover && COVERS[meta.cover].src);
};

const Page = async ({ params }: Props) => {
    const project = find((await params).id);

    // Retired projects keep their URLs public on old CVs and profiles, so an
    // unknown id lands on the work list rather than a blank page.
    if (!project) redirect('/#portfolio');

    return <CaseStudyPage project={project} />;
};

export default Page;
