import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router';
import { MotionConfig } from 'motion/react';

import NotFoundPage from './NotFoundPage';

const HomePage = React.lazy(() => import('../homepage/HomePage'));
const CaseStudyPage = React.lazy(() => import('../portfolio/case-studies/CaseStudyPage'));

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
                so the document default stays ink-high and white keeps meaning
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
