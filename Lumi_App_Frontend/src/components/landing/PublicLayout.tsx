import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PublicLayout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  const isHome = pathname === '/';

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      {/* Home page: no top padding — hero goes UNDER the transparent nav */}
      {/* Other pages: add padding so content doesn't hide behind nav */}
      <div className={isHome ? '' : 'pt-24 lg:pt-28'}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
