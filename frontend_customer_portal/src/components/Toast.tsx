import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <aside className="toast-container" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="toast">
          {t.type === 'success' && <CheckCircle2 size={18} style={{ color: 'var(--color-success)', flexShrink: 0 }} />}
          {t.type === 'error' && <AlertCircle size={18} style={{ color: 'var(--color-danger)', flexShrink: 0 }} />}
          {t.type === 'info' && <Info size={18} style={{ color: 'var(--gold-primary)', flexShrink: 0 }} />}
          <span style={{ flex: 1 }}>{t.message}</span>
          <button
            onClick={() => onDismiss(t.id)}
            style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
            aria-label="Đóng thông báo"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </aside>
  );
};
