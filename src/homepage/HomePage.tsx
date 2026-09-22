import React, { useEffect } from 'react';
import PageMeta from '../app/PageMeta';
import { HOME_META } from '../app/meta';
import ContactSection from '../contact/ContactSection';
import PortfolioSection from '../portfolio/PortfolioSection';
import HeroSection from './HeroSection';
import HomePageSection from './HomePageSection';

const HomePage: React.FC = () => {
    useEffect(() => {
        if (window.location.hash) {
            document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
        }
    }, []);

    return (
        <>
            <PageMeta title={HOME_META.title} />
            <HomePageSection id="home" hero>
                <HeroSection />
            </HomePageSection>
            <HomePageSection id="portfolio">
                <PortfolioSection />
            </HomePageSection>
            <HomePageSection id="contact">
                <ContactSection />
            </HomePageSection>
        </>
    );
};

export default HomePage;
