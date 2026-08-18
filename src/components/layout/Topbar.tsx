import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  Moon,
  Sun,
  Sparkles,
  ShieldCheck,
  UserCheck,
  User,
  PlusCircle,
  CalendarCheck2,
  GraduationCap,
  BookOpenCheck,
  WalletCards,
  FileSpreadsheet,
  LogOut
} from 'lucide-react';

interface TopbarProps {
  onToggleSidebar: () => void;
  onOpenRoleModal: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  onToggleSidebar,
  onOpenRoleModal
}) => {
  const {
    currentTab,
    setCurrentTab,
    currentUser,
    isDarkMode,
    toggleDarkMode,
    schoolInfo,
    logout
  } = useApp();

  const [showQuickMenu, setShowQuickMenu] = useState(false);

  const tabTitles: Record<string, { title: string; subtitle: string }> = {
    dashboard: { title: 'Dashboard Utama', subtitle: 'Ringkasan aktivitas dan administrasi kelas terpadu' },
    siswa: { title: 'Buku Induk & Data Siswa', subtitle: 'Kelola data identitas, biodata, dan profil siswa Kelas 4A' },
    presensi: { title: 'Presensi & Kehadiran', subtitle: 'Pencatatan daftar hadir harian dan rekap bulanan siswa' },
    nilai: { title: 'Daftar Nilai & Asesmen', subtitle: 'Penilaian formatif & sumatif Kurikulum Merdeka' },
    raport: { title: 'Cetak Rapor Kurikulum Merdeka', subtitle: 'Laporan hasil belajar siswa format resmi siap cetak' },
    jurnal: { title: 'Buku Jurnal Mengajar Guru', subtitle: 'Agenda harian pelaksanaan pembelajaran dan evaluasi' },
    jadwal: { title: 'Jadwal Pelajaran & Piket', subtitle: 'Matriks jam belajar mingguan dan pembagian regu piket' },
    kas: { title: 'Kas Kelas & Iuran Paguyuban', subtitle: 'Pencatatan keuangan transparan dan iuran kas siswa' },
    inventaris: { title: 'Inventaris Sarana Kelas', subtitle: 'Buku inventaris barang dan Kartu Inventaris Ruangan (KIR)' },
    konseling: { title: 'Bimbingan & Prestasi Siswa', subtitle: 'Catatan perkembangan perilaku, konseling, dan prestasi' },
    ai_assistant: { title: 'AI Asisten Wali Kelas', subtitle: 'Generator catatan rapor, ide P5, dan rubrik bertenaga Gemini AI' },
    pengaturan: { title: 'Pengaturan & Backup Database', subtitle: 'Konfigurasi identitas sekolah, ekspor dan impor data' }
  };

  const currentInfo = tabTitles[currentTab] || { title: 'Administrasi Kelas SD', subtitle: 'Sistem Terpadu' };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 sm:px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 no-print transition-colors">
      {/* Left section: Hamburger & Title */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
          aria-label="Toggle Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {currentInfo.title}
            </h2>
            <span className="hidden md:inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60">
              {schoolInfo.className}
            </span>
          </div>
          <p className="hidden sm:block truncate text-xs text-slate-500 dark:text-slate-400">
            {currentInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Right Action Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Action Dropdown for Teachers */}
        {currentUser.role !== 'siswa' && (
          <div className="relative">
            <button
              onClick={() => setShowQuickMenu(!showQuickMenu)}
              className="flex items-center gap-1.5 rounded-xl bg-orange-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-orange-700 transition-colors"
            >
              <PlusCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Aksi Cepat</span>
            </button>

            {showQuickMenu && (
              <>
                <div
                  onClick={() => setShowQuickMenu(false)}
                  className="fixed inset-0 z-40"
                />
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 shadow-2xl border border-slate-200 dark:bg-slate-800 dark:border-slate-700 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <p className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Input Cepat
                  </p>
                  <button
                    onClick={() => {
                      setCurrentTab('presensi');
                      setShowQuickMenu(false);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-700/60"
                  >
                    <CalendarCheck2 className="h-4 w-4 text-blue-600" />
                    <span>Isi Presensi Hari Ini</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('nilai');
                      setShowQuickMenu(false);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-700/60"
                  >
                    <GraduationCap className="h-4 w-4 text-emerald-600" />
                    <span>Input Nilai Asesmen</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('jurnal');
                      setShowQuickMenu(false);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-700/60"
                  >
                    <BookOpenCheck className="h-4 w-4 text-amber-600" />
                    <span>Tulis Jurnal Mengajar</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('kas');
                      setShowQuickMenu(false);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-700/60"
                  >
                    <WalletCards className="h-4 w-4 text-purple-600" />
                    <span>Catat Iuran / Kas Masuk</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('raport');
                      setShowQuickMenu(false);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-700/60"
                  >
                    <FileSpreadsheet className="h-4 w-4 text-rose-600" />
                    <span>Cetak Rapor Siswa</span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* AI Assistant Shortcut */}
        <button
          onClick={() => setCurrentTab('ai_assistant')}
          className="flex items-center gap-1.5 rounded-xl border border-amber-300/80 bg-amber-50/80 px-2.5 py-1.5 text-xs font-bold text-amber-800 hover:bg-amber-100 dark:border-amber-700/50 dark:bg-amber-950/40 dark:text-amber-300 transition-colors"
          title="Buka AI Asisten Gemini"
        >
          <Sparkles className="h-4 w-4 text-amber-500 fill-amber-400" />
          <span className="hidden md:inline">AI Guru</span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
          title={isDarkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
        >
          {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* User Role Switcher Trigger */}
        <button
          onClick={onOpenRoleModal}
          className="flex items-center gap-2 rounded-xl border border-slate-200 p-1.5 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors"
          title="Klik untuk beralih Role Pengguna (Admin / Wali Kelas / Siswa)"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="h-7 w-7 rounded-lg object-cover ring-1 ring-blue-500/50"
          />
          <div className="hidden lg:block text-left">
            <p className="text-xs font-bold leading-tight text-slate-800 dark:text-white">
              {currentUser.name.split(',')[0]}
            </p>
            <div className="flex items-center gap-1">
              {currentUser.role === 'admin' && <ShieldCheck className="h-3 w-3 text-purple-600" />}
              {currentUser.role === 'wali_kelas' && <UserCheck className="h-3 w-3 text-blue-600" />}
              {currentUser.role === 'siswa' && <User className="h-3 w-3 text-emerald-600" />}
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 capitalize">
                {currentUser.role === 'wali_kelas' ? 'Wali Kelas' : currentUser.role === 'admin' ? 'Kepsek' : 'Siswa'}
              </span>
            </div>
          </div>
        </button>

        {/* Direct Logout Button */}
        <button
          onClick={logout}
          className="rounded-xl p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:text-slate-400 dark:hover:text-rose-400 dark:hover:bg-rose-950/40 transition-colors"
          title="Keluar dari sesi akun & kembali ke halaman Login"
          aria-label="Logout"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
};
