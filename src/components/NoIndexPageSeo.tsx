import SeoHead from '@/components/SeoHead';
import { titleWithBrand } from '@/lib/seo';

interface NoIndexPageSeoProps {
  title: string;
  description?: string;
  path: string;
}

/** SEO para páginas transacionais / privadas: noindex, follow. */
export function NoIndexPageSeo({
  title,
  description = 'Página interna do site Maju Santos.',
  path,
}: NoIndexPageSeoProps) {
  return (
    <SeoHead
      title={titleWithBrand(title)}
      description={description}
      path={path}
      robots="noindex, follow"
    />
  );
}

export default NoIndexPageSeo;
