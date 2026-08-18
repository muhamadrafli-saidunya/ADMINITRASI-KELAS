import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../common/StatCard';
import { BadgeStatus } from '../common/BadgeStatus';
import { ModalEditKelasFaseGuru } from './ModalEditKelasFaseGuru';
import {
  Users,
  CalendarCheck2,
  GraduationCap,
  WalletCards,
  BookOpenCheck,
  Sparkles,
  Calendar,
  Clock,
  ArrowUpRight,
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileSpreadsheet,
  Plus,
  School,
  SlidersHorizontal,
  UserCheck,
  Edit3,
  Layers,
  ChevronRight
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    schoolInfo,
    students,
    teachers,
    attendanceRecords,
    subjects,
    grades,
    journals,
    schedule,
    getCurrentCashBalance,
    events,
    cleaningDuties,
    currentUser,
    setCurrentTab
  } = useApp();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalInitialTab, setModalInitialTab] = useState<'kelas_fase' | 'wali_kelas' | 'daftar_guru'>('kelas_fase');

  const todayStr = '2026-08-17'; // current simulated school day
  const safeAttendance = attendanceRecords || [];
  const safeStudents = students || [];
  const safeTeachers = teachers || [];
  const safeSubjects = subjects || [];
  const safeGrades = grades || [];
  const safeJournals = journals || [];
  const safeSchedule = schedule || [];
  const safeCleaningDuties = cleaningDuties || [];
  const safeEvents = events || [];

  const todayAttendance = safeAttendance.filter(r => r.tanggal === todayStr);

  const hadirCount = todayAttendance.filter(r => r.status === 'Hadir').length;
  const sakitCount = todayAttendance.filter(r => r.status === 'Sakit').length;
  const izinCount = todayAttendance.filter(r => r.status === 'Izin').length;
  const alpaCount = todayAttendance.filter(r => r.status === 'Alpa').length;
  const totalPresensi = todayAttendance.length || safeStudents.length;
  const attendanceRate = totalPresensi > 0 && safeStudents.length > 0 ? Math.round((hadirCount / safeStudents.length) * 100) : 100;

  // Grade averages across all subjects
  const allGradesList = safeGrades.map(g => g.nilai);
  const classGradeAvg = allGradesList.length > 0 
    ? (allGradesList.reduce((a, b) => a + b, 0) / allGradesList.length).toFixed(1)
    : '85.0';

  // Schedule for Monday (Senin)
  const todaySchedule = safeSchedule.filter(s => s.hari === 'Senin');
  const todayPiket = safeCleaningDuties.find(d => d.hari === 'Senin');

  // Calculate average per subject for chart
  const subjectAverages = safeSubjects.map(sub => {
    const subGrades = safeGrades.filter(g => g.mapelId === sub.id);
    const avg = subGrades.length > 0 
      ? Math.round(subGrades.reduce((sum, g) => sum + g.nilai, 0) / subGrades.length) 
      : 80;
    return {
      name: sub.nama,
      kode: sub.kode,
      avg,
      kktp: sub.kktp
    };
  });

  // 14 Administration Books Status
  const adminBooks = [
    { no: 1, title: 'Buku Induk Siswa', status: `Lengkap (${safeStudents.length} Siswa)`, tab: 'siswa' },
    { no: 2, title: 'Buku Induk Guru & DUK Pegawai', status: `${safeTeachers.length} Pendidik & Tendik`, tab: 'guru' },
    { no: 3, title: 'Buku Presensi / Absensi', status: 'Terisi Hari Ini', tab: 'presensi' },
    { no: 4, title: 'Buku Daftar Nilai & TP', status: 'Formatif & Sumatif Aktif', tab: 'nilai' },
    { no: 5, title: 'Buku Rapor Kurikulum Merdeka', status: 'Siap Cetak', tab: 'raport' },
    { no: 6, title: 'Buku Agenda & Jurnal Guru', status: `${safeJournals.length} Kegiatan Tercatat`, tab: 'jurnal' },
    { no: 7, title: 'Buku Jadwal & Kalender', status: 'Senin - Sabtu Terstruktur', tab: 'jadwal' },
    { no: 8, title: 'Buku Kas & Iuran Kelas', status: `Saldo Rp ${(getCurrentCashBalance?.() || 0).toLocaleString('id-ID')}`, tab: 'kas' },
    { no: 9, title: 'Buku Inventaris Ruang (KIR)', status: 'Sarpras Terdata', tab: 'inventaris' },
    { no: 10, title: 'Buku Catatan Konseling', status: 'Perilaku & Bimbingan', tab: 'konseling' },
    { no: 11, title: 'Buku Prestasi Siswa', status: 'Prestasi Akademik & Bakat', tab: 'konseling' },
    { no: 12, title: 'Buku Regu Piket Siswa', status: '6 Hari Pembagian Terisi', tab: 'jadwal' },
    { no: 13, title: 'Buku Ekstrakurikuler', status: 'Pramuka, Sains, Seni, Dokter Kecil', tab: 'raport' },
    { no: 14, title: 'Buku Asesmen & Remedial', status: 'Terintegrasi Asisten AI', tab: 'ai_assistant' }
  ];

  const handleOpenEdit = (tab: 'kelas_fase' | 'wali_kelas' | 'daftar_guru') => {
    setModalInitialTab(tab);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute right-32 bottom-0 -mb-16 h-48 w-48 rounded-full bg-orange-500/20 blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-lg bg-orange-500/90 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                {schoolInfo.kurikulum}
              </span>
              <span className="rounded-lg bg-blue-700/60 px-2.5 py-1 text-xs font-semibold text-blue-100 border border-blue-400/30">
                {schoolInfo.phase} • {schoolInfo.className}
              </span>
              <span className="text-xs text-blue-200/90 flex items-center gap-1 font-medium">
                <Calendar className="h-3.5 w-3.5" />
                Senin, 17 Agustus 2026
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Selamat Datang, {currentUser.name}!
            </h1>
            <p className="text-sm text-blue-100/90 leading-relaxed">
              Sistem Administrasi Kelas Terpadu <span className="font-semibold text-white">{schoolInfo.schoolName}</span>. Semua dokumen administrasi, data siswa, presensi, penilaian, dan kas kelas terorganisir dengan rapi dan siap dicetak.
            </p>
          </div>

          {/* Quick Actions in Banner */}
          <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
            <button
              onClick={() => handleOpenEdit('kelas_fase')}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-500/80 hover:bg-blue-500 border border-blue-300/40 px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all active:scale-95 backdrop-blur-sm"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Edit Kelas, Fase & Guru</span>
            </button>
            <button
              onClick={() => setCurrentTab('presensi')}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-blue-900 shadow-md hover:bg-blue-50 transition-all active:scale-95"
            >
              <CalendarCheck2 className="h-4 w-4 text-blue-600" />
              <span>Isi Presensi Hari Ini</span>
            </button>
            <button
              onClick={() => setCurrentTab('raport')}
              className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-orange-600 transition-all active:scale-95"
            >
              <FileSpreadsheet className="h-4 w-4" />
              <span>Cetak Rapor Siswa</span>
            </button>
          </div>
        </div>
      </div>

      {/* PANEL IDENTITAS & MENU CEPAT: KELAS, FASE, DAN GURU */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <School className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Identitas Kelas & Pendidik Aktif
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Tahun Ajaran {schoolInfo.academicYear}
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Informasi rombongan belajar, fase kurikulum, dan wali kelas yang terhubung ke seluruh lembar administrasi.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOpenEdit('kelas_fase')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 transition-colors"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Edit Data Kelas & Fase</span>
            </button>
            <button
              onClick={() => handleOpenEdit('wali_kelas')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/60 border border-purple-200 dark:border-purple-800 transition-colors"
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span>Edit Wali Kelas</span>
            </button>
          </div>
        </div>

        {/* 3 Quick Cards for Kelas, Fase, Guru */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Card 1: Kelas */}
          <div
            onClick={() => handleOpenEdit('kelas_fase')}
            className="group cursor-pointer rounded-xl p-3.5 border border-slate-100 dark:border-slate-800/80 bg-slate-50/70 hover:bg-blue-50/50 dark:bg-slate-800/40 dark:hover:bg-blue-950/20 hover:border-blue-200 dark:hover:border-blue-800 transition-all"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
                <GraduationCap className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Rombongan Belajar
              </span>
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                Edit <ChevronRight className="h-3 w-3" />
              </span>
            </div>
            <p className="text-base font-black text-slate-900 dark:text-white">
              Kelas {schoolInfo.className}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {schoolInfo.semester} • TA {schoolInfo.academicYear}
            </p>
          </div>

          {/* Card 2: Fase */}
          <div
            onClick={() => handleOpenEdit('kelas_fase')}
            className="group cursor-pointer rounded-xl p-3.5 border border-slate-100 dark:border-slate-800/80 bg-slate-50/70 hover:bg-emerald-50/50 dark:bg-slate-800/40 dark:hover:bg-emerald-950/20 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
                <Layers className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                Fase Kurikulum
              </span>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                Edit <ChevronRight className="h-3 w-3" />
              </span>
            </div>
            <p className="text-base font-black text-slate-900 dark:text-white">
              {schoolInfo.phase}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {schoolInfo.kurikulum}
            </p>
          </div>

          {/* Card 3: Wali Kelas & Guru */}
          <div
            onClick={() => handleOpenEdit('wali_kelas')}
            className="group cursor-pointer rounded-xl p-3.5 border border-slate-100 dark:border-slate-800/80 bg-slate-50/70 hover:bg-purple-50/50 dark:bg-slate-800/40 dark:hover:bg-purple-950/20 hover:border-purple-200 dark:hover:border-purple-800 transition-all"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
                <UserCheck className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                Wali Kelas & Pendidik
              </span>
              <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                Edit <ChevronRight className="h-3 w-3" />
              </span>
            </div>
            <p className="text-sm font-black text-slate-900 dark:text-white truncate">
              {schoolInfo.homeroomTeacherName || 'Sri Wahyuni, S.Pd.'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
              NIP: {schoolInfo.homeroomTeacherNip || '-'} • {teachers.length} Guru Aktif
            </p>
          </div>
        </div>
      </div>

      {/* 5 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Siswa"
          value={`${students.length} Anak`}
          subtitle="6 Laki-laki • 6 Perempuan"
          icon={<Users className="h-6 w-6" />}
          colorTheme="blue"
          onClick={() => setCurrentTab('siswa')}
        />
        <StatCard
          title="Kehadiran Hari Ini"
          value={`${attendanceRate}%`}
          subtitle={`${hadirCount} Hadir • ${izinCount} Izin • ${sakitCount} Sakit`}
          icon={<CalendarCheck2 className="h-6 w-6" />}
          trend={{ value: '92% Hadir' }}
          colorTheme="emerald"
          onClick={() => setCurrentTab('presensi')}
        />
        <StatCard
          title="Rata-rata Nilai"
          value={`${classGradeAvg}`}
          subtitle="Skor 100 • Predikat B+ Baik"
          icon={<GraduationCap className="h-6 w-6" />}
          trend={{ value: '+2.4 Poin' }}
          colorTheme="purple"
          onClick={() => setCurrentTab('nilai')}
        />
        <StatCard
          title="Saldo Kas Kelas"
          value={`Rp ${getCurrentCashBalance().toLocaleString('id-ID')}`}
          subtitle="Iuran & Kas Paguyuban"
          icon={<WalletCards className="h-6 w-6" />}
          colorTheme="orange"
          onClick={() => setCurrentTab('kas')}
        />
        <StatCard
          title="Jurnal Mengajar"
          value={`${journals.length} Sesi`}
          subtitle="Agenda Harian Terlaksana"
          icon={<BookOpenCheck className="h-6 w-6" />}
          colorTheme="cyan"
          onClick={() => setCurrentTab('jurnal')}
        />
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Grade Performance & Attendance Analytics (2 cols wide) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart 1: Rata-rata Nilai per Mata Pelajaran */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Rata-rata Capaian Nilai Mata Pelajaran
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Perbandingan rerata nilai kelas dengan Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)
                </p>
              </div>
              <button
                onClick={() => setCurrentTab('nilai')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 self-start"
              >
                <span>Kelola Nilai</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-3.5">
              {subjectAverages.map((item, idx) => {
                const isPassing = item.avg >= item.kktp;
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        {item.name} ({item.kode})
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400">
                          KKTP: {item.kktp}
                        </span>
                        <span className={`font-bold px-2 py-0.5 rounded ${
                          isPassing 
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' 
                            : 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        }`}>
                          {item.avg} / 100
                        </span>
                      </div>
                    </div>

                    {/* Visual Progress Bar */}
                    <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      {/* KKTP Marker Line */}
                      <div 
                        className="absolute top-0 bottom-0 w-0.5 bg-slate-400 z-10" 
                        style={{ left: `${item.kktp}%` }}
                        title={`Batas KKTP: ${item.kktp}`}
                      />
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.avg >= 90
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600'
                            : item.avg >= 80
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-600'
                            : 'bg-gradient-to-r from-amber-500 to-orange-500'
                        }`}
                        style={{ width: `${item.avg}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-indigo-600" />
                  Sangat Mahir (≥90)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-emerald-500" />
                  Tuntas (≥80)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-amber-500" />
                  Cukup / Remedial
                </span>
              </div>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                100% Mata Pelajaran Tuntas KKTP
              </span>
            </div>
          </div>

          {/* Quick 13 Administrasi Guru SD Checklist */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  Rekap 13 Buku Administrasi Wali Kelas SD
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Standar kelengkapan administrasi guru kelas Sekolah Dasar untuk akreditasi & supervisi
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {adminBooks.map(b => (
                <div
                  key={b.no}
                  onClick={() => setCurrentTab(b.tab as any)}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-blue-50/60 hover:border-blue-200 dark:border-slate-800 dark:bg-slate-800/40 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 text-xs font-bold">
                      {b.no}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {b.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Today's Schedule & Piket, Upcoming Agenda */}
        <div className="space-y-6">
          {/* Jadwal Hari Ini (Senin) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Jadwal Mengajar Hari Ini
                </h3>
              </div>
              <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full dark:bg-orange-950/50 dark:text-orange-300">
                Senin
              </span>
            </div>

            <div className="space-y-2.5">
              {todaySchedule.map(s => {
                const sub = subjects.find(item => item.id === s.mapelId);
                return (
                  <div
                    key={s.id}
                    className="p-3 rounded-xl border border-slate-100 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-800/50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300">
                        Jam ke-{s.jamKe} ({s.waktu})
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        {s.ruang}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                      {sub?.nama || 'Upacara Bendera'}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Pengampu: {s.guruPengampu}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Piket Hari Ini */}
            {todayPiket && (
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Petugas Piket Kelas Hari Ini:
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {(todayPiket.siswaIds || []).map(sId => {
                    const st = safeStudents.find(item => item.id === sId);
                    return (
                      <span
                        key={sId}
                        className="text-xs font-medium px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                      >
                        {st?.nama || 'Siswa'}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Agenda Sekolah & Kegiatan Terdekat */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Agenda & Kalender Kelas
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              {safeEvents.slice(0, 3).map(ev => (
                <div
                  key={ev.id}
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400">
                      {ev.tanggal} • {ev.waktu}
                    </span>
                    <BadgeStatus status={ev.kategori} size="sm" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                    {ev.judul}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {ev.deskripsi}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Siswa Berprestasi Highlight */}
          <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50 to-orange-50/40 p-5 dark:border-amber-900/60 dark:from-amber-950/30 dark:to-slate-900 shadow-sm">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
              <Award className="h-5 w-5 text-amber-600" />
              <h3 className="text-sm font-bold">Bintang Kelas Bulan Ini</h3>
            </div>
            <p className="text-xs text-amber-900/80 dark:text-amber-200/80 mt-1 leading-relaxed">
              Ananda <span className="font-bold text-amber-950 dark:text-white">Ahmad Fauzi</span> & <span className="font-bold text-amber-950 dark:text-white">Nadia Zahra</span> meraih prestasi teladan dalam kedisiplinan dan literasi.
            </p>
            <button
              onClick={() => setCurrentTab('konseling')}
              className="mt-3 text-xs font-bold text-amber-800 dark:text-amber-300 hover:underline flex items-center gap-1"
            >
              <span>Lihat Catatan Prestasi & Konseling</span>
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Edit Kelas, Fase & Guru */}
      <ModalEditKelasFaseGuru
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialTab={modalInitialTab}
      />
    </div>
  );
};
