import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
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
  SchoolInfo,
  UserProfile,
  UserRole,
  ActiveTab,
  AttendanceStatus,
  AssessmentType
} from '../types';

import {
  INITIAL_USERS,
  INITIAL_SCHOOL_INFO,
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  INITIAL_SUBJECTS,
  generateInitialGrades,
  generateInitialAttendance,
  INITIAL_JOURNALS,
  INITIAL_SCHEDULE,
  INITIAL_CASH_TRANSACTIONS,
  generateInitialDues,
  INITIAL_INVENTORY,
  INITIAL_COUNSELING,
  INITIAL_DUTIES,
  INITIAL_EVENTS,
  INITIAL_EXTRACURRICULARS
} from '../data/initialData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface AppContextType {
  // Navigation & User
  currentTab: ActiveTab;
  setCurrentTab: (tab: ActiveTab) => void;
  currentUser: UserProfile;
  availableUsers: UserProfile[];
  switchUserRole: (role: UserRole) => void;
  setCurrentUser: (user: UserProfile) => void;
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // School Info
  schoolInfo: SchoolInfo;
  updateSchoolInfo: (info: Partial<SchoolInfo>) => void;

  // Students (CRUD)
  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, updated: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  getStudentById: (id: string) => Student | undefined;

  // Teachers (CRUD)
  teachers: Teacher[];
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  updateTeacher: (id: string, updated: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;
  getTeacherById: (id: string) => Teacher | undefined;

  // Subjects
  subjects: Subject[];
  addSubject: (subject: Omit<Subject, 'id'>) => void;
  updateSubject: (id: string, updated: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;

  // Attendance
  attendanceRecords: AttendanceRecord[];
  markAttendance: (siswaId: string, status: AttendanceStatus, tanggal?: string, keterangan?: string) => void;
  bulkMarkAttendance: (tanggal: string, status: AttendanceStatus) => void;
  deleteAttendanceRecord: (id: string) => void;
  getAttendanceByDate: (tanggal: string) => AttendanceRecord[];
  getStudentAttendanceStats: (siswaId: string, monthPrefix?: string) => {
    hadir: number;
    sakit: number;
    izin: number;
    alpa: number;
    total: number;
    percentage: number;
  };

  // Grades (Penilaian)
  grades: GradeRecord[];
  saveGrade: (siswaId: string, mapelId: string, jenis: AssessmentType, nilai: number, capaianKompetensi?: string) => void;
  bulkSaveGrades: (newGrades: Array<{ siswaId: string; mapelId: string; jenis: AssessmentType; nilai: number; capaianKompetensi?: string }>) => void;
  getStudentGradeSummary: (siswaId: string, mapelId: string) => {
    formatifAvg: number;
    sumatifSts: number;
    sumatifSas: number;
    nilaiAkhir: number;
    predikat: 'A' | 'B' | 'C' | 'D';
    ketercapaian: 'Tuntas' | 'Belum Tuntas';
    deskripsiCapaian: string;
  };
  getAllGradesForStudent: (siswaId: string) => Array<{
    subject: Subject;
    formatifAvg: number;
    sumatifSts: number;
    sumatifSas: number;
    nilaiAkhir: number;
    predikat: 'A' | 'B' | 'C' | 'D';
    ketercapaian: 'Tuntas' | 'Belum Tuntas';
    deskripsiCapaian: string;
  }>;

  // Teaching Journal
  journals: TeachingJournal[];
  addJournal: (journal: Omit<TeachingJournal, 'id'>) => void;
  updateJournal: (id: string, updated: Partial<TeachingJournal>) => void;
  deleteJournal: (id: string) => void;

  // Timetable Schedule
  schedule: ScheduleItem[];
  addScheduleItem: (item: Omit<ScheduleItem, 'id'>) => void;
  updateScheduleItem: (id: string, updated: Partial<ScheduleItem>) => void;
  deleteScheduleItem: (id: string) => void;
  resetScheduleToDefault: () => void;
  duplicateDaySchedule: (fromDay: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu', toDay: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu') => void;

  // Cash Treasury & Dues
  transactions: CashTransaction[];
  cashTransactions: CashTransaction[];
  addCashTransaction: (trx: Omit<CashTransaction, 'id' | 'saldoSetelah'>) => void;
  deleteCashTransaction: (id: string) => void;
  weeklyDues: StudentWeeklyDues[];
  toggleStudentDues: (siswaId: string, week: 1 | 2 | 3 | 4) => void;
  recordStudentDuesDeposit: (depositData: {
    siswaId: string;
    namaSiswa: string;
    jumlah: number;
    tanggal: string;
    mingguKe: number[];
    metodePembayaran?: string;
    keterangan?: string;
    catatKeKas?: boolean;
  }) => void;
  getCurrentCashBalance: () => number;

  // Inventory
  inventory: InventoryItem[];
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
  updateInventoryItem: (id: string, updated: Partial<InventoryItem>) => void;
  deleteInventoryItem: (id: string) => void;

  // Counseling & Achievements
  counseling: CounselingRecord[];
  addCounselingRecord: (record: Omit<CounselingRecord, 'id'>) => void;
  updateCounselingRecord: (id: string, updated: Partial<CounselingRecord>) => void;
  deleteCounselingRecord: (id: string) => void;

  // Cleaning Duties
  cleaningDuties: CleaningDuty[];
  addDuty: (duty: CleaningDuty) => void;
  updateDuty: (hari: string, data: { siswaIds: string[]; ketuaPiket: string; tugasSpesifik?: string; areaTugas?: string[]; waktuPiket?: 'Pagi (Sebelum Bel)' | 'Siang (Pulang Sekolah)' | 'Pagi & Siang' | string }) => void;
  deleteDuty: (hari: string) => void;
  addStudentToDuty: (hari: string, siswaId: string) => void;
  removeStudentFromDuty: (hari: string, siswaId: string) => void;
  autoDistributeDuties: () => void;
  resetDutiesToDefault: () => void;

  // School Events
  events: SchoolEvent[];
  addEvent: (event: Omit<SchoolEvent, 'id'>) => void;
  deleteEvent: (id: string) => void;

  // Extracurriculars
  extracurriculars: any[];
  addExtracurricular: (item: any) => void;
  deleteExtracurricular: (id: string) => void;

  // System & Toast
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
  removeToast: (id: string) => void;
  resetAllDataToDefault: () => void;
  exportDatabaseToJson: () => void;
  importDatabaseFromJson: (jsonData: string) => boolean;

  // Quick Action Modal helpers
  selectedStudentForModal: Student | null;
  setSelectedStudentForModal: (student: Student | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_PREFIX = 'admin_kelas_sd_v1_';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Read initial from localStorage or fall back
  const getSaved = <T,>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(STORAGE_PREFIX + key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  };

  // State Declarations
  const [currentTab, setCurrentTab] = useState<ActiveTab>('dashboard');
  const [availableUsers] = useState<UserProfile[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => 
    getSaved('currentUser', INITIAL_USERS[0])
  );
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'isAuthenticated');
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo>(() => 
    getSaved('schoolInfo', INITIAL_SCHOOL_INFO)
  );

  const [students, setStudents] = useState<Student[]>(() => 
    getSaved('students', INITIAL_STUDENTS)
  );

  const [teachers, setTeachers] = useState<Teacher[]>(() => 
    getSaved('teachers', INITIAL_TEACHERS)
  );

  const [subjects, setSubjects] = useState<Subject[]>(() => 
    getSaved('subjects', INITIAL_SUBJECTS)
  );

  const [grades, setGrades] = useState<GradeRecord[]>(() => 
    getSaved('grades', generateInitialGrades())
  );

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() => 
    getSaved('attendance', generateInitialAttendance())
  );

  const [journals, setJournals] = useState<TeachingJournal[]>(() => 
    getSaved('journals', INITIAL_JOURNALS)
  );

  const [schedule, setSchedule] = useState<ScheduleItem[]>(() => 
    getSaved('schedule', INITIAL_SCHEDULE)
  );

  const [transactions, setTransactions] = useState<CashTransaction[]>(() => 
    getSaved('transactions', INITIAL_CASH_TRANSACTIONS)
  );

  const [weeklyDues, setWeeklyDues] = useState<StudentWeeklyDues[]>(() => 
    getSaved('weeklyDues', generateInitialDues())
  );

  const [inventory, setInventory] = useState<InventoryItem[]>(() => 
    getSaved('inventory', INITIAL_INVENTORY)
  );

  const [counseling, setCounseling] = useState<CounselingRecord[]>(() => 
    getSaved('counseling', INITIAL_COUNSELING)
  );

  const [cleaningDuties, setCleaningDuties] = useState<CleaningDuty[]>(() => 
    getSaved('cleaningDuties', INITIAL_DUTIES)
  );

  const [events, setEvents] = useState<SchoolEvent[]>(() => 
    getSaved('events', INITIAL_EVENTS)
  );

  const [extracurriculars, setExtracurriculars] = useState<any[]>(() => 
    getSaved('extracurriculars', INITIAL_EXTRACURRICULARS)
  );

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<Student | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'schoolInfo', JSON.stringify(schoolInfo));
  }, [schoolInfo]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'teachers', JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'grades', JSON.stringify(grades));
  }, [grades]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'attendance', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'journals', JSON.stringify(journals));
  }, [journals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'schedule', JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'weeklyDues', JSON.stringify(weeklyDues));
  }, [weeklyDues]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'counseling', JSON.stringify(counseling));
  }, [counseling]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'cleaningDuties', JSON.stringify(cleaningDuties));
  }, [cleaningDuties]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'extracurriculars', JSON.stringify(extracurriculars));
  }, [extracurriculars]);

  // Toast Helper
  const addToast = (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Authentication Methods
  const login = (identifier: string, password: string): { success: boolean; error?: string } => {
    const cleanId = identifier.trim().toLowerCase().replace(/\s+/g, '');
    const cleanPassword = password.trim();

    if (!cleanId) {
      return { success: false, error: 'Silakan masukkan ID Pengguna, Username, Email, atau NIP/NISN.' };
    }
    if (!cleanPassword) {
      return { success: false, error: 'Silakan isi kolom kata sandi akun Anda.' };
    }

    // Match by username, email, or nipOrNisn
    const matchedUser = availableUsers.find(u => {
      const uName = (u.username || '').toLowerCase();
      const uEmail = u.email.toLowerCase();
      const uNip = (u.nipOrNisn || '').toLowerCase().replace(/\s+/g, '');
      return uName === cleanId || uEmail === cleanId || uNip === cleanId;
    });

    if (!matchedUser) {
      return { 
        success: false, 
        error: 'Akun tidak ditemukan. Gunakan ID/Email demo: guru4a, admin, atau siswa01' 
      };
    }

    // Check password
    const validPassword = matchedUser.password || '123456';
    if (cleanPassword !== validPassword && cleanPassword !== 'guru123' && cleanPassword !== 'admin123' && cleanPassword !== 'siswa123' && cleanPassword !== '123456') {
      return { 
        success: false, 
        error: 'Kata sandi tidak sesuai. Silakan periksa kembali atau gunakan akun demo.' 
      };
    }

    setCurrentUser(matchedUser);
    setIsAuthenticated(true);
    setCurrentTab('dashboard');
    localStorage.setItem(STORAGE_PREFIX + 'isAuthenticated', JSON.stringify(true));
    localStorage.setItem(STORAGE_PREFIX + 'currentUser', JSON.stringify(matchedUser));

    addToast('success', 'Berhasil Masuk', `Selamat datang di Dashboard, ${matchedUser.name}!`);
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem(STORAGE_PREFIX + 'isAuthenticated', JSON.stringify(false));
    addToast('info', 'Sesi Berakhir', 'Anda telah keluar dari aplikasi Administrasi Kelas.');
  };

  // Switch Role
  const switchUserRole = (role: UserRole) => {
    const target = availableUsers.find(u => u.role === role) || availableUsers[0];
    setCurrentUser(target);
    addToast('info', 'Role Diperbarui', `Beralih ke akun ${target.name} (${target.title})`);
  };

  // School Info
  const updateSchoolInfo = (info: Partial<SchoolInfo>) => {
    setSchoolInfo(prev => ({ ...prev, ...info }));
    addToast('success', 'Berhasil', 'Informasi sekolah & kelas berhasil diperbarui');
  };

  // Student CRUD
  const addStudent = (studentData: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...studentData,
      id: `sis-${Date.now().toString().slice(-4)}`
    };
    setStudents(prev => [...prev, newStudent]);
    
    // Also initialize dues for new student
    setWeeklyDues(prev => [
      ...prev,
      {
        id: `dues-${newStudent.id}`,
        siswaId: newStudent.id,
        bulan: 'Agustus 2026',
        minggu1: false,
        minggu2: false,
        minggu3: false,
        minggu4: false,
        nominalPerMinggu: 10000
      }
    ]);

    addToast('success', 'Siswa Ditambahkan', `${newStudent.nama} berhasil didaftarkan ke Kelas.`);
  };

  const updateStudent = (id: string, updated: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
    addToast('success', 'Data Diperbarui', 'Data biodata siswa berhasil disimpan.');
  };

  const deleteStudent = (id: string) => {
    const s = students.find(item => item.id === id);
    setStudents(prev => prev.filter(item => item.id !== id));
    setGrades(prev => prev.filter(g => g.siswaId !== id));
    setAttendanceRecords(prev => prev.filter(a => a.siswaId !== id));
    setWeeklyDues(prev => prev.filter(d => d.siswaId !== id));
    setCounseling(prev => prev.filter(c => c.siswaId !== id));
    addToast('warning', 'Siswa Dihapus', `Data ${s?.nama || 'Siswa'} telah dihapus dari kelas.`);
  };

  const getStudentById = (id: string) => students.find(s => s.id === id);

  // Teacher CRUD
  const addTeacher = (teacherData: Omit<Teacher, 'id'>) => {
    const newTeacher: Teacher = {
      ...teacherData,
      id: `guru-${Date.now().toString().slice(-4)}`
    };
    setTeachers(prev => [newTeacher, ...prev]);
    addToast('success', 'Guru Ditambahkan', `${newTeacher.nama} berhasil ditambahkan ke daftar pendidik & tendik.`);
  };

  const updateTeacher = (id: string, updated: Partial<Teacher>) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
    
    // If the updated teacher is the headmaster or homeroom teacher, keep schoolInfo in sync if needed
    const currentT = teachers.find(t => t.id === id);
    if (currentT) {
      if (updated.jabatan?.toLowerCase().includes('kepala sekolah') || currentT.jabatan.toLowerCase().includes('kepala sekolah')) {
        if (updated.nama || updated.nip) {
          setSchoolInfo(prev => ({
            ...prev,
            ...(updated.nama ? { headmasterName: updated.nama } : {}),
            ...(updated.nip ? { headmasterNip: updated.nip } : {})
          }));
        }
      }
      if (updated.jabatan?.toLowerCase().includes('wali kelas') || currentT.jabatan.toLowerCase().includes('wali kelas')) {
        if (updated.nama || updated.nip) {
          setSchoolInfo(prev => ({
            ...prev,
            ...(updated.nama ? { homeroomTeacherName: updated.nama } : {}),
            ...(updated.nip ? { homeroomTeacherNip: updated.nip } : {})
          }));
        }
      }
    }

    addToast('success', 'Data Guru Diperbarui', 'Perubahan data profil & tugas guru berhasil disimpan.');
  };

  const deleteTeacher = (id: string) => {
    const target = teachers.find(t => t.id === id);
    setTeachers(prev => prev.filter(t => t.id !== id));
    addToast('warning', 'Guru Dihapus', `Data ${target?.nama || 'Guru'} telah dihapus dari daftar.`);
  };

  const getTeacherById = (id: string) => teachers.find(t => t.id === id);

  // Subject CRUD
  const addSubject = (sub: Omit<Subject, 'id'>) => {
    const newSub: Subject = {
      ...sub,
      id: `mapel-${Date.now().toString().slice(-4)}`
    };
    setSubjects(prev => [...prev, newSub]);
    addToast('success', 'Mata Pelajaran Ditambahkan', `${newSub.nama} berhasil ditambahkan.`);
  };

  const updateSubject = (id: string, updated: Partial<Subject>) => {
    setSubjects(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
    addToast('success', 'Mata Pelajaran Diperbarui', 'Data mata pelajaran berhasil disimpan.');
  };

  const deleteSubject = (id: string) => {
    setSubjects(prev => prev.filter(s => s.id !== id));
    setGrades(prev => prev.filter(g => g.mapelId !== id));
    addToast('info', 'Mata Pelajaran Dihapus', 'Mata pelajaran telah dihapus.');
  };

  // Attendance
  const markAttendance = (siswaId: string, status: AttendanceStatus, tanggal?: string, keterangan?: string) => {
    const today = tanggal || new Date().toISOString().split('T')[0];
    setAttendanceRecords(prev => {
      const existingIdx = prev.findIndex(r => r.siswaId === siswaId && r.tanggal === today);
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = {
          ...copy[existingIdx],
          status,
          keterangan: keterangan !== undefined ? keterangan : copy[existingIdx].keterangan
        };
        return copy;
      } else {
        return [
          ...prev,
          {
            id: `att-${today}-${siswaId}`,
            tanggal: today,
            siswaId,
            status,
            keterangan: keterangan || '',
            waktuInput: `${today} ${new Date().toLocaleTimeString()}`
          }
        ];
      }
    });
  };

  const bulkMarkAttendance = (tanggal: string, status: AttendanceStatus) => {
    students.forEach(student => {
      markAttendance(student.id, status, tanggal);
    });
    addToast('success', 'Presensi Massal Selesai', `Seluruh siswa (${students.length}) ditandai ${status} pada tanggal ${tanggal}.`);
  };

  const deleteAttendanceRecord = (id: string) => {
    setAttendanceRecords(prev => prev.filter(r => r.id !== id));
  };

  const getAttendanceByDate = (tanggal: string) => {
    return attendanceRecords.filter(r => r.tanggal === tanggal);
  };

  const getStudentAttendanceStats = (siswaId: string, monthPrefix?: string) => {
    const filtered = attendanceRecords.filter(r => {
      const matchStudent = r.siswaId === siswaId;
      if (!matchStudent) return false;
      if (monthPrefix) return r.tanggal.startsWith(monthPrefix);
      return true;
    });

    let hadir = 0;
    let sakit = 0;
    let izin = 0;
    let alpa = 0;

    filtered.forEach(r => {
      if (r.status === 'Hadir') hadir++;
      else if (r.status === 'Sakit') sakit++;
      else if (r.status === 'Izin') izin++;
      else if (r.status === 'Alpa') alpa++;
    });

    const total = hadir + sakit + izin + alpa;
    const percentage = total > 0 ? Math.round((hadir / total) * 100) : 100;

    return { hadir, sakit, izin, alpa, total, percentage };
  };

  // Grade Management
  const saveGrade = (siswaId: string, mapelId: string, jenis: AssessmentType, nilai: number, capaianKompetensi?: string) => {
    setGrades(prev => {
      const idx = prev.findIndex(g => g.siswaId === siswaId && g.mapelId === mapelId && g.jenis === jenis);
      const defaultCapaian = nilai >= 85
        ? 'Menunjukkan penguasaan sangat baik dalam mencapai seluruh tujuan pembelajaran.'
        : nilai >= 75
        ? 'Menunjukkan penguasaan yang baik dalam mencapai tujuan pembelajaran.'
        : 'Perlu bimbingan dan pendampingan intensif untuk penguasaan konsep.';

      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = {
          ...copy[idx],
          nilai,
          capaianKompetensi: capaianKompetensi || copy[idx].capaianKompetensi || defaultCapaian
        };
        return copy;
      } else {
        return [
          ...prev,
          {
            id: `grd-${siswaId}-${mapelId}-${jenis}`,
            siswaId,
            mapelId,
            jenis,
            nilai,
            capaianKompetensi: capaianKompetensi || defaultCapaian
          }
        ];
      }
    });
  };

  const bulkSaveGrades = (newGrades: Array<{ siswaId: string; mapelId: string; jenis: AssessmentType; nilai: number; capaianKompetensi?: string }>) => {
    newGrades.forEach(g => {
      saveGrade(g.siswaId, g.mapelId, g.jenis, g.nilai, g.capaianKompetensi);
    });
    addToast('success', 'Nilai Disimpan', `${newGrades.length} data nilai berhasil diperbarui.`);
  };

  const getStudentGradeSummary = (siswaId: string, mapelId: string) => {
    const studentGrades = grades.filter(g => g.siswaId === siswaId && g.mapelId === mapelId);
    const formatifs = studentGrades.filter(g => g.jenis.startsWith('Formatif_'));
    const sts = studentGrades.find(g => g.jenis === 'Sumatif_STS')?.nilai || 0;
    const sas = studentGrades.find(g => g.jenis === 'Sumatif_SAS')?.nilai || 0;

    const formatifSum = formatifs.reduce((sum, g) => sum + g.nilai, 0);
    const formatifAvg = formatifs.length > 0 ? Math.round(formatifSum / formatifs.length) : 0;

    // Standard formula: 40% Formatif Avg + 30% Sumatif STS + 30% Sumatif SAS
    let nilaiAkhir = 0;
    if (formatifs.length > 0 || sts > 0 || sas > 0) {
      nilaiAkhir = Math.round((formatifAvg * 0.4) + (sts * 0.3) + (sas * 0.3));
    }

    let predikat: 'A' | 'B' | 'C' | 'D' = 'D';
    if (nilaiAkhir >= 90) predikat = 'A';
    else if (nilaiAkhir >= 80) predikat = 'B';
    else if (nilaiAkhir >= 70) predikat = 'C';

    const subject = subjects.find(s => s.id === mapelId);
    const kktp = subject?.kktp || 75;
    const ketercapaian: 'Tuntas' | 'Belum Tuntas' = nilaiAkhir >= kktp ? 'Tuntas' : 'Belum Tuntas';

    let deskripsiCapaian = '';
    if (nilaiAkhir >= 90) {
      deskripsiCapaian = `Menunjukkan pemahaman sangat optimal dan penguasaan tinggi pada seluruh materi ${subject?.nama || 'pelajaran'}. Mampu mengimplementasikan konsep dengan mandiri dan kreatif.`;
    } else if (nilaiAkhir >= 80) {
      deskripsiCapaian = `Menunjukkan pemahaman yang baik dan tuntas dalam mencapai tujuan pembelajaran ${subject?.nama || 'pelajaran'}. Aktif dalam pengerjaan tugas dan evaluasi.`;
    } else if (nilaiAkhir >= 70) {
      deskripsiCapaian = `Menunjukkan pemahaman cukup dan telah memenuhi kriteria ketercapaian tujuan pembelajaran ${subject?.nama || 'pelajaran'}. Perlu meningkatkan ketelitian latihan soal.`;
    } else {
      deskripsiCapaian = `Perlu bimbingan dan remedial tambahan dalam menguasai konsep dasar ${subject?.nama || 'pelajaran'}. Perlu motivasi belajar berkala.`;
    }

    return {
      formatifAvg,
      sumatifSts: sts,
      sumatifSas: sas,
      nilaiAkhir,
      predikat,
      ketercapaian,
      deskripsiCapaian
    };
  };

  const getAllGradesForStudent = (siswaId: string) => {
    return subjects.map(subject => {
      const summary = getStudentGradeSummary(siswaId, subject.id);
      return {
        subject,
        ...summary
      };
    });
  };

  // Journal CRUD
  const addJournal = (jData: Omit<TeachingJournal, 'id'>) => {
    const newJournal: TeachingJournal = {
      ...jData,
      id: `jrn-${Date.now().toString().slice(-4)}`
    };
    setJournals(prev => [newJournal, ...prev]);
    addToast('success', 'Jurnal Tersimpan', 'Agenda mengajar harian guru berhasil dicatat.');
  };

  const updateJournal = (id: string, updated: Partial<TeachingJournal>) => {
    setJournals(prev => prev.map(j => j.id === id ? { ...j, ...updated } : j));
    addToast('success', 'Jurnal Diperbarui', 'Perubahan jurnal mengajar berhasil disimpan.');
  };

  const deleteJournal = (id: string) => {
    setJournals(prev => prev.filter(j => j.id !== id));
    addToast('info', 'Jurnal Dihapus', 'Catatan agenda telah dihapus.');
  };

  // Schedule Items
  const addScheduleItem = (itemData: Omit<ScheduleItem, 'id'>) => {
    const newItem: ScheduleItem = {
      ...itemData,
      id: `sch-${Date.now().toString().slice(-6)}`
    };
    setSchedule(prev => {
      const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      return [...prev, newItem].sort((a, b) => {
        const dayDiff = days.indexOf(a.hari) - days.indexOf(b.hari);
        if (dayDiff !== 0) return dayDiff;
        return a.jamKe - b.jamKe;
      });
    });
    addToast('success', 'Jadwal Ditambahkan', `Mata pelajaran baru berhasil ditambahkan ke hari ${itemData.hari} Jam ke-${itemData.jamKe}.`);
  };

  const updateScheduleItem = (id: string, updated: Partial<ScheduleItem>) => {
    setSchedule(prev => {
      const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      return prev.map(item => item.id === id ? { ...item, ...updated } : item).sort((a, b) => {
        const dayDiff = days.indexOf(a.hari) - days.indexOf(b.hari);
        if (dayDiff !== 0) return dayDiff;
        return a.jamKe - b.jamKe;
      });
    });
    addToast('success', 'Jadwal Diperbarui', 'Jadwal pelajaran berhasil disesuaikan.');
  };

  const deleteScheduleItem = (id: string) => {
    setSchedule(prev => prev.filter(item => item.id !== id));
    addToast('info', 'Jadwal Dihapus', 'Jam pelajaran berhasil dihapus dari jadwal.');
  };

  const resetScheduleToDefault = () => {
    setSchedule(INITIAL_SCHEDULE);
    addToast('info', 'Jadwal Direset', 'Jadwal pelajaran telah dikembalikan ke struktur standar Kurikulum Merdeka.');
  };

  const duplicateDaySchedule = (
    fromDay: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu',
    toDay: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu'
  ) => {
    const sourceItems = schedule.filter(s => s.hari === fromDay);
    if (sourceItems.length === 0) {
      addToast('error', 'Gagal Menyalin', `Tidak ada jam pelajaran di hari ${fromDay} untuk disalin.`);
      return;
    }
    const newItems: ScheduleItem[] = sourceItems.map((item, idx) => ({
      ...item,
      id: `sch-${toDay.toLowerCase()}-${Date.now().toString().slice(-4)}-${idx}`,
      hari: toDay
    }));
    setSchedule(prev => {
      const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      return [...prev.filter(s => s.hari !== toDay), ...newItems].sort((a, b) => {
        const dayDiff = days.indexOf(a.hari) - days.indexOf(b.hari);
        if (dayDiff !== 0) return dayDiff;
        return a.jamKe - b.jamKe;
      });
    });
    addToast('success', 'Jadwal Disalin', `Susunan jadwal hari ${fromDay} (${sourceItems.length} JP) berhasil disalin ke hari ${toDay}.`);
  };

  // Cash Treasury
  const getCurrentCashBalance = () => {
    let balance = 0;
    transactions.forEach(t => {
      if (t.jenis === 'Pemasukan') balance += t.jumlah;
      else balance -= t.jumlah;
    });
    return balance;
  };

  const addCashTransaction = (trxData: Omit<CashTransaction, 'id' | 'saldoSetelah'>) => {
    const currentBal = getCurrentCashBalance();
    const newBal = trxData.jenis === 'Pemasukan' ? currentBal + trxData.jumlah : currentBal - trxData.jumlah;
    const newTrx: CashTransaction = {
      ...trxData,
      id: `trx-${Date.now().toString().slice(-4)}`,
      saldoSetelah: newBal
    };
    setTransactions(prev => [newTrx, ...prev]);
    addToast('success', 'Transaksi Kas Dicatat', `${trxData.jenis} sebesar Rp ${trxData.jumlah.toLocaleString('id-ID')} berhasil dicatat.`);
  };

  const deleteCashTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    addToast('info', 'Transaksi Dihapus', 'Data transaksi kas telah dihapus.');
  };

  const toggleStudentDues = (siswaId: string, week: 1 | 2 | 3 | 4) => {
    setWeeklyDues(prev => prev.map(due => {
      if (due.siswaId === siswaId) {
        const weekKey = `minggu${week}` as 'minggu1' | 'minggu2' | 'minggu3' | 'minggu4';
        return {
          ...due,
          [weekKey]: !due[weekKey]
        };
      }
      return due;
    }));
  };

  const recordStudentDuesDeposit = (depositData: {
    siswaId: string;
    namaSiswa: string;
    jumlah: number;
    tanggal: string;
    mingguKe: number[];
    metodePembayaran?: string;
    keterangan?: string;
    catatKeKas?: boolean;
  }) => {
    // 1. Update weeklyDues for the student
    setWeeklyDues(prev => prev.map(due => {
      if (due.siswaId === depositData.siswaId) {
        const updatedDue = { ...due };
        depositData.mingguKe.forEach(w => {
          if (w === 1) updatedDue.minggu1 = true;
          if (w === 2) updatedDue.minggu2 = true;
          if (w === 3) updatedDue.minggu3 = true;
          if (w === 4) updatedDue.minggu4 = true;
        });
        return updatedDue;
      }
      return due;
    }));

    // 2. Add cash transaction if catatKeKas is true (default true)
    if (depositData.catatKeKas !== false && depositData.jumlah > 0) {
      const currentBal = getCurrentCashBalance();
      const weeksLabel = depositData.mingguKe.length > 0 
        ? `Minggu ${depositData.mingguKe.join(', ')}` 
        : 'Iuran Rutin';
      const newTrx: CashTransaction = {
        id: `trx-${Date.now().toString().slice(-4)}`,
        tanggal: depositData.tanggal || new Date().toISOString().split('T')[0],
        jenis: 'Pemasukan',
        kategori: 'Iuran Kas Siswa',
        jumlah: depositData.jumlah,
        namaSiswa: depositData.namaSiswa,
        siswaId: depositData.siswaId,
        mingguKe: depositData.mingguKe,
        metodePembayaran: depositData.metodePembayaran || 'Tunai',
        keterangan: depositData.keterangan || `Setoran iuran kas oleh ${depositData.namaSiswa} (${weeksLabel})`,
        penanggungJawab: 'Bendahara Kelas',
        saldoSetelah: currentBal + depositData.jumlah
      };
      setTransactions(prev => [newTrx, ...prev]);
    }

    addToast('success', 'Setoran Iuran Berhasil', `Setoran iuran Rp ${depositData.jumlah.toLocaleString('id-ID')} atas nama ${depositData.namaSiswa} berhasil dicatat.`);
  };

  // Inventory CRUD
  const addInventoryItem = (itemData: Omit<InventoryItem, 'id'>) => {
    const newItem: InventoryItem = {
      ...itemData,
      id: `inv-${Date.now().toString().slice(-4)}`
    };
    setInventory(prev => [...prev, newItem]);
    addToast('success', 'Barang Ditambahkan', `${newItem.namaBarang} dicatat ke Buku Inventaris.`);
  };

  const updateInventoryItem = (id: string, updated: Partial<InventoryItem>) => {
    setInventory(prev => prev.map(item => item.id === id ? { ...item, ...updated } : item));
    addToast('success', 'Inventaris Diperbarui', 'Data barang berhasil diupdate.');
  };

  const deleteInventoryItem = (id: string) => {
    setInventory(prev => prev.filter(item => item.id !== id));
    addToast('info', 'Barang Dihapus', 'Barang inventaris telah dihapus.');
  };

  // Counseling CRUD
  const addCounselingRecord = (recData: Omit<CounselingRecord, 'id'>) => {
    const newRec: CounselingRecord = {
      ...recData,
      id: `csl-${Date.now().toString().slice(-4)}`
    };
    setCounseling(prev => [newRec, ...prev]);
    addToast('success', 'Catatan Ditambahkan', `Catatan ${recData.jenis} berhasil disimpan.`);
  };

  const updateCounselingRecord = (id: string, updated: Partial<CounselingRecord>) => {
    setCounseling(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
    addToast('success', 'Catatan Diperbarui', 'Data konseling berhasil disimpan.');
  };

  const deleteCounselingRecord = (id: string) => {
    setCounseling(prev => prev.filter(c => c.id !== id));
    addToast('info', 'Catatan Dihapus', 'Catatan konseling telah dihapus.');
  };

  // Cleaning Duties
  const addDuty = (duty: CleaningDuty) => {
    setCleaningDuties(prev => {
      const exists = prev.some(d => d.hari.toLowerCase() === duty.hari.toLowerCase());
      if (exists) {
        return prev.map(d => d.hari.toLowerCase() === duty.hari.toLowerCase() ? duty : d);
      }
      return [...prev, duty];
    });
    addToast('success', 'Regu Piket Ditambahkan', `Jadwal regu piket hari ${duty.hari} berhasil ditambahkan.`);
  };

  const updateDuty = (
    hari: string, 
    data: { 
      siswaIds: string[]; 
      ketuaPiket: string; 
      tugasSpesifik?: string; 
      areaTugas?: string[]; 
      waktuPiket?: 'Pagi (Sebelum Bel)' | 'Siang (Pulang Sekolah)' | 'Pagi & Siang' | string;
    }
  ) => {
    setCleaningDuties(prev => {
      const exists = prev.some(d => d.hari === hari);
      if (exists) {
        return prev.map(d => d.hari === hari ? { ...d, ...data } : d);
      } else {
        return [...prev, { hari: hari as any, ...data }];
      }
    });
    addToast('success', 'Piket Diperbarui', `Jadwal regu piket hari ${hari} berhasil diperbarui.`);
  };

  const deleteDuty = (hari: string) => {
    setCleaningDuties(prev => prev.filter(d => d.hari !== hari));
    addToast('info', 'Jadwal Dihapus', `Jadwal piket hari ${hari} telah dihapus.`);
  };

  const addStudentToDuty = (hari: string, siswaId: string) => {
    setCleaningDuties(prev => {
      return prev.map(d => {
        if (d.hari === hari) {
          if (d.siswaIds.includes(siswaId)) return d;
          const newSiswaIds = [...d.siswaIds, siswaId];
          const student = students.find(s => s.id === siswaId);
          const ketua = d.ketuaPiket || (student ? student.nama : '');
          return { ...d, siswaIds: newSiswaIds, ketuaPiket: ketua };
        }
        return d;
      });
    });
    const sName = students.find(s => s.id === siswaId)?.nama || 'Siswa';
    addToast('success', 'Anggota Ditambahkan', `${sName} berhasil dimasukkan ke regu piket ${hari}.`);
  };

  const removeStudentFromDuty = (hari: string, siswaId: string) => {
    setCleaningDuties(prev => {
      return prev.map(d => {
        if (d.hari === hari) {
          const newSiswaIds = d.siswaIds.filter(id => id !== siswaId);
          const studentRemoved = students.find(s => s.id === siswaId);
          let newKetua = d.ketuaPiket;
          if (studentRemoved && d.ketuaPiket.includes(studentRemoved.nama)) {
            const firstRemaining = students.find(s => newSiswaIds[0] === s.id);
            newKetua = firstRemaining ? firstRemaining.nama : '';
          }
          return { ...d, siswaIds: newSiswaIds, ketuaPiket: newKetua };
        }
        return d;
      });
    });
    addToast('info', 'Anggota Dihapus', `Siswa telah dikeluarkan dari regu piket ${hari}.`);
  };

  const autoDistributeDuties = () => {
    const days: Array<'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu'> = [
      'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
    ];
    const studentList = [...students];
    const countPerDay = Math.ceil(studentList.length / days.length);

    const newDuties: CleaningDuty[] = days.map((day, idx) => {
      const slice = studentList.slice(idx * countPerDay, (idx + 1) * countPerDay);
      const studentIds = slice.map(s => s.id);
      const ketua = slice[0] ? slice[0].nama : '';
      const existing = cleaningDuties.find(d => d.hari === day);
      return {
        hari: day,
        siswaIds: studentIds,
        ketuaPiket: ketua,
        tugasSpesifik: existing?.tugasSpesifik || `Pembersihan ruang kelas 4A, merapikan meja kursi, hapus whiteboard, dan buang sampah.`,
        areaTugas: existing?.areaTugas || ['Papan Tulis', 'Sapu & Pel', 'Tempat Sampah'],
        waktuPiket: existing?.waktuPiket || 'Pagi & Siang'
      };
    });

    setCleaningDuties(newDuties);
    addToast('success', 'Pembagian Otomatis Selesai', `Seluruh ${studentList.length} siswa telah dibagi rata ke jadwal piket Senin s/d Sabtu.`);
  };

  const resetDutiesToDefault = () => {
    setCleaningDuties(INITIAL_DUTIES);
    addToast('info', 'Reset Piket', 'Jadwal piket dikembalikan ke susunan awal.');
  };

  // Events
  const addEvent = (eventData: Omit<SchoolEvent, 'id'>) => {
    const newEv: SchoolEvent = {
      ...eventData,
      id: `ev-${Date.now().toString().slice(-4)}`
    };
    setEvents(prev => [...prev, newEv]);
    addToast('success', 'Agenda Ditambahkan', `${newEv.judul} telah ditambahkan.`);
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  // Extracurriculars
  const addExtracurricular = (item: any) => {
    setExtracurriculars(prev => [...prev, { ...item, id: `ex-${Date.now()}` }]);
  };

  const deleteExtracurricular = (id: string) => {
    setExtracurriculars(prev => prev.filter(e => e.id !== id));
  };

  // Reset & Backup
  const resetAllDataToDefault = () => {
    localStorage.clear();
    setSchoolInfo(INITIAL_SCHOOL_INFO);
    setStudents(INITIAL_STUDENTS);
    setTeachers(INITIAL_TEACHERS);
    setSubjects(INITIAL_SUBJECTS);
    setGrades(generateInitialGrades());
    setAttendanceRecords(generateInitialAttendance());
    setJournals(INITIAL_JOURNALS);
    setSchedule(INITIAL_SCHEDULE);
    setTransactions(INITIAL_CASH_TRANSACTIONS);
    setWeeklyDues(generateInitialDues());
    setInventory(INITIAL_INVENTORY);
    setCounseling(INITIAL_COUNSELING);
    setCleaningDuties(INITIAL_DUTIES);
    setEvents(INITIAL_EVENTS);
    setExtracurriculars(INITIAL_EXTRACURRICULARS);
    setCurrentUser(INITIAL_USERS[0]);
    addToast('info', 'Reset Berhasil', 'Seluruh data administrasi telah dikembalikan ke kondisi awal.');
  };

  const exportDatabaseToJson = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      schoolInfo,
      students,
      teachers,
      subjects,
      grades,
      attendanceRecords,
      journals,
      schedule,
      transactions,
      weeklyDues,
      inventory,
      counseling,
      cleaningDuties,
      events,
      extracurriculars
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Backup_Administrasi_Kelas_SD_${schoolInfo.className.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addToast('success', 'Backup Berhasil', 'File JSON database telah diunduh ke komputer Anda.');
  };

  const importDatabaseFromJson = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.students && Array.isArray(data.students)) {
        if (data.schoolInfo) setSchoolInfo(data.schoolInfo);
        if (data.students) setStudents(data.students);
        if (data.teachers) setTeachers(data.teachers);
        if (data.subjects) setSubjects(data.subjects);
        if (data.grades) setGrades(data.grades);
        if (data.attendanceRecords) setAttendanceRecords(data.attendanceRecords);
        if (data.journals) setJournals(data.journals);
        if (data.schedule) setSchedule(data.schedule);
        if (data.transactions) setTransactions(data.transactions);
        if (data.weeklyDues) setWeeklyDues(data.weeklyDues);
        if (data.inventory) setInventory(data.inventory);
        if (data.counseling) setCounseling(data.counseling);
        if (data.cleaningDuties) setCleaningDuties(data.cleaningDuties);
        if (data.events) setEvents(data.events);
        addToast('success', 'Restore Sukses', 'Data administrasi berhasil diimpor dari file JSON.');
        return true;
      }
      addToast('error', 'Format Tidak Valid', 'Struktur file JSON tidak sesuai format database Administrasi SD.');
      return false;
    } catch {
      addToast('error', 'Gagal Membaca File', 'Terjadi kesalahan saat mem-parse file JSON.');
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        currentUser,
        availableUsers,
        switchUserRole,
        setCurrentUser,
        isAuthenticated,
        login,
        logout,
        isDarkMode,
        toggleDarkMode,
        schoolInfo,
        updateSchoolInfo,
        students,
        addStudent,
        updateStudent,
        deleteStudent,
        getStudentById,
        teachers,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        getTeacherById,
        subjects,
        addSubject,
        updateSubject,
        deleteSubject,
        attendanceRecords,
        markAttendance,
        bulkMarkAttendance,
        deleteAttendanceRecord,
        getAttendanceByDate,
        getStudentAttendanceStats,
        grades,
        saveGrade,
        bulkSaveGrades,
        getStudentGradeSummary,
        getAllGradesForStudent,
        journals,
        addJournal,
        updateJournal,
        deleteJournal,
        schedule,
        addScheduleItem,
        updateScheduleItem,
        deleteScheduleItem,
        resetScheduleToDefault,
        duplicateDaySchedule,
        transactions,
        cashTransactions: transactions,
        addCashTransaction,
        deleteCashTransaction,
        weeklyDues,
        toggleStudentDues,
        recordStudentDuesDeposit,
        getCurrentCashBalance,
        inventory,
        addInventoryItem,
        updateInventoryItem,
        deleteInventoryItem,
        counseling,
        addCounselingRecord,
        updateCounselingRecord,
        deleteCounselingRecord,
        cleaningDuties,
        addDuty,
        updateDuty,
        deleteDuty,
        addStudentToDuty,
        removeStudentFromDuty,
        autoDistributeDuties,
        resetDutiesToDefault,
        events,
        addEvent,
        deleteEvent,
        extracurriculars,
        addExtracurricular,
        deleteExtracurricular,
        toasts,
        addToast,
        removeToast,
        resetAllDataToDefault,
        exportDatabaseToJson,
        importDatabaseFromJson,
        selectedStudentForModal,
        setSelectedStudentForModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
