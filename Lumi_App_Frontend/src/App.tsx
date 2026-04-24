import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/landing/HomePage';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import DocsPage from './pages/DocsPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import TestimoniosPage from './pages/TestimoniosPage';
import Tecnologia from './pages/Tecnologia';
import Familia from './pages/Familia';
import Seguridad from './pages/Seguridad';
import Compania from './pages/Compania';
import Monitor from './pages/Monitor';
import Historias from './pages/Historias';
import Contacto from './pages/Contacto';
import PublicLayout from './components/landing/PublicLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOTP from './pages/VerifyOTP';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import CarePanel from './pages/CarePanel';
import Calendar from './pages/Calendar';
import AlertsCenter from './pages/AlertsCenter';
import DeviceSettings from './pages/DeviceSettings';
import FamilyManagement from './pages/FamilyManagement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages with shared Navbar + Footer */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/how" element={<HowItWorks />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/testimonios" element={<TestimoniosPage />} />
          {/* Legacy product pages */}
          <Route path="/tecnologia" element={<Tecnologia />} />
          <Route path="/familia" element={<Familia />} />
          <Route path="/seguridad" element={<Seguridad />} />
          <Route path="/compania" element={<Compania />} />
          <Route path="/monitor" element={<Monitor />} />
          <Route path="/historias" element={<Historias />} />
          <Route path="/contacto" element={<Contacto />} />
        </Route>

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/recuperar" element={<ForgotPassword />} />
        <Route path="/verificar" element={<VerifyOTP />} />

        {/* App */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="cuidado" element={<CarePanel />} />
          <Route path="calendario" element={<Calendar />} />
          <Route path="alertas" element={<AlertsCenter />} />
          <Route path="dispositivo" element={<DeviceSettings />} />
          <Route path="familia" element={<FamilyManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
