import { ExternalLink, Instagram, Mail, MapPin, Play } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeoHead from '@/components/SeoHead';
import PageBreadcrumb, { homeCrumb } from '@/components/PageBreadcrumb';
import AnimatedSection from '@/components/AnimatedSection';
import WhatsAppIcon from '@/components/icons/WhatsApp';
import TikTokIcon from '@/components/icons/TikTok';
import { Button } from '@/components/ui/button';
import { PATHS, WHATSAPP_URL } from '@/config/site';
import { absoluteUrl, titleWithBrand } from '@/lib/seo';
import { buildBreadcrumbJsonLd } from '@/lib/schema';
import {
  UGC_WHATSAPP_MESSAGE,
  ugcAbout,
  ugcBestVideos,
  ugcBrands,
  ugcCollaborate,
  ugcImages,
  ugcInstagramPanel,
  ugcNiches,
  ugcServices,
  type UgcVideo,
} from '@/data/ugcCreator';

const whatsappUgcUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(UGC_WHATSAPP_MESSAGE)}`;

function UgcVideoCard({ video, dark }: { video: UgcVideo; dark?: boolean }) {
  const hasVideo = Boolean(video.videoSrc);
  const posterFit = video.posterFit === 'contain' ? 'object-contain' : 'object-cover';

  return (
    <article className="group flex flex-col">
      <div
        className={`relative aspect-[9/16] overflow-hidden rounded-2xl ${
          video.posterFit === 'contain' ? 'bg-[#F5F0ED]' : 'bg-[#101B30]/[6%]'
        }`}
      >
        {hasVideo ? (
          <video
            className={`h-full w-full ${posterFit}`}
            src={video.videoSrc}
            {...(video.poster ? { poster: video.poster } : {})}
            controls
            playsInline
            preload="metadata"
          />
        ) : video.poster ? (
          <>
            <img
              src={video.poster}
              alt={`${video.brand} — ${video.category}`}
              className={`h-full w-full ${posterFit} transition-transform duration-700 group-hover:scale-[1.03]`}
              loading="lazy"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#743B38]/45 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#C15847] shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                <Play className="ml-0.5 h-6 w-6 fill-current" aria-hidden />
              </span>
            </div>
            <p className="absolute bottom-4 left-4 right-4 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-white/90">
              Vídeo em breve
            </p>
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#F5F0ED]/15 px-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#C15847] shadow-lg">
              <Play className="ml-0.5 h-6 w-6 fill-current" aria-hidden />
            </span>
            <p className="text-center text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
              Vídeo em breve
            </p>
          </div>
        )}
      </div>

      <div className="mt-3 text-center">
        <p className={`text-sm font-semibold ${dark ? 'text-white' : 'text-foreground'}`}>
          {video.brand}
        </p>
        <p className={`mt-0.5 text-xs italic ${dark ? 'text-white/55' : 'text-muted-foreground'}`}>
          {video.category}
        </p>
      </div>

      {video.fullUrl ? (
        <a
          href={video.fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-3 inline-flex min-h-[40px] items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
            dark
              ? 'text-[#E8A498] hover:text-white'
              : 'text-[#C15847] hover:text-[#743B38]'
          }`}
        >
          Ver completo
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      ) : null}
    </article>
  );
}

const UgcCreator = () => {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title={titleWithBrand('UGC Creator')}
        description="Portfólio de UGC da Maju Santos: conteúdos autênticos em fitness, beauty e lifestyle para marcas que buscam conexão real."
        path={PATHS.ugcCreator}
        jsonLd={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'ProfilePage',
              name: 'Maju Santos — UGC Creator',
              description:
                'Criadora de conteúdo UGC em fitness, beauty e lifestyle.',
              url: absoluteUrl(PATHS.ugcCreator),
            },
            buildBreadcrumbJsonLd([
              { name: 'Início', path: PATHS.home },
              { name: 'UGC Creator', path: PATHS.ugcCreator },
            ]),
          ],
        }}
      />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative min-h-[88vh] overflow-hidden" aria-labelledby="ugc-hero-title">
          <img
            src={ugcImages.hero}
            alt="Maju Santos, UGC Creator"
            className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101B30]/80 via-[#101B30]/35 to-[#101B30]/20" />

          <div className="relative z-10 flex min-h-[88vh] flex-col justify-end px-4 pb-16 pt-28 md:pb-20 md:pt-32">
            <div className="container mx-auto">
              <PageBreadcrumb
                className="mb-8 text-white/55 [&_a]:text-white/70 [&_a:hover]:text-[#C15847] [&_[aria-current=page]]:text-white"
                items={[homeCrumb, { label: 'UGC Creator' }]}
              />
              <AnimatedSection animation="fade-in">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/75">
                  Criadora de conteúdo UGC
                </p>
                <h1
                  id="ugc-hero-title"
                  className="mt-3 max-w-3xl font-display text-5xl font-bold leading-[1.05] text-white md:text-7xl"
                >
                  Maju Santos
                </h1>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">
                  Rotina real, estética natural e conteúdos que conectam marcas e pessoas.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg" className="min-h-[48px] bg-[#B84F3E] hover:bg-[#743B38]">
                    <a href="#melhores-videos">Ver portfólio</a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="min-h-[48px] border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  >
                    <a href={whatsappUgcUrl} target="_blank" rel="noopener noreferrer">
                      <WhatsAppIcon size={18} className="mr-2 h-4 w-4" />
                      Falar no WhatsApp
                    </a>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-[#F5F0ED]/95 backdrop-blur-sm">
            <p className="container mx-auto px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-[#743B38] md:text-xs">
              {ugcNiches.join(' · ')}
            </p>
          </div>
        </section>

        {/* Sobre */}
        <section className="py-20 md:py-28" aria-labelledby="ugc-about-title">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <AnimatedSection animation="slide-up">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C15847]">
                  {ugcAbout.eyebrow}
                </p>
                <h2
                  id="ugc-about-title"
                  className="mt-3 font-display text-3xl font-bold text-foreground md:text-5xl"
                >
                  {ugcAbout.title}
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {ugcAbout.paragraphs.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <a
                    href="https://www.instagram.com/majusantospersonal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-[#C15847] hover:text-[#C15847]"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@majusantospersonal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-[#C15847] hover:text-[#C15847]"
                    aria-label="TikTok"
                  >
                    <TikTokIcon size={20} className="h-5 w-5" />
                  </a>
                  <a
                    href={whatsappUgcUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-[#C15847] hover:text-[#C15847]"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon size={20} className="h-5 w-5" />
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="scale-in" delay={120}>
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#C15847]/20 to-[#101B30]/10 blur-2xl" />
                  <img
                    src={ugcImages.about}
                    alt="Maju Santos sorrindo com notebook e squeeze"
                    className="relative aspect-[3/4] w-full rounded-[1.75rem] object-cover object-top shadow-[var(--shadow-card)]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section
          className="border-y border-border/60 bg-[#EBE3DE]/55 py-20 md:py-24"
          aria-labelledby="ugc-services-title"
        >
          <div className="container mx-auto px-4">
            <AnimatedSection animation="slide-up" className="mx-auto max-w-2xl text-center">
              <h2
                id="ugc-services-title"
                className="font-display text-3xl font-bold md:text-4xl"
              >
                O que eu produzo
              </h2>
              <p className="mt-3 text-muted-foreground">
                Formatos pensados para parecer nativos no feed — e performar quando viram anúncio.
              </p>
            </AnimatedSection>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ugcServices.map((service, i) => (
                <AnimatedSection key={service.title} animation="slide-up" delay={i * 60}>
                  <div className="h-full border-t-2 border-[#C15847]/80 pt-5">
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Melhores vídeos */}
        <section
          id="melhores-videos"
          className="scroll-mt-24 bg-[#743B38] py-20 md:py-28"
          aria-labelledby="ugc-videos-title"
        >
          <div className="container mx-auto px-4">
            <AnimatedSection animation="fade-in" className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E8A498]">
                Portfólio
              </p>
              <h2
                id="ugc-videos-title"
                className="mt-3 font-display text-3xl font-bold text-white md:text-5xl"
              >
                Melhores vídeos
              </h2>
              <p className="mt-4 text-white/70">
                Alguns dos conteúdos produzidos para marcas.
              </p>
            </AnimatedSection>

            <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 md:gap-6">
              {ugcBestVideos.map((video, i) => (
                <AnimatedSection key={video.id} animation="scale-in" delay={i * 50}>
                  <UgcVideoCard video={video} dark />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Marcas */}
        <section className="border-y border-border/50 bg-[#EBE3DE]/40 py-20 md:py-24" aria-labelledby="ugc-brands-title">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
              <AnimatedSection animation="slide-left">
                <img
                  src={ugcImages.brands}
                  alt="Maju Santos em produção de conteúdo"
                  className="aspect-[3/4] w-full max-w-md rounded-2xl object-cover shadow-[var(--shadow-card)] lg:max-w-none"
                  loading="lazy"
                  decoding="async"
                />
              </AnimatedSection>

              <AnimatedSection animation="slide-up" delay={80}>
                <h2
                  id="ugc-brands-title"
                  className="font-display text-3xl font-bold md:text-4xl"
                >
                  Marcas com quem já trabalhei
                </h2>
                <p className="mt-3 max-w-md text-muted-foreground">
                  Parcerias em moda fitness, lifestyle e nutrição — sempre com autenticidade.
                </p>
                <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-2">
                  {ugcBrands.map((brand) => (
                    <li
                      key={brand.name}
                      className="flex min-h-[112px] items-center justify-center overflow-hidden border border-[#743B38]/15 bg-background px-4 py-6 md:min-h-[120px]"
                    >
                      {brand.image ? (
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className="max-h-14 w-auto max-w-[170px] object-contain md:max-h-16 md:max-w-[190px]"
                          style={
                            brand.scale
                              ? { transform: `scale(${brand.scale})` }
                              : undefined
                          }
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <span className="font-display text-lg font-semibold tracking-wide text-[#171717] md:text-xl">
                          {brand.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Como trabalhar juntos */}
        <section className="py-20 md:py-28" aria-labelledby="ugc-collab-title">
          <div className="container mx-auto px-4">
            <AnimatedSection animation="fade-in" className="text-center">
              <h2
                id="ugc-collab-title"
                className="font-display text-3xl font-bold md:text-4xl"
              >
                {ugcCollaborate.title}
              </h2>
            </AnimatedSection>

            <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
              <AnimatedSection animation="slide-up">
                <div className="flex h-full items-center bg-[#EBE3DE]/70 p-8 md:p-10">
                  <p className="text-base leading-relaxed text-foreground/80 md:text-lg">
                    {ugcCollaborate.pitch}
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="scale-in" delay={80} className="hidden lg:block">
                <img
                  src={ugcImages.gallery[2]}
                  alt="Maju Santos"
                  className="h-full min-h-[420px] w-[280px] rounded-2xl object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </AnimatedSection>

              <AnimatedSection animation="slide-up" delay={120}>
                <div className="flex h-full flex-col justify-center bg-[#EBE3DE]/70 p-8 md:p-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C15847]">
                    Formatos
                  </p>
                  <ul className="mt-5 space-y-3">
                    {ugcCollaborate.bullets.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-foreground">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C15847]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Painel profissional Instagram */}
        <section
          className="border-t border-border/50 bg-background py-20 md:py-28"
          aria-labelledby="ugc-instagram-title"
        >
          <div className="container mx-auto px-4">
            <AnimatedSection animation="fade-in" className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C15847]">
                Instagram
              </p>
              <h2
                id="ugc-instagram-title"
                className="mt-3 font-display text-3xl font-bold md:text-5xl"
              >
                @majusantospersonal
              </h2>
              <p className="mt-3 text-muted-foreground">
                Crescimento orgânico · audiência ativa · conteúdo autoral
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/45">
                Nichos: {ugcNiches.join(' · ')}
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 min-h-[48px] bg-[#B84F3E] px-8 hover:bg-[#743B38]"
              >
                <a
                  href="https://www.instagram.com/majusantospersonal/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="mr-2 h-5 w-5" />
                  Ver no Instagram
                </a>
              </Button>
            </AnimatedSection>

            <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
              {ugcInstagramPanel.map((item, i) => (
                <AnimatedSection key={item.id} animation="slide-up" delay={i * 70}>
                  <figure className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-[var(--shadow-card)]">
                    <img
                      src={item.image}
                      alt={`${item.label} — Instagram @majusantospersonal`}
                      className="w-full object-cover object-top"
                      loading="lazy"
                      decoding="async"
                    />
                    <figcaption className="border-t border-border/40 px-3 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
                      {item.label}
                    </figcaption>
                  </figure>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section
          className="border-t border-border/50 bg-[#EBE3DE]/60 py-20 md:py-28"
          aria-labelledby="ugc-cta-title"
        >
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
              <AnimatedSection animation="scale-in" className="order-2 lg:order-1">
                <img
                  src={ugcImages.cta}
                  alt="Maju Santos"
                  className="aspect-[4/5] w-full max-w-md rounded-2xl object-cover object-[center_20%] shadow-[var(--shadow-card)] lg:max-w-none"
                  loading="lazy"
                  decoding="async"
                />
              </AnimatedSection>

              <AnimatedSection animation="slide-up" className="order-1 text-center lg:order-2 lg:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C15847]">
                  Parcerias
                </p>
                <h2
                  id="ugc-cta-title"
                  className="mt-3 font-display text-3xl font-bold text-foreground md:text-5xl"
                >
                  Vamos trabalhar juntos?
                </h2>
                <p className="mx-auto mt-4 max-w-md text-muted-foreground lg:mx-0">
                  Conte sobre a marca e o tipo de conteúdo. Respondo pelo WhatsApp.
                  Para envio de produtos, combine por lá.
                </p>

                <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:items-start lg:items-center">
                  <Button
                    asChild
                    size="lg"
                    className="min-h-[52px] bg-[#B84F3E] px-8 hover:bg-[#743B38]"
                  >
                    <a href={whatsappUgcUrl} target="_blank" rel="noopener noreferrer">
                      <WhatsAppIcon size={20} className="mr-2 h-5 w-5" />
                      Falar no WhatsApp
                    </a>
                  </Button>

                  <div className="space-y-2 text-sm text-foreground/70">
                    <p className="flex items-center justify-center gap-2 lg:justify-start">
                      <Instagram className="h-4 w-4 text-[#C15847]" />
                      <a
                        href="https://www.instagram.com/majusantospersonal/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-[#C15847]"
                      >
                        @majusantospersonal
                      </a>
                    </p>
                    <p className="flex items-center justify-center gap-2 lg:justify-start">
                      <MapPin className="h-4 w-4 text-[#C15847]" />
                      Marília — SP
                    </p>
                    <p className="flex items-center justify-center gap-2 lg:justify-start">
                      <Mail className="h-4 w-4 shrink-0 text-[#C15847]" />
                      <a
                        href="mailto:majuscandeloro@outlook.com"
                        className="transition-colors hover:text-[#C15847]"
                      >
                        majuscandeloro@outlook.com
                      </a>
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default UgcCreator;
