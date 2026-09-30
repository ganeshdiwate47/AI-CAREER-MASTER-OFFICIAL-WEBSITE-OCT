import { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/i18n/LanguageContext";
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
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";

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

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <HelmetProvider>
          <BrowserRouter>
            <ScrollManager />
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/programs/:slug" element={<ProgramDetail />} />
                <Route path="/colleges" element={<ForColleges />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            <AiAssistant />
          </BrowserRouter>
        </HelmetProvider>
      </LanguageProvider>
      <Toaster position="bottom-right" richColors closeButton />
    </ErrorBoundary>
  );
}
