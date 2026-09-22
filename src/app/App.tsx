import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router';
import { MotionConfig } from 'motion/react';

import NotFoundPage from './NotFoundPage';

const HomePage = React.lazy(() => import('../homepage/HomePage'));
const CaseStudyPage = React.lazy(() => import('../portfolio/case-studies/CaseStudyPage'));

/**
 * The living design system at /design, local only.
 *
 * Vite replaces `import.meta.env.DEV` with `false` in a build, so the ternary
 * folds to `null` and Rollup drops the import and everything under it. Keep this
 * shape: a bare `import.meta.env.DEV && <Route …>` inside the tree below would
 * leave the dynamic import reachable and ship the whole catalogue.
 */
const DesignRoute = import.meta.env.DEV ? React.lazy(() => import('../design/DesignRoute')) : null;

const LegacyCaseStudyRedirect: React.FC = () => {
    const { id } = useParams();
    return <Navigate to={`/portfolio/${id}`} replace />;
};

const AppRoutes: React.FC = () => {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/portfolio" element={<Navigate to="/#portfolio" replace />} />
                <Route path="/contact" element={<Navigate to="/#contact" replace />} />
                <Route path="/portfolio/:id" element={<CaseStudyPage />} />
                <Route path="/case-study/:id" element={<LegacyCaseStudyRedirect />} />
                {DesignRoute && <Route path="/design/*" element={<DesignRoute />} />}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
};

const App: React.FC = () => (
    // Motion-driven transforms resolve without movement when the visitor asks for less motion.
    <MotionConfig reducedMotion="user">
        <BrowserRouter>
            {/* Layout only. Ink, font and selection come from `body` in index.css,
                so the document default stays ink-strong and white keeps meaning
                emphasis rather than being the floor. */}
            <div className="flex flex-col min-h-screen relative">
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-canvas canvas-atmosphere" />
                <main className="flex-1 w-full relative z-10 flex flex-col">
                    <AppRoutes />
                </main>
            </div>
        </BrowserRouter>
    </MotionConfig>
);

export default App;
