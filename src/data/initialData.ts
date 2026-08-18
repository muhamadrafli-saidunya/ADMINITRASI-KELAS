import { 
  SchoolInfo, 
  Student, 
  Teacher,
  Subject, 
  GradeRecord, 
  AttendanceRecord, 
  TeachingJournal, 
  ScheduleItem, 
  CashTransaction, 
  StudentWeeklyDues, 
  InventoryItem, 
  CounselingRecord, 
  SchoolEvent, 
  CleaningDuty,
  UserProfile,
  Extracurricular,
  AssessmentType
} from '../types';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user-guru-1',
    username: 'guru4a',
    password: 'guru123',
    name: 'Sri Wahyuni, S.Pd., Gr.',
    email: 'sri.wahyuni@sdn.sch.id',
    role: 'wali_kelas',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
    title: 'Wali Kelas 4A & Guru Pembina',
    nipOrNisn: '19880412 201201 2 018',
    classAssigned: 'Kelas 4A'
  },
  {
    id: 'user-admin-1',
    username: 'admin',
    password: 'admin123',
    name: 'Drs. H. Bambang Sutrisno, M.Pd.',
    email: 'kepsek@sdn.sch.id',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    title: 'Kepala Sekolah / Pengawas Dapodik',
    nipOrNisn: '19680315 199303 1 005',
    classAssigned: 'Semua Kelas (1-6)'
  },
  {
    id: 'user-siswa-1',
    username: 'siswa01',
    password: 'siswa123',
    name: 'Ahmad Fauzi & Wali Murid',
    email: 'fauzi.ahmad@siswa.sdn.sch.id',
    role: 'siswa',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    title: 'Siswa Kelas 4A (No. Absen 01)',
    nipOrNisn: '0123849102',
    classAssigned: 'Kelas 4A'
  }
];

export const INITIAL_SCHOOL_INFO: SchoolInfo = {
  npsn: '20104829',
  schoolName: 'SD NEGERI NUSANTARA 01',
  address: 'Jl. Merdeka Pendidikan No. 45, Kebayoran Baru',
  subdistrict: 'Kebayoran Baru',
  city: 'Kota Jakarta Selatan',
  province: 'DKI Jakarta',
  postalCode: '12160',
  phoneNumber: '(021) 7203491',
  email: 'sdn.nusantara01@dki.belajar.id',
  website: 'https://sdnnusantara01.sch.id',
  headmasterName: 'Drs. H. Bambang Sutrisno, M.Pd.',
  headmasterNip: '19680315 199303 1 005',
  homeroomTeacherName: 'Sri Wahyuni, S.Pd., Gr.',
  homeroomTeacherNip: '19880412 201201 2 018',
  className: 'Kelas 4A (Merdeka)',
  phase: 'Fase B (Kelas IV)',
  academicYear: '2025/2026',
  semester: '2 (Genap)',
  kurikulum: 'Kurikulum Merdeka'
};

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'sis-01',
    nisn: '0123849102',
    nis: '4021',
    nama: 'Ahmad Fauzi Rahman',
    jenisKelamin: 'L',
    tempatLahir: 'Jakarta',
    tanggalLahir: '2015-04-12',
    agama: 'Islam',
    alamat: 'Jl. Pangeran Antasari No. 12, Jakarta Selatan',
    namaAyah: 'Hendra Gunawan',
    namaIbu: 'Siti Maryam',
    pekerjaanOrtu: 'Wiraswasta / Arsitek',
    noHpOrtu: '0812-8921-3301',
    fotoUrl: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=150&auto=format&fit=crop&q=80',
    status: 'Aktif',
    nomorAbsen: 1,
    kelas: '4A',
    catatanKhusus: 'Ketua Kelas 4A, aktif dalam kegiatan literasi dan dokter kecil.'
  },
  {
    id: 'sis-02',
    nisn: '0123849103',
    nis: '4022',
    nama: 'Aisyah Putri Azzahra',
    jenisKelamin: 'P',
    tempatLahir: 'Bandung',
    tanggalLahir: '2015-06-25',
    agama: 'Islam',
    alamat: 'Jl. Fatmawati Raya No. 45, Jakarta Selatan',
    namaAyah: 'Rahmat Hidayat',
    namaIbu: 'Nurhasanah',
    pekerjaanOrtu: 'PNS Guru',
    noHpOrtu: '0813-1122-4455',
    fotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'Aktif',
    nomorAbsen: 2,
    kelas: '4A',
    catatanKhusus: 'Sangat berbakat di bidang seni tari dan Bahasa Indonesia.'
  },
  {
    id: 'sis-03',
    nisn: '0123849104',
    nis: '4023',
    nama: 'Budi Santoso',
    jenisKelamin: 'L',
    tempatLahir: 'Surakarta',
    tanggalLahir: '2015-01-18',
    agama: 'Islam',
    alamat: 'Jl. Cipete Utara No. 8, Jakarta Selatan',
    namaAyah: 'Joko Santoso',
    namaIbu: 'Sri Mulyani',
    pekerjaanOrtu: 'Karyawan Swasta',
    noHpOrtu: '0857-4433-2211',
    fotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'Aktif',
    nomorAbsen: 3,
    kelas: '4A',
    catatanKhusus: 'Juara 2 Catur Tingkat Kecamatan, antusias dalam Matematika.'
  },
  {
    id: 'sis-04',
    nisn: '0123849105',
    nis: '4024',
    nama: 'Citra Dewi Lestari',
    jenisKelamin: 'P',
    tempatLahir: 'Jakarta',
    tanggalLahir: '2015-09-03',
    agama: 'Kristen',
    alamat: 'Jl. Gandaria Tengah II No. 19, Jakarta Selatan',
    namaAyah: 'Samuel Lestari',
    namaIbu: 'Maria Natalia',
    pekerjaanOrtu: 'Akuntan',
    noHpOrtu: '0818-0909-8877',
    fotoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    status: 'Aktif',
    nomorAbsen: 4,
    kelas: '4A',
    catatanKhusus: 'Sekretaris kelas yang rapi, mahir dalam membaca puisi.'
  },
  {
    id: 'sis-05',
    nisn: '0123849106',
    nis: '4025',
    nama: 'Dimas Anggara Saputra',
    jenisKelamin: 'L',
    tempatLahir: 'Bogor',
    tanggalLahir: '2015-03-14',
    agama: 'Islam',
    alamat: 'Jl. Radio Dalam No. 33, Jakarta Selatan',
    namaAyah: 'Bambang Saputra',
    namaIbu: 'Kartika Sari',
    pekerjaanOrtu: 'Wirausaha Kuliner',
    noHpOrtu: '0821-3344-5566',
    fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'Aktif',
    nomorAbsen: 5,
    kelas: '4A',
    catatanKhusus: 'Anggota tim inti sepak bola SD, disiplin dan solutif.'
  },
  {
    id: 'sis-06',
    nisn: '0123849107',
    nis: '4026',
    nama: 'Farhan Maulana Malik',
    jenisKelamin: 'L',
    tempatLahir: 'Jakarta',
    tanggalLahir: '2015-11-20',
    agama: 'Islam',
    alamat: 'Jl. Haji Nawi No. 14, Jakarta Selatan',
    namaAyah: 'Malik Ibrahim',
    namaIbu: 'Fatimah',
    pekerjaanOrtu: 'Teknisi Komputer',
    noHpOrtu: '0812-7788-9900',
    fotoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    status: 'Aktif',
    nomorAbsen: 6,
    kelas: '4A',
    catatanKhusus: 'Sangat berminat pada sains, eksperimen IPAS dan coding robotik dasar.'
  },
  {
    id: 'sis-07',
    nisn: '0123849108',
    nis: '4027',
    nama: 'Gita Maharani',
    jenisKelamin: 'P',
    tempatLahir: 'Semarang',
    tanggalLahir: '2015-08-10',
    agama: 'Islam',
    alamat: 'Jl. Darmawangsa X No. 5, Jakarta Selatan',
    namaAyah: 'Sugeng Widodo',
    namaIbu: 'Endang Purwanti',
    pekerjaanOrtu: 'Dokter Gigi',
    noHpOrtu: '0813-9988-7766',
    fotoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    status: 'Aktif',
    nomorAbsen: 7,
    kelas: '4A',
    catatanKhusus: 'Bendahara kelas yang teliti dan ramah.'
  },
  {
    id: 'sis-08',
    nisn: '0123849109',
    nis: '4028',
    nama: 'I Made Raditya Wibawa',
    jenisKelamin: 'L',
    tempatLahir: 'Denpasar',
    tanggalLahir: '2015-05-02',
    agama: 'Hindu',
    alamat: 'Jl. Wijaya Kusuma No. 27, Jakarta Selatan',
    namaAyah: 'I Wayan Sudira',
    namaIbu: 'Ni Ketut Astuti',
    pekerjaanOrtu: 'Seniman / Arsitek Lansekap',
    noHpOrtu: '0817-6655-4433',
    fotoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    status: 'Aktif',
    nomorAbsen: 8,
    kelas: '4A',
    catatanKhusus: 'Juara menggambar poster tingkat kota, ramah dan supel.'
  },
  {
    id: 'sis-09',
    nisn: '0123849110',
    nis: '4029',
    nama: 'Kevin Jonathan Tan',
    jenisKelamin: 'L',
    tempatLahir: 'Jakarta',
    tanggalLahir: '2015-12-08',
    agama: 'Buddha',
    alamat: 'Jl. Panglima Polim Raya No. 89, Jakarta Selatan',
    namaAyah: 'David Jonathan',
    namaIbu: 'Susanti Tan',
    pekerjaanOrtu: 'Pengusaha Ekspedisi',
    noHpOrtu: '0812-4455-6677',
    fotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'Aktif',
    nomorAbsen: 9,
    kelas: '4A',
    catatanKhusus: 'Sangat aktif dalam percakapan Bahasa Inggris dan matematika mental.'
  },
  {
    id: 'sis-10',
    nisn: '0123849111',
    nis: '4030',
    nama: 'Nadia Zahra Kamila',
    jenisKelamin: 'P',
    tempatLahir: 'Yogyakarta',
    tanggalLahir: '2015-02-19',
    agama: 'Islam',
    alamat: 'Jl. Barito II No. 11, Jakarta Selatan',
    namaAyah: 'dr. Agus Setiawan, Sp.A',
    namaIbu: 'Ratna Kartika',
    pekerjaanOrtu: 'Dokter Spesialis Anak',
    noHpOrtu: '0811-2233-4455',
    fotoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    status: 'Aktif',
    nomorAbsen: 10,
    kelas: '4A',
    catatanKhusus: 'Juara olimpiade sains SD dan fasih melafalkan ayat suci Al-Qur\'an.'
  },
  {
    id: 'sis-11',
    nisn: '0123849112',
    nis: '4031',
    nama: 'Rizky Pratama Yudha',
    jenisKelamin: 'L',
    tempatLahir: 'Jakarta',
    tanggalLahir: '2015-07-30',
    agama: 'Islam',
    alamat: 'Jl. Melawai Raya No. 62, Jakarta Selatan',
    namaAyah: 'Yudha Pratama',
    namaIbu: 'Dian Anggraini',
    pekerjaanOrtu: 'Wartawan Media Nasional',
    noHpOrtu: '0856-1122-3344',
    fotoUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&auto=format&fit=crop&q=80',
    status: 'Aktif',
    nomorAbsen: 11,
    kelas: '4A',
    catatanKhusus: 'Memiliki kemampuan vokal musik dan menyanyi lagu-lagu nasional yang baik.'
  },
  {
    id: 'sis-12',
    nisn: '0123849113',
    nis: '4032',
    nama: 'Tiara Anindya Putri',
    jenisKelamin: 'P',
    tempatLahir: 'Surabaya',
    tanggalLahir: '2015-10-15',
    agama: 'Islam',
    alamat: 'Jl. Kramat Pela No. 4, Jakarta Selatan',
    namaAyah: 'Anwar Sadat',
    namaIbu: 'Maya Kusuma',
    pekerjaanOrtu: 'Apoteker',
    noHpOrtu: '0878-5566-7788',
    fotoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    status: 'Aktif',
    nomorAbsen: 12,
    kelas: '4A',
    catatanKhusus: 'Penjaga pojok bacaan kelas, rajin merangkum isi buku bacaan.'
  }
];

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'mapel-01',
    kode: 'PPKn',
    nama: 'Pendidikan Pancasila',
    kelompok: 'Umum',
    kktp: 75,
    guruPengampu: 'Sri Wahyuni, S.Pd., Gr.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'mapel-02',
    kode: 'BIN',
    nama: 'Bahasa Indonesia',
    kelompok: 'Umum',
    kktp: 75,
    guruPengampu: 'Sri Wahyuni, S.Pd., Gr.',
    iconName: 'BookOpen'
  },
  {
    id: 'mapel-03',
    kode: 'MAT',
    nama: 'Matematika',
    kelompok: 'Umum',
    kktp: 70,
    guruPengampu: 'Sri Wahyuni, S.Pd., Gr.',
    iconName: 'Calculator'
  },
  {
    id: 'mapel-04',
    kode: 'IPAS',
    nama: 'Ilmu Pengetahuan Alam & Sosial (IPAS)',
    kelompok: 'Umum',
    kktp: 72,
    guruPengampu: 'Sri Wahyuni, S.Pd., Gr.',
    iconName: 'Compass'
  },
  {
    id: 'mapel-05',
    kode: 'PAI',
    nama: 'Pendidikan Agama & Budi Pekerti',
    kelompok: 'Umum',
    kktp: 78,
    guruPengampu: 'Ust. Ahmad Fauzan, S.Pd.I',
    iconName: 'HeartHandshake'
  },
  {
    id: 'mapel-06',
    kode: 'PJOK',
    nama: 'Pendidikan Jasmani, Olahraga, & Kesehatan',
    kelompok: 'Umum',
    kktp: 75,
    guruPengampu: 'Wahyu Hidayat, S.Pd.Jas',
    iconName: 'Activity'
  },
  {
    id: 'mapel-07',
    kode: 'SENI',
    nama: 'Seni Rupa & Prakarya',
    kelompok: 'Pilihan',
    kktp: 75,
    guruPengampu: 'Sri Wahyuni, S.Pd., Gr.',
    iconName: 'Palette'
  },
  {
    id: 'mapel-08',
    kode: 'ING',
    nama: 'Bahasa Inggris',
    kelompok: 'Muatan Lokal',
    kktp: 70,
    guruPengampu: 'Miss Clarissa Melinda, S.Pd.',
    iconName: 'Languages'
  },
  {
    id: 'mapel-09',
    kode: 'PLBJ',
    nama: 'Pendidikan Lingkungan & Budaya Jakarta',
    kelompok: 'Muatan Lokal',
    kktp: 75,
    guruPengampu: 'Sri Wahyuni, S.Pd., Gr.',
    iconName: 'Building2'
  }
];

// Helper to generate realistic initial grades
export const generateInitialGrades = (): GradeRecord[] => {
  const grades: GradeRecord[] = [];
  const baseScores: Record<string, number[]> = {
    'sis-01': [88, 90, 86, 92, 88, 90], // Ahmad Fauzi
    'sis-02': [92, 95, 84, 88, 90, 92], // Aisyah
    'sis-03': [82, 85, 96, 90, 85, 88], // Budi
    'sis-04': [90, 92, 88, 86, 90, 91], // Citra
    'sis-05': [80, 82, 78, 82, 84, 85], // Dimas
    'sis-06': [86, 88, 94, 96, 88, 92], // Farhan
    'sis-07': [88, 90, 88, 85, 90, 89], // Gita
    'sis-08': [84, 86, 82, 86, 85, 88], // Made
    'sis-09': [86, 88, 92, 90, 88, 91], // Kevin
    'sis-10': [95, 96, 98, 96, 98, 97], // Nadia
    'sis-11': [85, 88, 80, 82, 86, 85], // Rizky
    'sis-12': [90, 92, 84, 88, 88, 90], // Tiara
  };

  INITIAL_STUDENTS.forEach((student) => {
    const scores = baseScores[student.id] || [85, 85, 85, 85, 85, 85];
    INITIAL_SUBJECTS.forEach((subject, subIdx) => {
      const base = scores[subIdx % scores.length] || 82;
      const variation = ((student.nomorAbsen + subIdx) % 7) - 3;
      const finalVal = Math.min(100, Math.max(65, base + variation));

      const types: AssessmentType[] = [
        'Formatif_TP1',
        'Formatif_TP2',
        'Formatif_TP3',
        'Formatif_TP4',
        'Sumatif_STS',
        'Sumatif_SAS'
      ];

      types.forEach((type, tIdx) => {
        const offset = ((tIdx * 2 + student.nomorAbsen) % 5) - 2;
        const score = Math.min(100, Math.max(60, finalVal + offset));
        grades.push({
          id: `grd-${student.id}-${subject.id}-${type}`,
          siswaId: student.id,
          mapelId: subject.id,
          jenis: type,
          nilai: score,
          capaianKompetensi: score >= 85 
            ? 'Menunjukkan penguasaan yang sangat baik dalam memahami materi dan menerapkan konsep.'
            : score >= 75
            ? 'Menunjukkan penguasaan yang baik dalam mencapai tujuan pembelajaran.'
            : 'Perlu bimbingan dan pendampingan lebih lanjut pada penguasaan konsep dasar.'
        });
      });
    });
  });

  return grades;
};

// Generate realistic attendance for current month (August 2026 / recent days)
export const generateInitialAttendance = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const dates = [
    '2026-08-10',
    '2026-08-11',
    '2026-08-12',
    '2026-08-13',
    '2026-08-14',
    '2026-08-17' // Today
  ];

  dates.forEach((date) => {
    INITIAL_STUDENTS.forEach((student) => {
      let status: 'Hadir' | 'Sakit' | 'Izin' | 'Alpa' = 'Hadir';
      let keterangan = '';

      if (date === '2026-08-12' && student.id === 'sis-05') {
        status = 'Sakit';
        keterangan = 'Demam dan flu (Surat Dokter)';
      } else if (date === '2026-08-14' && student.id === 'sis-03') {
        status = 'Izin';
        keterangan = 'Menghadiri acara keluarga ke luar kota';
      } else if (date === '2026-08-17' && student.id === 'sis-11') {
        status = 'Izin';
        keterangan = 'Izin latihan vokal persiapan lomba paduan suara';
      }

      records.push({
        id: `att-${date}-${student.id}`,
        tanggal: date,
        siswaId: student.id,
        status,
        keterangan,
        waktuInput: `${date} 07:15:00`
      });
    });
  });

  return records;
};

export const INITIAL_JOURNALS: TeachingJournal[] = [
  {
    id: 'jrn-01',
    tanggal: '2026-08-17',
    jamKe: '1 - 2',
    mapelId: 'mapel-01',
    materi: 'Makna Simbol Sila-Sila Pancasila dalam Kehidupan Sehari-hari',
    tujuanPembelajaran: 'Peserta didik mampu mengidentifikasi dan menceritakan implementasi nilai sila ke-3 dan ke-4 Pancasila di lingkungan sekolah.',
    kegiatan: 'Diskusi kelompok studi kasus musyawarah kelas, presentasi poster pohon Pancasila, dan bermain peran (role-playing).',
    evaluasi: 'Semua siswa aktif berpartisipasi dalam diskusi. Kelompok 2 menunjukkan pemahaman sangat baik.',
    siswaTidakHadir: ['Rizky Pratama Yudha (Izin)'],
    status: 'Selesai'
  },
  {
    id: 'jrn-02',
    tanggal: '2026-08-17',
    jamKe: '3 - 4',
    mapelId: 'mapel-03',
    materi: 'Pecahan Senilai dan Operasi Penjumlahan Pecahan Berpenyebut Sama',
    tujuanPembelajaran: 'Peserta didik dapat memvisualisasikan dan menyelesaikan soal cerita penjumlahan pecahan berpenyebut sama.',
    kegiatan: 'Praktik menggunakan media kertas lipat origami warna-warni dan menyelesaikan 5 soal tantangan kontekstual.',
    evaluasi: '90% siswa tuntas KKTP (di atas 70). Dimas dan Rizky perlu pendampingan tambahan pada soal pecahan campuran.',
    siswaTidakHadir: [],
    status: 'Selesai'
  },
  {
    id: 'jrn-03',
    tanggal: '2026-08-14',
    jamKe: '1 - 3',
    mapelId: 'mapel-04',
    materi: 'Bagian Tubuh Tumbuhan dan Fungsinya (Fotosintesis)',
    tujuanPembelajaran: 'Mengamati struktur daun, batang, dan akar di kebun sekolah serta menjelaskan proses fotosintesis.',
    kegiatan: 'Outdoor learning di taman sekolah, observasi menggunakan kaca pembesar, dan pencatatan lembar kerja observasi.',
    evaluasi: 'Siswa sangat antusias dengan pembelajaran luar kelas. LKS dikumpulkan lengkap.',
    siswaTidakHadir: ['Budi Santoso (Izin)'],
    status: 'Selesai'
  },
  {
    id: 'jrn-04',
    tanggal: '2026-08-13',
    jamKe: '2 - 3',
    mapelId: 'mapel-02',
    materi: 'Menemukan Ide Pokok dan Informasi Penting dalam Teks Narasi',
    tujuanPembelajaran: 'Membaca intensif cerita rakyat "Timun Mas" dan menuliskan ide pokok tiap paragraf.',
    kegiatan: 'Membaca nyaring bergantian, membuat peta pikiran (mind map) ide pokok paragraf.',
    evaluasi: 'Aisyah dan Nadia memberikan presentasi analisis teks yang sangat runtut.',
    siswaTidakHadir: [],
    status: 'Selesai'
  }
];

export const INITIAL_SCHEDULE: ScheduleItem[] = [
  // Senin
  { id: 'sch-01', hari: 'Senin', jamKe: 1, waktu: '07:00 - 07:45', mapelId: 'mapel-01', guruPengampu: 'Upacara & Sri Wahyuni, S.Pd.', ruang: 'Lap. Upacara & Ruang 4A', warnaBadge: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300' },
  { id: 'sch-02', hari: 'Senin', jamKe: 2, waktu: '07:45 - 08:30', mapelId: 'mapel-01', guruPengampu: 'Sri Wahyuni, S.Pd.', ruang: 'Ruang Kelas 4A', warnaBadge: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300' },
  { id: 'sch-03', hari: 'Senin', jamKe: 3, waktu: '08:45 - 09:30', mapelId: 'mapel-03', guruPengampu: 'Sri Wahyuni, S.Pd.', ruang: 'Ruang Kelas 4A', warnaBadge: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300' },
  { id: 'sch-04', hari: 'Senin', jamKe: 4, waktu: '09:30 - 10:15', mapelId: 'mapel-03', guruPengampu: 'Sri Wahyuni, S.Pd.', ruang: 'Ruang Kelas 4A', warnaBadge: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300' },
  { id: 'sch-05', hari: 'Senin', jamKe: 5, waktu: '10:30 - 11:15', mapelId: 'mapel-07', guruPengampu: 'Sri Wahyuni, S.Pd.', ruang: 'Ruang Kesenian', warnaBadge: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300' },
  { id: 'sch-06', hari: 'Senin', jamKe: 6, waktu: '11:15 - 12:00', mapelId: 'mapel-07', guruPengampu: 'Sri Wahyuni, S.Pd.', ruang: 'Ruang Kesenian', warnaBadge: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300' },

  // Selasa
  { id: 'sch-07', hari: 'Selasa', jamKe: 1, waktu: '07:00 - 07:45', mapelId: 'mapel-02', guruPengampu: 'Sri Wahyuni, S.Pd.', ruang: 'Ruang Kelas 4A', warnaBadge: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300' },
  { id: 'sch-08', hari: 'Selasa', jamKe: 2, waktu: '07:45 - 08:30', mapelId: 'mapel-02', guruPengampu: 'Sri Wahyuni, S.Pd.', ruang: 'Ruang Kelas 4A', warnaBadge: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300' },
  { id: 'sch-09', hari: 'Selasa', jamKe: 3, waktu: '08:45 - 09:30', mapelId: 'mapel-04', guruPengampu: 'Sri Wahyuni, S.Pd.', ruang: 'Lab Sains / Kelas 4A', warnaBadge: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300' },
  { id: 'sch-10', hari: 'Selasa', jamKe: 4, waktu: '09:30 - 10:15', mapelId: 'mapel-04', guruPengampu: 'Sri Wahyuni, S.Pd.', ruang: 'Lab Sains / Kelas 4A', warnaBadge: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300' },
  { id: 'sch-11', hari: 'Selasa', jamKe: 5, waktu: '10:30 - 11:15', mapelId: 'mapel-08', guruPengampu: 'Miss Clarissa Melinda, S.Pd.', ruang: 'Ruang Kelas 4A', warnaBadge: 'bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-300' },
  { id: 'sch-12', hari: 'Selasa', jamKe: 6, waktu: '11:15 - 12:00', mapelId: 'mapel-08', guruPengampu: 'Miss Clarissa Melinda, S.Pd.', ruang: 'Ruang Kelas 4A', warnaBadge: 'bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-300' },

  // Rabu
  { id: 'sch-13', hari: 'Rabu', jamKe: 1, waktu: '07:00 - 07:45', mapelId: 'mapel-06', guruPengampu: 'Wahyu Hidayat, S.Pd.Jas', ruang: 'Lapangan Olahraga', warnaBadge: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300' },
  { id: 'sch-14', hari: 'Rabu', jamKe: 2, waktu: '07:45 - 08:30', mapelId: 'mapel-06', guruPengampu: 'Wahyu Hidayat, S.Pd.Jas', ruang: 'Lapangan Olahraga', warnaBadge: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300' },
  { id: 'sch-15', hari: 'Rabu', jamKe: 3, waktu: '08:45 - 09:30', mapelId: 'mapel-06', guruPengampu: 'Wahyu Hidayat, S.Pd.Jas', ruang: 'Lapangan Olahraga', warnaBadge: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300' },
  { id: 'sch-16', hari: 'Rabu', jamKe: 4, waktu: '09:30 - 10:15', mapelId: 'mapel-02', guruPengampu: 'Sri Wahyuni, S.Pd.', ruang: 'Ruang Kelas 4A', warnaBadge: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300' },
  { id: 'sch-17', hari: 'Rabu', jamKe: 5, waktu: '10:30 - 11:15', mapelId: 'mapel-09', guruPengampu: 'Sri Wahyuni, S.Pd.', ruang: 'Ruang Kelas 4A', warnaBadge: 'bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300' },
  { id: 'sch-18', hari: 'Rabu', jamKe: 6, waktu: '11:15 - 12:00', mapelId: 'mapel-09', guruPengampu: 'Sri Wahyuni, S.Pd.', ruang: 'Ruang Kelas 4A', warnaBadge: 'bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300' },

  // Kamis
  { id: 'sch-19', hari: 'Kamis', jamKe: 1, waktu: '07:00 - 07:45', mapelId: 'mapel-05', guruPengampu: 'Ust. Ahmad Fauzan, S.Pd.I', ruang: 'Musholla & Kelas 4A', warnaBadge: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-300' },
  { id: 'sch-20', hari: 'Kamis', jamKe: 2, waktu: '07:45 - 08:30', mapelId: 'mapel-05', guruPengampu: 'Ust. Ahmad Fauzan, S.Pd.I', ruang: 'Musholla & Kelas 4A', warnaBadge: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-300' },
  { id: 'sch-21', hari: 'Kamis', jamKe: 3, waktu: '08:45 - 09:30', mapelId: 'mapel-05', guruPengampu: 'Ust. Ahmad Fauzan, S.Pd.I', ruang: 'Musholla & Kelas 4A', warnaBadge: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-300' },
  { id: 'sch-22', hari: 'Kamis', jamKe: 4, waktu: '09:30 - 10:15', mapelId: 'mapel-04', guruPengampu: 'Sri Wahyuni, S.Pd.', ruang: 'Ruang Kelas 4A', warnaBadge: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300' },
  { id: 'sch-23', hari: 'Kamis', jamKe: 5, waktu: '10:30 - 11:15', mapelId: 'mapel-03', guruPengampu: 'Sri Wahyuni, S.Pd.', ruang: 'Ruang Kelas 4A', warnaBadge: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300' },
  { id: 'sch-24', hari: 'Kamis', jamKe: 6, waktu: '11:15 - 12:00', mapelId: 'mapel-03', guruPengampu: 'Sri Wahyuni, S.Pd.', ruang: 'Ruang Kelas 4A', warnaBadge: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300' },

  // Jumat
  { id: 'sch-25', hari: 'Jumat', jamKe: 1, waktu: '07:00 - 07:45', mapelId: 'mapel-01', guruPengampu: 'Literasi & P5 Pembiasaan', ruang: 'Ruang Kelas 4A', warnaBadge: 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300' },
  { id: 'sch-26', hari: 'Jumat', jamKe: 2, waktu: '07:45 - 08:30', mapelId: 'mapel-02', guruPengampu: 'Sri Wahyuni, S.Pd.', ruang: 'Ruang Kelas 4A', warnaBadge: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300' },
  { id: 'sch-27', hari: 'Jumat', jamKe: 3, waktu: '08:45 - 09:30', mapelId: 'mapel-04', guruPengampu: 'Sri Wahyuni, S.Pd.', ruang: 'Ruang Kelas 4A', warnaBadge: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300' },
  { id: 'sch-28', hari: 'Jumat', jamKe: 4, waktu: '09:30 - 10:15', mapelId: 'mapel-01', guruPengampu: 'Pramuka Siaga / Penggalang', ruang: 'Halaman Sekolah', warnaBadge: 'bg-amber-200 text-amber-800 border-amber-300 dark:bg-amber-900/50 dark:text-amber-200' }
];

export const INITIAL_CASH_TRANSACTIONS: CashTransaction[] = [
  {
    id: 'trx-01',
    tanggal: '2026-08-01',
    jenis: 'Pemasukan',
    kategori: 'Iuran Kas Mingguan',
    jumlah: 120000,
    keterangan: 'Iuran kas minggu ke-1 bulan Agustus (12 siswa @ Rp 10.000)',
    penanggungJawab: 'Gita Maharani (Bendahara)',
    saldoSetelah: 120000
  },
  {
    id: 'trx-02',
    tanggal: '2026-08-03',
    jenis: 'Pengeluaran',
    kategori: 'ATK / Spidol',
    jumlah: 45000,
    keterangan: 'Pembelian 3 spidol whiteboard Snowman (Hitam, Biru, Merah) & penghapus magnet',
    penanggungJawab: 'Sri Wahyuni, S.Pd.',
    saldoSetelah: 75000
  },
  {
    id: 'trx-03',
    tanggal: '2026-08-05',
    jenis: 'Pemasukan',
    kategori: 'Donasi Paguyuban',
    jumlah: 350000,
    keterangan: 'Bantuan paguyuban orang tua murid untuk perlengkapan Pojok Bacaan Kelas 4A',
    penanggungJawab: 'Bapak Hendra (Ketua Paguyuban)',
    saldoSetelah: 425000
  },
  {
    id: 'trx-04',
    tanggal: '2026-08-08',
    jenis: 'Pemasukan',
    kategori: 'Iuran Kas Mingguan',
    jumlah: 120000,
    keterangan: 'Iuran kas minggu ke-2 bulan Agustus',
    penanggungJawab: 'Gita Maharani',
    saldoSetelah: 545000
  },
  {
    id: 'trx-05',
    tanggal: '2026-08-10',
    jenis: 'Pengeluaran',
    kategori: 'Fotocopy Tugas',
    jumlah: 36000,
    keterangan: 'Fotocopy lembar kerja asesmen formatif IPAS (12 rangkap x 3 lembar)',
    penanggungJawab: 'Citra Dewi Lestari (Sekretaris)',
    saldoSetelah: 509000
  },
  {
    id: 'trx-06',
    tanggal: '2026-08-12',
    jenis: 'Pengeluaran',
    kategori: 'Santunan / Sosial',
    jumlah: 50000,
    keterangan: 'Bingkisan buah untuk ananda Dimas Anggara (sakit demam)',
    penanggungJawab: 'Ahmad Fauzi & Gita Maharani',
    saldoSetelah: 459000
  },
  {
    id: 'trx-07',
    tanggal: '2026-08-15',
    jenis: 'Pemasukan',
    kategori: 'Iuran Kas Mingguan',
    jumlah: 110000,
    keterangan: 'Iuran kas minggu ke-3 bulan Agustus (11 siswa)',
    penanggungJawab: 'Gita Maharani',
    saldoSetelah: 569000
  }
];

export const generateInitialDues = (): StudentWeeklyDues[] => {
  return INITIAL_STUDENTS.map((student, idx) => ({
    id: `dues-${student.id}`,
    siswaId: student.id,
    bulan: 'Agustus 2026',
    minggu1: true,
    minggu2: true,
    minggu3: idx !== 10, // all except Rizky on w3
    minggu4: false,
    nominalPerMinggu: 10000
  }));
};

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-01',
    kodeBarang: 'INV-4A-001',
    namaBarang: 'Meja dan Kursi Siswa Kayu Jati',
    kategori: 'Perabot',
    jumlah: 12,
    satuan: 'Set',
    kondisi: 'Baik',
    sumberDana: 'BOS',
    tanggalPengadaan: '2024-07-10',
    keterangan: 'Kondisi kokoh, tertata rapi sesuai protokol kelas'
  },
  {
    id: 'inv-02',
    kodeBarang: 'INV-4A-002',
    namaBarang: 'Meja & Kursi Guru Kelas',
    kategori: 'Perabot',
    jumlah: 1,
    satuan: 'Set',
    kondisi: 'Baik',
    sumberDana: 'BOS',
    tanggalPengadaan: '2024-07-10',
    keterangan: 'Dilengkapi laci berkas administrasi dan taplak batik'
  },
  {
    id: 'inv-03',
    kodeBarang: 'INV-4A-003',
    namaBarang: 'Papan Tulis Whiteboard Magnetik (240x120 cm)',
    kategori: 'Perabot',
    jumlah: 1,
    satuan: 'Unit',
    kondisi: 'Baik',
    sumberDana: 'BOS',
    tanggalPengadaan: '2023-01-15',
    keterangan: 'Terpasang di dinding depan kelas'
  },
  {
    id: 'inv-04',
    kodeBarang: 'INV-4A-004',
    namaBarang: 'Kipas Angin Dinding Tornado 18"',
    kategori: 'Elektronik',
    jumlah: 2,
    satuan: 'Unit',
    kondisi: 'Baik',
    sumberDana: 'Kas Paguyuban',
    tanggalPengadaan: '2024-09-05',
    keterangan: 'Berfungsi dengan baik untuk sirkulasi udara'
  },
  {
    id: 'inv-05',
    kodeBarang: 'INV-4A-005',
    namaBarang: 'Smart TV & Soundbar Monitor Pembelajaran 43"',
    kategori: 'Elektronik',
    jumlah: 1,
    satuan: 'Unit',
    kondisi: 'Baik',
    sumberDana: 'Bantuan Pemerintah',
    tanggalPengadaan: '2025-02-20',
    keterangan: 'Digunakan untuk video edukasi interaktif dan presentasi P5'
  },
  {
    id: 'inv-06',
    kodeBarang: 'INV-4A-006',
    namaBarang: 'Rak Buku Pojok Literasi Kayu 4 Susun',
    kategori: 'Pojok Baca',
    jumlah: 2,
    satuan: 'Unit',
    kondisi: 'Baik',
    sumberDana: 'Kas Paguyuban',
    tanggalPengadaan: '2025-08-01',
    keterangan: 'Memuat 65 judul buku ensiklopedia anak dan cerita rakyat'
  },
  {
    id: 'inv-07',
    kodeBarang: 'INV-4A-007',
    namaBarang: 'Globe Bola Dunia & Peta NKRI Dinding',
    kategori: 'Alat Peraga',
    jumlah: 1,
    satuan: 'Set',
    kondisi: 'Baik',
    sumberDana: 'BOS',
    tanggalPengadaan: '2023-11-12',
    keterangan: 'Alat peraga mata pelajaran IPAS Geografi'
  },
  {
    id: 'inv-08',
    kodeBarang: 'INV-4A-008',
    namaBarang: 'Set Alat Kebersihan (Sapu, Pel, Tempat Sampah 3 Warna)',
    kategori: 'Kebersihan',
    jumlah: 1,
    satuan: 'Set',
    kondisi: 'Baik',
    sumberDana: 'BOS',
    tanggalPengadaan: '2026-01-05',
    keterangan: 'Tempat sampah terpilah: Organik, Anorganik, dan Kertas'
  },
  {
    id: 'inv-09',
    kodeBarang: 'INV-4A-009',
    namaBarang: 'Kotak P3K Lengkap + Termometer Digital',
    kategori: 'Alat Peraga',
    jumlah: 1,
    satuan: 'Paket',
    kondisi: 'Baik',
    sumberDana: 'BOS',
    tanggalPengadaan: '2025-07-20',
    keterangan: 'Berisi plester, betadine, minyak kayu putih, kasa steril, parasetamol anak'
  }
];

export const INITIAL_COUNSELING: CounselingRecord[] = [
  {
    id: 'csl-01',
    tanggal: '2026-08-15',
    siswaId: 'sis-01',
    jenis: 'Prestasi',
    judul: 'Apresiasi Kepemimpinan & Inisiatif Gemar Membaca',
    deskripsi: 'Ahmad Fauzi berhasil memimpin teman-temannya dalam mengorganisasi pojok bacaan kelas serta tertib saat jam istirahat.',
    tindakLanjut: 'Diberikan sertifikat Bintang Teladan Bulan Agustus dan ditunjuk mewakili kelas dalam Forum Anak Sekolah.',
    status: 'Selesai',
    pembimbing: 'Sri Wahyuni, S.Pd.'
  },
  {
    id: 'csl-02',
    tanggal: '2026-08-11',
    siswaId: 'sis-03',
    jenis: 'Prestasi',
    judul: 'Juara 2 Turnamen Catur Tingkat Pelajar SD',
    deskripsi: 'Budi Santoso meraih medali perak dalam Kejuaraan Catur Pelajar Tingkat Wilayah II Jakarta Selatan.',
    tindakLanjut: 'Pemberian piagam penghargaan di depan upacara bendera hari Senin dan pembinaan lanjutan.',
    status: 'Selesai',
    pembimbing: 'Wahyu Hidayat, S.Pd.Jas'
  },
  {
    id: 'csl-03',
    tanggal: '2026-08-06',
    siswaId: 'sis-05',
    jenis: 'Akademik',
    judul: 'Pendampingan Konsentrasi & Pemahaman Konsep Pecahan',
    deskripsi: 'Dimas tampak kurang fokus pada jam pelajaran Matematika sesi siang dan merasa kesulitan dengan pecahan campuran.',
    tindakLanjut: 'Telah dilakukan bimbingan personal 20 menit setelah pulang sekolah dengan media visual benda konkret. Menginformasikan orang tua untuk mendampingi review 10 menit di rumah.',
    status: 'Dalam Pantauan',
    pembimbing: 'Sri Wahyuni, S.Pd.'
  },
  {
    id: 'csl-04',
    tanggal: '2026-08-04',
    siswaId: 'sis-10',
    jenis: 'Prestasi',
    judul: 'Lolos Seleksi Olimpiade Sains Nasional (OSN) Tingkat Kota',
    deskripsi: 'Nadia Zahra Kamila berhasil meraih skor tertinggi seleksi internal sekolah untuk bidang IPA SD.',
    tindakLanjut: 'Dijadwalkan bimbingan intensif setiap hari Selasa & Kamis sore bersama tim pembina sains.',
    status: 'Selesai',
    pembimbing: 'Sri Wahyuni, S.Pd.'
  }
];

export const INITIAL_DUTIES: CleaningDuty[] = [
  {
    hari: 'Senin',
    siswaIds: ['sis-01', 'sis-02'],
    ketuaPiket: 'Ahmad Fauzi Rahman',
    tugasSpesifik: 'Menyiapkan papan tulis, spidol & penghapus, menyapu lantai kelas dan menyiram tanaman teras depan.',
    areaTugas: ['Papan Tulis & Meja Guru', 'Sapu & Pel Lantai', 'Teras Depan'],
    waktuPiket: 'Pagi & Siang'
  },
  {
    hari: 'Selasa',
    siswaIds: ['sis-03', 'sis-04'],
    ketuaPiket: 'Budi Santoso',
    tugasSpesifik: 'Menyapu lorong kelas, merapikan meja kursi siswa, dan membuang sampah ke bak terpilah.',
    areaTugas: ['Meja & Kursi Siswa', 'Tempat Sampah Terpilah', 'Sapu Lantai'],
    waktuPiket: 'Pagi & Siang'
  },
  {
    hari: 'Rabu',
    siswaIds: ['sis-05', 'sis-06'],
    ketuaPiket: 'Farhan Maulana Malik',
    tugasSpesifik: 'Merapikan pojok bacaan & buku literasi, membersihkan debu jendela dan kipas angin dinding.',
    areaTugas: ['Pojok Baca & Rak Buku', 'Kaca Jendela & Ventilasi', 'Sapu Lantai'],
    waktuPiket: 'Siang (Pulang Sekolah)'
  },
  {
    hari: 'Kamis',
    siswaIds: ['sis-07', 'sis-08'],
    ketuaPiket: 'Gita Maharani',
    tugasSpesifik: 'Menyapu lantai, memeriksa kelengkapan spidol & isi tinta, serta merapikan taplak meja guru.',
    areaTugas: ['Meja Guru & Dokumen', 'Papan Tulis', 'Sapu & Pel Lantai'],
    waktuPiket: 'Pagi & Siang'
  },
  {
    hari: 'Jumat',
    siswaIds: ['sis-09', 'sis-10'],
    ketuaPiket: 'Nadia Zahra Kamila',
    tugasSpesifik: 'Operasi Semut bersih-bersih kelas menjelang ibadah/pembiasaan Jumat, mengepel lantai dan lap kaca.',
    areaTugas: ['Operasi Semut Kelas', 'Pel Lantai Menyeluruh', 'Tempat Sampah Organik/Anorganik'],
    waktuPiket: 'Pagi (Sebelum Bel)'
  },
  {
    hari: 'Sabtu',
    siswaIds: ['sis-11', 'sis-12'],
    ketuaPiket: 'Tiara Anindya Putri',
    tugasSpesifik: 'Pembersihan menyeluruh akhir pekan, merapikan loker siswa, pojok kreasi P5, dan mematikan seluruh aliran listrik/kipas.',
    areaTugas: ['Loker & Pojok Hasil Karya P5', 'Pojok Bacaan', 'Saklar Listrik & Kipas'],
    waktuPiket: 'Siang (Pulang Sekolah)'
  }
];

export const INITIAL_EVENTS: SchoolEvent[] = [
  {
    id: 'ev-01',
    tanggal: '2026-08-17',
    judul: 'Upacara HUT Kemerdekaan RI ke-81',
    kategori: 'Sekolah',
    deskripsi: 'Upacara bendera gabungan seluruh siswa dan guru dengan seragam adat daerah nusantara.',
    waktu: '07:00 - 09:30 WIB'
  },
  {
    id: 'ev-02',
    tanggal: '2026-08-25',
    judul: 'Gelar Karya P5 (Projek Penguatan Profil Pelajar Pancasila)',
    kategori: 'P5',
    deskripsi: 'Pameran kreasi ecobrick dan daur ulang sampah plastik bertema "Gaya Hidup Berkelanjutan".',
    waktu: '08:00 - 12:00 WIB'
  },
  {
    id: 'ev-03',
    tanggal: '2026-09-15',
    judul: 'Asesmen Sumatif Tengah Semester (STS) Ganjil',
    kategori: 'Ujian',
    deskripsi: 'Pelaksanaan asesmen tengah semester untuk mengukur ketercapaian tujuan pembelajaran.',
    waktu: '07:30 - 11:30 WIB'
  },
  {
    id: 'ev-04',
    tanggal: '2026-09-26',
    judul: 'Pertemuan Paguyuban Orang Tua Murid & Pembagian Laporan Kemajuan',
    kategori: 'Kelas',
    deskripsi: 'Diskusi bersama wali murid mengenai capaian perkembangan belajar dan persiapan lomba sekolah.',
    waktu: '09:00 - 11:30 WIB'
  }
];

export const INITIAL_EXTRACURRICULARS: Extracurricular[] = [
  {
    id: 'ex-01',
    siswaId: 'sis-01',
    namaKegiatan: 'Pramuka Siaga / Penggalang',
    predikat: 'Sangat Baik',
    keterangan: 'Aktif, disiplin, dan terampil dalam tali-temali serta semaphore.'
  },
  {
    id: 'ex-02',
    siswaId: 'sis-01',
    namaKegiatan: 'Dokter Kecil (UKS)',
    predikat: 'Sangat Baik',
    keterangan: 'Memahami prinsip pertolongan pertama pada kecelakaan ringan di sekolah.'
  },
  {
    id: 'ex-03',
    siswaId: 'sis-02',
    namaKegiatan: 'Seni Tari Tradisional',
    predikat: 'Sangat Baik',
    keterangan: 'Menguasai gerak dasar tari Jaipong dan Saman dengan kelenturan yang bagus.'
  },
  {
    id: 'ex-04',
    siswaId: 'sis-03',
    namaKegiatan: 'Klub Catur Prestasi',
    predikat: 'Sangat Baik',
    keterangan: 'Memiliki pemikiran taktis dan ketenangan tinggi dalam strategi catur.'
  },
  {
    id: 'ex-05',
    siswaId: 'sis-06',
    namaKegiatan: 'Robotika & Coding Dasar',
    predikat: 'Sangat Baik',
    keterangan: 'Mampu merakit sirkuit sederhana dan algoritma pemrograman visual Scratch.'
  },
  {
    id: 'ex-06',
    siswaId: 'sis-10',
    namaKegiatan: 'Klub Sains & Olimpiade IPA',
    predikat: 'Sangat Baik',
    keterangan: 'Daya analisis eksperimen sangat tinggi dan tekun dalam pemecahan masalah ilmiah.'
  }
];

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 'guru-01',
    nip: '19680315 199303 1 005',
    nuptk: '3456746648200012',
    nama: 'Drs. H. Bambang Sutrisno, M.Pd.',
    jenisKelamin: 'L',
    jabatan: 'Kepala Sekolah',
    jenisGuru: 'Kepala Sekolah',
    statusKepegawaian: 'PNS',
    golonganPangkat: 'IV/b - Pembina Tingkat I',
    pendidikanTerakhir: 'S2 Manajemen Pendidikan',
    jurusan: 'Manajemen Pendidikan',
    noHp: '081234567890',
    email: 'bambang.sutrisno@sdn.sch.id',
    alamat: 'Jl. Wijaya Kusuma No. 12, Kebayoran Baru, Jakarta Selatan',
    fotoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    statusAktif: 'Aktif',
    mataPelajaranUtama: ['Manajemen Sekolah', 'Supervisi Akademik'],
    kelasDiampu: 'Semua Kelas (1-6)',
    tugasTambahan: 'Ketua K3S Kecamatan Kebayoran Baru',
    tanggalBergabung: '2018-07-15',
    tempatLahir: 'Semarang',
    tanggalLahir: '1968-03-15',
    catatanKhusus: 'Pembina Pembelajaran Kurikulum Merdeka & Assessor Akreditasi Sekolah.'
  },
  {
    id: 'guru-02',
    nip: '19880412 201201 2 018',
    nuptk: '8452766668210023',
    nama: 'Sri Wahyuni, S.Pd., Gr.',
    jenisKelamin: 'P',
    jabatan: 'Wali Kelas 4A & Guru Kelas',
    jenisGuru: 'Guru Kelas',
    statusKepegawaian: 'PNS',
    golonganPangkat: 'III/c - Penata',
    pendidikanTerakhir: 'S1 PGSD',
    jurusan: 'Pendidikan Guru Sekolah Dasar',
    noHp: '081398765432',
    email: 'sri.wahyuni@sdn.sch.id',
    alamat: 'Jl. Melati Raya No. 45, Cilandak, Jakarta Selatan',
    fotoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80',
    statusAktif: 'Aktif',
    mataPelajaranUtama: ['Bahasa Indonesia', 'Matematika', 'IPAS', 'Pendidikan Pancasila'],
    kelasDiampu: 'Kelas 4A',
    tugasTambahan: 'Wali Kelas 4A & Koordinator Tim P5 Fase B',
    tanggalBergabung: '2019-01-02',
    tempatLahir: 'Surakarta',
    tanggalLahir: '1988-04-12',
    catatanKhusus: 'Guru Penggerak Angkatan 7 & Penulis Modul Ajar Merdeka Belajar.'
  },
  {
    id: 'guru-03',
    nip: '19850620 200902 1 004',
    nuptk: '1245763665200034',
    nama: 'Rahmat Hidayat, S.Pd.I., M.Pd.',
    jenisKelamin: 'L',
    jabatan: 'Guru Pendidikan Agama Islam & Budi Pekerti',
    jenisGuru: 'Guru Mapel',
    statusKepegawaian: 'PNS',
    golonganPangkat: 'III/d - Penata Tingkat I',
    pendidikanTerakhir: 'S2 Pendidikan Agama Islam',
    jurusan: 'Pendidikan Agama Islam',
    noHp: '081287654321',
    email: 'rahmat.hidayat@sdn.sch.id',
    alamat: 'Jl. Masjid Al-Ikhlas No. 8, Mampang Prapatan, Jakarta Selatan',
    fotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    statusAktif: 'Aktif',
    mataPelajaranUtama: ['Pendidikan Agama Islam & Budi Pekerti'],
    kelasDiampu: 'Kelas 1 - 6 (Fase A, B, C)',
    tugasTambahan: 'Pembina Rohis & Ekstrakurikuler BTQ',
    tanggalBergabung: '2015-08-01',
    tempatLahir: 'Bandung',
    tanggalLahir: '1985-06-20',
    catatanKhusus: 'Koordinator Pembiasaan Ibadah Pagi & Sholat Dhuha Bersama.'
  },
  {
    id: 'guru-04',
    nip: '19920815 202221 1 007',
    nuptk: '9845770671130045',
    nama: 'Budi Santoso, S.Pd.',
    jenisKelamin: 'L',
    jabatan: 'Guru PJOK (Pendidikan Jasmani, Olahraga, & Kesehatan)',
    jenisGuru: 'Guru Mapel',
    statusKepegawaian: 'PPPK',
    golonganPangkat: 'Golongan IX (PPPK)',
    pendidikanTerakhir: 'S1 Pendidikan Jasmani Kesehatan & Rekreasi',
    jurusan: 'PJKR',
    noHp: '085712349876',
    email: 'budi.santoso@sdn.sch.id',
    alamat: 'Jl. Fatmawati Permai No. 22, Cilandak, Jakarta Selatan',
    fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    statusAktif: 'Aktif',
    mataPelajaranUtama: ['PJOK'],
    kelasDiampu: 'Kelas 1 - 6 (Fase A, B, C)',
    tugasTambahan: 'Pembina Ekstrakurikuler Futsal, Atletik, & UKS Sekolah',
    tanggalBergabung: '2022-03-01',
    tempatLahir: 'Yogyakarta',
    tanggalLahir: '1992-08-15',
    catatanKhusus: 'Pelatih Berlisensi Atletik Pelajar Daerah DKI Jakarta.'
  },
  {
    id: 'guru-05',
    nip: '19750912 200003 2 003',
    nuptk: '4562753654300056',
    nama: 'Siti Aminah, S.Pd., M.Si.',
    jenisKelamin: 'P',
    jabatan: 'Wali Kelas 1A & Guru Kelas',
    jenisGuru: 'Guru Kelas',
    statusKepegawaian: 'PNS',
    golonganPangkat: 'IV/a - Pembina',
    pendidikanTerakhir: 'S2 Pendidikan Dasar',
    jurusan: 'Pendidikan Dasar',
    noHp: '081345678901',
    email: 'siti.aminah@sdn.sch.id',
    alamat: 'Jl. Kemang Timur No. 19, Pasar Minggu, Jakarta Selatan',
    fotoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    statusAktif: 'Aktif',
    mataPelajaranUtama: ['Tematik Fase A', 'Bahasa Indonesia', 'Matematika Awal'],
    kelasDiampu: 'Kelas 1A',
    tugasTambahan: 'Koordinator Literasi Awal / Transisi PAUD ke SD',
    tanggalBergabung: '2008-01-10',
    tempatLahir: 'Bogor',
    tanggalLahir: '1975-09-12',
    catatanKhusus: 'Ahli Pendampingan Transisi PAUD ke SD Menyenangkan.'
  },
  {
    id: 'guru-06',
    nip: '19941103 202321 2 015',
    nuptk: '7654872673230067',
    nama: 'Dewi Sartika, S.Pd.',
    jenisKelamin: 'P',
    jabatan: 'Wali Kelas 2A & Guru Kelas',
    jenisGuru: 'Guru Kelas',
    statusKepegawaian: 'PPPK',
    golonganPangkat: 'Golongan IX (PPPK)',
    pendidikanTerakhir: 'S1 PGSD',
    jurusan: 'Pendidikan Guru Sekolah Dasar',
    noHp: '087812345678',
    email: 'dewi.sartika@sdn.sch.id',
    alamat: 'Jl. Terogong Raya No. 14, Pondok Pinang, Jakarta Selatan',
    fotoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    statusAktif: 'Aktif',
    mataPelajaranUtama: ['Tematik Fase A', 'Pendidikan Pancasila', 'Matematika'],
    kelasDiampu: 'Kelas 2A',
    tugasTambahan: 'Pengelola Pojok Literasi Sekolah',
    tanggalBergabung: '2023-04-01',
    tempatLahir: 'Cirebon',
    tanggalLahir: '1994-11-03',
    catatanKhusus: 'Kreator Media Pembelajaran Interaktif Berbasis Canva for Education.'
  },
  {
    id: 'guru-07',
    nip: '-',
    nuptk: '5432871672300078',
    nama: 'Hendra Gunawan, S.Pd.',
    jenisKelamin: 'L',
    jabatan: 'Wali Kelas 3A & Guru Kelas',
    jenisGuru: 'Guru Kelas',
    statusKepegawaian: 'GTT / Honorer',
    golonganPangkat: '-',
    pendidikanTerakhir: 'S1 PGSD',
    jurusan: 'Pendidikan Guru Sekolah Dasar',
    noHp: '085890123456',
    email: 'hendra.gunawan@sdn.sch.id',
    alamat: 'Jl. Radio Dalam No. 50, Gandaria Utara, Jakarta Selatan',
    fotoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    statusAktif: 'Aktif',
    mataPelajaranUtama: ['Bahasa Indonesia', 'IPAS', 'Seni Rupa'],
    kelasDiampu: 'Kelas 3A',
    tugasTambahan: 'Pembina Pramuka Siaga',
    tanggalBergabung: '2021-07-15',
    tempatLahir: 'Tangerang',
    tanggalLahir: '1996-02-18',
    catatanKhusus: 'Aktif dalam kegiatan KKG Gugus dan Pramuka Kwartir Ranting.'
  },
  {
    id: 'guru-08',
    nip: '19820310 200801 1 009',
    nuptk: '6543760662200089',
    nama: 'Agus Setiawan, S.Pd., M.Pd.',
    jenisKelamin: 'L',
    jabatan: 'Wali Kelas 5A & Guru Kelas',
    jenisGuru: 'Guru Kelas',
    statusKepegawaian: 'PNS',
    golonganPangkat: 'III/d - Penata Tingkat I',
    pendidikanTerakhir: 'S2 Pendidikan Matematika',
    jurusan: 'Pendidikan Matematika',
    noHp: '081298765401',
    email: 'agus.setiawan@sdn.sch.id',
    alamat: 'Jl. Tebet Barat Dalam No. 33, Tebet, Jakarta Selatan',
    fotoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80',
    statusAktif: 'Aktif',
    mataPelajaranUtama: ['Matematika', 'IPAS Fase C', 'Bahasa Indonesia'],
    kelasDiampu: 'Kelas 5A',
    tugasTambahan: 'Pembimbing Olimpiade Sains Nasional (OSN) Matematika',
    tanggalBergabung: '2016-01-04',
    tempatLahir: 'Malang',
    tanggalLahir: '1982-03-10',
    catatanKhusus: 'Instruktur Nasional Bimbingan Olimpiade Sains & Numerasi SD.'
  },
  {
    id: 'guru-09',
    nip: '19790514 200501 2 006',
    nuptk: '2345757659200090',
    nama: 'Ratna Nurjanah, S.Pd., Gr.',
    jenisKelamin: 'P',
    jabatan: 'Wali Kelas 6A & Guru Kelas',
    jenisGuru: 'Guru Kelas',
    statusKepegawaian: 'PNS',
    golonganPangkat: 'IV/a - Pembina',
    pendidikanTerakhir: 'S1 PGSD',
    jurusan: 'Pendidikan Guru Sekolah Dasar',
    noHp: '081567890123',
    email: 'ratna.nurjanah@sdn.sch.id',
    alamat: 'Jl. Panglima Polim No. 71, Kebayoran Baru, Jakarta Selatan',
    fotoUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&auto=format&fit=crop&q=80',
    statusAktif: 'Aktif',
    mataPelajaranUtama: ['Bahasa Indonesia', 'IPAS', 'Persiapan Asesmen Standarisasi Pendidikan'],
    kelasDiampu: 'Kelas 6A',
    tugasTambahan: 'Ketua Tim Asesmen Sekolah & Koordinator Kelulusan Kelas 6',
    tanggalBergabung: '2012-07-09',
    tempatLahir: 'Sukabumi',
    tanggalLahir: '1979-05-14',
    catatanKhusus: 'Pengembang Bank Soal Asesmen Sumatif Akhir Jenjang Sekolah Dasar.'
  },
  {
    id: 'guru-10',
    nip: '-',
    nuptk: '8765874675230101',
    nama: 'Nurul Fauziyah, S.Pd.',
    jenisKelamin: 'P',
    jabatan: 'Guru Bahasa Inggris & Seni Rupa',
    jenisGuru: 'Guru Mapel',
    statusKepegawaian: 'GTT / Honorer',
    golonganPangkat: '-',
    pendidikanTerakhir: 'S1 Pendidikan Bahasa Inggris',
    jurusan: 'Bahasa & Sastra Inggris',
    noHp: '087789012345',
    email: 'nurul.fauziyah@sdn.sch.id',
    alamat: 'Jl. Gandaria Tengah No. 11, Kramat Pela, Jakarta Selatan',
    fotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    statusAktif: 'Aktif',
    mataPelajaranUtama: ['Bahasa Inggris', 'Seni Rupa & Prakarya'],
    kelasDiampu: 'Kelas 1 - 6 (Fase A, B, C)',
    tugasTambahan: 'Pembina English Club & Sanggar Seni Rupa Siswa',
    tanggalBergabung: '2022-08-01',
    tempatLahir: 'Jakarta',
    tanggalLahir: '1997-09-24',
    catatanKhusus: 'Koordinator Dekorasi Kreatif Sekolah & Pameran Karya Seni P5.'
  },
  {
    id: 'guru-11',
    nip: '-',
    nuptk: '9988776655440112',
    nama: 'Dimas Prasetyo, S.Kom.',
    jenisKelamin: 'L',
    jabatan: 'Operator Dapodik & Tenaga Administrasi Sekolah',
    jenisGuru: 'Tenaga Kependidikan',
    statusKepegawaian: 'GTT / Honorer',
    golonganPangkat: '-',
    pendidikanTerakhir: 'S1 Sistem Informasi',
    jurusan: 'Teknologi Informasi & Komputer',
    noHp: '081901234567',
    email: 'operator.sdn01@dki.belajar.id',
    alamat: 'Jl. Bangka Raya No. 40, Mampang, Jakarta Selatan',
    fotoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    statusAktif: 'Aktif',
    mataPelajaranUtama: ['Manajemen Data Pendidikan', 'Dapodikmen'],
    kelasDiampu: '-',
    tugasTambahan: 'Operator Dapodikdasmen, Pengelola Inventaris Aset, & IT Support',
    tanggalBergabung: '2020-02-15',
    tempatLahir: 'Jakarta',
    tanggalLahir: '1995-12-05',
    catatanKhusus: 'Pengelola Sinkronisasi Data Pokok Pendidikan (Dapodik) & ANBK.'
  }
];

