export type MenuItemStatus = 'AVAILABLE' | 'OUT_OF_STOCK' | 'INACTIVE';

export interface Branch {
  id: number;
  code: string;
  name: string;
  address: string;
  phone: string;
  email?: string;
  openingTime: string; // e.g. "10:00:00" or "10:00"
  closingTime: string; // e.g. "22:30:00" or "22:30"
  image?: string;
  imageUrl?: string;
  status?: string;
  isActive?: boolean;
  managerName?: string;
  totalTables?: number;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  icon?: string;
}

export interface MenuItem {
  id: number;
  categoryId: number;
  categoryName?: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  status?: MenuItemStatus;
  badge?: string; // e.g. "Chef Choice", "Best Seller", "Signature"
  calories?: number;
  spiceLevel?: number; // 0, 1, 2, 3
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'SEATED' | 'COMPLETED' | 'CANCELLED';

export interface Booking {
  id: number;
  branchId: number;
  branchName?: string;
  tableId?: number | null;
  tableNumber?: string | null;
  customerName: string;
  customerPhone: string;
  bookingTime: string; // ISO string
  partySize: number;
  depositAmount?: number;
  status: BookingStatus;
  specialRequest?: string;
  createdAt?: string;
}

export interface CreateBookingPayload {
  branchId: number;
  tableId?: number | null;
  customerName: string;
  customerPhone: string;
  bookingTime: string; // "yyyy-MM-dd'T'HH:mm:ssXXX"
  partySize: number;
  depositAmount?: number;
  specialRequest?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  timestamp?: string;
}
