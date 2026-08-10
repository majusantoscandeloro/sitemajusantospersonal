import { Mail, ChevronDown } from 'lucide-react';
import { linksSiteConfig } from '../siteConfig';
import { ShareButton } from './ShareButton';
import { SocialLinks } from './SocialLinks';

export function ProfileHeader() {
  return (
    <header className="relative flex min-h-[50vh] flex-col justify-center py-8 sm:min-h-[55vh] sm:py-12">
      <div className="absolute right-0 top-2 z-10 sm:top-4">
        <ShareButton />
      </div>

      <div className="flex flex-col items-center gap-7 sm:flex-row sm:items-center sm:gap-8 md:gap-10">
        <div className="shrink-0">
          <div className="overflow-hidden rounded-full border-[3px] border-[#e8c4b6]/60 p-1.5 shadow-[0_14px_44px_rgba(201,120,92,0.18)]">
            <img
              src={linksSiteConfig.profileImage}
              alt={`Foto de ${linksSiteConfig.name}`}
              width={300}
              height={300}
              className="h-52 w-52 rounded-full object-cover object-center sm:h-60 sm:w-60 md:h-[280px] md:w-[280px]"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

        <div className="w-full min-w-0 text-center sm:text-left">
          <h1 className="bl-font-script text-5xl font-bold leading-[0.95] text-[#c9785c] sm:text-[3.4rem] md:text-[3.75rem]">
            {linksSiteConfig.name}
          </h1>

          <p className="mt-4 text-lg font-medium leading-snug text-[#3f302b] sm:text-xl">
            {linksSiteConfig.headline}
          </p>

          <div className="mt-6 flex flex-col items-center gap-4 sm:items-start">
            {linksSiteConfig.social.email ? (
              <a
                href={`mailto:${linksSiteConfig.social.email}`}
                className="inline-flex items-center gap-2.5 text-sm text-[#3f302b] transition-colors hover:text-[#c9785c]"
              >
                <Mail className="h-[18px] w-[18px] shrink-0 text-[#c9785c]" strokeWidth={1.7} />
                {linksSiteConfig.social.email}
              </a>
            ) : null}

            <SocialLinks />
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center sm:mt-14">
        <a
          href="#links"
          className="bl-animate-bounce text-[#c9785c]/70 transition-colors hover:text-[#c9785c]"
          aria-label="Ver links"
        >
          <ChevronDown className="h-7 w-7" strokeWidth={1.6} />
        </a>
      </div>
    </header>
  );
}
