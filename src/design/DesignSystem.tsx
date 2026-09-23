'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { provideSource, type Source } from './source';

/**
 * The catalogue measures the live document as it renders, so it renders in the
 * browser alone, and it loads only after the source it parses is in place.
 */
const DesignRoute = dynamic(() => import('./DesignRoute'), { ssr: false });

const DesignSystem: React.FC<Source> = (source) => {
    provideSource(source);
    return <DesignRoute />;
};

export default DesignSystem;
