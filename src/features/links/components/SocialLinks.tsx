import { Instagram } from 'lucide-react';
import { linksSiteConfig } from '../siteConfig';
import TikTokIcon from '@/components/icons/TikTok';

const iconClass =
  'flex h-11 w-11 items-center justify-center rounded-full bg-[#f4e8e1] text-[#c9785c] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e8c4b6]/50 hover:text-[#a85c43] active:scale-95';

export function SocialLinks() {
  const { instagram, tiktok } = linksSiteConfig.social;

  const links = [
    {
      key: 'instagram',
      href: instagram,
      label: 'Instagram',
      icon: <Instagram className="h-5 w-5" strokeWidth={1.8} />,
    },
    {
      key: 'tiktok',
      href: tiktok,
      label: 'TikTok',
      icon: <TikTokIcon size={20} className="h-5 w-5" />,
    },
  ].filter((link) => Boolean(link.href));

  if (links.length === 0) return null;

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-3 sm:justify-start"
      aria-label="Redes sociais"
    >
      {links.map((link) => (
        <a
          key={link.key}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={iconClass}
          aria-label={link.label}
        >
          {link.icon}
        </a>
      ))}
    </nav>
  );
}
