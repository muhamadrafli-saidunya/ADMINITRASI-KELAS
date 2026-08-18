import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SchoolInfo } from '../../types';
import { ConfirmDialog } from '../common/ConfirmDialog';
import {
  Settings,
  Building2,
  GraduationCap,
  Save,
  RotateCcw,
  Download,
  Upload,
  Check,
  ShieldCheck,
  Sparkles,
  UserCheck,
  ArrowRight
} from 'lucide-react';

export const PengaturanView: React.FC = () => {
  const {
    schoolInfo,
    updateSchoolInfo,
    resetAllDataToDefault,
    exportDatabaseToJson,
    teachers,
    setCurrentTab,
    currentUser,
    addToast
  } = useApp();

  const [formData, setFormData] = useState<SchoolInfo>({ ...schoolInfo });
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSchoolInfo(formData);
  };

  const isTeacherOrAdmin = currentUser.role !== 'siswa';

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <Settings className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Pengaturan Profil Sekolah & Kurikulum
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Konfigurasi data kop surat resmi, kepala sekolah, wali kelas, semester, dan cadangan database
            </p>
          </div>
        </div>
      </div>

      {/* Card for Guru & Tendik Quick Access */}
      <div className="rounded-2xl border border-purple-200 dark:border-purple-900/50 bg-gradient-to-r from-purple-50/70 via-indigo-50/50 to-white dark:from-purple-950/30 dark:via-slate-900 dark:to-slate-900 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-sm flex-shrink-0">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Manajemen Tenaga Pendidik & Kependidikan (PTK)</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-200 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300">
                {teachers.length} Guru
              </span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Kelola data nama guru, NIP, status PNS/PPPK/GTT, mata pelajaran, dan tugas wali kelas.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setCurrentTab('guru')}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/20 active:scale-95 transition-all self-start sm:self-auto shrink-0"
        >
          <span>Buka Menu Guru & Tendik</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Card 1: Identitas Resmi Sekolah & Kop Dokumen */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Identitas Resmi Sekolah & Header Kop Dokumen
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nama Sekolah Dasar *
              </label>
              <input
                type="text"
                disabled={!isTeacherOrAdmin}
                required
                value={formData.schoolName}
                onChange={e => setFormData({ ...formData, schoolName: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                NPSN (Nomor Pokok Sekolah) *
              </label>
              <input
                type="text"
                disabled={!isTeacherOrAdmin}
                required
                value={formData.npsn}
                onChange={e => setFormData({ ...formData, npsn: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Alamat Lengkap Sekolah
              </label>
              <input
                type="text"
                disabled={!isTeacherOrAdmin}
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Kota / Kabupaten
              </label>
              <input
                type="text"
                disabled={!isTeacherOrAdmin}
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Email Sekolah
              </label>
              <input
                type="email"
                disabled={!isTeacherOrAdmin}
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nomor Telepon Sekolah
              </label>
              <input
                type="text"
                disabled={!isTeacherOrAdmin}
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Provinsi
              </label>
              <input
                type="text"
                disabled={!isTeacherOrAdmin}
                value={formData.province}
                onChange={e => setFormData({ ...formData, province: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Pejabat Penandatangan (Kepala Sekolah & Wali Kelas) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Data Penandatangan Dokumen & Rapor
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nama Kepala Sekolah (Lengkap Gelar) *
              </label>
              <input
                type="text"
                disabled={!isTeacherOrAdmin}
                required
                value={formData.headmasterName}
                onChange={e => setFormData({ ...formData, headmasterName: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                NIP Kepala Sekolah
              </label>
              <input
                type="text"
                disabled={!isTeacherOrAdmin}
                value={formData.headmasterNip}
                onChange={e => setFormData({ ...formData, headmasterNip: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nama Wali Kelas (Lengkap Gelar) *
              </label>
              <input
                type="text"
                disabled={!isTeacherOrAdmin}
                required
                value={formData.homeroomTeacherName}
                onChange={e => setFormData({ ...formData, homeroomTeacherName: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                NIP Wali Kelas
              </label>
              <input
                type="text"
                disabled={!isTeacherOrAdmin}
                value={formData.homeroomTeacherNip}
                onChange={e => setFormData({ ...formData, homeroomTeacherNip: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nama Rombongan Belajar / Kelas *
              </label>
              <input
                type="text"
                disabled={!isTeacherOrAdmin}
                value={formData.className}
                onChange={e => setFormData({ ...formData, className: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Fase Kurikulum
              </label>
              <input
                type="text"
                disabled={!isTeacherOrAdmin}
                value={formData.phase}
                onChange={e => setFormData({ ...formData, phase: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Action Save Button */}
        {isTeacherOrAdmin && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-md active:scale-95 transition-all"
            >
              <Save className="h-4 w-4" />
              <span>Simpan Perubahan Profil</span>
            </button>
          </div>
        )}
      </form>

      {/* Card 3: Manajemen Cadangan & Pemulihan Data */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Pusat Cadangan & Pemulihan Data (Backup & Reset)
          </h3>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Semua data buku administrasi tersimpan secara offline & aman di penyimpanan peramban (Local Storage). Unduh cadangan berkala untuk keamanan data Anda.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={exportDatabaseToJson}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Download className="h-4 w-4 text-blue-600" />
            <span>Cadangkan Data (Backup JSON)</span>
          </button>

          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset ke Data Awal Simulasi</span>
          </button>
        </div>
      </div>

      {/* Confirm Reset Dialog */}
      {isResetConfirmOpen && (
        <ConfirmDialog
          isOpen={true}
          onClose={() => setIsResetConfirmOpen(false)}
          onConfirm={() => {
            resetAllDataToDefault();
            setIsResetConfirmOpen(false);
            setFormData({ ...schoolInfo });
          }}
          title="Reset Semua Data ke Pengaturan Awal?"
          message="Tindakan ini akan mengembalikan data seluruh pendidik/guru, siswa, absensi, nilai, kas, dan jadwal ke contoh data awal."
          confirmText="Ya, Reset Sekarang"
          isDestructive={true}
        />
      )}
    </div>
  );
};
