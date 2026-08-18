import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { RoleSwitcherModal } from './components/auth/RoleSwitcherModal';
import { ToastContainer } from './components/common/ToastContainer';

import { LoginView } from './components/auth/LoginView';

// Module Views
import { DashboardView } from './components/dashboard/DashboardView';
import { DataSiswaView } from './components/siswa/DataSiswaView';
import { DataGuruView } from './components/guru/DataGuruView';
import { PresensiView } from './components/presensi/PresensiView';
import { PenilaianView } from './components/nilai/PenilaianView';
import { RaportView } from './components/raport/RaportView';
import { JurnalMengajarView } from './components/jurnal/JurnalMengajarView';
import { JadwalPelajaranView } from './components/jadwal/JadwalPelajaranView';
import { KasKelasView } from './components/kas/KasKelasView';
import { InventarisView } from './components/inventaris/InventarisView';
import { KonselingPrestasiView } from './components/konseling/KonselingPrestasiView';
import { AIAssistantView } from './components/ai/AIAssistantView';
import { PengaturanView } from './components/pengaturan/PengaturanView';

const MainLayout: React.FC = () => {
  const { currentTab } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  const renderActiveView = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'siswa':
        return <DataSiswaView />;
      case 'guru':
        return <DataGuruView />;
      case 'presensi':
        return <PresensiView />;
      case 'nilai':
        return <PenilaianView />;
      case 'raport':
        return <RaportView />;
      case 'jurnal':
        return <JurnalMengajarView />;
      case 'jadwal':
        return <JadwalPelajaranView />;
      case 'kas':
        return <KasKelasView />;
      case 'inventaris':
        return <InventarisView />;
      case 'konseling':
        return <KonselingPrestasiView />;
      case 'ai_assistant':
        return <AIAssistantView />;
      case 'pengaturan':
        return <PengaturanView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white transition-colors duration-200">
      {/* Toast Notification Layer */}
      <ToastContainer />

      {/* Role Switcher Modal (Multi-user Simulation) */}
      <RoleSwitcherModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
      />

      {/* Main Structural Layout */}
      <div className="flex flex-1">
        {/* Left Navigation Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onOpenRoleModal={() => setIsRoleModalOpen(true)}
        />

        {/* Right Main Content Area */}
        <div className="flex flex-1 flex-col lg:pl-72 w-full min-w-0">
          {/* Topbar Header */}
          <Topbar
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            onOpenRoleModal={() => setIsRoleModalOpen(true)}
          />

          {/* Dynamic Module Canvas */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {renderActiveView()}
          </main>

          {/* Footer */}
          <footer className="border-t border-slate-200/80 bg-white/60 dark:border-slate-800 dark:bg-slate-900/40 py-4 px-6 text-center text-xs text-slate-500 dark:text-slate-400 no-print">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
              <p>
                <strong>Administrasi Kelas SD</strong> • Sistem Informasi Pengelolaan Dokumen & Rapor Kurikulum Merdeka
              </p>
              <p className="text-[11px] text-slate-400">
                SD Negeri Nusantara 01 • Versi 1.0.0 Siap Cetak
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900">
        <ToastContainer />
        <LoginView />
      </div>
    );
  }

  return <MainLayout />;
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
