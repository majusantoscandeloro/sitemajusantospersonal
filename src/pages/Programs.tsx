import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeoHead from '@/components/SeoHead';
import ProgramCarousel from '@/components/ProgramCarousel';
import { getProgramCatalogItems } from '@/data/catalog';
import { programCategories } from '@/data/programs';
import { getCatalogItemPath } from '@/lib/slugs';
import { titleWithBrand } from '@/lib/seo';
import { PATHS } from '@/config/site';

const Programs = () => {
  const programs = getProgramCatalogItems();

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title={titleWithBrand('Programas de Treino')}
        description="Programas de treino prontos para academia ou casa, com diferentes objetivos e níveis. Acesso pelo Majunity GO."
        path={PATHS.programs}
      />
      <Header />

      <main>
        <section className="theme-navy pb-16 pt-28 md:pb-20 md:pt-32">
          <div className="container mx-auto">
            <div className="mb-5 px-4 md:mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C15847]">
                Catálogo
              </p>
              <h1 className="mt-2 font-display text-[1.75rem] font-bold leading-tight text-white md:text-4xl">
                Programas de treino
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base">
                Escolha seu objetivo e encontre o programa ideal para o seu momento. Eu deixo os
                treinos completos, estruturados e prontos para acompanhar pelo Majunity GO.
              </p>
              <p className="mt-3 text-sm text-white/55">
                Prefere acompanhamento individual?{' '}
                <Link
                  to={PATHS.consulting}
                  className="font-medium text-[#C15847] underline-offset-2 hover:underline"
                >
                  Conheça a Consultoria VIP
                </Link>
                .
              </p>
            </div>

            <ProgramCarousel
              title={programCategories.popular.title}
              programs={programCategories.popular.programs}
              hideTitle
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

            <ProgramCarousel
              title={programCategories.challenges.title}
              programs={programCategories.challenges.programs}
            />

            {/* Lista textual rastreável (além dos carrosséis) */}
            <nav
              className="mt-14 border-t border-white/10 px-4 pt-10 md:px-0"
              aria-label="Lista de programas"
            >
              <h2 className="font-display text-lg font-bold text-white">Todos os programas</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {programs.map((item) => (
                  <li key={`list-${item.id}`}>
                    <Link
                      to={getCatalogItemPath(item)}
                      className="text-white/70 underline-offset-2 hover:text-[#C15847] hover:underline"
                    >
                      {item.subtitle ? `${item.title} — ${item.subtitle}` : item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Programs;
