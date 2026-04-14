const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[linear-gradient(90deg,#ff6a4a_0%,#e5487e_100%)] focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label="Pular para o conteúdo principal"
    >
      Pular para o conteúdo
    </a>
  );
};

export default SkipToContent;
