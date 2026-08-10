import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import SeoHead from "@/components/SeoHead";
import { PATHS } from "@/config/site";
import { titleWithBrand } from "@/lib/seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <SeoHead
        title={titleWithBrand("Página não encontrada")}
        description="A página que você procura não existe."
        path={location.pathname || "/404"}
        robots="noindex, follow"
      />
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Página não encontrada</p>
        <Link
          to={PATHS.home}
          className="text-gradient underline decoration-[#e5487e]/80 underline-offset-4 hover:brightness-110"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
