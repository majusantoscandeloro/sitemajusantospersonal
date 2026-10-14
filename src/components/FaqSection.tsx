import { SITE_FAQ } from '@/data/siteFaq.mjs';

const FaqSection = () => {
  return (
    <section id="duvidas" className="border-t border-[#EBE3DE] bg-[#F5F0ED] py-14 md:py-20" aria-labelledby="duvidas-title">
      <div className="container mx-auto max-w-3xl px-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#743B38]">Dúvidas</p>
        <h2 id="duvidas-title" className="mt-2 font-display text-[1.75rem] font-bold leading-tight text-[#171717] md:text-4xl">
          Antes de comprar
        </h2>
        <div className="mt-8 divide-y divide-[#EBE3DE] border-y border-[#EBE3DE]">
          {SITE_FAQ.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="cursor-pointer list-none text-base font-semibold text-[#171717] marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {item.q}
                  <span aria-hidden className="text-[#C15847] group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[#343131] md:text-base">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
