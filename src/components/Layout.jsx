import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';
import ScrollManager from './ScrollManager';
import useSiteAnimations from '../hooks/useSiteAnimations';

export default function Layout() {
  useSiteAnimations();
  return (
    <>
      <ScrollManager />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
