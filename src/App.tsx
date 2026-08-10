import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { PixelInit } from "@/components/PixelInit";
import { AnalyticsRoutes } from "@/components/AnalyticsInit";
import {
  EVENTOS_PATH,
  WELLNESS_INSCRICAO_PATH,
  WELLNESS_PATH,
} from "@/data/wellnessExperience";
import { PATHS } from "@/config/site";
import ErrorBoundary from "./components/ErrorBoundary";

/** Home eager — LCP / primeira pintura. Demais rotas em chunks separados. */
import Index from "./pages/Index";

const Programs = lazy(() => import("./pages/Programs"));
const ProgramPage = lazy(() => import("./pages/ProgramPage"));
const Consulting = lazy(() => import("./pages/Consulting"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Success = lazy(() => import("./pages/Success"));
const Pending = lazy(() => import("./pages/Pending"));
const Failure = lazy(() => import("./pages/Failure"));
const MyAccount = lazy(() => import("./pages/MyAccount"));
const WellnessExperience = lazy(() => import("./pages/WellnessExperience"));
const Eventos = lazy(() => import("./pages/Eventos"));
const LegacyWellnessRedirect = lazy(() => import("./pages/LegacyWellnessRedirect"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function RouteFallback() {
  return (
    <div
      className="flex min-h-[40vh] items-center justify-center bg-background"
      role="status"
      aria-live="polite"
    >
      <span className="text-sm text-foreground/55">Carregando…</span>
    </div>
  );
}

const App = () => {
  try {
    return (
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <PixelInit />
            <AuthProvider>
              <CartProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <AnalyticsRoutes />
                  <Suspense fallback={<RouteFallback />}>
                    <Routes>
                      <Route path={PATHS.home} element={<Index />} />
                      <Route path={PATHS.programs} element={<Programs />} />
                      <Route path="/programas/:slug" element={<ProgramPage />} />
                      <Route path={PATHS.consulting} element={<Consulting />} />
                      <Route path={PATHS.cart} element={<Cart />} />
                      <Route path={PATHS.checkout} element={<Checkout />} />
                      <Route path={PATHS.success} element={<Success />} />
                      <Route path={PATHS.obrigado} element={<Success />} />
                      <Route path={PATHS.pending} element={<Pending />} />
                      <Route path={PATHS.failure} element={<Failure />} />
                      <Route path={PATHS.account} element={<MyAccount />} />
                      <Route path={EVENTOS_PATH} element={<Eventos />} />
                      <Route path={WELLNESS_PATH} element={<WellnessExperience />} />
                      <Route path={WELLNESS_INSCRICAO_PATH} element={<WellnessExperience />} />
                      <Route path="/wellnessexperience" element={<LegacyWellnessRedirect />} />
                      <Route path="/wellnessexperience/*" element={<LegacyWellnessRedirect />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </BrowserRouter>
              </CartProvider>
            </AuthProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error("App error:", error);
    return (
      <div style={{ padding: "20px", color: "red" }}>
        Erro ao carregar aplicação. Verifique o console.
      </div>
    );
  }
};

export default App;
