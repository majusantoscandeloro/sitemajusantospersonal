import { RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="mt-8 rounded-[28px] border border-[#e8c4b6]/60 bg-white px-6 py-10 text-center shadow-[0_8px_28px_rgba(63,48,43,0.05)]">
      <p className="mx-auto max-w-sm text-sm leading-relaxed text-[#746762] sm:text-base">
        Não foi possível carregar os links agora. Tente novamente em alguns instantes.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#c9785c] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#a85c43] active:scale-95"
      >
        <RefreshCw className="h-4 w-4" strokeWidth={2.2} />
        Tentar novamente
      </button>
    </div>
  );
}
