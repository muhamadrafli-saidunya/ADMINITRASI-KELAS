import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AssessmentType, Subject } from '../../types';
import { Modal } from '../common/Modal';
import { HeaderKopSekolah } from '../common/HeaderKopSekolah';
import { BadgeStatus } from '../common/BadgeStatus';
import {
  GraduationCap,
  BookOpen,
  Calculator,
  Save,
  Printer,
  Sparkles,
  Search,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Award,
  Layers
} from 'lucide-react';

export const PenilaianView: React.FC = () => {
  const {
    students,
    subjects,
    grades,
    saveGrade,
    getStudentGradeSummary,
    getAllGradesForStudent,
    schoolInfo,
    currentUser,
    addToast
  } = useApp();

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || 'mapel-01');
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentType | 'rekap_semua'>('rekap_semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPrintLegerOpen, setIsPrintLegerOpen] = useState(false);

  const currentSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];

  const assessmentTypes: Array<{ id: AssessmentType; label: string; desc: string }> = [
    { id: 'Formatif_TP1', label: 'Formatif TP 1', desc: 'Tujuan Pembelajaran 1' },
    { id: 'Formatif_TP2', label: 'Formatif TP 2', desc: 'Tujuan Pembelajaran 2' },
    { id: 'Formatif_TP3', label: 'Formatif TP 3', desc: 'Tujuan Pembelajaran 3' },
    { id: 'Formatif_TP4', label: 'Formatif TP 4', desc: 'Tujuan Pembelajaran 4' },
    { id: 'Sumatif_STS', label: 'Sumatif STS', desc: 'Sumatif Tengah Semester' },
    { id: 'Sumatif_SAS', label: 'Sumatif SAS', desc: 'Sumatif Akhir Semester' },
  ];

  // Helper to get grade record for specific student, mapel, and assessment
  const getGradeValue = (siswaId: string, mapelId: string, type: AssessmentType): number => {
    const rec = grades.find(g => g.siswaId === siswaId && g.mapelId === mapelId && g.jenis === type);
    return rec ? rec.nilai : 80;
  };

  const handleScoreChange = (siswaId: string, type: AssessmentType, valueStr: string) => {
    let score = parseInt(valueStr, 10);
    if (isNaN(score)) score = 0;
    if (score > 100) score = 100;
    if (score < 0) score = 0;

    saveGrade(siswaId, selectedSubjectId, type, score);
  };

  const filteredStudents = students.filter(s =>
    s.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.nisn.includes(searchQuery)
  );

  // Class analytics for current subject
  const currentSubjectGrades = students.map(s => getStudentGradeSummary(s.id, selectedSubjectId));
  const finalScores = currentSubjectGrades.map(g => g.nilaiAkhir);
  const avgClassScore = finalScores.length > 0 ? (finalScores.reduce((a, b) => a + b, 0) / finalScores.length).toFixed(1) : '85.0';
  const highestScore = finalScores.length > 0 ? Math.max(...finalScores) : 95;
  const lowestScore = finalScores.length > 0 ? Math.min(...finalScores) : 75;
  const passingCount = currentSubjectGrades.filter(g => g.ketercapaian === 'Tuntas').length;
  const passingRate = students.length > 0 ? Math.round((passingCount / students.length) * 100) : 100;

  const isTeacherOrAdmin = currentUser.role !== 'siswa';

  return (
    <div className="space-y-6">
      {/* Top Header & Subject Selector */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Daftar Nilai & Asesmen Kurikulum Merdeka
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pengelolaan Asesmen Formatif (TP 1-4) & Sumatif (STS & SAS) • KKTP: <span className="font-bold text-slate-800 dark:text-white">{currentSubject?.kktp}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsPrintLegerOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Printer className="h-4 w-4 text-slate-500" />
              <span>Cetak Leger Nilai Kelas</span>
            </button>
          </div>
        </div>

        {/* Mata Pelajaran Tabs Selector */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {subjects.map(subject => {
              const isSelected = selectedSubjectId === subject.id;
              return (
                <button
                  key={subject.id}
                  onClick={() => setSelectedSubjectId(subject.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>{subject.nama} ({subject.kode})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Analytics Mini Banner for Selected Subject */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50">
            <p className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">Rata-rata Kelas</p>
            <p className="text-xl font-extrabold text-blue-950 dark:text-white mt-0.5">{avgClassScore}</p>
            <p className="text-[10px] text-blue-600 dark:text-blue-400">KKTP Minimal {currentSubject?.kktp}</p>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">Ketuntasan KKTP</p>
            <p className="text-xl font-extrabold text-emerald-950 dark:text-white mt-0.5">{passingRate}%</p>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400">{passingCount} dari {students.length} Siswa</p>
          </div>

          <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50">
            <p className="text-[10px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">Nilai Tertinggi</p>
            <p className="text-xl font-extrabold text-purple-950 dark:text-white mt-0.5">{highestScore}</p>
            <p className="text-[10px] text-purple-600 dark:text-purple-400">Predikat A</p>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/50">
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">Nilai Terendah</p>
            <p className="text-xl font-extrabold text-amber-950 dark:text-white mt-0.5">{lowestScore}</p>
            <p className="text-[10px] text-amber-600 dark:text-amber-400">Di Atas Ambang KKTP</p>
          </div>
        </div>
      </div>

      {/* Spreadsheet Input Table for Selected Subject */}
      <div className="space-y-4">
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

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>Rumus Nilai Akhir: (Formatif 40%) + (Sumatif STS 30%) + (Sumatif SAS 30%)</span>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
              <thead className="border-b border-slate-200 bg-slate-50/90 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:border-slate-800 dark:bg-slate-800/90 dark:text-slate-300">
                <tr>
                  <th className="px-3 py-3 text-center w-10">No</th>
                  <th className="px-3 py-3 min-w-[150px]">Nama Siswa</th>
                  <th className="px-2 py-3 text-center bg-blue-50/70 dark:bg-blue-950/30 text-blue-900 dark:text-blue-300">TP 1</th>
                  <th className="px-2 py-3 text-center bg-blue-50/70 dark:bg-blue-950/30 text-blue-900 dark:text-blue-300">TP 2</th>
                  <th className="px-2 py-3 text-center bg-blue-50/70 dark:bg-blue-950/30 text-blue-900 dark:text-blue-300">TP 3</th>
                  <th className="px-2 py-3 text-center bg-blue-50/70 dark:bg-blue-950/30 text-blue-900 dark:text-blue-300">TP 4</th>
                  <th className="px-2 py-3 text-center bg-amber-50/70 dark:bg-amber-950/30 text-amber-900 dark:text-amber-300">STS</th>
                  <th className="px-2 py-3 text-center bg-purple-50/70 dark:bg-purple-950/30 text-purple-900 dark:text-purple-300">SAS</th>
                  <th className="px-3 py-3 text-center bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-300 font-extrabold">NA</th>
                  <th className="px-2 py-3 text-center">Predikat</th>
                  <th className="px-3 py-3 min-w-[200px]">Deskripsi Capaian Pembelajaran</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredStudents.map(student => {
                  const tp1 = getGradeValue(student.id, selectedSubjectId, 'Formatif_TP1');
                  const tp2 = getGradeValue(student.id, selectedSubjectId, 'Formatif_TP2');
                  const tp3 = getGradeValue(student.id, selectedSubjectId, 'Formatif_TP3');
                  const tp4 = getGradeValue(student.id, selectedSubjectId, 'Formatif_TP4');
                  const sts = getGradeValue(student.id, selectedSubjectId, 'Sumatif_STS');
                  const sas = getGradeValue(student.id, selectedSubjectId, 'Sumatif_SAS');

                  const summary = getStudentGradeSummary(student.id, selectedSubjectId);

                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* No */}
                      <td className="px-3 py-2.5 text-center font-bold text-slate-900 dark:text-white">
                        {student.nomorAbsen}
                      </td>

                      {/* Name */}
                      <td className="px-3 py-2.5 font-semibold text-slate-900 dark:text-white truncate">
                        {student.nama}
                      </td>

                      {/* Formatif TP 1 */}
                      <td className="px-2 py-2 text-center bg-blue-50/20 dark:bg-blue-950/10">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          disabled={!isTeacherOrAdmin}
                          value={tp1}
                          onChange={e => handleScoreChange(student.id, 'Formatif_TP1', e.target.value)}
                          className="w-12 text-center rounded-lg border border-slate-200 bg-white p-1 font-bold text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </td>

                      {/* Formatif TP 2 */}
                      <td className="px-2 py-2 text-center bg-blue-50/20 dark:bg-blue-950/10">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          disabled={!isTeacherOrAdmin}
                          value={tp2}
                          onChange={e => handleScoreChange(student.id, 'Formatif_TP2', e.target.value)}
                          className="w-12 text-center rounded-lg border border-slate-200 bg-white p-1 font-bold text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </td>

                      {/* Formatif TP 3 */}
                      <td className="px-2 py-2 text-center bg-blue-50/20 dark:bg-blue-950/10">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          disabled={!isTeacherOrAdmin}
                          value={tp3}
                          onChange={e => handleScoreChange(student.id, 'Formatif_TP3', e.target.value)}
                          className="w-12 text-center rounded-lg border border-slate-200 bg-white p-1 font-bold text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </td>

                      {/* Formatif TP 4 */}
                      <td className="px-2 py-2 text-center bg-blue-50/20 dark:bg-blue-950/10">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          disabled={!isTeacherOrAdmin}
                          value={tp4}
                          onChange={e => handleScoreChange(student.id, 'Formatif_TP4', e.target.value)}
                          className="w-12 text-center rounded-lg border border-slate-200 bg-white p-1 font-bold text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </td>

                      {/* Sumatif STS */}
                      <td className="px-2 py-2 text-center bg-amber-50/20 dark:bg-amber-950/10">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          disabled={!isTeacherOrAdmin}
                          value={sts}
                          onChange={e => handleScoreChange(student.id, 'Sumatif_STS', e.target.value)}
                          className="w-12 text-center rounded-lg border border-amber-200 bg-white p-1 font-bold text-xs text-amber-900 focus:border-amber-500 focus:outline-none dark:border-amber-800 dark:bg-slate-800 dark:text-amber-200"
                        />
                      </td>

                      {/* Sumatif SAS */}
                      <td className="px-2 py-2 text-center bg-purple-50/20 dark:bg-purple-950/10">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          disabled={!isTeacherOrAdmin}
                          value={sas}
                          onChange={e => handleScoreChange(student.id, 'Sumatif_SAS', e.target.value)}
                          className="w-12 text-center rounded-lg border border-purple-200 bg-white p-1 font-bold text-xs text-purple-900 focus:border-purple-500 focus:outline-none dark:border-purple-800 dark:bg-slate-800 dark:text-purple-200"
                        />
                      </td>

                      {/* Nilai Akhir (NA) */}
                      <td className="px-3 py-2.5 text-center bg-emerald-50/60 dark:bg-emerald-950/30">
                        <span className="text-sm font-extrabold text-emerald-700 dark:text-emerald-300">
                          {summary.nilaiAkhir}
                        </span>
                      </td>

                      {/* Predikat */}
                      <td className="px-2 py-2.5 text-center">
                        <span className={`inline-block font-extrabold px-2 py-0.5 rounded text-xs ${
                          summary.predikat === 'A'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                            : summary.predikat === 'B'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}>
                          {summary.predikat}
                        </span>
                      </td>

                      {/* Auto Deskripsi Capaian */}
                      <td className="px-3 py-2.5 text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                        {summary.deskripsiCapaian}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Cetak Leger Nilai Lengkap */}
      {isPrintLegerOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsPrintLegerOpen(false)}
          title="Pratinjau Leger Nilai Kelas SD (Semua Mapel)"
          maxWidth="6xl"
        >
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 text-black">
              <HeaderKopSekolah
                documentTitle="LEGER NILAI HASIL BELAJAR PESERTA DIDIK"
                subTitle={`Kelas: ${schoolInfo.className} • Semester: ${schoolInfo.semester} • Tahun Ajaran ${schoolInfo.academicYear}`}
              />

              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left text-[10px] border-collapse border border-black">
                  <thead>
                    <tr className="bg-slate-100 border border-black text-center font-bold">
                      <th className="border border-black p-1 w-6">No</th>
                      <th className="border border-black p-1 text-left min-w-[120px]">Nama Siswa</th>
                      <th className="border border-black p-1 w-6">L/P</th>
                      {subjects.map(s => (
                        <th key={s.id} className="border border-black p-1 w-10">
                          {s.kode}
                        </th>
                      ))}
                      <th className="border border-black p-1 w-12 font-extrabold bg-slate-200">Total</th>
                      <th className="border border-black p-1 w-12 font-extrabold bg-slate-200">Rerata</th>
                      <th className="border border-black p-1 w-10">Rank</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s, idx) => {
                      const studentGrades = getAllGradesForStudent(s.id);
                      const totalScore = studentGrades.reduce((sum, g) => sum + g.nilaiAkhir, 0);
                      const avgScore = (totalScore / studentGrades.length).toFixed(1);

                      return (
                        <tr key={s.id} className="border border-black text-center">
                          <td className="border border-black p-1 font-bold">{s.nomorAbsen}</td>
                          <td className="border border-black p-1 text-left font-semibold">{s.nama}</td>
                          <td className="border border-black p-1">{s.jenisKelamin}</td>
                          {studentGrades.map(g => (
                            <td key={g.subject.id} className="border border-black p-1 font-bold">
                              {g.nilaiAkhir}
                            </td>
                          ))}
                          <td className="border border-black p-1 font-extrabold bg-slate-50">{totalScore}</td>
                          <td className="border border-black p-1 font-extrabold bg-slate-50">{avgScore}</td>
                          <td className="border border-black p-1 font-bold">{idx + 1}</td>
                        </tr>
                      );
                    })}
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
                onClick={() => setIsPrintLegerOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Tutup
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md"
              >
                <Printer className="h-4 w-4" />
                <span>Cetak Leger Nilai</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
