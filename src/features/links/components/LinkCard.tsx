import { useState } from 'react';
import {
  Instagram,
  Youtube,
  ShoppingBag,
  Dumbbell,
  CalendarHeart,
  Sparkles,
  Handshake,
} from 'lucide-react';
import type { LinkItem } from '../types';
import { linksSiteConfig } from '../siteConfig';
import { CouponButton } from './CouponButton';

interface LinkCardProps {
  link: LinkItem;
  index: number;
}

type CardTone = 'soft' | 'solid' | 'split';

function isBannerLayout(link: LinkItem): boolean {
  if (link.layout === 'banner') return true;
  const image = link.imageUrl.toLowerCase();
  return image.includes('imagensbiolink');
}

function getTone(link: LinkItem, index: number): CardTone {
  if (link.featured && link.coupon) return 'solid';
  if (index % 3 === 1) return 'split';
  return 'soft';
}

function CategoryIcon({ category }: { category: string }) {
  const value = category.toLowerCase();
  const className = 'h-4 w-4';

  if (value.includes('instagram')) return <Instagram className={className} strokeWidth={2} />;
  if (value.includes('youtube')) return <Youtube className={className} strokeWidth={2} />;
  if (value.includes('tiktok')) return <Sparkles className={className} strokeWidth={2} />;
  if (value.includes('shopee')) return <ShoppingBag className={className} strokeWidth={2} />;
  if (value.includes('evento') || value.includes('clube')) {
    return <CalendarHeart className={className} strokeWidth={2} />;
  }
  if (value.includes('parceria') || value.includes('marca') || value.includes('suplement')) {
    return <Handshake className={className} strokeWidth={2} />;
  }
  if (value.includes('treino') || value.includes('personal') || value.includes('consultoria')) {
    return <Dumbbell className={className} strokeWidth={2} />;
  }
  return <Sparkles className={className} strokeWidth={2} />;
}

function TitleBlock({
  title,
  category,
  light,
}: {
  title: string;
  category: string;
  light?: boolean;
}) {
  const words = title.trim().split(/\s+/);
  const lastWord = words.length > 1 ? words[words.length - 1] : '';
  const lead = words.length > 1 ? words.slice(0, -1).join(' ') : title;

  return (
    <div>
      {category ? (
        <div
          className={`mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] ${
            light ? 'text-white/85' : 'text-[#c9785c]'
          }`}
        >
          <CategoryIcon category={category} />
          <span>{category}</span>
        </div>
      ) : null}

      <h2
        className={`text-lg font-bold leading-tight sm:text-xl ${
          light ? 'text-white' : 'text-[#3f302b]'
        }`}
      >
        {words.length > 1 ? (
          <>
            {lead}{' '}
            <span className={light ? 'text-[#e8c4b6]' : 'text-[#c9785c]'}>{lastWord}</span>
          </>
        ) : (
          title
        )}
      </h2>
    </div>
  );
}

function BannerCard({ link }: { link: LinkItem }) {
  const [imageSrc, setImageSrc] = useState(link.imageUrl || linksSiteConfig.fallbackImage);

  const label = link.coupon ? 'Cupom de desconto' : link.category || 'Acesse agora';
  const message = link.description?.trim() || 'Acesse o link clicando na imagem';

  return (
    <article className="mx-auto w-full max-w-[680px] overflow-hidden rounded-[40px] bg-white shadow-[0_10px_28px_rgba(63,48,43,0.1)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(63,48,43,0.14)] active:scale-[0.985]">
      <a
        href={link.destinationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block aspect-[865/470] w-full"
        aria-label={`${link.title} — abrir link`}
      >
        <img
          src={imageSrc}
          alt={link.title}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          onError={() => setImageSrc(linksSiteConfig.fallbackImage)}
        />
      </a>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#f4e8e1] bg-[#fcf8f5]/80 px-4 py-2.5 sm:px-5">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium uppercase tracking-wide text-[#746762]">
            {label}
          </p>
          {link.coupon ? (
            <p className="mt-0.5 text-sm text-[#3f302b]">
              Use o cupom{' '}
              <span className="font-semibold text-[#a85c43]">{link.coupon}</span>
            </p>
          ) : (
            <p className="mt-0.5 text-sm font-medium leading-snug text-[#3f302b]">{message}</p>
          )}
        </div>

        {link.coupon ? (
          <CouponButton coupon={link.coupon} tone="light" />
        ) : (
          <a
            href={link.destinationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center rounded-full border border-dashed border-[#c9785c]/70 px-3 py-1.5 text-xs font-semibold text-[#a85c43] transition-all duration-200 hover:bg-[#c9785c]/5 active:scale-95 sm:text-sm"
          >
            Acessar
          </a>
        )}
      </div>
    </article>
  );
}

export function LinkCard({ link, index }: LinkCardProps) {
  const [imageSrc, setImageSrc] = useState(link.imageUrl || linksSiteConfig.fallbackImage);

  if (isBannerLayout(link)) {
    return <BannerCard link={link} />;
  }

  const tone = getTone(link, index);
  const imageOnRight = index % 2 === 1;
  const isSolid = tone === 'solid';
  const isSplit = tone === 'split';

  const shellClass = [
    'group relative mx-auto flex min-h-[120px] w-full max-w-[680px] overflow-hidden rounded-[40px] transition-all duration-300',
    'hover:-translate-y-0.5 active:scale-[0.985]',
    isSolid
      ? 'bg-[#c9785c] shadow-[0_10px_28px_rgba(201,120,92,0.25)] hover:shadow-[0_14px_32px_rgba(168,92,67,0.3)]'
      : isSplit
        ? 'bg-gradient-to-r from-[#fcf8f5] to-[#f4e8e1] shadow-[0_8px_24px_rgba(63,48,43,0.07)] hover:shadow-[0_12px_28px_rgba(63,48,43,0.1)]'
        : 'bg-gradient-to-r from-white via-white to-[#F8EEE8] shadow-[0_8px_24px_rgba(63,48,43,0.07)] hover:shadow-[0_12px_28px_rgba(63,48,43,0.1)]',
  ].join(' ');

  const imageWrapClass = [
    'relative w-full overflow-hidden sm:w-[42%] sm:shrink-0',
    imageOnRight ? 'sm:order-2' : 'sm:order-1',
  ].join(' ');

  const contentClass = [
    'flex flex-1 flex-col justify-center px-4 py-4 sm:px-5 sm:py-4',
    imageOnRight ? 'sm:order-1' : 'sm:order-2',
    isSolid ? 'text-white' : '',
  ].join(' ');

  return (
    <a href={link.destinationUrl} target="_blank" rel="noopener noreferrer" className={shellClass}>
      <div className={imageWrapClass}>
        <div
          className={[
            'h-32 w-full overflow-hidden sm:h-full sm:min-h-[120px]',
            !imageOnRight
              ? 'rounded-t-[40px] sm:rounded-l-[40px] sm:rounded-tr-none'
              : 'rounded-t-[40px] sm:rounded-r-[40px] sm:rounded-tl-none',
          ].join(' ')}
        >
          <img
            src={imageSrc}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            onError={() => setImageSrc(linksSiteConfig.fallbackImage)}
          />
        </div>
      </div>

      <div className={contentClass}>
        <TitleBlock title={link.title} category={link.category} light={isSolid} />

        {link.description ? (
          <p
            className={`mt-1.5 text-[13px] leading-relaxed ${
              isSolid ? 'text-white/85' : 'text-[#746762]'
            }`}
          >
            {link.description}
          </p>
        ) : null}

        {link.featured && !link.coupon ? (
          <span
            className={`mt-2 inline-flex w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
              isSolid ? 'bg-white/20 text-white' : 'bg-[#c9785c]/10 text-[#a85c43]'
            }`}
          >
            Destaque
          </span>
        ) : null}

        {link.coupon ? (
          <div className="mt-3">
            <CouponButton coupon={link.coupon} tone={isSolid ? 'dark' : 'light'} />
          </div>
        ) : null}
      </div>
    </a>
  );
}
