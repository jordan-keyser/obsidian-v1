
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import Chat from "./pages/Chat";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useDocumentTitle } from "./hooks/useDocumentTitle";

/**
 * Create React Query client with configuration
 * This can be extended with additional settings for caching, retries,
 * and other backend integration features
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

/**
 * AppLayout component - Handles routing and document title updates
 * @returns {JSX.Element} AppLayout component with routes
 */
const AppLayout = () => {
  // Set document title based on current route
  useDocumentTitle();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/feedback" element={<Feedback />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

/**
 * App component - Root component that sets up providers
 * This is where you would set up authentication, API contexts,
 * and other global providers for backend integration
 * @returns {JSX.Element} App component
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
