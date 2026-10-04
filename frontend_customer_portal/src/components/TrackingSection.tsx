import React, { useState, useEffect } from 'react';
import { Booking, BookingStatus } from '../types';
import { apiService } from '../services/api';
import {
  Search,
  Clock,
  Calendar,
  Users,
  MapPin,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  XCircle,
  Sparkles,
  Phone,
  ArrowRight,
} from 'lucide-react';

interface TrackingSectionProps {
  initialPhone?: string;
  onNavigateToBooking: () => void;
}

export const TrackingSection: React.FC<TrackingSectionProps> = ({
  initialPhone,
  onNavigateToBooking,
}) => {
  const [phoneInput, setPhoneInput] = useState<string>(initialPhone || '');
  const [loading, setLoading] = useState<boolean>(false);
  const [searched, setSearched] = useState<boolean>(false);
  const [results, setResults] = useState<Booking[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If initialPhone is provided, automatically trigger search
  useEffect(() => {
    if (initialPhone) {
      setPhoneInput(initialPhone);
      handleSearch(initialPhone);
    }
  }, [initialPhone]);

  const handleSearch = async (phoneToSearch?: string) => {
    const target = (phoneToSearch !== undefined ? phoneToSearch : phoneInput).trim();
    setErrorMessage(null);

    if (!target) {
      setErrorMessage('Vui lòng nhập số điện thoại để tra cứu.');
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const data = await apiService.trackBookings(target);
      setResults(data);
    } catch (err: any) {
      setErrorMessage('Không thể tra cứu trạng thái lúc này. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'CONFIRMED':
        return (
          <span className="status-badge confirmed">
            <CheckCircle size={14} />
            <span>ĐÃ XÁC NHẬN</span>
          </span>
        );
      case 'SEATED':
        return (
          <span className="status-badge seated">
            <Users size={14} />
            <span>ĐÃ NHẬN BÀN</span>
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="status-badge cancelled">
            <XCircle size={14} />
            <span>ĐÃ HỦY</span>
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="status-badge" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
            <CheckCircle size={14} />
            <span>HOÀN THÀNH</span>
          </span>
        );
      case 'PENDING':
      default:
        return (
          <span className="status-badge pending">
            <Clock size={14} className="animate-spin" />
            <span>CHỜ TIẾP NHẬN</span>
          </span>
        );
    }
  };

  const getStatusDescription = (status: BookingStatus): string => {
    switch (status) {
      case 'CONFIRMED':
        return 'Nhà hàng đã xác nhận bàn tiệc của quý khách và sẵn sàng đón tiếp đúng giờ.';
      case 'SEATED':
        return 'Quý khách đang dùng bữa tại bàn tiệc.';
      case 'CANCELLED':
        return 'Lượt đặt bàn này đã bị hủy theo yêu cầu hoặc do thay đổi lịch trình.';
      case 'COMPLETED':
        return 'Bữa tiệc đã hoàn tất. Cảm ơn quý khách đã tin chọn Aura Gourmand!';
      case 'PENDING':
      default:
        return 'Lễ tân đang kiểm tra sơ đồ bàn và sẽ liên hệ xác nhận trong ít phút.';
    }
  };

  return (
    <section id="tracking" className="section" aria-label="Tra cứu trạng thái đặt bàn">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Search size={15} />
            <span>Kiểm Tra Lịch Trình</span>
          </div>
          <h2 className="section-title">
            Tra Cứu <span className="text-gold-gradient">Trạng Thái Đặt Bàn</span>
          </h2>
          <p className="section-subtitle">
            Dễ dàng kiểm tra xem yêu cầu đặt bàn của bạn đã được lễ tân xác nhận (CONFIRMED) hay chưa
            chỉ bằng số điện thoại liên hệ.
          </p>
        </div>

        <div className="tracking-wrapper">
          {/* Search Box */}
          <form
            className="tracking-search-box"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <input
              type="tel"
              className="tracking-input"
              placeholder="Nhập số điện thoại quý khách đã đăng ký (VD: 0912345678)..."
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              id="tracking-phone-input"
            />
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              id="btn-search-tracking"
              style={{ padding: '0.95rem 2rem' }}
            >
              {loading ? (
                <>
                  <Sparkles className="animate-spin" size={18} />
                  <span>Đang Tra Cứu...</span>
                </>
              ) : (
                <>
                  <Search size={18} />
                  <span>Tra Cứu Ngay</span>
                </>
              )}
            </button>
          </form>

          {/* Error Message */}
          {errorMessage && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                background: 'var(--color-danger-bg)',
                border: '1px solid var(--color-danger)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-danger)',
                marginBottom: '1.5rem',
              }}
            >
              <AlertCircle size={20} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Results Area */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
              <Sparkles className="animate-spin" size={32} style={{ margin: '0 auto 1rem auto', color: 'var(--gold-primary)' }} />
              <p>Đang tìm kiếm thông tin đặt bàn của quý khách...</p>
            </div>
          ) : searched && results.length === 0 ? (
            <div className="tracking-empty animate-fade-in">
              <HelpCircle size={44} style={{ color: 'var(--gold-primary)', opacity: 0.6, marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>Không tìm thấy lượt đặt bàn nào</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Không có dữ liệu đặt bàn nào liên kết với số điện thoại <strong>{phoneInput}</strong>. Quý khách vui lòng
                kiểm tra lại số điện thoại hoặc tiến hành đặt bàn mới.
              </p>
              <button className="btn-primary" onClick={onNavigateToBooking}>
                <span>Đặt Bàn Mới Ngay</span>
              </button>
            </div>
          ) : (
            <div className="tracking-result-list">
              {results.map((booking) => {
                const bookingDateObj = new Date(booking.bookingTime);

                return (
                  <article key={booking.id} className="tracking-card animate-fade-in" id={`tracking-card-${booking.id}`}>
                    <div className="tracking-card-header">
                      <div className="tracking-id">
                        MÃ ĐẶT BÀN: <strong>#{booking.id}</strong>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>

                    <div className="tracking-grid-details">
                      <div className="tracking-detail-item">
                        <span className="tracking-detail-label">Cơ sở / Chi nhánh</span>
                        <span className="tracking-detail-value">
                          {booking.branchName || `Chi nhánh #${booking.branchId}`}
                        </span>
                      </div>

                      <div className="tracking-detail-item">
                        <span className="tracking-detail-label">Khách hàng</span>
                        <span className="tracking-detail-value">
                          {booking.customerName} ({booking.customerPhone})
                        </span>
                      </div>

                      <div className="tracking-detail-item">
                        <span className="tracking-detail-label">Thời gian dùng bữa</span>
                        <span className="tracking-detail-value" style={{ color: 'var(--gold-light)' }}>
                          {bookingDateObj.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} - Ngày{' '}
                          {bookingDateObj.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                        </span>
                      </div>

                      <div className="tracking-detail-item">
                        <span className="tracking-detail-label">Số lượng & Vị trí bàn</span>
                        <span className="tracking-detail-value">
                          {booking.partySize} người
                          {booking.tableNumber ? ` • Bàn ${booking.tableNumber}` : ' • (Lễ tân sắp xếp lúc nhận)'}
                        </span>
                      </div>
                    </div>

                    {/* Status hint text */}
                    <div
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        padding: '0.6rem 0.85rem',
                        background: 'rgba(255,255,255,0.02)',
                        borderRadius: 'var(--radius-sm)',
                        marginBottom: booking.specialRequest ? '1rem' : '0',
                      }}
                    >
                      💡 {getStatusDescription(booking.status)}
                    </div>

                    {booking.specialRequest && (
                      <div className="tracking-note-box">
                        <strong>Yêu cầu đặc biệt: </strong>
                        <span>{booking.specialRequest}</span>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
