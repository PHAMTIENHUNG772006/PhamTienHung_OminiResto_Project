import React, { useState, useEffect } from 'react';
import { UtensilsCrossed, CalendarCheck, Search, Menu as MenuIcon, X, PhoneCall } from 'lucide-react';

interface NavbarProps {
  onNavigateToBooking: (branchId?: number) => void;
  onNavigateToTracking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateToBooking, onNavigateToTracking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'branches', 'menu', 'booking', 'tracking'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <a href="#hero" className="brand-logo" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
          <div className="brand-icon">
            <UtensilsCrossed size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-name">AURA GOURMAND</span>
            <span className="brand-sub">FINE DINING & BISTRO</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            <li>
              <a
                href="#hero"
                className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
              >
                Trang Chủ
              </a>
            </li>
            <li>
              <a
                href="#branches"
                className={`nav-link ${activeSection === 'branches' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); scrollTo('branches'); }}
              >
                Hệ Thống Chi Nhánh
              </a>
            </li>
            <li>
              <a
                href="#menu"
                className={`nav-link ${activeSection === 'menu' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); scrollTo('menu'); }}
              >
                Thực Đơn Điện Tử
              </a>
            </li>
            <li>
              <a
                href="#booking"
                className={`nav-link ${activeSection === 'booking' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); scrollTo('booking'); }}
              >
                Đặt Bàn Trực Tuyến
              </a>
            </li>
            <li>
              <a
                href="#tracking"
                className={`nav-link ${activeSection === 'tracking' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); scrollTo('tracking'); }}
              >
                Tra Cứu Đặt Bàn
              </a>
            </li>
          </ul>
        </nav>

        {/* Header Actions */}
        <div className="navbar-actions">
          <button
            className="btn-secondary"
            style={{ padding: '0.6rem 1.1rem', fontSize: '0.875rem' }}
            onClick={onNavigateToTracking}
            title="Tra cứu lịch đặt bàn theo số điện thoại"
          >
            <Search size={16} />
            <span>Tra Cứu</span>
          </button>

          <button
            className="btn-primary btn-book-nav"
            onClick={() => onNavigateToBooking()}
            id="nav-quick-book-btn"
          >
            <CalendarCheck size={16} />
            <span>Đặt Bàn Ngay</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav open animate-fade-in">
          <ul className="mobile-nav-list">
            <li>
              <a href="#hero" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
                Trang Chủ
              </a>
            </li>
            <li>
              <a href="#branches" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollTo('branches'); }}>
                Hệ Thống Chi Nhánh
              </a>
            </li>
            <li>
              <a href="#menu" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollTo('menu'); }}>
                Thực Đơn Điện Tử
              </a>
            </li>
            <li>
              <a href="#booking" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollTo('booking'); }}>
                Đặt Bàn Trực Tuyến
              </a>
            </li>
            <li>
              <a href="#tracking" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollTo('tracking'); }}>
                Tra Cứu Đặt Bàn
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
