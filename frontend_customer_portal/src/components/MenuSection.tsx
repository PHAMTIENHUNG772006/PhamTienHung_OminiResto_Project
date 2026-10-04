import React, { useState, useMemo } from 'react';
import { Category, MenuItem } from '../types';
import { Utensils, Search, Eye, Sparkles, Filter, AlertCircle } from 'lucide-react';

interface MenuSectionProps {
  categories: Category[];
  menuItems: MenuItem[];
  loading: boolean;
  onOpenDishDetail: (dish: MenuItem) => void;
  onQuickBookDish: (dish: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  categories,
  menuItems,
  loading,
  onOpenDishDetail,
  onQuickBookDish,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hideUnavailable, setHideUnavailable] = useState<boolean>(false);

  // Format currency VNĐ
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  // Filter menu items based on:
  // 1. Category
  // 2. Search query
  // 3. User toggle: hide unavailable or keep with dimming
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (selectedCategoryId !== null && item.categoryId !== selectedCategoryId) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description?.toLowerCase().includes(query);
        if (!matchName && !matchDesc) return false;
      }

      // Availability filter
      const isAvailable = item.isAvailable && item.status !== 'OUT_OF_STOCK' && item.status !== 'INACTIVE';
      if (hideUnavailable && !isAvailable) {
        return false;
      }

      return true;
    });
  }, [menuItems, selectedCategoryId, searchQuery, hideUnavailable]);

  return (
    <section id="menu" className="section" aria-label="Thực đơn điện tử nhà hàng">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Utensils size={15} />
            <span>Thực Đơn Thượng Hạng</span>
          </div>
          <h2 className="section-title">
            Hương Vị <span className="text-gold-gradient">Đỉnh Cao Nghệ Thuật</span>
          </h2>
          <p className="section-subtitle">
            Mỗi món ăn là một kiệt tác ẩm thực được chăm chút tỉ mỉ từ nguyên liệu tươi ngon nhất thế giới,
            chế biến bởi các đầu bếp danh tiếng đạt chuẩn quốc tế.
          </p>
        </div>

        {/* Controls: Search & Category Tabs */}
        <div className="menu-controls">
          {/* Search bar */}
          <div className="menu-search-wrapper">
            <Search size={18} className="menu-search-icon" />
            <input
              type="text"
              className="menu-search-input"
              placeholder="Tìm kiếm món ăn, nguyên liệu đặc sắc..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="menu-search-input"
            />
          </div>

          {/* Category Tabs */}
          <div className="category-tabs" role="tablist">
            <button
              className={`category-tab ${selectedCategoryId === null ? 'active' : ''}`}
              onClick={() => setSelectedCategoryId(null)}
              role="tab"
              aria-selected={selectedCategoryId === null}
            >
              Tất Cả Món Ăn ({menuItems.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`category-tab ${selectedCategoryId === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategoryId(cat.id)}
                role="tab"
                aria-selected={selectedCategoryId === cat.id}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Availability filter toggle */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.65rem' }}>
            <label
              htmlFor="hide-unavailable-checkbox"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                id="hide-unavailable-checkbox"
                checked={hideUnavailable}
                onChange={(e) => setHideUnavailable(e.target.checked)}
                style={{ accentColor: 'var(--gold-primary)', width: '16px', height: '16px' }}
              />
              <span>Chỉ hiển thị món đang phục vụ (Ẩn món tạm hết)</span>
            </label>
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            <Sparkles className="animate-spin" size={32} style={{ margin: '0 auto 1rem auto', color: 'var(--gold-primary)' }} />
            <p>Đang chuẩn bị thực đơn điện tử...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
            <Utensils size={40} style={{ color: 'var(--gold-primary)', opacity: 0.5, marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Không tìm thấy món ăn phù hợp</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Vui lòng thử tìm kiếm bằng từ khóa khác hoặc chọn danh mục khác.
            </p>
          </div>
        ) : (
          <div className="menu-grid">
            {filteredItems.map((item) => {
              const isAvailable = item.isAvailable && item.status !== 'OUT_OF_STOCK' && item.status !== 'INACTIVE';
              const isOutOfStock = !item.isAvailable || item.status === 'OUT_OF_STOCK';
              const isInactive = item.status === 'INACTIVE';

              return (
                <article
                  key={item.id}
                  className={`menu-item-card ${!isAvailable ? 'out-of-stock' : ''}`}
                  id={`menu-item-${item.id}`}
                >
                  {/* Dish Image */}
                  <div className="menu-item-image-wrapper">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="menu-item-image"
                      loading="lazy"
                    />

                    {/* Dish badge */}
                    {item.badge && isAvailable && (
                      <span className="menu-badge">{item.badge}</span>
                    )}

                    {/* Out of Stock / Inactive Dimmed Overlay */}
                    {!isAvailable && (
                      <div className="menu-stock-overlay">
                        <span className="stock-tag">
                          {isInactive ? 'Ngừng Phục Vụ' : 'Tạm Hết Món'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Dish Body */}
                  <div className="menu-item-body">
                    <div className="menu-item-header">
                      <h3 className="menu-item-name">{item.name}</h3>
                      <span className="menu-item-price">{formatPrice(item.price)}</span>
                    </div>

                    <p className="menu-item-desc" title={item.description}>
                      {item.description}
                    </p>

                    <div className="menu-item-footer">
                      <button
                        className="btn-detail"
                        onClick={() => onOpenDishDetail(item)}
                        id={`btn-view-dish-${item.id}`}
                      >
                        <Eye size={15} />
                        <span>Xem Chi Tiết</span>
                      </button>

                      {isAvailable ? (
                        <button
                          className="btn-secondary"
                          style={{ padding: '0.45rem 0.95rem', fontSize: '0.8rem' }}
                          onClick={() => onQuickBookDish(item)}
                          id={`btn-order-dish-${item.id}`}
                        >
                          Đặt Bàn Ngay
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-danger)', fontWeight: 600 }}>
                          Vui lòng chọn món khác
                        </span>
                      )}
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
