import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { PixelInit } from "@/components/PixelInit";
import Index from "./pages/Index";
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
                    <Route path="/" element={<Index />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/obrigado" element={<Success />} />
                    <Route path="/pending" element={<Pending />} />
                    <Route path="/failure" element={<Failure />} />
                    <Route path="/minha-conta" element={<MyAccount />} />
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
