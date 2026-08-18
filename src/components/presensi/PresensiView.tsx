import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AttendanceStatus } from '../../types';
import { Modal } from '../common/Modal';
import { HeaderKopSekolah } from '../common/HeaderKopSekolah';
import {
  CalendarCheck2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  Printer,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Search,
  Sparkles,
  FileSpreadsheet
} from 'lucide-react';

export const PresensiView: React.FC = () => {
  const {
    students,
    attendanceRecords,
    markAttendance,
    bulkMarkAttendance,
    getAttendanceByDate,
    getStudentAttendanceStats,
    schoolInfo,
    currentUser,
    addToast
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'harian' | 'bulanan'>('harian');
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-17');
  const [selectedMonth, setSelectedMonth] = useState<string>('2026-08');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Today / Selected Date Attendance Records
  const dateRecords = getAttendanceByDate(selectedDate);
  const getStatusForStudent = (siswaId: string): { status: AttendanceStatus; keterangan?: string } => {
    const rec = dateRecords.find(r => r.siswaId === siswaId);
    return rec ? { status: rec.status, keterangan: rec.keterangan } : { status: 'Hadir', keterangan: '' };
  };

  const hadirCount = dateRecords.filter(r => r.status === 'Hadir').length || (dateRecords.length === 0 ? students.length : 0);
  const sakitCount = dateRecords.filter(r => r.status === 'Sakit').length;
  const izinCount = dateRecords.filter(r => r.status === 'Izin').length;
  const alpaCount = dateRecords.filter(r => r.status === 'Alpa').length;
  const attendanceRate = students.length > 0 ? Math.round((hadirCount / students.length) * 100) : 100;

  const handleStatusChange = (siswaId: string, status: AttendanceStatus, keterangan?: string) => {
    markAttendance(siswaId, status, selectedDate, keterangan);
  };

  const handleSetAllHadir = () => {
    bulkMarkAttendance(selectedDate, 'Hadir');
  };

  const filteredStudents = students.filter(s =>
    s.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.nisn.includes(searchQuery)
  );

  // Month days generator for monthly matrix
  const daysInMonth = 31; // August has 31 days
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const isTeacherOrAdmin = currentUser.role !== 'siswa';

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <CalendarCheck2 className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Buku Presensi & Kehadiran Siswa
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pencatatan daftar hadir harian dan rekapitulasi bulanan {schoolInfo.className}
              </p>
            </div>
          </div>

          {/* Sub-tab switcher and Print Action */}
          <div className="flex items-center gap-2">
            <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
              <button
                onClick={() => setActiveSubTab('harian')}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                  activeSubTab === 'harian'
                    ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-700 dark:text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                Presensi Harian
              </button>
              <button
                onClick={() => setActiveSubTab('bulanan')}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                  activeSubTab === 'bulanan'
                    ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-700 dark:text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                Rekap Bulanan
              </button>
            </div>

            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Printer className="h-4 w-4 text-slate-500" />
              <span className="hidden sm:inline">Cetak Laporan</span>
            </button>
          </div>
        </div>

        {/* Date Selector & Stats Summary Row */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          {/* Date Picker (for Harian) or Month (for Bulanan) */}
          <div className="sm:col-span-2 flex items-center gap-2">
            {activeSubTab === 'harian' ? (
              <div className="flex items-center gap-2 w-full">
                <Calendar className="h-4 w-4 text-blue-600 shrink-0" />
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">
                  Tanggal:
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-1.5 px-3 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2 w-full">
                <Calendar className="h-4 w-4 text-blue-600 shrink-0" />
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">
                  Bulan:
                </label>
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={e => setSelectedMonth(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-1.5 px-3 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
            )}
          </div>

          {/* Quick Stats on Selected Date */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40">
            <span className="text-xs font-bold">Hadir:</span>
            <span className="text-sm font-extrabold">{hadirCount} Siswa</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40">
            <span className="text-xs font-bold">Sakit / Izin:</span>
            <span className="text-sm font-extrabold">{sakitCount + izinCount} Siswa</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40">
            <span className="text-xs font-bold">Tingkat Hadir:</span>
            <span className="text-sm font-extrabold">{attendanceRate}%</span>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: HARIAN */}
      {activeSubTab === 'harian' && (
        <div className="space-y-4">
          {/* Quick Bulk Action & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari siswa..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>

            {isTeacherOrAdmin && (
              <button
                onClick={handleSetAllHadir}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-95 transition-all self-start sm:self-auto"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Tandai Semua Hadir (1-Klik)</span>
              </button>
            )}
          </div>

          {/* Interactive Attendance Table */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-400">
                  <tr>
                    <th className="px-4 py-3.5 text-center w-12">No</th>
                    <th className="px-4 py-3.5">Nama Siswa</th>
                    <th className="px-4 py-3.5">NISN / JK</th>
                    <th className="px-4 py-3.5 text-center">Status Kehadiran Hari Ini</th>
                    <th className="px-4 py-3.5">Keterangan / Alasan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {filteredStudents.map(student => {
                    const { status, keterangan } = getStatusForStudent(student.id);

                    return (
                      <tr
                        key={student.id}
                        className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        {/* No */}
                        <td className="px-4 py-3 text-center font-bold text-slate-900 dark:text-white">
                          {student.nomorAbsen}
                        </td>

                        {/* Name & Photo */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={student.fotoUrl}
                              alt={student.nama}
                              className="h-8 w-8 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                            />
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white">
                                {student.nama}
                              </p>
                              <p className="text-[10px] text-slate-400">{student.kelas}</p>
                            </div>
                          </div>
                        </td>

                        {/* NISN & JK */}
                        <td className="px-4 py-3">
                          <span className="font-mono text-slate-700 dark:text-slate-300">{student.nisn}</span>
                          <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            {student.jenisKelamin}
                          </span>
                        </td>

                        {/* 4 Interactive Buttons (H, S, I, A) */}
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-1 sm:gap-2">
                            {/* Hadir */}
                            <button
                              disabled={!isTeacherOrAdmin}
                              onClick={() => handleStatusChange(student.id, 'Hadir')}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                                status === 'Hadir'
                                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-400'
                                  : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                              }`}
                            >
                              <span>H</span>
                              <span className="hidden sm:inline text-[10px]">Hadir</span>
                            </button>

                            {/* Sakit */}
                            <button
                              disabled={!isTeacherOrAdmin}
                              onClick={() => handleStatusChange(student.id, 'Sakit')}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                                status === 'Sakit'
                                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30 ring-2 ring-amber-300'
                                  : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                              }`}
                            >
                              <span>S</span>
                              <span className="hidden sm:inline text-[10px]">Sakit</span>
                            </button>

                            {/* Izin */}
                            <button
                              disabled={!isTeacherOrAdmin}
                              onClick={() => handleStatusChange(student.id, 'Izin')}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                                status === 'Izin'
                                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-2 ring-blue-300'
                                  : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                              }`}
                            >
                              <span>I</span>
                              <span className="hidden sm:inline text-[10px]">Izin</span>
                            </button>

                            {/* Alpa */}
                            <button
                              disabled={!isTeacherOrAdmin}
                              onClick={() => handleStatusChange(student.id, 'Alpa')}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                                status === 'Alpa'
                                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 ring-2 ring-rose-400'
                                  : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                              }`}
                            >
                              <span>A</span>
                              <span className="hidden sm:inline text-[10px]">Alpa</span>
                            </button>
                          </div>
                        </td>

                        {/* Keterangan */}
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            disabled={!isTeacherOrAdmin}
                            placeholder="Catatan surat dokter / acara..."
                            value={keterangan || ''}
                            onChange={e => handleStatusChange(student.id, status, e.target.value)}
                            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-1.5 text-xs text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: REKAP BULANAN MATRIX */}
      {activeSubTab === 'bulanan' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Matriks Presensi Bulan <span className="font-bold text-slate-800 dark:text-white">Agustus 2026</span> (Tanggal 1 s/d 31)
            </p>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-emerald-600 font-bold">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> H: Hadir
              </span>
              <span className="flex items-center gap-1 text-amber-600 font-bold">
                <span className="h-2 w-2 rounded-full bg-amber-500" /> S: Sakit
              </span>
              <span className="flex items-center gap-1 text-blue-600 font-bold">
                <span className="h-2 w-2 rounded-full bg-blue-500" /> I: Izin
              </span>
              <span className="flex items-center gap-1 text-rose-600 font-bold">
                <span className="h-2 w-2 rounded-full bg-rose-500" /> A: Alpa
              </span>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] text-slate-600 dark:text-slate-300 border-collapse">
                <thead className="border-b border-slate-200 bg-slate-50/90 text-center font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-800/90 dark:text-slate-300">
                  <tr>
                    <th className="p-2 border-r border-slate-200 dark:border-slate-800 sticky left-0 bg-slate-50 dark:bg-slate-800 z-10 w-8">No</th>
                    <th className="p-2 border-r border-slate-200 dark:border-slate-800 sticky left-8 bg-slate-50 dark:bg-slate-800 z-10 text-left min-w-[140px]">Nama Siswa</th>
                    {monthDays.slice(0, 20).map(day => (
                      <th key={day} className="p-1 border-r border-slate-200 dark:border-slate-800 w-6 text-[10px]">
                        {day}
                      </th>
                    ))}
                    <th className="p-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-extrabold w-8">H</th>
                    <th className="p-2 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-extrabold w-8">S</th>
                    <th className="p-2 bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 font-extrabold w-8">I</th>
                    <th className="p-2 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 font-extrabold w-8">A</th>
                    <th className="p-2 bg-slate-100 dark:bg-slate-800 font-extrabold w-12">%</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-center">
                  {students.map(student => {
                    const stats = getStudentAttendanceStats(student.id);

                    return (
                      <tr key={student.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                        {/* No */}
                        <td className="p-2 border-r border-slate-100 dark:border-slate-800 font-bold sticky left-0 bg-white dark:bg-slate-900 z-10">
                          {student.nomorAbsen}
                        </td>

                        {/* Name */}
                        <td className="p-2 border-r border-slate-100 dark:border-slate-800 text-left font-semibold text-slate-900 dark:text-white sticky left-8 bg-white dark:bg-slate-900 z-10 truncate">
                          {student.nama}
                        </td>

                        {/* Matrix Days 1-20 */}
                        {monthDays.slice(0, 20).map(day => {
                          const dateStr = `2026-08-${day.toString().padStart(2, '0')}`;
                          const rec = attendanceRecords.find(r => r.siswaId === student.id && r.tanggal === dateStr);
                          const isWeekend = (day % 7 === 1 || day % 7 === 2); // Simulating weekends

                          if (isWeekend) {
                            return (
                              <td key={day} className="p-1 border-r border-slate-100 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-800/30 text-slate-300">
                                -
                              </td>
                            );
                          }

                          let badgeColor = 'text-emerald-600 font-bold';
                          let char = '•';

                          if (rec) {
                            if (rec.status === 'Hadir') {
                              badgeColor = 'text-emerald-600 font-bold';
                              char = 'H';
                            } else if (rec.status === 'Sakit') {
                              badgeColor = 'text-amber-600 font-bold bg-amber-100 rounded';
                              char = 'S';
                            } else if (rec.status === 'Izin') {
                              badgeColor = 'text-blue-600 font-bold bg-blue-100 rounded';
                              char = 'I';
                            } else if (rec.status === 'Alpa') {
                              badgeColor = 'text-rose-600 font-bold bg-rose-100 rounded';
                              char = 'A';
                            }
                          }

                          return (
                            <td key={day} className={`p-1 border-r border-slate-100 dark:border-slate-800 ${badgeColor}`}>
                              {char}
                            </td>
                          );
                        })}

                        {/* Stats Summary */}
                        <td className="p-2 bg-emerald-50/50 dark:bg-emerald-950/20 font-bold text-emerald-700 dark:text-emerald-400">
                          {stats.hadir}
                        </td>
                        <td className="p-2 bg-amber-50/50 dark:bg-amber-950/20 font-bold text-amber-700 dark:text-amber-400">
                          {stats.sakit}
                        </td>
                        <td className="p-2 bg-blue-50/50 dark:bg-blue-950/20 font-bold text-blue-700 dark:text-blue-400">
                          {stats.izin}
                        </td>
                        <td className="p-2 bg-rose-50/50 dark:bg-rose-950/20 font-bold text-rose-700 dark:text-rose-400">
                          {stats.alpa}
                        </td>
                        <td className="p-2 bg-slate-50 dark:bg-slate-800/80 font-extrabold text-slate-800 dark:text-slate-200">
                          {stats.percentage}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal Cetak Laporan Presensi Resmi */}
      {isPrintModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsPrintModalOpen(false)}
          title="Pratinjau Cetak Rekapitulasi Presensi Kelas"
          maxWidth="5xl"
        >
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 text-black">
              <HeaderKopSekolah
                documentTitle="REKAPITULASI PRESENSI / DAFTAR HADIR SISWA"
                subTitle={`Bulan: Agustus 2026 • ${schoolInfo.className} • Tahun Ajaran ${schoolInfo.academicYear}`}
              />

              <table className="w-full text-left text-[11px] border-collapse border border-black mt-4">
                <thead>
                  <tr className="bg-slate-100 border border-black text-center font-bold">
                    <th className="border border-black p-2 w-10">No</th>
                    <th className="border border-black p-2">NISN</th>
                    <th className="border border-black p-2 text-left">Nama Siswa</th>
                    <th className="border border-black p-2 w-10">L/P</th>
                    <th className="border border-black p-2 w-16">Hadir</th>
                    <th className="border border-black p-2 w-16">Sakit</th>
                    <th className="border border-black p-2 w-16">Izin</th>
                    <th className="border border-black p-2 w-16">Alpa</th>
                    <th className="border border-black p-2 w-20">Persentase</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(s => {
                    const stats = getStudentAttendanceStats(s.id);
                    return (
                      <tr key={s.id} className="border border-black text-center">
                        <td className="border border-black p-1.5">{s.nomorAbsen}</td>
                        <td className="border border-black p-1.5 font-mono">{s.nisn}</td>
                        <td className="border border-black p-1.5 text-left font-bold">{s.nama}</td>
                        <td className="border border-black p-1.5">{s.jenisKelamin}</td>
                        <td className="border border-black p-1.5 font-semibold text-black">{stats.hadir}</td>
                        <td className="border border-black p-1.5">{stats.sakit}</td>
                        <td className="border border-black p-1.5">{stats.izin}</td>
                        <td className="border border-black p-1.5">{stats.alpa}</td>
                        <td className="border border-black p-1.5 font-bold">{stats.percentage}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

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
                  <p>{schoolInfo.city}, 31 Agustus 2026</p>
                  <p>Wali Kelas {schoolInfo.className}</p>
                  <div className="h-16" />
                  <p className="font-bold underline">{schoolInfo.homeroomTeacherName}</p>
                  <p>NIP. {schoolInfo.homeroomTeacherNip}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Tutup
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md"
              >
                <Printer className="h-4 w-4" />
                <span>Cetak Rekap Presensi</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
