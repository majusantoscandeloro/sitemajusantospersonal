import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeoHead from '@/components/SeoHead';
import PageBreadcrumb, { homeCrumb } from '@/components/PageBreadcrumb';
import ProgramCarousel from '@/components/ProgramCarousel';
import { programCategories } from '@/data/programs';
import { getConsultingCatalogItems } from '@/data/catalog';
import { titleWithBrand } from '@/lib/seo';
import { buildConsultingServiceJsonLd } from '@/lib/schema';
import { PATHS } from '@/config/site';

const Consulting = () => {
  const plans = getConsultingCatalogItems();

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title={titleWithBrand('Consultoria Personal Online')}
        description="Consultoria VIP com acompanhamento individual: planejamento ajustado à sua rotina, suporte e análise de execução. Escolha o plano mensal, trimestral ou semestral."
        path={PATHS.consulting}
        jsonLd={buildConsultingServiceJsonLd(plans)}
      />
      <Header />

      <main>
        <section
          className="theme-navy pb-16 pt-28 md:pb-20 md:pt-32"
          aria-labelledby="consultoria-page-title"
        >
          <div className="container mx-auto">
            <div className="mb-5 px-4 md:mb-8">
              <PageBreadcrumb
                className="mb-6 text-white/55 [&_a]:text-white/70 [&_a:hover]:text-[#C15847] [&_[aria-current=page]]:text-white"
                items={[homeCrumb, { label: 'Consultoria Online' }]}
              />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C15847]">
                Planos
              </p>
              <h1
                id="consultoria-page-title"
                className="mt-2 font-display text-[1.75rem] font-bold leading-tight text-white md:text-4xl"
              >
                Consultoria VIP Online
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base">
                {programCategories.consulting.description}
              </p>
            </div>

            <ProgramCarousel
              title={programCategories.consulting.title}
              programs={programCategories.consulting.programs}
              hideTitle
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Consulting;
