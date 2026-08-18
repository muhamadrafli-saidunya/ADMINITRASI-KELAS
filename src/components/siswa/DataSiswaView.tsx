import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Student } from '../../types';
import { Modal } from '../common/Modal';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { BadgeStatus } from '../common/BadgeStatus';
import { EmptyState } from '../common/EmptyState';
import { HeaderKopSekolah } from '../common/HeaderKopSekolah';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  ArrowUpDown,
  Printer,
  Download,
  Eye,
  Edit2,
  Trash2,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Check,
  ShieldAlert,
  GraduationCap
} from 'lucide-react';

export const DataSiswaView: React.FC = () => {
  const {
    students,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentAttendanceStats,
    getAllGradesForStudent,
    currentUser,
    schoolInfo,
    addToast
  } = useApp();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState<'Semua' | 'L' | 'P'>('Semua');
  const [statusFilter, setStatusFilter] = useState<'Semua' | 'Aktif' | 'Mutasi' | 'Lulus'>('Semua');
  const [sortBy, setSortBy] = useState<'absen' | 'nama' | 'nisn'>('absen');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [isPrintBukuIndukOpen, setIsPrintBukuIndukOpen] = useState(false);
  const [studentForCardPrint, setStudentForCardPrint] = useState<Student | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<Student, 'id'>>({
    nisn: '',
    nis: '',
    nama: '',
    jenisKelamin: 'L',
    tempatLahir: '',
    tanggalLahir: '2015-01-01',
    agama: 'Islam',
    alamat: '',
    namaAyah: '',
    namaIbu: '',
    pekerjaanOrtu: '',
    noHpOrtu: '',
    fotoUrl: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=150&auto=format&fit=crop&q=80',
    status: 'Aktif',
    nomorAbsen: students.length + 1,
    kelas: '4A',
    catatanKhusus: ''
  });

  // Filter & Sorting Logic
  const safeStudents = students || [];
  const filteredStudents = safeStudents
    .filter(s => {
      const matchQuery =
        s.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.nisn.includes(searchQuery) ||
        s.nis.includes(searchQuery);
      const matchGender = genderFilter === 'Semua' || s.jenisKelamin === genderFilter;
      const matchStatus = statusFilter === 'Semua' || s.status === statusFilter;
      return matchQuery && matchGender && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'absen') return a.nomorAbsen - b.nomorAbsen;
      if (sortBy === 'nama') return a.nama.localeCompare(b.nama);
      if (sortBy === 'nisn') return a.nisn.localeCompare(b.nisn);
      return 0;
    });

  const handleOpenAdd = () => {
    setFormData({
      nisn: '012384' + Math.floor(1000 + Math.random() * 9000),
      nis: '40' + (students.length + 21),
      nama: '',
      jenisKelamin: 'L',
      tempatLahir: 'Jakarta',
      tanggalLahir: '2015-05-15',
      agama: 'Islam',
      alamat: '',
      namaAyah: '',
      namaIbu: '',
      pekerjaanOrtu: '',
      noHpOrtu: '0812-',
      fotoUrl: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=150&auto=format&fit=crop&q=80',
      status: 'Aktif',
      nomorAbsen: students.length + 1,
      kelas: '4A',
      catatanKhusus: ''
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      nisn: student.nisn,
      nis: student.nis,
      nama: student.nama,
      jenisKelamin: student.jenisKelamin,
      tempatLahir: student.tempatLahir,
      tanggalLahir: student.tanggalLahir,
      agama: student.agama,
      alamat: student.alamat,
      namaAyah: student.namaAyah,
      namaIbu: student.namaIbu,
      pekerjaanOrtu: student.pekerjaanOrtu,
      noHpOrtu: student.noHpOrtu,
      fotoUrl: student.fotoUrl,
      status: student.status,
      nomorAbsen: student.nomorAbsen,
      kelas: student.kelas,
      catatanKhusus: student.catatanKhusus || ''
    });
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama.trim()) {
      addToast('error', 'Nama Wajib Diisi', 'Silakan masukkan nama lengkap siswa.');
      return;
    }
    if (!formData.nisn.trim()) {
      addToast('error', 'NISN Wajib Diisi', 'Silakan masukkan 10 digit NISN.');
      return;
    }

    if (editingStudent) {
      updateStudent(editingStudent.id, formData);
      setEditingStudent(null);
    } else {
      addStudent(formData);
      setIsAddModalOpen(false);
    }
  };

  const handleExportCsv = () => {
    const headers = ['No Absen', 'NISN', 'NIS', 'Nama Siswa', 'JK', 'Tempat Lahir', 'Tanggal Lahir', 'Agama', 'Nama Ayah', 'Nama Ibu', 'No HP Ortu', 'Alamat', 'Status'];
    const rows = students.map(s => [
      s.nomorAbsen,
      `'${s.nisn}`,
      s.nis,
      `"${s.nama}"`,
      s.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan',
      s.tempatLahir,
      s.tanggalLahir,
      s.agama,
      `"${s.namaAyah}"`,
      `"${s.namaIbu}"`,
      `'${s.noHpOrtu}`,
      `"${s.alamat}"`,
      s.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Buku_Induk_Siswa_${schoolInfo.className.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    addToast('success', 'Ekspor Berhasil', 'File CSV Buku Induk Siswa telah berhasil diunduh.');
  };

  const isTeacherOrAdmin = currentUser.role !== 'siswa';

  return (
    <div className="space-y-6">
      {/* Top Header Card with Quick Stats */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Buku Induk Siswa {schoolInfo.className}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Total {students.length} Peserta Didik • {students.filter(s => s.jenisKelamin === 'L').length} Laki-laki • {students.filter(s => s.jenisKelamin === 'P').length} Perempuan
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {isTeacherOrAdmin && (
              <button
                onClick={handleOpenAdd}
                className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700 active:scale-95 transition-all"
              >
                <UserPlus className="h-4 w-4" />
                <span>Tambah Siswa</span>
              </button>
            )}

            <button
              onClick={() => setIsPrintBukuIndukOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Printer className="h-4 w-4 text-slate-500" />
              <span>Cetak Buku Induk</span>
            </button>

            <button
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Download className="h-4 w-4 text-slate-500" />
              <span>Ekspor CSV</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          {/* Search Input */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari Nama, NISN, atau NIS..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-3 text-xs text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          {/* Gender Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 whitespace-nowrap">JK:</span>
            <select
              value={genderFilter}
              onChange={e => setGenderFilter(e.target.value as any)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 px-3 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="Semua">Semua JK</option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 whitespace-nowrap">Status:</span>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as any)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 px-3 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="Semua">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Mutasi">Mutasi</option>
              <option value="Lulus">Lulus</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 whitespace-nowrap">Urut:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 px-3 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="absen">No. Absen</option>
              <option value="nama">Nama (A-Z)</option>
              <option value="nisn">NISN</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Student List View */}
      {filteredStudents.length === 0 ? (
        <EmptyState
          title="Tidak Ada Siswa Ditemukan"
          description="Kriteria pencarian atau filter yang Anda gunakan tidak cocok dengan data siswa mana pun."
          actionText="Reset Pencarian"
          onAction={() => {
            setSearchQuery('');
            setGenderFilter('Semua');
            setStatusFilter('Semua');
          }}
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
              <thead className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3.5 text-center w-12">No</th>
                  <th className="px-4 py-3.5">Identitas Siswa</th>
                  <th className="px-4 py-3.5">NISN / NIS</th>
                  <th className="px-4 py-3.5">L/P</th>
                  <th className="px-4 py-3.5">Tempat & Tgl Lahir</th>
                  <th className="px-4 py-3.5">Orang Tua / Kontak</th>
                  <th className="px-4 py-3.5 text-center">Kehadiran</th>
                  <th className="px-4 py-3.5 text-center">Status</th>
                  <th className="px-4 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredStudents.map(student => {
                  const stats = getStudentAttendanceStats(student.id);
                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      {/* No Absen */}
                      <td className="px-4 py-3.5 text-center font-bold text-slate-900 dark:text-white">
                        {student.nomorAbsen}
                      </td>

                      {/* Avatar & Nama */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={student.fotoUrl}
                            alt={student.nama}
                            className="h-9 w-9 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 dark:text-white truncate max-w-[180px]">
                              {student.nama}
                            </p>
                            <p className="text-[11px] text-slate-400 truncate">
                              Agama: {student.agama}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* NISN & NIS */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <p className="font-semibold text-slate-800 dark:text-slate-200">
                          {student.nisn}
                        </p>
                        <p className="text-[11px] text-slate-400">NIS: {student.nis}</p>
                      </td>

                      {/* Gender */}
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold ${
                          student.jenisKelamin === 'L'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                            : 'bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300'
                        }`}>
                          {student.jenisKelamin}
                        </span>
                      </td>

                      {/* TTL */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <p className="text-slate-800 dark:text-slate-200">{student.tempatLahir}</p>
                        <p className="text-[11px] text-slate-400">{student.tanggalLahir}</p>
                      </td>

                      {/* Ortu & Kontak */}
                      <td className="px-4 py-3.5">
                        <p className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[140px]">
                          {student.namaAyah || student.namaIbu}
                        </p>
                        <p className="text-[11px] text-blue-600 dark:text-blue-400 flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {student.noHpOrtu}
                        </p>
                      </td>

                      {/* Kehadiran Rate */}
                      <td className="px-4 py-3.5 text-center">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {stats.percentage}%
                        </span>
                        <p className="text-[10px] text-slate-400">
                          {stats.hadir} H • {stats.izin} I • {stats.sakit} S
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5 text-center">
                        <BadgeStatus status={student.status} size="sm" />
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setViewingStudent(student)}
                            className="p-1.5 rounded-lg text-slate-500 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400 transition-colors"
                            title="Lihat Detail Biodata"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setStudentForCardPrint(student)}
                            className="p-1.5 rounded-lg text-slate-500 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-slate-800 dark:hover:text-orange-400 transition-colors"
                            title="Cetak Kartu Pelajar"
                          >
                            <CreditCard className="h-4 w-4" />
                          </button>
                          {isTeacherOrAdmin && (
                            <>
                              <button
                                onClick={() => handleOpenEdit(student)}
                                className="p-1.5 rounded-lg text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-slate-800 dark:hover:text-emerald-400 transition-colors"
                                title="Edit Biodata"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => setStudentToDelete(student)}
                                className="p-1.5 rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-slate-800 dark:hover:text-rose-400 transition-colors"
                                title="Hapus Siswa"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Tambah / Edit Siswa */}
      <Modal
        isOpen={isAddModalOpen || editingStudent !== null}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingStudent(null);
        }}
        title={editingStudent ? `Edit Biodata Siswa: ${editingStudent.nama}` : 'Tambah Siswa Baru ke Kelas'}
        subtitle="Lengkapi data profil siswa sesuai data resmi Dapodik & Kartu Keluarga"
        maxWidth="3xl"
        icon={<UserPlus className="h-5 w-5 text-blue-600" />}
      >
        <form onSubmit={handleSaveForm} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nama Lengkap */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nama Lengkap Siswa *
              </label>
              <input
                type="text"
                required
                value={formData.nama}
                onChange={e => setFormData({ ...formData, nama: e.target.value })}
                placeholder="Contoh: Ahmad Fauzi Rahman"
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* NISN */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                NISN (10 Digit) *
              </label>
              <input
                type="text"
                required
                value={formData.nisn}
                onChange={e => setFormData({ ...formData, nisn: e.target.value })}
                placeholder="0012345678"
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* NIS */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                NIS Lokal Sekolah
              </label>
              <input
                type="text"
                value={formData.nis}
                onChange={e => setFormData({ ...formData, nis: e.target.value })}
                placeholder="4021"
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* No Absen */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nomor Absen
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={formData.nomorAbsen}
                onChange={e => setFormData({ ...formData, nomorAbsen: parseInt(e.target.value) || 1 })}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Jenis Kelamin
              </label>
              <select
                value={formData.jenisKelamin}
                onChange={e => setFormData({ ...formData, jenisKelamin: e.target.value as 'L' | 'P' })}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="L">Laki-laki (L)</option>
                <option value="P">Perempuan (P)</option>
              </select>
            </div>

            {/* Tempat Lahir */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Tempat Lahir
              </label>
              <input
                type="text"
                value={formData.tempatLahir}
                onChange={e => setFormData({ ...formData, tempatLahir: e.target.value })}
                placeholder="Jakarta"
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Tanggal Lahir */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Tanggal Lahir
              </label>
              <input
                type="date"
                value={formData.tanggalLahir}
                onChange={e => setFormData({ ...formData, tanggalLahir: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Agama */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Agama
              </label>
              <select
                value={formData.agama}
                onChange={e => setFormData({ ...formData, agama: e.target.value as any })}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="Islam">Islam</option>
                <option value="Kristen">Kristen</option>
                <option value="Katolik">Katolik</option>
                <option value="Hindu">Hindu</option>
                <option value="Buddha">Buddha</option>
                <option value="Konghucu">Konghucu</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Status Keaktifan
              </label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="Aktif">Aktif</option>
                <option value="Mutasi">Mutasi</option>
                <option value="Lulus">Lulus</option>
                <option value="Non-aktif">Non-aktif</option>
              </select>
            </div>

            {/* Nama Ayah */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nama Ayah Kandung
              </label>
              <input
                type="text"
                value={formData.namaAyah}
                onChange={e => setFormData({ ...formData, namaAyah: e.target.value })}
                placeholder="Nama Ayah"
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Nama Ibu */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nama Ibu Kandung
              </label>
              <input
                type="text"
                value={formData.namaIbu}
                onChange={e => setFormData({ ...formData, namaIbu: e.target.value })}
                placeholder="Nama Ibu"
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Pekerjaan Ortu */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Pekerjaan Orang Tua
              </label>
              <input
                type="text"
                value={formData.pekerjaanOrtu}
                onChange={e => setFormData({ ...formData, pekerjaanOrtu: e.target.value })}
                placeholder="PNS / Swasta / Wiraswasta"
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* No HP Ortu */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                No. HP / WhatsApp Wali Murid
              </label>
              <input
                type="text"
                value={formData.noHpOrtu}
                onChange={e => setFormData({ ...formData, noHpOrtu: e.target.value })}
                placeholder="0812-3456-7890"
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Alamat Lengkap */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Alamat Tempat Tinggal
              </label>
              <textarea
                rows={2}
                value={formData.alamat}
                onChange={e => setFormData({ ...formData, alamat: e.target.value })}
                placeholder="Jl. Merdeka No. 123, RT/RW, Kelurahan, Kecamatan"
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Catatan Khusus */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Catatan Karakter / Prestasi Khusus
              </label>
              <input
                type="text"
                value={formData.catatanKhusus}
                onChange={e => setFormData({ ...formData, catatanKhusus: e.target.value })}
                placeholder="Contoh: Pengurus kelas, gemar membaca, juara catur"
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingStudent(null);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all active:scale-95"
            >
              <Check className="h-4 w-4" />
              <span>{editingStudent ? 'Simpan Perubahan' : 'Daftarkan Siswa'}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal Detail Biodata Siswa */}
      {viewingStudent && (
        <Modal
          isOpen={true}
          onClose={() => setViewingStudent(null)}
          title={`Buku Induk: ${viewingStudent.nama}`}
          subtitle={`NISN: ${viewingStudent.nisn} • NIS: ${viewingStudent.nis} • Kelas ${schoolInfo.className}`}
          maxWidth="4xl"
        >
          <div className="space-y-6">
            {/* Profile Banner */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-slate-800 dark:to-blue-950/30 border border-blue-100 dark:border-slate-700">
              <img
                src={viewingStudent.fotoUrl}
                alt={viewingStudent.nama}
                className="h-24 w-24 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-800 shadow-md shrink-0"
              />
              <div className="space-y-1.5 text-center sm:text-left flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {viewingStudent.nama}
                  </h3>
                  <BadgeStatus status={viewingStudent.status} size="sm" />
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Nomor Absen: <span className="font-bold text-blue-700 dark:text-blue-400">{viewingStudent.nomorAbsen}</span> • Jenis Kelamin: <span className="font-semibold">{viewingStudent.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</span> • Agama: <span className="font-semibold">{viewingStudent.agama}</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-1">
                  <MapPin className="h-3.5 w-3.5 text-rose-500" />
                  {viewingStudent.alamat}
                </p>
              </div>
            </div>

            {/* Detailed Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Kolom 1: Data Pribadi & Kelahiran */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] text-blue-600 dark:text-blue-400">
                  Data Pribadi & Tempat Lahir
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400">Tempat, Tgl Lahir</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{viewingStudent.tempatLahir}, {viewingStudent.tanggalLahir}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400">NISN</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{viewingStudent.nisn}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400">NIS Lokal</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{viewingStudent.nis}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Catatan Karakter</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 text-right">{viewingStudent.catatanKhusus || '-'}</span>
                  </div>
                </div>
              </div>

              {/* Kolom 2: Data Orang Tua & Kontak */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] text-orange-600 dark:text-orange-400">
                  Data Orang Tua & Kontak Wali
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400">Nama Ayah</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{viewingStudent.namaAyah}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400">Nama Ibu</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{viewingStudent.namaIbu}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400">Pekerjaan</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{viewingStudent.pekerjaanOrtu}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">No. HP / WhatsApp</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{viewingStudent.noHpOrtu}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Riwayat Nilai Singkat */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] text-emerald-600 dark:text-emerald-400">
                Ringkasan Nilai Akhir Semester (Kurikulum Merdeka)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
                {getAllGradesForStudent(viewingStudent.id).map(g => (
                  <div key={g.subject.id} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">
                      {g.subject.kode}
                    </p>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {g.nilaiAkhir}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        g.ketercapaian === 'Tuntas' 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}>
                        {g.predikat}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal Cetak Kartu Pelajar */}
      {studentForCardPrint && (
        <Modal
          isOpen={true}
          onClose={() => setStudentForCardPrint(null)}
          title="Pratinjau Kartu Pelajar Siswa"
          maxWidth="lg"
        >
          <div className="space-y-4">
            {/* Printable ID Card */}
            <div className="mx-auto max-w-sm rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-900 p-5 text-white shadow-xl border border-blue-400/40 relative overflow-hidden">
              <div className="absolute right-0 top-0 -mr-10 -mt-10 h-36 w-36 rounded-full bg-orange-500/20 blur-xl" />

              {/* Card Header */}
              <div className="flex items-center gap-3 border-b border-blue-400/30 pb-3">
                <div className="h-10 w-10 rounded-full bg-white p-1 text-blue-900 font-bold flex items-center justify-center text-xs text-center leading-tight shrink-0">
                  SDN 01
                </div>
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                    KARTU PELAJAR SISWA
                  </h4>
                  <p className="text-[10px] font-bold text-white uppercase">{schoolInfo.schoolName}</p>
                  <p className="text-[8px] text-blue-200">NPSN: {schoolInfo.npsn} • Jakarta</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="mt-4 flex items-center gap-4">
                <img
                  src={studentForCardPrint.fotoUrl}
                  alt={studentForCardPrint.nama}
                  className="h-20 w-16 rounded-xl object-cover ring-2 ring-white/60 shadow-md shrink-0"
                />
                <div className="space-y-1 text-xs min-w-0">
                  <p className="font-extrabold text-sm text-white truncate">
                    {studentForCardPrint.nama}
                  </p>
                  <p className="text-[11px] text-blue-200">
                    NISN: <span className="font-bold text-white">{studentForCardPrint.nisn}</span>
                  </p>
                  <p className="text-[11px] text-blue-200">
                    Kelas: <span className="font-bold text-white">{schoolInfo.className}</span>
                  </p>
                  <p className="text-[10px] text-blue-200 truncate">
                    TTL: {studentForCardPrint.tempatLahir}, {studentForCardPrint.tanggalLahir}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-4 flex items-end justify-between border-t border-blue-400/30 pt-3 text-[9px] text-blue-200">
                <div>
                  <p>Berlaku Hingga:</p>
                  <p className="font-bold text-white">Juni 2028</p>
                </div>
                <div className="text-right">
                  <p>Kepala Sekolah,</p>
                  <p className="font-bold text-white mt-3 underline">{schoolInfo.headmasterName}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setStudentForCardPrint(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md"
              >
                <Printer className="h-4 w-4" />
                <span>Cetak Kartu</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal Cetak Buku Induk Lengkap */}
      {isPrintBukuIndukOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsPrintBukuIndukOpen(false)}
          title="Pratinjau Cetak Buku Induk Siswa"
          maxWidth="5xl"
        >
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 text-black">
              <HeaderKopSekolah
                documentTitle="BUKU INDUK SISWA KELAS SEKOLAH DASAR"
                subTitle={`Tahun Ajaran ${schoolInfo.academicYear} • ${schoolInfo.className} • ${schoolInfo.kurikulum}`}
              />

              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left text-[11px] border-collapse border border-black">
                  <thead>
                    <tr className="bg-slate-100 border border-black text-center font-bold">
                      <th className="border border-black p-1.5">No</th>
                      <th className="border border-black p-1.5">NISN</th>
                      <th className="border border-black p-1.5">NIS</th>
                      <th className="border border-black p-1.5">Nama Lengkap</th>
                      <th className="border border-black p-1.5">L/P</th>
                      <th className="border border-black p-1.5">Tempat & Tgl Lahir</th>
                      <th className="border border-black p-1.5">Agama</th>
                      <th className="border border-black p-1.5">Nama Orang Tua</th>
                      <th className="border border-black p-1.5">No. HP</th>
                      <th className="border border-black p-1.5">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s, idx) => (
                      <tr key={s.id} className="border border-black">
                        <td className="border border-black p-1.5 text-center">{s.nomorAbsen}</td>
                        <td className="border border-black p-1.5 font-mono">{s.nisn}</td>
                        <td className="border border-black p-1.5 text-center font-mono">{s.nis}</td>
                        <td className="border border-black p-1.5 font-bold">{s.nama}</td>
                        <td className="border border-black p-1.5 text-center">{s.jenisKelamin}</td>
                        <td className="border border-black p-1.5">{s.tempatLahir}, {s.tanggalLahir}</td>
                        <td className="border border-black p-1.5">{s.agama}</td>
                        <td className="border border-black p-1.5">{s.namaAyah} / {s.namaIbu}</td>
                        <td className="border border-black p-1.5">{s.noHpOrtu}</td>
                        <td className="border border-black p-1.5 text-center">{s.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tanda Tangan */}
              <div className="mt-8 flex justify-between text-xs text-black pt-4">
                <div className="text-center">
                  <p>Mengetahui,</p>
                  <p>Kepala Sekolah {schoolInfo.schoolName}</p>
                  <div className="h-16" />
                  <p className="font-bold underline">{schoolInfo.headmasterName}</p>
                  <p>NIP. {schoolInfo.headmasterNip}</p>
                </div>
                <div className="text-center">
                  <p>{schoolInfo.city}, 17 Agustus 2026</p>
                  <p>Wali Kelas {schoolInfo.className}</p>
                  <div className="h-16" />
                  <p className="font-bold underline">{schoolInfo.homeroomTeacherName}</p>
                  <p>NIP. {schoolInfo.homeroomTeacherNip}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsPrintBukuIndukOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Tutup
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md"
              >
                <Printer className="h-4 w-4" />
                <span>Cetak Dokumen Sekarang</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation */}
      {studentToDelete && (
        <ConfirmDialog
          isOpen={true}
          onClose={() => setStudentToDelete(null)}
          onConfirm={() => {
            deleteStudent(studentToDelete.id);
            setStudentToDelete(null);
          }}
          title={`Hapus Siswa: ${studentToDelete.nama}?`}
          message={`Apakah Anda yakin ingin menghapus data siswa ${studentToDelete.nama} (NISN: ${studentToDelete.nisn})? Semua data absensi, nilai, dan rekam konseling terkait akan dihapus secara permanen.`}
          confirmText="Ya, Hapus Data"
          isDestructive={true}
        />
      )}
    </div>
  );
};
