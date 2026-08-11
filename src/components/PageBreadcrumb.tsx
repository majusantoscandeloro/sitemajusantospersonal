import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { PATHS } from '@/config/site';

export type BreadcrumbCrumb = {
  label: string;
  path?: string;
};

type PageBreadcrumbProps = {
  items: BreadcrumbCrumb[];
  className?: string;
};

/**
 * Breadcrumb visual simples, alinhado ao BreadcrumbList JSON-LD.
 */
const PageBreadcrumb = ({ items, className = '' }: PageBreadcrumbProps) => {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={`mb-8 text-sm text-foreground/60 ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              )}
              {isLast || !item.path ? (
                <span className="font-medium text-foreground" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.path} className="hover:text-primary">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export const homeCrumb: BreadcrumbCrumb = { label: 'Início', path: PATHS.home };

export default PageBreadcrumb;
