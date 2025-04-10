
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import StatisticsSection from "@/components/home/StatisticsSection";
import EventsSection from "@/components/home/EventsSection";
import ArticlesSection from "@/components/home/ArticlesSection";
import JoinSection from "@/components/home/JoinSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import ContactSection from "@/components/home/ContactSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <StatisticsSection />
      <EventsSection />
      <ArticlesSection />
      <JoinSection />
      <TestimonialSection />
      <ContactSection />
    </Layout>
  );
};

export default Index;
