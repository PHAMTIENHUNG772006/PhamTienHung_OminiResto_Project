import React, { useState, useEffect } from 'react';
import { Branch, Booking } from '../types';
import { apiService } from '../services/api';
import {
  CalendarCheck,
  MapPin,
  Clock,
  Users,
  User,
  Phone,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Search,
} from 'lucide-react';

interface BookingSectionProps {
  branches: Branch[];
  selectedBranchId: number | null;
  onSelectBranch: (id: number) => void;
  prefilledNote?: string;
  onBookingSuccess: (booking: Booking) => void;
  onTrackThisBooking: (phone: string) => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  branches,
  selectedBranchId,
  onSelectBranch,
  prefilledNote,
  onBookingSuccess,
  onTrackThisBooking,
}) => {
  // Form State
  const [branchId, setBranchId] = useState<number>(selectedBranchId || (branches[0]?.id || 1));
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTimeSlot, setBookingTimeSlot] = useState<string>('18:30');
  const [partySize, setPartySize] = useState<number>(2);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [note, setNote] = useState<string>('');

  // UI state
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Initialize minimum date to today
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setBookingDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Sync external selectedBranchId
  useEffect(() => {
    if (selectedBranchId) {
      setBranchId(selectedBranchId);
    }
  }, [selectedBranchId]);

  // Sync prefilled note
  useEffect(() => {
    if (prefilledNote) {
      setNote((prev) => (prev ? `${prev} | ${prefilledNote}` : prefilledNote));
    }
  }, [prefilledNote]);

  // Vietnamese phone regex
  const validatePhone = (phone: string): boolean => {
    const clean = phone.replace(/[\s.-]/g, '');
    return /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/.test(clean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!customerName.trim()) {
      setErrorMessage('Quý khách vui lòng nhập họ và tên liên hệ.');
      return;
    }

    if (!validatePhone(customerPhone)) {
      setErrorMessage('Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam gồm 10 chữ số (VD: 0912345678).');
      return;
    }

    if (!bookingDate) {
      setErrorMessage('Vui lòng chọn ngày đến.');
      return;
    }

    // Build ISO timestamp
    const [year, month, day] = bookingDate.split('-').map(Number);
    const [hours, minutes] = bookingTimeSlot.split(':').map(Number);
    const bookingDateTime = new Date(year, month - 1, day, hours, minutes, 0);

    if (bookingDateTime.getTime() < Date.now() - 5 * 60 * 1000) {
      setErrorMessage('Thời gian đặt bàn không thể ở quá khứ. Quý khách vui lòng chọn thời gian khác.');
      return;
    }

    // Format ISO string with timezone
    const pad = (n: number) => String(n).padStart(2, '0');
    const isoString = `${year}-${pad(month)}-${pad(day)}T${pad(hours)}:${pad(minutes)}:00+07:00`;

    setSubmitting(true);

    try {
      const result = await apiService.createBooking({
        branchId,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim().replace(/[\s.-]/g, ''),
        bookingTime: isoString,
        partySize,
        depositAmount: 0,
        specialRequest: note.trim() || undefined,
      });

      setConfirmedBooking(result);
      onBookingSuccess(result);
    } catch (err: any) {
      setErrorMessage(err.message || 'Không thể gửi yêu cầu đặt bàn. Vui lòng thử lại hoặc gọi trực tiếp Hotline.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setConfirmedBooking(null);
    setCustomerName('');
    setCustomerPhone('');
    setNote('');
  };

  const selectedBranch = branches.find((b) => b.id === branchId) || branches[0];

  return (
    <section id="booking" className="section" aria-label="Biểu mẫu đặt bàn trực tuyến">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <CalendarCheck size={15} />
            <span>Dịch Vụ Đặt Chỗ Trực Tuyến</span>
          </div>
          <h2 className="section-title">
            Đặt Bàn <span className="text-gold-gradient">Nhanh Chóng & Tiện Lợi</span>
          </h2>
          <p className="section-subtitle">
            Giữ trước vị trí không gian đẹp nhất cho buổi tiệc của bạn. Yêu cầu của bạn sẽ được tiếp nhận ngay tức thì
            và xử lý bởi đội ngũ lễ tân chuyên nghiệp.
          </p>
        </div>

        <div className="booking-card">
          {confirmedBooking ? (
            /* Booking Confirmation View */
            <div className="booking-success-card animate-fade-in">
              <div className="success-icon-wrap">
                <CheckCircle2 size={48} />
              </div>

              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                Đặt Bàn Thành Công!
              </h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto' }}>
                Yêu cầu đặt bàn của quý khách đã được lưu vào hệ thống và đang ở trạng thái{' '}
                <strong style={{ color: 'var(--color-warning)' }}>CHỜ TIẾP NHẬN (PENDING)</strong>. Lễ tân nhà hàng sẽ
                liên hệ xác nhận sớm nhất.
              </p>

              <div className="success-code-badge">
                MÃ ĐẶT BÀN: #{confirmedBooking.id}
              </div>

              <div className="success-summary">
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Cơ sở: </span>
                  <strong>{confirmedBooking.branchName || selectedBranch?.name}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Khách hàng: </span>
                  <strong>{confirmedBooking.customerName}</strong> - {confirmedBooking.customerPhone}
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Thời gian: </span>
                  <strong>
                    {new Date(confirmedBooking.bookingTime).toLocaleString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit',
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Số lượng khách: </span>
                  <strong>{confirmedBooking.partySize} người</strong>
                </div>
                {confirmedBooking.specialRequest && (
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Ghi chú: </span>
                    <em>{confirmedBooking.specialRequest}</em>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  className="btn-primary"
                  onClick={() => onTrackThisBooking(confirmedBooking.customerPhone)}
                  id="btn-track-this-booking"
                >
                  <Search size={16} />
                  <span>Tra Cứu Trạng Thái Bàn Này</span>
                </button>

                <button className="btn-secondary" onClick={handleResetForm}>
                  <span>Đặt Thêm Bàn Khác</span>
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form className="booking-form" onSubmit={handleSubmit}>
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
                    fontSize: '0.9rem',
                  }}
                >
                  <AlertCircle size={20} style={{ flexShrink: 0 }} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Step 1: Branch Selection */}
              <div>
                <div className="form-group-title">
                  <MapPin size={18} />
                  <span>1. Lựa Chọn Cơ Sở / Chi Nhánh</span>
                </div>

                <div className="form-field">
                  <label htmlFor="booking-branch-select" className="form-label">
                    Chi nhánh nhà hàng
                  </label>
                  <select
                    id="booking-branch-select"
                    className="form-select"
                    value={branchId}
                    onChange={(e) => {
                      const id = Number(e.target.value);
                      setBranchId(id);
                      onSelectBranch(id);
                    }}
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} — {b.address}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 2: Time & Party Size */}
              <div>
                <div className="form-group-title">
                  <Clock size={18} />
                  <span>2. Thời Gian & Số Lượng Khách</span>
                </div>

                <div className="form-grid-3">
                  <div className="form-field">
                    <label htmlFor="booking-date-input" className="form-label">
                      Ngày đến
                    </label>
                    <input
                      type="date"
                      id="booking-date-input"
                      className="form-input"
                      value={bookingDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setBookingDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="booking-time-select" className="form-label">
                      Khung giờ nhận bàn
                    </label>
                    <select
                      id="booking-time-select"
                      className="form-select"
                      value={bookingTimeSlot}
                      onChange={(e) => setBookingTimeSlot(e.target.value)}
                    >
                      <option value="11:00">11:00 (Trưa)</option>
                      <option value="11:30">11:30 (Trưa)</option>
                      <option value="12:00">12:00 (Trưa)</option>
                      <option value="12:30">12:30 (Trưa)</option>
                      <option value="13:00">13:00 (Trưa)</option>
                      <option value="17:30">17:30 (Tối)</option>
                      <option value="18:00">18:00 (Tối)</option>
                      <option value="18:30">18:30 (Tối)</option>
                      <option value="19:00">19:00 (Tối - Giờ vàng)</option>
                      <option value="19:30">19:30 (Tối - Giờ vàng)</option>
                      <option value="20:00">20:00 (Tối)</option>
                      <option value="20:30">20:30 (Tối)</option>
                      <option value="21:00">21:00 (Tối muộn)</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="form-label">Số lượng khách</label>
                    <div className="party-stepper">
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() => setPartySize((p) => Math.max(1, p - 1))}
                        disabled={partySize <= 1}
                      >
                        -
                      </button>
                      <div className="stepper-display">
                        <Users size={16} style={{ marginRight: '6px' }} />
                        <span>{partySize} khách</span>
                      </div>
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() => setPartySize((p) => Math.min(30, p + 1))}
                        disabled={partySize >= 30}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Contact Details & Special Requests */}
              <div>
                <div className="form-group-title">
                  <User size={18} />
                  <span>3. Thông Tin Liên Hệ & Ghi Chú</span>
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label htmlFor="booking-name-input" className="form-label">
                      Họ và tên quý khách *
                    </label>
                    <input
                      type="text"
                      id="booking-name-input"
                      className="form-input"
                      placeholder="VD: Nguyễn Văn An"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="booking-phone-input" className="form-label">
                      Số điện thoại liên hệ *
                    </label>
                    <input
                      type="tel"
                      id="booking-phone-input"
                      className="form-input"
                      placeholder="VD: 0912345678"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-field" style={{ marginTop: '1.25rem' }}>
                  <label htmlFor="booking-note-input" className="form-label">
                    Yêu cầu đặc biệt (Bàn cửa sổ, tổ chức sinh nhật, dị ứng thức ăn...)
                  </label>
                  <textarea
                    id="booking-note-input"
                    className="form-textarea"
                    placeholder="Quý khách có yêu cầu gì về chỗ ngồi, món ăn hoặc dịp kỷ niệm xin vui lòng ghi chú tại đây..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>

              {/* Notice */}
              <div className="booking-notice">
                <Sparkles size={18} style={{ flexShrink: 0, color: 'var(--gold-primary)' }} />
                <span>
                  Sau khi gửi yêu cầu, thông tin sẽ được chuyển tức thì về <strong>Bộ phận Lễ tân</strong> của nhà hàng
                  để xếp bàn. Quý khách có thể sử dụng số điện thoại của mình để tra cứu tiến độ xử lý bất cứ lúc nào.
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary btn-submit-booking"
                disabled={submitting}
                id="btn-confirm-booking"
              >
                {submitting ? (
                  <>
                    <Sparkles className="animate-spin" size={18} />
                    <span>Đang Gửi Yêu Cầu...</span>
                  </>
                ) : (
                  <>
                    <CalendarCheck size={18} />
                    <span>Xác Nhận Đặt Bàn Ngay</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
