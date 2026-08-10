export function LoadingSkeleton() {
  return (
    <div
      id="links"
      className="mt-8 space-y-3.5"
      aria-busy="true"
      aria-label="Carregando links"
    >
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className="mx-auto w-full max-w-[680px] overflow-hidden rounded-[40px] bg-white shadow-[0_8px_24px_rgba(63,48,43,0.05)]"
        >
          <div className="aspect-[865/470] w-full animate-pulse bg-[#f4e8e1]" />
        </div>
      ))}
    </div>
  );
}
