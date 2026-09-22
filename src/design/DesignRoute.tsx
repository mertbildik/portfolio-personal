/**
 * The living design system, at /design.
 *
 * Development only. Its one route file is src/app/design/[[...page]]/page.dev.tsx,
 * and only the dev server treats `.dev.tsx` as a page, so a build has no /design
 * route and bundles nothing under src/design/: in production /design is an
 * unknown path like any other and renders the 404. src/index.css leaves this
 * folder out of the site's stylesheet for the same reason; design.css covers
 * the catalogue's own classes.
 *
 * That gate is also what lets these pages read the source directly — theme.ts
 * parses index.css, census.ts counts classes across every component — which
 * would be dead weight in anything shipped.
 */
import React from 'react';
import { usePathname } from 'next/navigation';
import { Shell } from './chrome';
import Overview from './pages/Overview';
import Type from './pages/Type';
import Colour from './pages/Colour';
import Space from './pages/Space';
import Surfaces from './pages/Surfaces';
import Motion from './pages/Motion';
import Components from './pages/Components';
import './design.css';

const PAGES: Record<string, React.FC> = {
    '/design': Overview,
    '/design/type': Type,
    '/design/colour': Colour,
    '/design/space': Space,
    '/design/surfaces': Surfaces,
    '/design/motion': Motion,
    '/design/components': Components,
};

const DesignRoute: React.FC = () => {
    const pathname = usePathname();
    const Page = PAGES[pathname];

    // Sub-pages are long; landing halfway down the next one is never what was meant.
    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathname]);

    return <Shell>{Page && <Page />}</Shell>;
};

export default DesignRoute;
