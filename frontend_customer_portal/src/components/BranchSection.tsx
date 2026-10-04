import React, { useState } from 'react';
import { Branch } from '../types';
import { MapPin, Phone, Clock, CalendarCheck, Navigation, Sparkles } from 'lucide-react';

interface BranchSectionProps {
  branches: Branch[];
  loading: boolean;
  onSelectBranchForBooking: (branchId: number) => void;
}

export const BranchSection: React.FC<BranchSectionProps> = ({
  branches,
  loading,
  onSelectBranchForBooking,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('all');

  // Check if branch is currently open
  const isBranchOpen = (openTimeStr: string, closeTimeStr: string): boolean => {
    if (!openTimeStr || !closeTimeStr) return true;
    try {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const [openHour, openMin] = openTimeStr.split(':').map(Number);
      const [closeHour, closeMin] = closeTimeStr.split(':').map(Number);

      const openMinutes = openHour * 60 + (openMin || 0);
      let closeMinutes = closeHour * 60 + (closeMin || 0);

      // Handle closing past midnight
      if (closeMinutes < openMinutes) {
        closeMinutes += 24 * 60;
      }

      return currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
    } catch {
      return true;
    }
  };

  const formatTime = (timeStr?: string): string => {
    if (!timeStr) return '';
    return timeStr.slice(0, 5); // "10:00:00" -> "10:00"
  };

  const filteredBranches = branches.filter((branch) => {
    if (selectedCity === 'all') return true;
    if (selectedCity === 'hanoi') return branch.address.toLowerCase().includes('hà nội');
    if (selectedCity === 'hcm') return branch.address.toLowerCase().includes('hồ chí minh');
    if (selectedCity === 'danang') return branch.address.toLowerCase().includes('đà nẵng');
    return true;
  });

  return (
    <section id="branches" className="section" aria-label="Danh sách các chi nhánh của nhà hàng">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <MapPin size={15} />
            <span>Hệ Thống Cơ Sở Đẳng Cấp</span>
          </div>
          <h2 className="section-title">
            Khám Phá <span className="text-gold-gradient">Không Gian Sang Trọng</span>
          </h2>
          <p className="section-subtitle">
            Hệ thống nhà hàng Aura Gourmand tọa lạc tại các vị trí đắc địa nhất, mang phong cách kiến trúc
            hoàng gia tinh tế, phục vụ lý tưởng cho tiệc gia đình, tiếp khách kinh doanh và các buổi hẹn lãng mạn.
          </p>
        </div>

        {/* City Filter Tabs */}
        <div className="category-tabs" style={{ marginBottom: '2.5rem' }}>
          <button
            className={`category-tab ${selectedCity === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCity('all')}
          >
            Tất Cả Chi Nhánh ({branches.length})
          </button>
          <button
            className={`category-tab ${selectedCity === 'hanoi' ? 'active' : ''}`}
            onClick={() => setSelectedCity('hanoi')}
          >
            Hà Nội
          </button>
          <button
            className={`category-tab ${selectedCity === 'hcm' ? 'active' : ''}`}
            onClick={() => setSelectedCity('hcm')}
          >
            TP. Hồ Chí Minh
          </button>
          <button
            className={`category-tab ${selectedCity === 'danang' ? 'active' : ''}`}
            onClick={() => setSelectedCity('danang')}
          >
            Đà Nẵng
          </button>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
            <Sparkles className="animate-spin" size={32} style={{ margin: '0 auto 1rem auto', color: 'var(--gold-primary)' }} />
            <p>Đang tải danh sách cơ sở...</p>
          </div>
        ) : (
          <div className="branches-grid">
            {filteredBranches.map((branch) => {
              const openNow = isBranchOpen(branch.openingTime, branch.closingTime);

              return (
                <article key={branch.id} className="branch-card" id={`branch-${branch.id}`}>
                  {/* Branch Thumbnail */}
                  <div className="branch-image-wrapper">
                    <img
                      src={branch.image || branch.imageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'}
                      alt={`Không gian chi nhánh ${branch.name}`}
                      className="branch-image"
                      loading="lazy"
                    />
                    <div className={`branch-status-badge ${openNow ? 'branch-status-open' : 'branch-status-closed'}`}>
                      <span className="status-dot" />
                      <span>{openNow ? 'ĐANG MỞ CỬA' : 'TẠM NGHỈ'}</span>
                    </div>
                  </div>

                  {/* Branch Details */}
                  <div className="branch-card-body">
                    <h3 className="branch-name">{branch.name}</h3>

                    <div className="branch-info-list">
                      <div className="branch-info-row">
                        <MapPin size={18} className="branch-info-icon" />
                        <span>{branch.address}</span>
                      </div>

                      <div className="branch-info-row">
                        <Phone size={18} className="branch-info-icon" />
                        <span>Hotline: <strong style={{ color: 'var(--gold-light)' }}>{branch.phone}</strong></span>
                      </div>

                      <div className="branch-info-row">
                        <Clock size={18} className="branch-info-icon" />
                        <span>
                          Giờ phục vụ: {formatTime(branch.openingTime)} - {formatTime(branch.closingTime)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="branch-actions">
                      <button
                        className="btn-primary btn-branch-book"
                        onClick={() => onSelectBranchForBooking(branch.id)}
                        id={`btn-book-branch-${branch.id}`}
                      >
                        <CalendarCheck size={16} />
                        <span>Đặt Bàn Tại Đây</span>
                      </button>

                      <a
                        href={`tel:${branch.phone.replace(/\s+/g, '')}`}
                        className="btn-branch-phone"
                        title={`Gọi điện chi nhánh ${branch.name}`}
                        aria-label={`Gọi tới hotline ${branch.phone}`}
                      >
                        <Phone size={18} />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
