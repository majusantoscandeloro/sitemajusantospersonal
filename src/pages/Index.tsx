import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProgramCarousel from '@/components/ProgramCarousel';
import AppAccessSection from '@/components/AppAccessSection';
import AboutSection from '@/components/AboutSection';
import RoutineSection from '@/components/RoutineSection';
import ContextSection from '@/components/ContextSection';
import ResultsSection from '@/components/ResultsSection';
import FinalCtaSection from '@/components/FinalCtaSection';
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

      <main id="main-content">
        <Hero />

        {/* 1. Programas — navy, logo após o Hero */}
        <section id="programas" className="theme-navy py-14 md:py-20">
          <div className="container mx-auto">
            <div className="mb-6 px-4 md:mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C15847]">
                Catálogo
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">
                Programas mais procurados
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base">
                Escolha seu objetivo e encontre o programa ideal para o seu momento. Treinos
                completos, estruturados e prontos para acompanhar pelo Majunity GO.
              </p>
            </div>

            <ProgramCarousel
              title={programCategories.popular.title}
              programs={programCategories.popular.programs}
              hideTitle
            />

            <ProgramCarousel
              title={programCategories.challenges.title}
              programs={programCategories.challenges.programs}
            />

            <ProgramCarousel
              title={programCategories.beginner.title}
              programs={programCategories.beginner.programs}
            />

            <ProgramCarousel
              title={programCategories.hypertrophy.title}
              programs={programCategories.hypertrophy.programs}
            />

            <ProgramCarousel
              title={programCategories.weightLoss.title}
              programs={programCategories.weightLoss.programs}
            />

            <ProgramCarousel
              title={programCategories.homeWorkout.title}
              programs={programCategories.homeWorkout.programs}
            />

            <div id="consultoria-planos">
              <ProgramCarousel
                title={programCategories.consulting.title}
                description={programCategories.consulting.description}
                programs={programCategories.consulting.programs}
              />
            </div>
          </div>
        </section>

        {/* 2. Resultados / prova social cedo */}
        <ResultsSection />

        {/* 3. Sobre */}
        <AboutSection />

        {/* 4. Consultoria */}
        <RoutineSection />

        {/* 5. App */}
        <AppAccessSection />

        {/* 6. Método */}
        <ContextSection />

        {/* 7. CTA final */}
        <FinalCtaSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
