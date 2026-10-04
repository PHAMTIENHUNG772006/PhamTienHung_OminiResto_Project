import React from 'react';
import { UtensilsCrossed, Phone, Mail, MapPin, Globe, ShieldCheck } from 'lucide-react';
import { Branch } from '../types';

interface FooterProps {
  branches: Branch[];
}

export const Footer: React.FC<FooterProps> = ({ branches }) => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand Info */}
          <div>
            <div className="brand-logo" style={{ marginBottom: '1rem' }}>
              <div className="brand-icon">
                <UtensilsCrossed size={22} />
              </div>
              <div className="brand-text">
                <span className="brand-name" style={{ fontSize: '1.25rem' }}>AURA GOURMAND</span>
                <span className="brand-sub">FINE DINING & BISTRO</span>
              </div>
            </div>

            <p className="footer-brand-desc">
              Hệ thống nhà hàng ẩm thực 5 sao đẳng cấp quốc tế. Trải nghiệm dịch vụ thượng lưu,
              nguyên liệu chuẩn Michelin và các bữa tiệc ấm cúng, sang trọng.
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <a
                href="#facebook"
                className="btn-branch-phone"
                aria-label="Fanpage Facebook Aura Gourmand"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="#instagram"
                className="btn-branch-phone"
                aria-label="Instagram Aura Gourmand"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="#website"
                className="btn-branch-phone"
                aria-label="Website quốc tế"
              >
                <Globe size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="footer-heading">Khám Phá</h4>
            <ul className="footer-links">
              <li><a href="#hero">Trang Chủ</a></li>
              <li><a href="#branches">Hệ Thống Chi Nhánh</a></li>
              <li><a href="#menu">Thực Đơn Điện Tử</a></li>
              <li><a href="#booking">Đặt Bàn Trực Tuyến</a></li>
              <li><a href="#tracking">Tra Cứu Lịch Hẹn</a></li>
            </ul>
          </div>

          {/* Col 3: Policy & Dining Etiquette */}
          <div>
            <h4 className="footer-heading">Chính Sách & Quy Định</h4>
            <ul className="footer-links">
              <li><a href="#rules">Quy định nhận & giữ bàn</a></li>
              <li><a href="#etiquette">Trang phục khuyến nghị (Smart Casual)</a></li>
              <li><a href="#privacy">Chính sách bảo mật thông tin</a></li>
              <li><a href="#events">Đặt tiệc riêng & Hội nghị VIP</a></li>
            </ul>
          </div>

          {/* Col 4: Branch Hotlines */}
          <div>
            <h4 className="footer-heading">Hệ Thống Cơ Sở</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem' }}>
              {branches.slice(0, 3).map((branch) => (
                <div key={branch.id}>
                  <strong style={{ color: 'var(--text-primary)', display: 'block' }}>
                    {branch.name}
                  </strong>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>
                    {branch.address}
                  </span>
                  <span style={{ color: 'var(--gold-light)' }}>
                    Hotline: {branch.phone}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Aura Gourmand Restaurant Group. All rights reserved.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
            <ShieldCheck size={16} style={{ color: 'var(--gold-primary)' }} />
            <span>Được chứng nhận An toàn Vệ sinh Thực phẩm & Tiêu chuẩn Michelin Selection</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
