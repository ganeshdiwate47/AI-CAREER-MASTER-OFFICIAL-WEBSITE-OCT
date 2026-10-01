import { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ProgramsProvider } from "@/context/ProgramsContext";
import ScrollManager from "@/components/ScrollManager";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AiAssistant from "@/components/AiAssistant";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Programs from "@/pages/Programs";
import ProgramDetail from "@/pages/ProgramDetail";
import ForColleges from "@/pages/ForColleges";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/PolicyPage";
import Terms from "@/pages/PolicyPage";
import { POLICIES } from "@/data/policies";
import Admin from "@/pages/Admin";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream p-8 text-center">
          <p className="font-display text-2xl font-semibold text-navy">Something went wrong.</p>
          <a href="/" className="btn-primary">Go Home</a>
        </div>
      );
    }
    return this.props.children;
  }
}

function Shell() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");
  return (
    <>
      {!isAdmin && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:slug" element={<ProgramDetail />} />
          <Route path="/colleges" element={<ForColleges />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<Privacy policyKey="privacy" />} />
          <Route path="/refund-policy" element={<Terms policyKey="refund" />} />
          <Route path="/terms-and-conditions" element={<Terms policyKey="terms" />} />
          <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
          <Route path="/terms" element={<Navigate to="/terms-and-conditions" replace />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <AiAssistant />}
      <ScrollManager />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ProgramsProvider>
          <HelmetProvider>
            <BrowserRouter>
              <Shell />
            </BrowserRouter>
          </HelmetProvider>
        </ProgramsProvider>
      </LanguageProvider>
      <Toaster position="bottom-right" richColors closeButton />
    </ErrorBoundary>
  );
}
