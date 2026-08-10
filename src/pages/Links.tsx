import { useCallback, useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeoHead from '@/components/SeoHead';
import { PATHS } from '@/config/site';
import { titleWithBrand } from '@/lib/seo';
import { ProfileHeader } from '@/features/links/components/ProfileHeader';
import { LinkCard } from '@/features/links/components/LinkCard';
import { LoadingSkeleton } from '@/features/links/components/LoadingSkeleton';
import { ErrorState } from '@/features/links/components/ErrorState';
import { fetchLinksFromSheet } from '@/features/links/googleSheets';
import type { LinkItem } from '@/features/links/types';
import '@/features/links/links.css';

type LoadState = 'loading' | 'success' | 'error';

const Links = () => {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [status, setStatus] = useState<LoadState>('loading');

  const loadLinks = useCallback(async () => {
    setStatus('loading');
    try {
      const data = await fetchLinksFromSheet();
      setLinks(data);
      setStatus('success');
    } catch {
      setLinks([]);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    void loadLinks();
  }, [loadLinks]);

  useEffect(() => {
    const id = 'biolinks-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Montserrat:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title={titleWithBrand('Links')}
        description="Todos os links da Maju Santos em um só lugar: consultoria, marcas, achadinhos e redes."
        path={PATHS.links}
      />
      <Header />

      <main className="biolinks relative overflow-x-hidden pt-20 md:pt-24">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFFCFB] via-[#fcf8f5] to-[#F3E4DB]" />
          <div className="absolute left-[-10%] top-0 h-[55vh] w-[70%] rounded-full bg-gradient-to-br from-[#e8c4b6]/35 via-[#f4e8e1]/40 to-transparent blur-2xl" />
          <div className="absolute bottom-0 right-[-15%] h-[50vh] w-[55%] rounded-full bg-gradient-to-tl from-[#c9785c]/10 via-[#e8c4b6]/20 to-transparent blur-3xl" />
        </div>

        <div className="mx-auto w-full max-w-[760px] px-4 pb-8 sm:px-5">
          <ProfileHeader />

          {status === 'loading' ? <LoadingSkeleton /> : null}
          {status === 'error' ? <ErrorState onRetry={loadLinks} /> : null}

          {status === 'success' ? (
            <section id="links" className="mt-8 scroll-mt-6 space-y-3.5" aria-label="Links">
              {links.map((link, index) => (
                <LinkCard key={link.id} link={link} index={index} />
              ))}
            </section>
          ) : null}

          <p className="mt-12 border-t border-[#f4e8e1] pt-8 text-center text-sm text-[#746762]">
            Treino, saúde e uma rotina possível
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Links;
