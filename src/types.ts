export type UserRole = 'admin' | 'wali_kelas' | 'guru_mapel' | 'siswa';

export interface UserProfile {
  id: string;
  username?: string;
  password?: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  title: string;
  nipOrNisn: string;
  classAssigned: string;
  status?: 'Aktif' | 'Nonaktif';
  phone?: string;
  lastLogin?: string;
  createdAt?: string;
  customAllowedTabs?: ActiveTab[];
}

export type RolePermissions = Record<UserRole, ActiveTab[]>;

export interface MenuItemPermission {
  id: ActiveTab;
  label: string;
  category: 'Utama' | 'Akademik' | 'Administrasi' | 'Layanan' | 'Sistem';
  description: string;
  defaultRoles: UserRole[];
}

export interface SchoolInfo {
  npsn: string;
  schoolName: string;
  address: string;
  subdistrict: string;
  city: string;
  province: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  website: string;
  headmasterName: string;
  headmasterNip: string;
  homeroomTeacherName: string;
  homeroomTeacherNip: string;
  className: string;
  phase: string; // Fase B (Kelas 3-4)
  academicYear: string;
  semester: '1 (Ganjil)' | '2 (Genap)';
  kurikulum: 'Kurikulum Merdeka' | 'Kurikulum 2013';
}

export interface Student {
  id: string;
  nisn: string;
  nis: string;
  nama: string;
  jenisKelamin: 'L' | 'P';
  tempatLahir: string;
  tanggalLahir: string;
  agama: 'Islam' | 'Kristen' | 'Katolik' | 'Hindu' | 'Buddha' | 'Konghucu';
  alamat: string;
  namaAyah: string;
  namaIbu: string;
  pekerjaanOrtu: string;
  noHpOrtu: string;
  fotoUrl: string;
  status: 'Aktif' | 'Mutasi' | 'Lulus' | 'Non-aktif';
  nomorAbsen: number;
  kelas: string;
  catatanKhusus?: string;
}

export type AttendanceStatus = 'Hadir' | 'Sakit' | 'Izin' | 'Alpa';

export interface AttendanceRecord {
  id: string;
  tanggal: string; // YYYY-MM-DD
  siswaId: string;
  status: AttendanceStatus;
  keterangan?: string;
  waktuInput: string;
}

export interface Subject {
  id: string;
  kode: string;
  nama: string;
  kelompok: 'Umum' | 'Muatan Lokal' | 'Pilihan';
  kktp: number; // Kriteria Ketercapaian Tujuan Pembelajaran (min score e.g. 75)
  guruPengampu: string;
  iconName: string;
  deskripsi?: string;
  jumlahJamPerMinggu?: number;
}

export interface TujuanPembelajaran {
  id: string;
  mapelId: string;
  kode: string; // e.g. "TP 1", "TP 2", "TP 3", "TP 4", "TP 4.1"
  lingkupMateri: string; // e.g. "Bab 1: Pancasila Sebagai Nilai Kehidupan"
  deskripsi: string; // Rumusan kalimat TP
  semester: '1 (Ganjil)' | '2 (Genap)' | 'Semua';
  fase?: string; // e.g. "Fase B (Kelas 4)"
  kktp?: number; // Target nilai ketuntasan khusus TP ini
  ringkasanRaporTuntas?: string;
  ringkasanRaporPerluBimbingan?: string;
}

export type AssessmentType = 
  | 'Formatif_TP1' 
  | 'Formatif_TP2' 
  | 'Formatif_TP3' 
  | 'Formatif_TP4' 
  | 'Sumatif_STS' 
  | 'Sumatif_SAS';

export interface GradeRecord {
  id: string;
  siswaId: string;
  mapelId: string;
  jenis: AssessmentType;
  nilai: number; // 0-100
  capaianKompetensi?: string;
}

export interface TeachingJournal {
  id: string;
  tanggal: string;
  jamKe: string; // e.g. "1 - 2"
  mapelId: string;
  materi: string;
  tujuanPembelajaran: string;
  kegiatan: string;
  evaluasi: string;
  kehadiran?: string;
  catatan?: string;
  siswaTidakHadir?: string[];
  status?: 'Selesai' | 'Tertunda' | 'Pengganti' | string;
}

export interface ScheduleItem {
  id: string;
  hari: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu';
  jamKe: number;
  waktu: string;
  mapelId: string;
  guruPengampu: string;
  ruang: string;
  warnaBadge: string;
  catatanPerlengkapan?: string;
  topikMateri?: string;
}

export interface CashTransaction {
  id: string;
  tanggal: string;
  jenis: 'Pemasukan' | 'Pengeluaran';
  kategori: 'Iuran Kas Siswa' | 'Iuran Kas Mingguan' | 'Donasi Paguyuban' | 'ATK / Spidol' | 'Fotocopy Tugas' | 'Kegiatan Kelas' | 'Santunan / Sosial' | 'Lainnya' | string;
  jumlah: number;
  keterangan: string;
  penanggungJawab: string;
  saldoSetelah: number;
  namaSiswa?: string;
  siswaId?: string;
  mingguKe?: number[] | number | string;
  metodePembayaran?: 'Tunai' | 'Transfer' | 'QRIS' | string;
}

export interface StudentWeeklyDues {
  id: string;
  siswaId: string;
  bulan: string; // e.g. "Agustus 2026"
  minggu1: boolean;
  minggu2: boolean;
  minggu3: boolean;
  minggu4: boolean;
  nominalPerMinggu: number;
  totalDisetor?: number;
}

export interface InventoryItem {
  id: string;
  kodeBarang: string;
  namaBarang: string;
  spesifikasi?: string;
  kategori?: 'Perabot' | 'Elektronik' | 'Pojok Baca' | 'Alat Peraga' | 'Kebersihan' | string;
  jumlah: number;
  satuan?: string;
  kondisi: 'Baik' | 'Rusak Ringan' | 'Rusak Berat';
  sumberDana?: 'BOS' | 'BOS Reguler' | 'BOS Kinerja' | 'Kas Paguyuban' | 'Bantuan Pemerintah' | 'Swadaya' | string;
  tahunPengadaan?: number;
  tanggalPengadaan?: string;
  keterangan?: string;
}

export interface CounselingRecord {
  id: string;
  tanggal: string;
  siswaId: string;
  jenis?: 'Prestasi' | 'Perilaku' | 'Akademik' | 'Sosial / Emosional' | 'Bimbingan Khusus' | string;
  kategori?: 'Bimbingan' | 'Prestasi' | 'Pelanggaran' | 'Konseling Ortu' | string;
  kasusAtauPrestasi?: string;
  judul?: string;
  deskripsi?: string;
  tindakLanjut: string;
  hasil?: string;
  status?: 'Selesai' | 'Dalam Pantauan' | 'Perlu Kerjasama Ortu' | string;
  pembimbing?: string;
}

export type StudentNote = CounselingRecord;
export type JournalEntry = TeachingJournal;

export interface SchoolEvent {
  id: string;
  tanggal: string;
  judul: string;
  kategori: 'Sekolah' | 'Kelas' | 'Ujian' | 'Libur' | 'P5';
  deskripsi: string;
  waktu: string;
}

export interface CleaningDuty {
  hari: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu' | string;
  siswaIds: string[];
  ketuaPiket: string;
  tugasSpesifik?: string;
  areaTugas?: string[];
  waktuPiket?: 'Pagi (Sebelum Bel)' | 'Siang (Pulang Sekolah)' | 'Pagi & Siang' | string;
}

export interface Teacher {
  id: string;
  nip: string; // NIP or '-'
  nuptk?: string;
  nama: string; // Nama Lengkap & Gelar
  jenisKelamin: 'L' | 'P';
  jabatan: string; // e.g. 'Kepala Sekolah', 'Guru Kelas 4A', 'Guru PAI & BP', 'Guru PJOK', 'Operator Dapodik'
  jenisGuru: 'Kepala Sekolah' | 'Guru Kelas' | 'Guru Mapel' | 'Guru BK' | 'Tenaga Kependidikan';
  statusKepegawaian: 'PNS' | 'PPPK' | 'GTT / Honorer' | 'Guru Tetap Yayasan';
  golonganPangkat?: string; // e.g. 'IV/b - Pembina Tk. I', 'III/c - Penata', 'IX (PPPK)', '-'
  pendidikanTerakhir: string; // e.g. 'S1 PGSD', 'S2 Manajemen Pendidikan', etc.
  jurusan?: string;
  noHp: string;
  email: string;
  alamat: string;
  fotoUrl?: string;
  statusAktif: 'Aktif' | 'Cuti' | 'Pensiun' | 'Mutasi';
  mataPelajaranUtama?: string[];
  kelasDiampu?: string;
  tugasTambahan?: string;
  tanggalBergabung?: string;
  tempatLahir?: string;
  tanggalLahir?: string;
  catatanKhusus?: string;
}

export interface Extracurricular {
  id: string;
  siswaId: string;
  namaKegiatan: string;
  predikat: 'Sangat Baik' | 'Baik' | 'Cukup';
  keterangan: string;
}

export type ActiveTab = 
  | 'dashboard'
  | 'siswa'
  | 'guru'
  | 'presensi'
  | 'nilai'
  | 'raport'
  | 'jurnal'
  | 'jadwal'
  | 'kas'
  | 'inventaris'
  | 'konseling'
  | 'ai_assistant'
  | 'pengaturan';
