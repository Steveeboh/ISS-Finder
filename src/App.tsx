import './App.css';
import './index.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPageComponent } from '@/components/landing-page';
import { ContactPageComponent } from '@/components/contact-page';
import { ImpressumPageComponent } from '@/components/Impressum-page.tsx';
import { HeaderComponent } from '@/components/header';
import { FooterComponent } from '@/components/footer';
import PrivacyPolicy from '@/components/privacy-policy';
import { ProjectsPageComponent } from '@/components/projects-page';
import { ProjectPageComponent } from '@/components/project-page';
import { UfoBeamPageComponent } from '@/components/ufo-beam-page';
import { MyStartUpPageComponent } from '@/components/MyStartUp-page';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-gradient-to-r from-[#102532] to-[#DCA8CA] font-sans text-white">
        <HeaderComponent />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPageComponent />} />
            <Route path="/projekte" element={<ProjectsPageComponent />} />
            <Route path="/projekte/ufo-beam" element={<UfoBeamPageComponent />} />
            <Route path="/projekte/:slug" element={<ProjectPageComponent />} />
            <Route path="/mystartup" element={<MyStartUpPageComponent />} />
            <Route path="/contact" element={<ContactPageComponent />} />
            <Route path="/impressum" element={<ImpressumPageComponent />} />
            <Route path="/datenschutz" element={<PrivacyPolicy />} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </main>
        <FooterComponent />
      </div>
    </Router>
  );
}

export default App;
