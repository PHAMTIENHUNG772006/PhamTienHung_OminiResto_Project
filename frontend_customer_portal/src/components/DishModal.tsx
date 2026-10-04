import React from 'react';
import { MenuItem } from '../types';
import { X, CalendarCheck, Flame, Utensils, AlertTriangle } from 'lucide-react';

interface DishModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onBookDish: (dish: MenuItem) => void;
}

export const DishModal: React.FC<DishModalProps> = ({ dish, onClose, onBookDish }) => {
  if (!dish) return null;

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const isAvailable = dish.isAvailable && dish.status !== 'OUT_OF_STOCK' && dish.status !== 'INACTIVE';

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Đóng chi tiết món ăn">
          <X size={20} />
        </button>

        {/* Modal Image */}
        <div style={{ position: 'relative', height: '300px', overflow: 'hidden' }}>
          <img
            src={dish.imageUrl}
            alt={dish.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {dish.badge && isAvailable && (
            <span
              className="menu-badge"
              style={{ position: 'absolute', top: '1.25rem', left: '1.25rem' }}
            >
              {dish.badge}
            </span>
          )}
          {!isAvailable && (
            <div className="menu-stock-overlay">
              <span className="stock-tag">
                {dish.status === 'INACTIVE' ? 'Ngừng Kinh Doanh' : 'Tạm Hết Món'}
              </span>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--gold-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                {dish.categoryName || 'Món Ăn Thượng Hạng'}
              </span>
              <h2 style={{ fontSize: '1.6rem', marginTop: '0.25rem', color: 'var(--text-primary)' }}>
                {dish.name}
              </h2>
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--gold-primary)', fontWeight: 700, whiteSpace: 'nowrap' }}>
              {formatPrice(dish.price)}
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.975rem', marginBottom: '1.75rem' }}>
            {dish.description}
          </p>

          {/* Quick Nutritional / Chef Info */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              padding: '1rem',
              background: 'var(--bg-surface-elevated)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '2rem',
              fontSize: '0.875rem',
            }}
          >
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                Năng lượng ước tính
              </span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {dish.calories ? `${dish.calories} kcal` : '350 - 550 kcal'}
              </span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                Trạng thái phục vụ
              </span>
              <span style={{ fontWeight: 600, color: isAvailable ? 'var(--color-success)' : 'var(--color-danger)' }}>
                {isAvailable ? 'Sẵn sàng phục vụ' : 'Tạm ngưng phục vụ'}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button className="btn-secondary" onClick={onClose}>
              Đóng
            </button>
            {isAvailable ? (
              <button
                className="btn-primary"
                onClick={() => {
                  onBookDish(dish);
                  onClose();
                }}
              >
                <CalendarCheck size={16} />
                <span>Đặt Bàn Thưởng Thức Món Này</span>
              </button>
            ) : (
              <button className="btn-primary" disabled>
                <span>Món Hiện Đang Tạm Hết</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
