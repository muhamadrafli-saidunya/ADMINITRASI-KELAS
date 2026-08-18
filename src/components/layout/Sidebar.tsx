import React from 'react';
import { useApp } from '../../context/AppContext';
import { ActiveTab } from '../../types';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  CalendarCheck2,
  GraduationCap,
  FileSpreadsheet,
  BookOpenCheck,
  CalendarDays,
  WalletCards,
  Boxes,
  Award,
  Sparkles,
  Settings,
  School,
  LogOut,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRoleModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  onOpenRoleModal
}) => {
  const {
    currentTab,
    setCurrentTab,
    currentUser,
    schoolInfo,
    students,
    teachers,
    getCurrentCashBalance,
    logout,
    hasPermission
  } = useApp();

  const navItems: Array<{
    id: ActiveTab;
    label: string;
    icon: React.ReactNode;
    badge?: string | number;
    badgeColor?: string;
  }> = [
    {
      id: 'dashboard',
      label: 'Dashboard Utama',
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      id: 'siswa',
      label: 'Data Siswa & Induk',
      icon: <Users className="h-5 w-5" />,
      badge: students.length,
      badgeColor: 'bg-blue-600/20 text-blue-300'
    },
    {
      id: 'guru',
      label: 'Data Guru & Tendik',
      icon: <UserCheck className="h-5 w-5" />,
      badge: teachers.length,
      badgeColor: 'bg-purple-500/20 text-purple-300'
    },
    {
      id: 'presensi',
      label: 'Presensi & Kehadiran',
      icon: <CalendarCheck2 className="h-5 w-5" />
    },
    {
      id: 'nilai',
      label: 'Daftar Nilai & TP',
      icon: <GraduationCap className="h-5 w-5" />
    },
    {
      id: 'raport',
      label: 'Cetak Rapor Kurmer',
      icon: <FileSpreadsheet className="h-5 w-5" />
    },
    {
      id: 'jurnal',
      label: 'Jurnal Mengajar Guru',
      icon: <BookOpenCheck className="h-5 w-5" />
    },
    {
      id: 'jadwal',
      label: 'Jadwal & Piket Kelas',
      icon: <CalendarDays className="h-5 w-5" />
    },
    {
      id: 'kas',
      label: 'Kas Kelas & Iuran',
      icon: <WalletCards className="h-5 w-5" />,
      badge: `Rp ${(getCurrentCashBalance() / 1000).toFixed(0)}k`,
      badgeColor: 'bg-emerald-500/20 text-emerald-300'
    },
    {
      id: 'inventaris',
      label: 'Inventaris Kelas (KIR)',
      icon: <Boxes className="h-5 w-5" />
    },
    {
      id: 'konseling',
      label: 'Konseling & Prestasi',
      icon: <Award className="h-5 w-5" />
    },
    {
      id: 'ai_assistant',
      label: 'AI Asisten Wali Kelas',
      icon: <Sparkles className="h-5 w-5 text-amber-400" />,
      badge: 'Gemini',
      badgeColor: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold'
    },
    {
      id: 'pengaturan',
      label: 'Pengaturan & Hak Akses',
      icon: <Settings className="h-5 w-5" />
    }
  ];

  const filteredNavItems = navItems.filter(item => hasPermission(item.id));

  const handleNavClick = (tab: ActiveTab) => {
    setCurrentTab(tab);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden no-print"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex w-72 flex-col bg-slate-900 text-slate-200 shadow-2xl transition-transform duration-300 ease-in-out border-r border-slate-800 lg:translate-x-0 no-print ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* School Branding Header */}
        <div className="flex items-center gap-3.5 border-b border-slate-800/80 px-5 py-4.5 bg-gradient-to-r from-blue-950/70 to-slate-900">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-md shadow-blue-500/20 border border-blue-400/30">
            <School className="h-6 w-6 text-amber-300" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-400 bg-orange-950/60 px-1.5 py-0.5 rounded border border-orange-800/50">
                SD MERDEKA
              </span>
              <span className="text-[10px] font-semibold text-slate-400">
                Fase B
              </span>
            </div>
            <h1 className="truncate text-sm font-bold text-white mt-0.5">
              {schoolInfo.schoolName}
            </h1>
            <p className="truncate text-xs text-blue-200/80 font-medium">
              {schoolInfo.className}
            </p>
          </div>
        </div>

        {/* User Role Card Quick Bar */}
        <div className="mx-3 mt-3 rounded-xl bg-slate-800/60 p-3 border border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-9 w-9 rounded-full object-cover ring-2 ring-blue-500/50 shrink-0"
            />
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-white">
                {currentUser.name}
              </p>
              <div className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-blue-400" />
                <span className="text-[10px] text-slate-300 font-medium capitalize">
                  {currentUser.role === 'wali_kelas' 
                    ? 'Wali Kelas' 
                    : currentUser.role === 'admin' 
                    ? 'Kepala Sekolah' 
                    : currentUser.role === 'guru_mapel'
                    ? 'Guru Mapel'
                    : 'Siswa / Ortu'}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onOpenRoleModal}
            title="Ganti Role Akun"
            className="p-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 transition-colors text-[11px] font-bold"
          >
            Ganti
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 custom-scrollbar">
          <p className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Menu Administrasi
          </p>

          {filteredNavItems.map(item => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400 transition-colors'}`}>
                    {item.icon}
                  </span>
                  <span className="tracking-wide">{item.label}</span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white font-bold'
                          : item.badgeColor || 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="h-4 w-4 text-blue-200" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer Info */}
        <div className="border-t border-slate-800 p-3 bg-slate-950/60">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <div>
              <p className="font-semibold text-slate-300">T.A. {schoolInfo.academicYear}</p>
              <p className="text-[10px] text-slate-500">Sem. {schoolInfo.semester}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-1 text-slate-400 hover:text-rose-400 transition-colors text-xs font-medium"
              title="Keluar dari akun & kembali ke form login"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
