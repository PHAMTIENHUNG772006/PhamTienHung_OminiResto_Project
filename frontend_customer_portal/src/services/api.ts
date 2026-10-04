import { Branch, Category, MenuItem, Booking, CreateBookingPayload, ApiResponse } from '../types';

const API_BASE = '/api';

// Curated high quality imagery for luxury dining
export const MOCK_BRANCHES: Branch[] = [
  {
    id: 1,
    code: 'HN-HK-01',
    name: 'Aura Gourmand - Hoàn Kiếm Heritage',
    address: 'Số 18 Tràng Thi, Phường Hàng Trống, Quận Hoàn Kiếm, Hà Nội',
    phone: '024 3988 8899',
    email: 'hoankiem@auragourmand.vn',
    openingTime: '10:00:00',
    closingTime: '22:30:00',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
    status: 'ACTIVE',
    isActive: true,
    managerName: 'Trần Minh Khang',
    totalTables: 24,
  },
  {
    id: 2,
    code: 'HCM-Q1-02',
    name: 'Aura Gourmand - Sài Gòn Skyview',
    address: 'Tầng 48, Tòa nhà Bitexco, 02 Hải Triều, Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    phone: '028 3822 6688',
    email: 'saigon@auragourmand.vn',
    openingTime: '11:00:00',
    closingTime: '23:30:00',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    status: 'ACTIVE',
    isActive: true,
    managerName: 'Lê Hoàng Yến',
    totalTables: 32,
  },
  {
    id: 3,
    code: 'DN-ST-03',
    name: 'Aura Gourmand - Sơn Trà Ocean Breeze',
    address: 'Đại lộ Hoàng Sa, Bán đảo Sơn Trà, TP. Đà Nẵng',
    phone: '0236 399 7788',
    email: 'danang@auragourmand.vn',
    openingTime: '10:30:00',
    closingTime: '22:00:00',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    status: 'ACTIVE',
    isActive: true,
    managerName: 'Nguyễn Văn Đạt',
    totalTables: 20,
  },
];

export const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: 'Khai Vị Tinh Hoa (Starters)', description: 'Khởi đầu bữa tiệc với các món khai vị nhẹ nhàng, cân bằng vị giác' },
  { id: 2, name: 'Bò Bít Tết Hảo Hạng (Signature Steaks)', description: 'Bò Wagyu A5 & Black Angus nướng than củi gỗ sồi thơm lừng' },
  { id: 3, name: 'Hải Sản Đại Dương (Seafood Symphony)', description: 'Tôm hùm Nha Trang, sò điệp Hokkaido và cá hồi Nauy thượng hạng' },
  { id: 4, name: 'Món Chính Đặc Sắc (Main Courses)', description: 'Nghệ thuật ẩm thực kết hợp giữa phong vị Á - Âu đương đại' },
  { id: 5, name: 'Tráng Miệng Thủ Công (Artisanal Desserts)', description: 'Bản hòa tấu ngọt ngào kết màn bữa tiệc hoàn hảo' },
  { id: 6, name: 'Rượu Vang & Cocktails (Beverages)', description: 'Tuyển tập vang Grand Cru và cocktail sáng tạo từ bartender hàng đầu' },
];

export const MOCK_MENU_ITEMS: MenuItem[] = [
  // Khai vị
  {
    id: 101,
    categoryId: 1,
    categoryName: 'Khai Vị Tinh Hoa (Starters)',
    name: 'Súp Nấm Truffle Bào Tươi & Bánh Mì Bơ Tỏi',
    description: 'Nấm Truffle đen nhập khẩu từ vùng Alba Ý, kem béo thảo mộc Pháp, bánh mì nướng bơ tỏi vàng giòn.',
    price: 245000,
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    status: 'AVAILABLE',
    badge: "Chef's Signature",
    calories: 320,
    spiceLevel: 0,
  },
  {
    id: 102,
    categoryId: 1,
    categoryName: 'Khai Vị Tinh Hoa (Starters)',
    name: 'Gan Ngỗng Áp Chảo Sốt Táo Caramen & Rượu Port',
    description: 'Foie gras Pháp thượng hạng áo lớp caramen giòn nhẹ, dùng kèm mứt sung ngọt dịu và xốt rượu vang đỏ.',
    price: 490000,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    status: 'AVAILABLE',
    badge: 'Best Seller',
    calories: 450,
    spiceLevel: 0,
  },
  {
    id: 103,
    categoryId: 1,
    categoryName: 'Khai Vị Tinh Hoa (Starters)',
    name: 'Salad Rong Biển Trứng Cá Tầm Caviar & Bơ Sáp',
    description: 'Salad hữu cơ Đà Lạt tươi mát kết hợp trứng cá tầm đen Caviar thượng hạng và sốt chanh leo chua thanh.',
    price: 360000,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    isAvailable: false,
    status: 'OUT_OF_STOCK',
    badge: 'Tạm hết hôm nay',
    calories: 210,
    spiceLevel: 0,
  },

  // Bò bít tết
  {
    id: 201,
    categoryId: 2,
    categoryName: 'Bò Bít Tết Hảo Hạng (Signature Steaks)',
    name: 'Thăn Lưng Bò Wagyu Nhật A5 Miyazaki (250g)',
    description: 'Vân mỡ cẩm thạch hoàn hảo tan chảy ở 25°C, hương thơm thảo mộc nướng than củi, muối hồng Himalaya & sốt tiêu đen Phú Quốc.',
    price: 1850000,
    imageUrl: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    status: 'AVAILABLE',
    badge: 'Tuyệt Phẩm A5',
    calories: 680,
    spiceLevel: 1,
  },
  {
    id: 202,
    categoryId: 2,
    categoryName: 'Bò Bít Tết Hảo Hạng (Signature Steaks)',
    name: 'Tomahawk Black Angus Úc Nướng Gỗ Sồi (1.2kg)',
    description: 'Dành cho nhóm 3-4 khách. Bò ăn cỏ 200 ngày, thịt mềm ngọt mọng nước, ăn kèm 4 loại sốt đặc chế và măng tây xào bơ tỏi.',
    price: 2450000,
    imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    status: 'AVAILABLE',
    badge: 'Bàn Tiệc Gia Đình',
    calories: 1450,
    spiceLevel: 0,
  },
  {
    id: 203,
    categoryId: 2,
    categoryName: 'Bò Bít Tết Hảo Hạng (Signature Steaks)',
    name: 'Thăn Nội Bò Úc Black Onyx Dry-Aged 45 Ngày',
    description: 'Thịt ủ khô đặc biệt gia tăng chiều sâu hương vị, mềm mại từng thớ thịt, chấm kèm mù tạt Dijon thượng hạng.',
    price: 980000,
    imageUrl: 'https://images.unsplash.com/photo-1504973959464-96c46a6f1d8c?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    status: 'AVAILABLE',
    badge: 'Dry-Aged 45D',
    calories: 520,
    spiceLevel: 0,
  },

  // Hải sản
  {
    id: 301,
    categoryId: 3,
    categoryName: 'Hải Sản Đại Dương (Seafood Symphony)',
    name: 'Tôm Hùm Nha Trang Nướng Phô Mai Gruyère & Bơ Tỏi',
    description: 'Tôm hùm tươi sống bắt trong ngày, phủ phô mai Thụy Sĩ đút lò thơm nức mũi, vị ngọt nguyên bản từ biển khơi.',
    price: 1250000,
    imageUrl: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    status: 'AVAILABLE',
    badge: 'Hải Sản Tươi Sống',
    calories: 480,
    spiceLevel: 0,
  },
  {
    id: 302,
    categoryId: 3,
    categoryName: 'Hải Sản Đại Dương (Seafood Symphony)',
    name: 'Cá Hồi Nauy Áp Chảo Sốt Bơ Chanh & Măng Tây Biển',
    description: 'Da cá hồi giòn rụm, thịt hồng mọng nước giàu Omega-3, hòa quyện sốt bơ chanh vàng kiểu Pháp.',
    price: 420000,
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    status: 'AVAILABLE',
    calories: 410,
    spiceLevel: 0,
  },
  {
    id: 303,
    categoryId: 3,
    categoryName: 'Hải Sản Đại Dương (Seafood Symphony)',
    name: 'Sò Điệp Hokkaido Khè Lửa Cùng Trứng Nhum Biển Uni',
    description: 'Sò điệp cồi lớn ngọt lịm từ biển Nhật, phủ nhum biển béo ngậy và nhụy hoa nghệ tây Saffron quý hiếm.',
    price: 680000,
    imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80',
    isAvailable: false,
    status: 'INACTIVE',
    badge: 'Mùa vụ tạm ngưng',
    calories: 290,
    spiceLevel: 0,
  },

  // Món chính
  {
    id: 401,
    categoryId: 4,
    categoryName: 'Món Chính Đặc Sắc (Main Courses)',
    name: 'Đùi Cừu Hầm Rượu Vang Đỏ Bourgogne & Khoai Nghiền Truffle',
    description: 'Cừu New Zealand ninh chậm 12 giờ, mềm tan trong miệng thấm đẫm hương vang Pháp, dùng kèm khoai tây nghiền mịn như nhung.',
    price: 580000,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    status: 'AVAILABLE',
    badge: 'Khuyên Dùng',
    calories: 620,
    spiceLevel: 0,
  },
  {
    id: 402,
    categoryId: 4,
    categoryName: 'Món Chính Đặc Sắc (Main Courses)',
    name: 'Mì Ý Tươi Sốt Tôm Hùm Bisque & Trứng Cá Muối',
    description: 'Sợi mì làm thủ công mỗi sáng, nước dùng cô đặc từ đầu tôm hùm ngọt đậm đà, phủ phô mai Parmigiano Reggiano 24 tháng.',
    price: 450000,
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    status: 'AVAILABLE',
    calories: 540,
    spiceLevel: 0,
  },

  // Tráng miệng
  {
    id: 501,
    categoryId: 5,
    categoryName: 'Tráng Miệng Thủ Công (Artisanal Desserts)',
    name: 'Bánh Chocolate Lava Chảy & Kem Vani Madagascar',
    description: 'Chocolate Bỉ nguyên chất 72% tan chảy ấm nóng bên trong, đối lập với viên kem vani thơm lừng mát lạnh.',
    price: 180000,
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    status: 'AVAILABLE',
    badge: 'Món Ngọt Yêu Thích',
    calories: 390,
    spiceLevel: 0,
  },
  {
    id: 502,
    categoryId: 5,
    categoryName: 'Tráng Miệng Thủ Công (Artisanal Desserts)',
    name: 'Crème Brûlée Vị Cà Phê Trứng & Quả Mọng Tươi',
    description: 'Lớp đường khè caramen giòn tan, cốt kem mịn màng hương cà phê Robusta Việt Nam và hạt vani tự nhiên.',
    price: 160000,
    imageUrl: 'https://images.unsplash.com/photo-1514517521153-1be72277b32f?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    status: 'AVAILABLE',
    calories: 310,
    spiceLevel: 0,
  },

  // Đồ uống
  {
    id: 601,
    categoryId: 6,
    categoryName: 'Rượu Vang & Cocktails (Beverages)',
    name: 'Cocktail Aura Golden Sunset (Signature)',
    description: 'Rượu Gin thủ công ngâm hoa hồi, nước ép bưởi hồng, lá hương thảo xông khói và lớp bụi vàng thực phẩm 24K lấp lánh.',
    price: 250000,
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    status: 'AVAILABLE',
    badge: 'Signature Cocktail',
    calories: 160,
    spiceLevel: 0,
  },
  {
    id: 602,
    categoryId: 6,
    categoryName: 'Rượu Vang & Cocktails (Beverages)',
    name: 'Rượu Vang Đỏ Château Margaux Premier Grand Cru (Ly)',
    description: 'Hương vị trái cây đen chín mọng, gỗ tuyết tùng và tannin tròn đầy quý phái từ vùng Bordeaux nước Pháp.',
    price: 650000,
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    status: 'AVAILABLE',
    calories: 125,
    spiceLevel: 0,
  },
];

// Initial mock bookings for demonstration & local storage tracking
const LOCAL_BOOKINGS_KEY = 'aura_gourmand_customer_bookings';

function getStoredBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(LOCAL_BOOKINGS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to parse local bookings', e);
  }
  // Default mock bookings for instant testing
  const defaults: Booking[] = [
    {
      id: 1001,
      branchId: 1,
      branchName: 'Aura Gourmand - Hoàn Kiếm Heritage',
      tableId: 5,
      tableNumber: 'VIP-02',
      customerName: 'Nguyễn Hoàng Nam',
      customerPhone: '0912345678',
      bookingTime: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      partySize: 4,
      depositAmount: 500000,
      status: 'CONFIRMED',
      specialRequest: 'Bàn tiệc kỷ niệm ngày cưới, chuẩn bị nến và hoa hồng đỏ.',
      createdAt: new Date(Date.now() - 3600 * 1000).toISOString(),
    },
    {
      id: 1002,
      branchId: 2,
      branchName: 'Aura Gourmand - Sài Gòn Skyview',
      tableId: null,
      tableNumber: null,
      customerName: 'Nguyễn Hoàng Nam',
      customerPhone: '0912345678',
      bookingTime: new Date(Date.now() + 72 * 3600 * 1000).toISOString(),
      partySize: 6,
      depositAmount: 0,
      status: 'PENDING',
      specialRequest: 'Vị trí gần cửa kính ngắm cảnh toàn thành phố về đêm.',
      createdAt: new Date().toISOString(),
    },
  ];
  try {
    localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(defaults));
  } catch (e) {
    // ignore
  }
  return defaults;
}

function saveStoredBookings(bookings: Booking[]) {
  try {
    localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(bookings));
  } catch (e) {
    console.error('Failed to save bookings locally', e);
  }
}

export const apiService = {
  // 1. Module Trang chủ & Chi nhánh
  async getBranches(): Promise<Branch[]> {
    try {
      const response = await fetch(`${API_BASE}/branches`, {
        headers: { 'Accept': 'application/json' },
      });
      if (response.ok) {
        const json: ApiResponse<Branch[]> = await response.json();
        if (json.data && json.data.length > 0) {
          return json.data.map(b => ({
            ...b,
            image: b.image || b.imageUrl || MOCK_BRANCHES.find(m => m.id === b.id)?.image || MOCK_BRANCHES[0].image,
          }));
        }
      }
    } catch (err) {
      console.warn('Backend unavailable, using rich mock branches data:', err);
    }
    return MOCK_BRANCHES;
  },

  // 2. Module Thực đơn điện tử
  async getCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${API_BASE}/menu/categories`, {
        headers: { 'Accept': 'application/json', 'X-Branch-Id': '1' },
      });
      if (response.ok) {
        const json: ApiResponse<Category[]> = await response.json();
        if (json.data && json.data.length > 0) {
          return json.data;
        }
      }
    } catch (err) {
      console.warn('Backend categories unavailable, using mock:', err);
    }
    return MOCK_CATEGORIES;
  },

  async getMenuItems(categoryId?: number): Promise<MenuItem[]> {
    try {
      const url = categoryId
        ? `${API_BASE}/menu/items?categoryId=${categoryId}`
        : `${API_BASE}/menu/items`;
      const response = await fetch(url, {
        headers: { 'Accept': 'application/json', 'X-Branch-Id': '1' },
      });
      if (response.ok) {
        const json: ApiResponse<MenuItem[]> = await response.json();
        if (json.data && json.data.length > 0) {
          return json.data.map(item => ({
            ...item,
            // Map availability to status if missing
            status: item.status || (item.isAvailable ? 'AVAILABLE' : 'OUT_OF_STOCK'),
            imageUrl: item.imageUrl || MOCK_MENU_ITEMS.find(m => m.id === item.id)?.imageUrl || MOCK_MENU_ITEMS[0].imageUrl,
          }));
        }
      }
    } catch (err) {
      console.warn('Backend menu items unavailable, using mock:', err);
    }
    
    // Filter fallback
    if (categoryId) {
      return MOCK_MENU_ITEMS.filter(item => item.categoryId === categoryId);
    }
    return MOCK_MENU_ITEMS;
  },

  // 3. Module Đặt bàn trực tuyến
  async createBooking(payload: CreateBookingPayload): Promise<Booking> {
    const branchName = MOCK_BRANCHES.find(b => b.id === payload.branchId)?.name || `Chi nhánh #${payload.branchId}`;
    
    let createdBooking: Booking | null = null;
    try {
      const response = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Branch-Id': String(payload.branchId),
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const json: ApiResponse<Booking> = await response.json();
        if (json.data) {
          createdBooking = {
            ...json.data,
            branchName,
          };
        }
      }
    } catch (err) {
      console.warn('API booking creation failed, falling back to local storage simulation:', err);
    }

    if (!createdBooking) {
      // Simulate booking creation locally
      createdBooking = {
        id: Math.floor(1000 + Math.random() * 9000),
        branchId: payload.branchId,
        branchName,
        tableId: payload.tableId || null,
        tableNumber: null,
        customerName: payload.customerName,
        customerPhone: payload.customerPhone,
        bookingTime: payload.bookingTime,
        partySize: payload.partySize,
        depositAmount: payload.depositAmount || 0,
        status: 'PENDING',
        specialRequest: payload.specialRequest,
        createdAt: new Date().toISOString(),
      };
    }

    // Always store to local tracking storage
    const current = getStoredBookings();
    current.unshift(createdBooking);
    saveStoredBookings(current);

    return createdBooking;
  },

  // 4. Module Tra cứu trạng thái đặt bàn
  async trackBookings(phone: string): Promise<Booking[]> {
    const cleanPhone = phone.trim();
    if (!cleanPhone) return [];

    let apiResults: Booking[] = [];
    try {
      const response = await fetch(`${API_BASE}/bookings/track?phone=${encodeURIComponent(cleanPhone)}`, {
        headers: { 'Accept': 'application/json' },
      });
      if (response.ok) {
        const json: ApiResponse<Booking[]> = await response.json();
        if (json.data && Array.isArray(json.data)) {
          apiResults = json.data;
        }
      }
    } catch (err) {
      console.warn('API booking tracking unavailable, falling back to local stored bookings:', err);
    }

    // Merge with locally stored bookings for this phone number
    const local = getStoredBookings().filter(b => b.customerPhone === cleanPhone);
    
    // Combine unique bookings by ID
    const mergedMap = new Map<number, Booking>();
    apiResults.forEach(b => mergedMap.set(b.id, b));
    local.forEach(b => {
      if (!mergedMap.has(b.id)) {
        mergedMap.set(b.id, b);
      }
    });

    return Array.from(mergedMap.values()).sort(
      (a, b) => new Date(b.bookingTime).getTime() - new Date(a.bookingTime).getTime()
    );
  },
};
