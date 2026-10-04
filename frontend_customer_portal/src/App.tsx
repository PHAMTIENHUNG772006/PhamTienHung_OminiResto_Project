import React, { useState, useEffect } from 'react';
import { Branch, Category, MenuItem, Booking } from './types';
import { apiService } from './services/api';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BranchSection } from './components/BranchSection';
import { MenuSection } from './components/MenuSection';
import { BookingSection } from './components/BookingSection';
import { TrackingSection } from './components/TrackingSection';
import { DishModal } from './components/DishModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  // Global Data
  const [branches, setBranches] = useState<Branch[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loadingBranches, setLoadingBranches] = useState<boolean>(true);
  const [loadingMenu, setLoadingMenu] = useState<boolean>(true);

  // Cross-component Interaction State
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
  const [prefilledBookingNote, setPrefilledBookingNote] = useState<string>('');
  const [trackingPhone, setTrackingPhone] = useState<string>('');
  const [selectedDishDetail, setSelectedDishDetail] = useState<MenuItem | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load initial data
  useEffect(() => {
    async function loadInitialData() {
      try {
        const branchList = await apiService.getBranches();
        setBranches(branchList);
        if (branchList.length > 0) {
          setSelectedBranchId(branchList[0].id);
        }
      } catch (err) {
        console.error('Failed to load branches', err);
      } finally {
        setLoadingBranches(false);
      }

      try {
        const [catList, itemList] = await Promise.all([
          apiService.getCategories(),
          apiService.getMenuItems(),
        ]);
        setCategories(catList);
        setMenuItems(itemList);
      } catch (err) {
        console.error('Failed to load menu data', err);
      } finally {
        setLoadingMenu(false);
      }
    }

    loadInitialData();
  }, []);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Branch -> Booking flow
  const handleSelectBranchForBooking = (branchId: number) => {
    setSelectedBranchId(branchId);
    scrollToSection('booking');
    const branch = branches.find((b) => b.id === branchId);
    addToast('info', `Đã chọn cơ sở: ${branch?.name || branchId}`);
  };

  // Menu -> Booking flow
  const handleQuickBookDish = (dish: MenuItem) => {
    setPrefilledBookingNote(`Món đề xuất: ${dish.name}`);
    scrollToSection('booking');
    addToast('info', `Đã thêm món "${dish.name}" vào ghi chú đặt bàn.`);
  };

  // Booking -> Success callback
  const handleBookingSuccess = (booking: Booking) => {
    addToast('success', `Đặt bàn thành công! Mã đơn: #${booking.id}`);
  };

  // Direct track link
  const handleTrackPhone = (phone: string) => {
    setTrackingPhone(phone);
    scrollToSection('tracking');
    addToast('info', `Đang tra cứu lịch đặt bàn cho số điện thoại: ${phone}`);
  };

  return (
    <div className="app-root">
      {/* Navigation */}
      <Navbar
        onNavigateToBooking={(branchId) => {
          if (branchId) setSelectedBranchId(branchId);
          scrollToSection('booking');
        }}
        onNavigateToTracking={() => scrollToSection('tracking')}
      />

      {/* Main Content */}
      <main id="main-content">
        {/* Hero Section */}
        <Hero
          onExploreMenu={() => scrollToSection('menu')}
          onBookTable={() => scrollToSection('booking')}
        />

        {/* Module 1: Branch Info & Space */}
        <BranchSection
          branches={branches}
          loading={loadingBranches}
          onSelectBranchForBooking={handleSelectBranchForBooking}
        />

        {/* Module 2: Digital Menu */}
        <MenuSection
          categories={categories}
          menuItems={menuItems}
          loading={loadingMenu}
          onOpenDishDetail={(dish) => setSelectedDishDetail(dish)}
          onQuickBookDish={handleQuickBookDish}
        />

        {/* Module 3: Online Booking */}
        <BookingSection
          branches={branches}
          selectedBranchId={selectedBranchId}
          onSelectBranch={(id) => setSelectedBranchId(id)}
          prefilledNote={prefilledBookingNote}
          onBookingSuccess={handleBookingSuccess}
          onTrackThisBooking={handleTrackPhone}
        />

        {/* Module 4: Booking Tracking */}
        <TrackingSection
          initialPhone={trackingPhone}
          onNavigateToBooking={() => scrollToSection('booking')}
        />
      </main>

      {/* Footer */}
      <Footer branches={branches} />

      {/* Dish Inspection Modal */}
      {selectedDishDetail && (
        <DishModal
          dish={selectedDishDetail}
          onClose={() => setSelectedDishDetail(null)}
          onBookDish={handleQuickBookDish}
        />
      )}

      {/* Global Toast Messages */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};

export default App;
