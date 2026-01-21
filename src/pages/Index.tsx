import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProgramCarousel from '@/components/ProgramCarousel';
import AboutSection from '@/components/AboutSection';
import ContextSection from '@/components/ContextSection';
import ResultsSection from '@/components/ResultsSection';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import SkipToContent from '@/components/SkipToContent';
import { programCategories } from '@/data/programs';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SkipToContent />
      <ScrollProgress />
      <Header />
      
      {/* Hero Section */}
      <main id="main-content">
        <Hero />
      
      {/* Programs Catalog - Netflix Style */}
      <section id="programas" className="py-12 md:py-20">
        <div className="container mx-auto">
          <ProgramCarousel
            title={programCategories.popular.title}
            programs={programCategories.popular.programs}
          />
          
          <ProgramCarousel
            title={programCategories.beginner.title}
            programs={programCategories.beginner.programs}
          />
          
          <ProgramCarousel
            title={programCategories.weightLoss.title}
            programs={programCategories.weightLoss.programs}
          />
          
          <ProgramCarousel
            title={programCategories.hypertrophy.title}
            programs={programCategories.hypertrophy.programs}
          />
          
          <ProgramCarousel
            title={programCategories.homeWorkout.title}
            programs={programCategories.homeWorkout.programs}
          />
          
          <ProgramCarousel
            title={programCategories.consulting.title}
            programs={programCategories.consulting.programs}
          />
        </div>
      </section>
      
      {/* About Section */}
      <AboutSection />
      
      {/* Context Section */}
      <ContextSection />
      
      {/* Results Section */}
      <ResultsSection />
      
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
