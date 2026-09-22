/**
 * The living design system, at /design.
 *
 * Development only. App.tsx mounts this behind `import.meta.env.DEV`, which Vite
 * replaces with `false` in a build, so Rollup drops the whole tree: no chunk, no
 * route, nothing in sitemap.xml. In production /design is an unknown path like
 * any other and renders the 404.
 *
 * That gate is also what lets these pages read the source directly — theme.ts
 * parses index.css, census.ts imports every component as raw text — which would
 * be dead weight in anything shipped.
 */
import React from 'react';
import { Route, Routes, useLocation } from 'react-router';
import PageMeta from '../app/PageMeta';
import { Shell } from './chrome';
import Overview from './pages/Overview';
import Type from './pages/Type';
import Colour from './pages/Colour';
import Space from './pages/Space';
import Surfaces from './pages/Surfaces';
import Motion from './pages/Motion';
import Components from './pages/Components';

/** Sub-pages are long; landing halfway down the next one is never what was meant. */
const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();

    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathname]);

    return null;
};

const DesignRoute: React.FC = () => (
    <>
        <PageMeta title="Design system — Mert Bildik" />
        <ScrollToTop />
        <Shell>
            <Routes>
                <Route index element={<Overview />} />
                <Route path="type" element={<Type />} />
                <Route path="colour" element={<Colour />} />
                <Route path="space" element={<Space />} />
                <Route path="surfaces" element={<Surfaces />} />
                <Route path="motion" element={<Motion />} />
                <Route path="components" element={<Components />} />
            </Routes>
        </Shell>
    </>
);

export default DesignRoute;
