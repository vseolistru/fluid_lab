// src/pages/Landing.tsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Landing/Hero/Hero';
import ScrollVideoSection from '../components/Landing/Hero/ScrollVideoSection';
import ProcessSection from '../components/Landing/Hero/ProcessSection';
import Header from '../components/Header/Header';
import TechnologySection from '../components/Landing/TechnologySection/TechnologySection';
import CompositionSection from '../components/Landing/TechnologySection/CompositionSection';
import ProductSection from '../components/Landing/TechnologySection/ProductSection';
import ExtractsSection from '../components/Landing/TechnologySection/ExtractsSection';
import ApplicationsSection from '../components/Landing/AplicationSection/AplicationSection';
import WorkFormatsSection from '../components/Landing/AplicationSection/WorkFormatsSection';
import WorkflowSection from '../components/Landing/AplicationSection/WorkflowSection';
import QualitySection from '../components/Landing/AplicationSection/QualitySection';
import FAQSection from '../components/Landing/AplicationSection/FAQSection';
import LandingFooter from '../components/Footer/LandingFooter';


const Landing: React.FC = () => {

	const [cartCount] = useState(2)
  	const [wishlistCount] = useState(5)

  return (
    <>
      <Helmet>
        <title>FluidLab — SC‑CO₂-экстракты и разработка технологии</title>
        <meta
          name="description"
          content="Производим растительные CO₂-экстракты из собственного сырья и сырья заказчика. Разрабатываем технологию экстракции, согласуем форму, концентрацию и упаковку."
        />
        <meta
          name="keywords"
          content="производство co2 экстрактов, co2 экстракты оптом от производителя, услуги флюидной экстракции растений, контрактное производство растительных экстрактов, разработка технологии экстракции на заказ"
        />
        
        {/* Open Graph для соцсетей */}
        <meta property="og:title" content="FluidLab — SC‑CO₂-экстракты и разработка технологии" />
        <meta
          property="og:description"
          content="Производим растительные CO₂-экстракты из собственного сырья и сырья заказчика. Разрабатываем технологию экстракции, согласуем форму, концентрацию и упаковку."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fluidlab.ru" />
        <meta property="og:image" content="/static/images/fluid_lab.avif" />
        
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/icons.svg" />
		  </Helmet>
		  
      {/* Header — sticky меню */}
      <Header cartCount={cartCount} wishlistCount={wishlistCount} />
      <main>
			<Hero />
			<ScrollVideoSection />
			<ProcessSection />
			  <TechnologySection />
			  <CompositionSection />
			  <ProductSection />
			  <ExtractsSection />
			  <ApplicationsSection />
			  <WorkFormatsSection />
			  <WorkflowSection />
			  <QualitySection />
			  <FAQSection />
			  <LandingFooter/>
        {/* Здесь будут другие секции */}
      </main>
    </>
  )
}

export default Landing