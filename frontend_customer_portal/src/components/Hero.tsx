import React from 'react';
import { CalendarCheck, BookOpen, Sparkles, Star, Award, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
  onBookTable: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onBookTable }) => {
  return (
    <section id="hero" className="hero-section" aria-label="Giới thiệu thương hiệu nhà hàng">
      {/* Background Ambience */}
      <img
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80"
        alt="Không gian nhà hàng sang trọng Aura Gourmand"
        className="hero-bg-image"
        loading="eager"
      />
      <div className="hero-bg-overlay" />

      <div className="container hero-content">
        <div className="hero-badge animate-fade-in">
          <Sparkles size={16} />
          <span>Ẩm Thực Tinh Hoa 5 Sao • Trải Nghiệm Michelin Đích Thực</span>
        </div>

        <h1 className="hero-title animate-fade-in">
          Nơi Thăng Hoa Của <br />
          <span className="text-gold-gradient">Nghệ Thuật Ẩm Thực</span> & Đẳng Cấp
        </h1>

        <p className="hero-description animate-fade-in">
          Chào mừng quý khách đến với <strong>Aura Gourmand</strong>. Thưởng thức hương vị bò Wagyu A5 thượng hạng,
          hải sản tươi sống nhập khẩu cùng không gian kiến trúc tráng lệ. Hãy để chúng tôi chuẩn bị cho bạn một buổi tối hoàn mỹ.
        </p>

        <div className="hero-cta-group animate-fade-in">
          <button
            className="btn-primary"
            onClick={onBookTable}
            id="hero-book-now-btn"
          >
            <CalendarCheck size={18} />
            <span>Đặt Bàn Trực Tuyến</span>
          </button>

          <button
            className="btn-secondary"
            onClick={onExploreMenu}
            id="hero-explore-menu-btn"
          >
            <BookOpen size={18} />
            <span>Khám Phá Thực Đơn</span>
          </button>
        </div>

        {/* Stats counter */}
        <div className="hero-stats animate-fade-in">
          <div className="hero-stat-item">
            <div className="hero-stat-num">3+</div>
            <div className="hero-stat-label">Cơ sở sang trọng</div>
          </div>
          <div className="hero-stat-item">
            <div className="hero-stat-num">80+</div>
            <div className="hero-stat-label">Món ăn thượng hạng</div>
          </div>
          <div className="hero-stat-item">
            <div className="hero-stat-num">4.9★</div>
            <div className="hero-stat-label">Đánh giá xuất sắc</div>
          </div>
        </div>
      </div>
    </section>
  );
};
