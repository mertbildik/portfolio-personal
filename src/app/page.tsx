import type { Metadata } from 'next';
import HomePage from '../homepage/HomePage';
import { HOME_META, toMetadata } from './meta';

export const metadata: Metadata = toMetadata(HOME_META);

export default HomePage;
