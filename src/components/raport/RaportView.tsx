import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HeaderKopSekolah } from '../common/HeaderKopSekolah';
import {
  FileSpreadsheet,
  Printer,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award,
  CheckCircle2,
  Calendar,
  User,
  Heart
} from 'lucide-react';

export const RaportView: React.FC = () => {
  const {
    students,
    subjects,
    getAllGradesForStudent,
    getStudentAttendanceStats,
    schoolInfo,
    currentUser
  } = useApp();

  const safeStudents = students || [];
  const safeSubjects = subjects || [];

  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    currentUser.role === 'siswa' && currentUser.studentId
      ? currentUser.studentId
      : safeStudents[0]?.id || 'std-01'
  );

  const selectedStudent = safeStudents.find(s => s.id === selectedStudentId) || safeStudents[0];
  const currentIndex = safeStudents.findIndex(s => s.id === selectedStudentId);

  const handlePrev = () => {
    if (currentIndex > 0 && safeStudents[currentIndex - 1]) {
      setSelectedStudentId(safeStudents[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < safeStudents.length - 1 && safeStudents[currentIndex + 1]) {
      setSelectedStudentId(safeStudents[currentIndex + 1].id);
    }
  };

  if (!selectedStudent) return null;

  const studentGrades = getAllGradesForStudent(selectedStudent.id);
  const attendanceStats = getStudentAttendanceStats(selectedStudent.id);

  // Extracurriculars for this student
  const ekskulList = [
    { nama: 'Pramuka Penggalang', predikat: 'Sangat Baik', keterangan: 'Aktif, disiplin, dan memiliki jiwa kepemimpinan serta kecakapan umum.' },
    { nama: 'Dokter Kecil / UKS', predikat: 'Baik', keterangan: 'Tertib menjaga kebersihan lingkungan kelas dan tanggap P3K.' },
    { nama: 'Seni Tari Nusantara', predikat: 'Baik', keterangan: 'Mampu menampilkan tarian daerah dengan ritme dan kekompakan tim yang baik.' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
              <FileSpreadsheet className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Rapor Hasil Belajar Peserta Didik (Kurikulum Merdeka)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Laporan Capaian Kompetensi Semester Ganjil TA {schoolInfo.academicYear}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-blue-700 active:scale-95 transition-all"
            >
              <Printer className="h-4 w-4" />
              <span>Cetak Lembar Rapor</span>
            </button>
          </div>
        </div>

        {/* Student Navigator Bar (Hidden for student role locked to own) */}
        {currentUser.role !== 'siswa' && (
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">
                Pilih Siswa:
              </span>
              <select
                value={selectedStudentId}
                onChange={e => setSelectedStudentId(e.target.value)}
                className="w-full sm:w-64 rounded-xl border border-slate-200 bg-slate-50/50 py-1.5 px-3 text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                {students.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.nomorAbsen}. {s.nama} ({s.nisn})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Sebelumnya</span>
              </button>
              <span className="text-xs font-medium text-slate-400">
                {currentIndex + 1} dari {students.length}
              </span>
              <button
                onClick={handleNext}
                disabled={currentIndex === students.length - 1}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl disabled:opacity-40 transition-colors"
              >
                <span>Berikutnya</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* RAPOR OFFICIAL PRINTABLE SHEET CONTAINER */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 text-black shadow-lg max-w-5xl mx-auto printable-raport">
        {/* Kop Resmi Sekolah */}
        <HeaderKopSekolah
          documentTitle="LAPORAN HASIL BELAJAR PESERTA DIDIK (RAPOR)"
          subTitle="KURIKULUM MERDEKA TAHUN PELAJARAN 2026/2027"
        />

        {/* Identitas Siswa Box */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs border border-black p-3.5 mt-4">
          <div className="flex justify-between">
            <span className="font-semibold text-slate-700">Nama Peserta Didik</span>
            <span className="font-bold text-black">: {selectedStudent.nama}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-slate-700">Kelas / Fase</span>
            <span className="font-bold text-black">: {schoolInfo.className} / {schoolInfo.phase}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-slate-700">NISN / NIS</span>
            <span className="font-mono text-black">: {selectedStudent.nisn} / {selectedStudent.nis}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-slate-700">Semester</span>
            <span className="font-bold text-black">: {schoolInfo.semester}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-slate-700">Nama Sekolah</span>
            <span className="font-bold text-black">: {schoolInfo.schoolName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-slate-700">Tahun Pelajaran</span>
            <span className="font-bold text-black">: {schoolInfo.academicYear}</span>
          </div>
        </div>

        {/* TABEL A: NILAI & CAPAIAN KOMPETENSI */}
        <div className="mt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-2">
            A. Nilai Capaian Kompetensi Pembelajaran
          </h4>
          <table className="w-full text-left text-[11px] border-collapse border border-black">
            <thead>
              <tr className="bg-slate-100 border border-black text-center font-bold">
                <th className="border border-black p-2 w-8">No</th>
                <th className="border border-black p-2 text-left w-48">Mata Pelajaran</th>
                <th className="border border-black p-2 w-16">Nilai Akhir</th>
                <th className="border border-black p-2 text-left">Capaian Kompetensi & Deskripsi Pembelajaran</th>
              </tr>
            </thead>
            <tbody>
              {studentGrades.map((g, idx) => (
                <tr key={g.subject.id} className="border border-black">
                  <td className="border border-black p-2 text-center font-semibold">{idx + 1}</td>
                  <td className="border border-black p-2 font-bold">{g.subject.nama}</td>
                  <td className="border border-black p-2 text-center font-extrabold text-sm">{g.nilaiAkhir}</td>
                  <td className="border border-black p-2 text-[10.5px] leading-relaxed">
                    {g.deskripsiCapaian}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TABEL B: EKSTRAKURIKULER & TABEL C: PRESENSI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Ekstrakurikuler */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-2">
              B. Kegiatan Ekstrakurikuler
            </h4>
            <table className="w-full text-left text-[11px] border-collapse border border-black">
              <thead>
                <tr className="bg-slate-100 border border-black text-center font-bold">
                  <th className="border border-black p-1.5 w-6">No</th>
                  <th className="border border-black p-1.5">Kegiatan</th>
                  <th className="border border-black p-1.5 w-20">Predikat</th>
                </tr>
              </thead>
              <tbody>
                {ekskulList.map((ek, idx) => (
                  <tr key={idx} className="border border-black">
                    <td className="border border-black p-1.5 text-center">{idx + 1}</td>
                    <td className="border border-black p-1.5">
                      <p className="font-bold">{ek.nama}</p>
                      <p className="text-[9.5px] text-slate-600">{ek.keterangan}</p>
                    </td>
                    <td className="border border-black p-1.5 text-center font-semibold">{ek.predikat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Ketidakhadiran */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-2">
              C. Rekapitulasi Ketidakhadiran
            </h4>
            <table className="w-full text-left text-[11px] border-collapse border border-black">
              <thead>
                <tr className="bg-slate-100 border border-black text-center font-bold">
                  <th className="border border-black p-1.5">Keterangan</th>
                  <th className="border border-black p-1.5 w-24">Jumlah Hari</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-black">
                  <td className="border border-black p-1.5 font-medium">Sakit (S)</td>
                  <td className="border border-black p-1.5 text-center font-bold">{attendanceStats.sakit} hari</td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black p-1.5 font-medium">Izin (I)</td>
                  <td className="border border-black p-1.5 text-center font-bold">{attendanceStats.izin} hari</td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black p-1.5 font-medium">Tanpa Keterangan (A)</td>
                  <td className="border border-black p-1.5 text-center font-bold">{attendanceStats.alpa} hari</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* TABEL D: CATATAN WALI KELAS */}
        <div className="mt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-2">
            D. Catatan Wali Kelas & Karakter Profil Pelajar Pancasila
          </h4>
          <div className="border border-black p-3 text-xs leading-relaxed italic bg-slate-50/50">
            "Ananda {selectedStudent.nama} menunjukkan perkembangan akhlak mulia dan nalar kritis yang sangat membanggakan di semester ini. Tingkatkan terus semangat literasi membaca dan pertahankan kepedulian sosial yang tinggi terhadap teman sekelas."
          </div>
        </div>

        {/* BLOK TANDA TANGAN RESMI 3 PIHAK */}
        <div className="mt-10 pt-4 border-t border-black text-xs text-black">
          <div className="flex justify-between items-start">
            {/* Orang Tua / Wali */}
            <div className="text-center w-48">
              <p>Mengetahui,</p>
              <p>Orang Tua / Wali Murid</p>
              <div className="h-20" />
              <p className="font-bold underline">
                ( {selectedStudent.namaAyah || selectedStudent.namaIbu || '........................'} )
              </p>
            </div>

            {/* Kepala Sekolah */}
            <div className="text-center w-56">
              <p>Mengetahui,</p>
              <p>Kepala Sekolah {schoolInfo.schoolName}</p>
              <div className="h-20" />
              <p className="font-bold underline">{schoolInfo.headmasterName}</p>
              <p className="text-[10px]">NIP. {schoolInfo.headmasterNip}</p>
            </div>

            {/* Wali Kelas */}
            <div className="text-center w-48">
              <p>{schoolInfo.city}, 17 Agustus 2026</p>
              <p>Wali Kelas {schoolInfo.className}</p>
              <div className="h-20" />
              <p className="font-bold underline">{schoolInfo.homeroomTeacherName}</p>
              <p className="text-[10px]">NIP. {schoolInfo.homeroomTeacherNip}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
