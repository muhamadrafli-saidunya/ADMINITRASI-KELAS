import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  BookOpen,
  FileText,
  HelpCircle,
  Copy,
  Check,
  Printer,
  RefreshCw,
  Send,
  Lightbulb,
  GraduationCap
} from 'lucide-react';

export const AIAssistantView: React.FC = () => {
  const { subjects, schoolInfo, addToast } = useApp();

  const [activeTool, setActiveTool] = useState<'modul' | 'soal' | 'deskripsi_rapor' | 'ice_breaking'>('modul');
  const [selectedMapel, setSelectedMapel] = useState(subjects[0]?.nama || 'Pendidikan Pancasila');
  const [faseDanKelas, setFaseDanKelas] = useState('Fase B - Kelas 4 SD');
  const [topikMateri, setTopikMateri] = useState('Bagian Tubuh Tumbuhan dan Fungsinya');
  const [jumlahSoal, setJumlahSoal] = useState('5 Pilihan Ganda + 2 Uraian HOTS');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let result = '';

      if (activeTool === 'modul') {
        result = `# MODUL AJAR KURIKULUM MERDEKA
## TAHUN PELAJARAN ${schoolInfo.academicYear}

### I. INFORMASI UMUM
- **Nama Penyusun:** ${schoolInfo.homeroomTeacherName}
- **Satuan Pendidikan:** ${schoolInfo.schoolName}
- **Fase / Kelas:** ${faseDanKelas}
- **Mata Pelajaran:** ${selectedMapel}
- **Alokasi Waktu:** 2 x 35 Menit (1 Pertemuan)
- **Topik / Materi:** ${topikMateri}

### II. KOMPONEN INTI
#### A. Capaian Pembelajaran (CP)
Peserta didik mampu menganalisis hubungan antara bentuk serta fungsi bagian tubuh pada tumbuhan secara kontekstual di lingkungan sekitar.

#### B. Tujuan Pembelajaran (TP)
1. Peserta didik dapat mengidentifikasi bagian-bagian tubuh tumbuhan (akar, batang, daun, bunga, buah).
2. Peserta didik mampu menjelaskan fungsi masing-masing organ tumbuhan dengan bahasa sendiri.
3. Peserta didik mampu mendemonstrasikan proses fotosintesis sederhana melalui pengamatan kelompok.

#### C. Profil Pelajar Pancasila
- **Beriman & Bertakwa:** Berdoa sebelum dan sesudah belajar.
- **Gotong Royong:** Bekerja sama dalam observasi spesimen tumbuhan di taman sekolah.
- **Bernalar Kritis:** Menganalisis perbedaan akar tunggang dan serabut.

#### D. Pertanyaan Pemantik
1. "Mengapa pohon di depan kelas kita bisa berdiri kokoh meski tertiup angin kencang?"
2. "Bagaimana cara tumbuhan makan jika mereka tidak punya mulut seperti manusia?"

#### E. Urutan Kegiatan Pembelajaran (Berdiferensiasi)
1. **Kegiatan Awal (10 Menit):**
   - Guru membuka dengan salam, presensi, dan ice breaking tepuk semangat.
   - Apersepsi dengan menunjukkan sebatang tanaman cabai kecil dalam pot.
2. **Kegiatan Inti (50 Menit):**
   - *Diferensiasi Konten:* Siswa mengamati video pembelajaran atau spesimen tanaman nyata di meja kelompok.
   - *Diferensiasi Proses:* Siswa bekerja dalam LKPD (Lembar Kerja Peserta Didik) mencocokkan fungsi daun (fotosintesis), akar (menyerap air), batang (mengalirkan nutrisi).
   - *Diferensiasi Produk:* Kelompok mempresentasikan poster mini siklus tumbuhan.
3. **Kegiatan Penutup (10 Menit):**
   - Refleksi bersama siswa mengenai apa yang telah dipelajari.
   - Guru memberikan penguatan dan apresiasi bintang kelas.

### III. ASESMEN & RUBRIK PENILAIAN
- **Asesmen Formatif:** Observasi keaktifan diskusi dan pengisian LKPD.
- **Asesmen Sumatif:** Tes tertulis 5 soal pemahaman konsep.`;
      } else if (activeTool === 'soal') {
        result = `# KISI-KISI & SOAL EVALUASI PEMBELAJARAN
**Mata Pelajaran:** ${selectedMapel} | **Kelas:** ${faseDanKelas}
**Topik:** ${topikMateri}

---
### BAGIAN A: PILIHAN GANDA (HOTS)

1. Bagian tumbuhan yang berfungsi menyerap air dan zat hara dari dalam tanah adalah ...
   A. Daun
   B. Batang
   C. Akar
   D. Bunga
   *Kunci Jawaban: C (Akar)*
   *Pembahasan: Akar menyerap unsur hara dan air serta memperkokoh tanaman.*

2. Di dalam daun terdapat zat hijau daun yang berfungsi membantu proses pembuatan makanan (fotosintesis). Zat hijau daun tersebut dinamakan ...
   A. Stomata
   B. Klorofil
   C. Xilem
   D. Floem
   *Kunci Jawaban: B (Klorofil)*

3. Perhatikan kasus berikut!
   *Beni meletakkan tanaman di dalam kardus tertutup tanpa terkena sinar matahari selama 7 hari.*
   Kemungkinan yang akan terjadi pada daun tanaman tersebut adalah ...
   A. Daun menjadi semakin hijau dan lebat
   B. Daun menjadi kekuningan dan layu karena tidak dapat berfotosintesis
   C. Daun berubah menjadi bunga yang mekar
   D. Batang tanaman akan membesar dengan cepat
   *Kunci Jawaban: B*

---
### BAGIAN B: URAIAN ANALISIS

1. Jelaskan 2 perbedaan utama antara akar tunggang dan akar serabut, serta berikan masing-masing 1 contoh tanamannya!
   *Rubrik Penilaian (Skor Maksimal: 10):*
   - Skor 10: Menjelaskan bentuk dan fungsi dengan benar + contoh tepat (Akar tunggang: Mangga/Jeruk; Akar serabut: Jagung/Padi).
   - Skor 5: Menjelaskan hanya salah satu atau contoh kurang tepat.
   - Skor 2: Jawaban kurang relevan.`;
      } else if (activeTool === 'deskripsi_rapor') {
        result = `# REKOMENDASI DESKRIPSI CAPAIAN RAPOR OTOMATIS
**Format:** Kurikulum Merdeka (Kemendikbudristek)

### 1. Kategori: Capaian Kompetensi Sangat Mahir (Nilai 88 - 100)
> *"Menunjukkan penguasaan yang sangat baik dalam menganalisis ${topikMateri} secara mendalam, kritis, dan mampu menyajikan solusi ilmiah dengan percaya diri."*

### 2. Kategori: Capaian Kompetensi Berkembang Sesuai Harapan (Nilai 78 - 87)
> *"Menunjukkan pemahaman yang baik dalam mengidentifikasi konsep ${topikMateri}, mampu bekerja sama secara aktif dalam menyelesaikan tugas kelompok."*

### 3. Kategori: Perlu Bimbingan / Penguatan (Nilai < 75)
> *"Perlu bimbingan dan pendampingan intensif dalam memahami konsep dasar ${topikMateri}, terutama pada bagian analisis mendalam dan penyusunan kesimpulan mandiri."*`;
      } else {
        result = `# KUMPULAN IDE ICE BREAKING & GAMES EDUKASI SD

### 1. Game "Tebak Kata Berantai Tumbuhan" (Waktu: 5 Menit)
- **Cara Main:** Guru membisikkan satu bagian tumbuhan (contoh: "Klorofil Daun") ke siswa barisan paling depan. Siswa membisikkan ke belakang secara beranting. Siswa paling akhir menuliskan di papan tulis.
- **Tujuan:** Melatih konsentrasi, daya ingat, dan kekompakan tim.

### 2. Tepuk Karakter Profil Pelajar Pancasila
- *Tepuk Pelajar Pancasila! (Prok prok prok)*
- *Beriman! (Prok prok prok)*
- *Bertakwa! (Prok prok prok)*
- *Mandiri! (Prok prok prok)*
- *Bernalar Kritis! (Prok prok prok)*
- *Kreatif! (Prok prok prok)*
- *Gotong Royong! (Prok prok prok)*
- *Hebat... Luar Biasa! (Yel-yel kelas)*

### 3. Simon Berkata: Anatomi Sains
- Guru: "Simon berkata: pegang akar (siswa memegang kaki)".
- Guru: "Simon berkata: jadilah batang (siswa berdiri tegap)".
- Guru: "Jadilah daun! (Jika tanpa kata Simon, siswa yang bergerak gugur)".`;
      }

      setGeneratedResult(result);
      setIsGenerating(false);
      addToast('success', 'Generasi Selesai', 'Materi dan dokumen ajar telah siap digunakan.');
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedResult);
    setCopied(true);
    addToast('success', 'Tersalin', 'Teks telah disalin ke clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Asisten AI Administrasi Guru SD
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Otomatisasi pembuatan Modul Ajar Kurikulum Merdeka, Kisi-kisi Soal HOTS, Rubrik, dan Deskripsi Rapor
              </p>
            </div>
          </div>

          {/* Preset Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            <button
              onClick={() => setActiveTool('modul')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                activeTool === 'modul'
                  ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-700 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              Modul Ajar
            </button>
            <button
              onClick={() => setActiveTool('soal')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                activeTool === 'soal'
                  ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-700 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              Soal HOTS & Rubrik
            </button>
            <button
              onClick={() => setActiveTool('deskripsi_rapor')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                activeTool === 'deskripsi_rapor'
                  ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-700 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              Deskripsi Rapor
            </button>
            <button
              onClick={() => setActiveTool('ice_breaking')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                activeTool === 'ice_breaking'
                  ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-700 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              Ice Breaking & Game
            </button>
          </div>
        </div>

        {/* Input Parameters Form */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Mata Pelajaran
            </label>
            <select
              value={selectedMapel}
              onChange={e => setSelectedMapel(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 px-3 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              {subjects.map(s => (
                <option key={s.id} value={s.nama}>{s.nama}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Fase & Kelas
            </label>
            <input
              type="text"
              value={faseDanKelas}
              onChange={e => setFaseDanKelas(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 px-3 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Topik Materi Pokok
            </label>
            <input
              type="text"
              value={topikMateri}
              onChange={e => setTopikMateri(e.target.value)}
              placeholder="Contoh: Pecahan Senilai / Ekosistem"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 px-3 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:from-blue-700 hover:to-indigo-700 active:scale-95 transition-all disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Menyusun Dokumen Pembelajaran...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Generate Dokumen Ajar dengan AI</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Result Display */}
      {generatedResult ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Hasil Dokumen Siap Pakai
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Tersalin' : 'Salin Teks'}</span>
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Cetak</span>
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs font-mono whitespace-pre-wrap leading-relaxed text-slate-800 dark:text-slate-200 max-h-[600px] overflow-y-auto custom-scrollbar">
            {generatedResult}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-12 text-center bg-slate-50/50 dark:bg-slate-900/30">
          <Sparkles className="h-10 w-10 text-indigo-400 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Asisten Cerdas Guru SD Siap Membantu
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
            Pilih mata pelajaran dan topik di atas, lalu klik tombol <strong>"Generate Dokumen Ajar dengan AI"</strong> untuk menghasilkan Modul Ajar lengkap, Soal HOTS, atau deskripsi rapor instan.
          </p>
        </div>
      )}
    </div>
  );
};
