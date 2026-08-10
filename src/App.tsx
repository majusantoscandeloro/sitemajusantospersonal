import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { PixelInit } from "@/components/PixelInit";
import Index from "./pages/Index";
import Programs from "./pages/Programs";
import ProgramPage from "./pages/ProgramPage";
import Consulting from "./pages/Consulting";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Pending from "./pages/Pending";
import Failure from "./pages/Failure";
import MyAccount from "./pages/MyAccount";
import WellnessExperience from "./pages/WellnessExperience";
import Eventos from "./pages/Eventos";
import LegacyWellnessRedirect from "./pages/LegacyWellnessRedirect";
import NotFound from "./pages/NotFound";
import {
  EVENTOS_PATH,
  WELLNESS_INSCRICAO_PATH,
  WELLNESS_PATH,
} from "@/data/wellnessExperience";
import { PATHS } from "@/config/site";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

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
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </CartProvider>
            </AuthProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error('App error:', error);
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        Erro ao carregar aplicação. Verifique o console.
      </div>
    );
  }
};

export default App;
