import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Admin from "./pages/Admin";
import AdminPropertyImages from "./pages/AdminPropertyImages";
import AdminFeatured from "./pages/AdminFeatured";
import AdminCreateProperty from "./pages/AdminCreateProperty";
import AdminEditProperty from "./pages/AdminEditProperty";
import AdminHero from "./pages/AdminHero";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/imoveis"} component={Properties} />
      <Route path={"/sobre"} component={Sobre} />
      <Route path={"/contato"} component={Contato} />
      <Route path={"/imovel/:id"} component={PropertyDetail} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/admin/criar"} component={AdminCreateProperty} />
      <Route path={"/admin/imovel/:id/editar"} component={AdminEditProperty} />
      <Route path={"/admin/imovel/:id/imagens"} component={AdminPropertyImages} />
      <Route path={"/admin/hero"} component={AdminHero} />
      <Route path={"/admin/destaques"} component={AdminFeatured} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <Router />
          <WhatsAppButton />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
