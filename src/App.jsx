import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ProofSection from './components/ProofSection';
import AboutSection from './components/AboutSection';

export default function App() {
  return (
    <div className="font-sans text-gray-900 antialiased">
      <HeroSection />
      <ServicesSection />
      <ProofSection />
      <AboutSection />
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} Studio Minimal. Human intelligence, engineered for emotion.</p>
          <a href="#services" className="rounded-full border border-gray-900 bg-gray-900 px-5 py-2 text-white transition-colors hover:opacity-90" style={{ backgroundColor: '#000000', borderColor: '#000000' }}>
            Start a project
          </a>
        </div>
      </footer>
    </div>
  );
}
