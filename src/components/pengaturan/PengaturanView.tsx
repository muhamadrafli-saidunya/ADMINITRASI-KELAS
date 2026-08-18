import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SchoolInfo } from '../../types';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { UserManagementSection } from './UserManagementSection';
import { RolePermissionsMatrixSection } from './RolePermissionsMatrixSection';
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
  ArrowRight,
  Users,
  SlidersHorizontal,
  Database,
  FileJson,
  BookOpen
} from 'lucide-react';

export const PengaturanView: React.FC = () => {
  const {
    schoolInfo,
    updateSchoolInfo,
    resetAllDataToDefault,
    exportDatabaseToJson,
    importDatabaseFromJson,
    teachers,
    availableUsers,
    setCurrentTab,
    currentUser,
    addToast
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'profil' | 'pengguna' | 'hak_akses' | 'database'>('profil');
  const [formData, setFormData] = useState<SchoolInfo>({ ...schoolInfo });
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSchoolInfo(formData);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importDatabaseFromJson(content);
        if (success) {
          setFormData({ ...schoolInfo });
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              <Settings className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Pengaturan Sistem & Hak Akses
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Konfigurasi identitas sekolah, akun login pengguna, hak akses menu per peran, dan database
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentTab('nilai')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span>Mata Pelajaran & TP</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentTab('guru')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 transition-colors"
            >
              <UserCheck className="h-4 w-4" />
              <span>Data Guru & Tendik ({teachers.length})</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveSubTab('profil')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'profil'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Building2 className="h-4 w-4" />
            <span>Profil Sekolah & Kelas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('pengguna')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'pengguna'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Manajemen Pengguna</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              activeSubTab === 'pengguna' ? 'bg-blue-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}>
              {availableUsers.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('hak_akses')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'hak_akses'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Hak Akses Menu Login</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('database')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'database'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Database className="h-4 w-4" />
            <span>Cadangan & Database</span>
          </button>
        </div>
      </div>

      {/* Subtab 1: User Management */}
      {activeSubTab === 'pengguna' && <UserManagementSection />}

      {/* Subtab 2: Role Permissions Matrix */}
      {activeSubTab === 'hak_akses' && <RolePermissionsMatrixSection />}

      {/* Subtab 3: School Profile & Curriculum */}
      {activeSubTab === 'profil' && (
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
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Sekolah Dasar *
                </label>
                <input
                  type="text"
                  required
                  value={formData.schoolName}
                  onChange={e => setFormData({ ...formData, schoolName: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  NPSN Sekolah
                </label>
                <input
                  type="text"
                  value={formData.npsn}
                  onChange={e => setFormData({ ...formData, npsn: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  NSS Sekolah
                </label>
                <input
                  type="text"
                  value={formData.nss}
                  onChange={e => setFormData({ ...formData, nss: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Alamat Lengkap Sekolah *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Desa / Kelurahan
                </label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={e => setFormData({ ...formData, village: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Kecamatan
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={e => setFormData({ ...formData, district: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Kabupaten / Kota *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Provinsi *
                </label>
                <input
                  type="text"
                  required
                  value={formData.province}
                  onChange={e => setFormData({ ...formData, province: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Kode Pos
                </label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nomor Telepon Sekolah
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email Sekolah
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Situs Web
                </label>
                <input
                  type="text"
                  value={formData.website}
                  onChange={e => setFormData({ ...formData, website: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Periode Akademik & Penandatangan Rapor */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <GraduationCap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Struktur Kelas, Semester, & Pejabat Penandatangan
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Rombongan Belajar (Kelas) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.className}
                  onChange={e => setFormData({ ...formData, className: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Tahun Ajaran *
                </label>
                <input
                  type="text"
                  required
                  value={formData.academicYear}
                  onChange={e => setFormData({ ...formData, academicYear: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Semester Aktif *
                </label>
                <select
                  value={formData.semester}
                  onChange={e => setFormData({ ...formData, semester: e.target.value as '1 (Ganjil)' | '2 (Genap)' })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="1 (Ganjil)">Semester 1 (Ganjil)</option>
                  <option value="2 (Genap)">Semester 2 (Genap)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Fase Kurikulum Merdeka *
                </label>
                <select
                  value={formData.fase}
                  onChange={e => setFormData({ ...formData, fase: e.target.value as 'Fase A' | 'Fase B' | 'Fase C' })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Fase A">Fase A (Kelas 1 & 2)</option>
                  <option value="Fase B">Fase B (Kelas 3 & 4)</option>
                  <option value="Fase C">Fase C (Kelas 5 & 6)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Kepala Sekolah *
                </label>
                <input
                  type="text"
                  required
                  value={formData.headmaster}
                  onChange={e => setFormData({ ...formData, headmaster: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  NIP Kepala Sekolah
                </label>
                <input
                  type="text"
                  value={formData.headmasterNip}
                  onChange={e => setFormData({ ...formData, headmasterNip: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Wali Kelas *
                </label>
                <input
                  type="text"
                  required
                  value={formData.homeroomTeacher}
                  onChange={e => setFormData({ ...formData, homeroomTeacher: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  NIP Wali Kelas
                </label>
                <input
                  type="text"
                  value={formData.homeroomTeacherNip}
                  onChange={e => setFormData({ ...formData, homeroomTeacherNip: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Kriteria Ketercapaian (KKTP Standar)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.kkmDefault}
                  onChange={e => setFormData({ ...formData, kkmDefault: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 active:scale-95 transition-all"
              >
                <Save className="h-4 w-4" />
                <span>Simpan Pengaturan Profil</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Subtab 4: Database & Backup */}
      {activeSubTab === 'database' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Pusat Cadangan & Pemulihan Data (Backup & Restore)
              </h3>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Semua data buku administrasi kelas, data guru, akun pengguna, nilai, absensi, jurnal, dan matriks hak akses tersimpan secara offline & aman di penyimpanan peramban (Local Storage).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {/* Export JSON */}
              <div className="p-4 rounded-2xl border border-blue-100 dark:border-blue-900/40 bg-blue-50/40 dark:bg-blue-950/20 flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-3 shadow-md shadow-blue-600/20">
                    <Download className="h-5 w-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Unduh Backup JSON</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Simpan salinan seluruh database ke dalam berkas JSON di laptop/komputer Anda.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={exportDatabaseToJson}
                  className="mt-4 w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Backup</span>
                </button>
              </div>

              {/* Import JSON */}
              <div className="p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20 flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 shadow-md shadow-emerald-600/20">
                    <Upload className="h-5 w-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Restore Data JSON</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Pulihkan seluruh basis data dari berkas cadangan JSON yang pernah diunduh.
                  </p>
                </div>
                <label className="mt-4 w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all cursor-pointer">
                  <Upload className="h-3.5 w-3.5" />
                  <span>Pilih File Backup</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Reset to Default */}
              <div className="p-4 rounded-2xl border border-rose-100 dark:border-rose-900/40 bg-rose-50/40 dark:bg-rose-950/20 flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded-xl bg-rose-600 text-white flex items-center justify-center mb-3 shadow-md shadow-rose-600/20">
                    <RotateCcw className="h-5 w-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Reset ke Data Awal</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Kembalikan seluruh data siswa, nilai, jurnal, guru, dan akun ke simulasi standar.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsResetConfirmOpen(true)}
                  className="mt-4 w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-950/50 transition-all"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset Simulasi</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
          message="Tindakan ini akan mengembalikan data seluruh pendidik/guru, siswa, absensi, nilai, kas, akun login, dan jadwal ke data awal."
          confirmText="Ya, Reset Sekarang"
          type="danger"
        />
      )}
    </div>
  );
};

