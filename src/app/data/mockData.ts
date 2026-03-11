// ============================================================
// MOCK DATA - SMP 1 PLERET
// ============================================================

export const schoolInfo = {
  name: "SMP Negeri 1 Pleret",
  address: "Jl. Imogiri Timur No.4, Pleret, Bantul, Yogyakarta",
  phone: "(0274) 867345",
  email: "smpn1pleret@gmail.com",
  website: "www.smpn1pleret.sch.id",
  visi: "Terwujudnya lulusan yang beriman, berkarakter, berprestasi, dan berwawasan global.",
};

export const announcements = [
  {
    id: 1,
    title: "Penerimaan Peserta Didik Baru Tahun Ajaran 2025/2026",
    date: "1 Maret 2026",
    category: "PPDB",
    content: "Pendaftaran PPDB dibuka mulai tanggal 1-15 Juni 2026. Kuota tersedia 7 rombel. Informasi lebih lanjut hubungi sekolah.",
    urgent: true,
  },
  {
    id: 2,
    title: "Jadwal Ujian Akhir Semester Genap 2025/2026",
    date: "28 Februari 2026",
    category: "Akademik",
    content: "Ujian Akhir Semester Genap akan dilaksanakan pada tanggal 10-20 Mei 2026. Persiapkan diri dengan baik.",
    urgent: false,
  },
  {
    id: 3,
    title: "Kegiatan Ekstrakurikuler Semester Genap",
    date: "25 Februari 2026",
    category: "Kegiatan",
    content: "Pendaftaran ekstrakurikuler semester genap dibuka. Pilih sesuai minat dan bakat Anda.",
    urgent: false,
  },
  {
    id: 4,
    title: "Rapat Orang Tua dan Wali Murid",
    date: "20 Februari 2026",
    category: "Undangan",
    content: "Rapat wali murid akan dilaksanakan pada Sabtu, 15 Maret 2026 pukul 08.00 WIB di Aula Sekolah.",
    urgent: false,
  },
];

export const galleryImages = [
  {
    id: 1,
    url: "https://tse4.mm.bing.net/th/id/OIP.E5W-3P5c6Mq-wmkx3Y-hDgHaDS?pid=Api&h=220&P=0",
    title: "Gedung Sekolah",
    category: "Fasilitas",
  },
  {
    id: 2,
    url: "https://tse2.mm.bing.net/th/id/OIP.EBEnww470bFB0fg3fc5LwwHaD9?pid=Api&h=220&P=0",
    title: "Kegiatan Mengajar",
    category: "Akademik",
  },
  {
    id: 3,
    url: "https://tse3.mm.bing.net/th/id/OIP.8U-8fcu82KfauhQHtV5OFQHaEK?pid=Api&h=220&P=0",
    title: "Kegiatan P5",
    category: "Ekstrakurikuler",
  },
  {
    id: 4,
    url: "https://tse3.mm.bing.net/th/id/OIP.8EFWntmrW3ksHH7HaK74JAHaDS?pid=Api&h=220&P=0",
    title: "Kegiatan Upacara",
    category: "Kegiatan",
  },
  {
    id: 5,
    url: "https://tse4.mm.bing.net/th/id/OIP.M_wnoqddYdXERjXMoAdswgAAAA?pid=Api&h=220&P=0",
    title: "Acara Sekolah",
    category: "Kegiatan",
  },
  {
    id: 6,
    url: "https://tse4.mm.bing.net/th/id/OIP.-ISDeOohLDQ1vDhJU2WWegHaD9?pid=Api&h=220&P=0",
    title: "Kegiatan Keagamaan",
    category: "Kegiatan",
  },
];

export const mockGuru = [
  { id: 1, nip: "198201012005011001", nama: "Drs. Bambang Suryadi, M.Pd", mapel: "Matematika", kelas: "VII", status: "Hadir", kehadiran: 95, jabatan: "Guru Kelas" },
  { id: 2, nip: "197905152003122002", nama: "Sri Wahyuni, S.Pd", mapel: "Bahasa Indonesia", kelas: "VIII", status: "Hadir", kehadiran: 98, jabatan: "Guru Kelas" },
  { id: 3, nip: "198007202006041003", nama: "Ahmad Faruq, S.Pd", mapel: "IPA", kelas: "IX", status: "Izin", kehadiran: 90, jabatan: "Guru Kelas" },
  { id: 4, nip: "197603142000032004", nama: "Siti Aminah, S.Pd.I", mapel: "Pendidikan Agama Islam", kelas: "VII-IX", status: "Hadir", kehadiran: 97, jabatan: "Guru Mapel" },
  { id: 5, nip: "198509212010011005", nama: "Rizki Pratama, S.Pd", mapel: "Pendidikan Jasmani", kelas: "VII-IX", status: "Hadir", kehadiran: 93, jabatan: "Guru Mapel" },
  { id: 6, nip: "198312052008012006", nama: "Dewi Rahayu, S.Pd", mapel: "Bahasa Inggris", kelas: "VIII", status: "Sakit", kehadiran: 88, jabatan: "Guru Kelas" },
];

export const mockSiswa = [
  // Kelas VII A
  { id: 1, nis: "2024001", nama: "Aulia Rahma Putri", kelas: "VII A", jenisKelamin: "P", ttl: "Bantul, 12 Januari 2012", alamat: "Pleret, Bantul", wali: "Budi Santoso", password: "siswa123", status: "Aktif" },
  { id: 2, nis: "2024002", nama: "Bima Saputra", kelas: "VII A", jenisKelamin: "L", ttl: "Yogyakarta, 5 Maret 2012", alamat: "Imogiri, Bantul", wali: "Hendra Wijaya", password: "siswa456", status: "Aktif" },
  { id: 3, nis: "2024003", nama: "Citra Dewi Lestari", kelas: "VII B", jenisKelamin: "P", ttl: "Bantul, 20 Juni 2012", alamat: "Pleret, Bantul", wali: "Sukarno", password: "siswa789", status: "Aktif" },
  
  // Kelas VII B
  { id: 4, nis: "2024004", nama: "Doni Hermawan", kelas: "VII B", jenisKelamin: "L", ttl: "Yogyakarta, 14 April 2012", alamat: "Kasihan, Bantul", wali: "Setiyono", password: "siswa012", status: "Aktif" },
  { id: 5, nis: "2024005", nama: "Eka Sari Wijaya", kelas: "VII B", jenisKelamin: "P", ttl: "Bantul, 8 Mei 2012", alamat: "Piyungan, Bantul", wali: "Tri Winarno", password: "siswa345", status: "Aktif" },
  
  // Kelas VII C
  { id: 6, nis: "2024006", nama: "Faridah Nur Azizah", kelas: "VII C", jenisKelamin: "P", ttl: "Yogyakarta, 25 Juli 2012", alamat: "Sewon, Bantul", wali: "Wahyudi", password: "siswa678", status: "Aktif" },
  { id: 7, nis: "2024007", nama: "Guntur Pratama", kelas: "VII C", jenisKelamin: "L", ttl: "Bantul, 11 September 2012", alamat: "Imogiri, Bantul", wali: "Hariyadi", password: "siswa901", status: "Aktif" },
  
  // Kelas VIII A
  { id: 8, nis: "2024008", nama: "Hana Kartika", kelas: "VIII A", jenisKelamin: "P", ttl: "Yogyakarta, 3 Februari 2011", alamat: "Pleret, Bantul", wali: "Bambang Sutrisno", password: "siswa234", status: "Aktif" },
  { id: 9, nis: "2024009", nama: "Ibnu Mahmud", kelas: "VIII A", jenisKelamin: "L", ttl: "Bantul, 17 Oktober 2011", alamat: "Kasihan, Bantul", wali: "Kusuma Wijaya", password: "siswa567", status: "Aktif" },
  
  // Kelas VIII B
  { id: 10, nis: "2024010", nama: "Jaka Mulyono", kelas: "VIII B", jenisKelamin: "L", ttl: "Yogyakarta, 22 November 2011", alamat: "Piyungan, Bantul", wali: "Slamet Riyadi", password: "siswa890", status: "Aktif" },
  { id: 11, nis: "2024011", nama: "Kartika Suwardi", kelas: "VIII B", jenisKelamin: "P", ttl: "Bantul, 9 Januari 2011", alamat: "Sewon, Bantul", wali: "Wulandari", password: "siswa123", status: "Aktif" },
  
  // Kelas VIII C
  { id: 12, nis: "2024012", nama: "Lina Marlina", kelas: "VIII C", jenisKelamin: "P", ttl: "Yogyakarta, 30 Agustus 2011", alamat: "Imogiri, Bantul", wali: "Sarno Setiawan", password: "siswa456", status: "Aktif" },
  { id: 13, nis: "2024013", nama: "Malik Surabaya", kelas: "VIII C", jenisKelamin: "L", ttl: "Bantul, 6 Desember 2011", alamat: "Pleret, Bantul", wali: "Prasetyo Dwi", password: "siswa789", status: "Aktif" },
  
  // Kelas IX A
  { id: 14, nis: "2024014", nama: "Nabila Putri", kelas: "IX A", jenisKelamin: "P", ttl: "Yogyakarta, 19 Mei 2010", alamat: "Kasihan, Bantul", wali: "Ahmad Sodikin", password: "siswa012", status: "Aktif" },
  { id: 15, nis: "2024015", nama: "Oman Kusuma", kelas: "IX A", jenisKelamin: "L", ttl: "Bantul, 27 Juni 2010", alamat: "Piyungan, Bantul", wali: "Bambang Sutrisna", password: "siswa345", status: "Aktif" },
  
  // Kelas IX B
  { id: 16, nis: "2024016", nama: "Purnama Sari", kelas: "IX B", jenisKelamin: "P", ttl: "Yogyakarta, 12 April 2010", alamat: "Sewon, Bantul", wali: "Edi Hermawan", password: "siswa678", status: "Aktif" },
  { id: 17, nis: "2024017", nama: "Qomar Hidayat", kelas: "IX B", jenisKelamin: "L", ttl: "Bantul, 8 Maret 2010", alamat: "Imogiri, Bantul", wali: "Murtono Basuki", password: "siswa901", status: "Aktif" },
  
  // Kelas IX C
  { id: 18, nis: "2024018", nama: "Rina Wulandari", kelas: "IX C", jenisKelamin: "P", ttl: "Yogyakarta, 31 Januari 2010", alamat: "Pleret, Bantul", wali: "Sukaryo Wiyono", password: "siswa234", status: "Aktif" },
  { id: 19, nis: "2024019", nama: "Slamet Riyanto", kelas: "IX C", jenisKelamin: "L", ttl: "Bantul, 14 Juli 2010", alamat: "Kasihan, Bantul", wali: "Sutrisno Mudjiyo", password: "siswa567", status: "Aktif" },
];

export const mockAbsensi = [
  { id: 1, nis: "2024001", nama: "Aulia Rahma Putri", kelas: "VII A", tanggal: "2026-03-09", status: "Hadir", keterangan: "-" },
  { id: 2, nis: "2024002", nama: "Bima Saputra", kelas: "VII A", tanggal: "2026-03-09", status: "Hadir", keterangan: "-" },
  { id: 3, nis: "2024003", nama: "Citra Dewi Lestari", kelas: "VII B", tanggal: "2026-03-09", status: "Izin", keterangan: "Sakit" },
  { id: 4, nis: "2024004", nama: "Dimas Ari Wibowo", kelas: "VIII A", tanggal: "2026-03-09", status: "Hadir", keterangan: "-" },
  { id: 5, nis: "2024005", nama: "Eka Putri Sari", kelas: "VIII B", tanggal: "2026-03-09", status: "Alpa", keterangan: "Tidak ada keterangan" },
  { id: 6, nis: "2024006", nama: "Fajar Nugroho", kelas: "IX A", tanggal: "2026-03-09", status: "Hadir", keterangan: "-" },
];

export const mockNilai = [
  { id: 1, nis: "2024001", nama: "Aulia Rahma Putri", mapel: "Matematika", uh1: 85, uh2: 88, uts: 82, uas: 90, nilai_akhir: 87 },
  { id: 2, nis: "2024002", nama: "Bima Saputra", mapel: "Matematika", uh1: 75, uh2: 80, uts: 72, uas: 78, nilai_akhir: 76 },
  { id: 3, nis: "2024003", nama: "Citra Dewi Lestari", mapel: "Bahasa Indonesia", uh1: 90, uh2: 92, uts: 88, uas: 94, nilai_akhir: 91 },
  { id: 4, nis: "2024004", nama: "Dimas Ari Wibowo", mapel: "IPA", uh1: 78, uh2: 82, uts: 80, uas: 85, nilai_akhir: 81 },
  { id: 5, nis: "2024005", nama: "Eka Putri Sari", mapel: "IPA", uh1: 88, uh2: 90, uts: 86, uas: 92, nilai_akhir: 89 },
  { id: 6, nis: "2024006", nama: "Fajar Nugroho", mapel: "Matematika", uh1: 95, uh2: 93, uts: 91, uas: 96, nilai_akhir: 94 },
];

export const mockJadwal = [
  { id: 1, hari: "Senin", jam: "07:00 - 07:40", mapel: "Upacara Bendera", guru: "-", kelas: "Semua" },
  { id: 2, hari: "Senin", jam: "07:40 - 08:20", mapel: "Matematika", guru: "Drs. Bambang Suryadi, M.Pd", kelas: "VII A" },
  { id: 3, hari: "Senin", jam: "08:20 - 09:00", mapel: "Matematika", guru: "Drs. Bambang Suryadi, M.Pd", kelas: "VII A" },
  { id: 4, hari: "Senin", jam: "09:00 - 09:40", mapel: "Bahasa Indonesia", guru: "Sri Wahyuni, S.Pd", kelas: "VII A" },
  { id: 5, hari: "Senin", jam: "10:00 - 10:40", mapel: "IPA", guru: "Ahmad Faruq, S.Pd", kelas: "VII A" },
  { id: 6, hari: "Selasa", jam: "07:00 - 07:40", mapel: "Bahasa Inggris", guru: "Dewi Rahayu, S.Pd", kelas: "VII A" },
  { id: 7, hari: "Selasa", jam: "07:40 - 08:20", mapel: "Pendidikan Agama Islam", guru: "Siti Aminah, S.Pd.I", kelas: "VII A" },
  { id: 8, hari: "Rabu", jam: "07:00 - 07:40", mapel: "IPS", guru: "Guru IPS", kelas: "VII A" },
  { id: 9, hari: "Rabu", jam: "07:40 - 08:20", mapel: "Seni Budaya", guru: "Guru Seni", kelas: "VII A" },
  { id: 10, hari: "Kamis", jam: "07:00 - 07:40", mapel: "Matematika", guru: "Drs. Bambang Suryadi, M.Pd", kelas: "VII A" },
  { id: 11, hari: "Kamis", jam: "07:40 - 08:20", mapel: "Bahasa Indonesia", guru: "Sri Wahyuni, S.Pd", kelas: "VII A" },
  { id: 12, hari: "Jumat", jam: "07:00 - 08:20", mapel: "Pendidikan Jasmani", guru: "Rizki Pratama, S.Pd", kelas: "VII A" },
];

export const mockTugas = [
  { id: 1, judul: "Tugas Matematika - Persamaan Linear", mapel: "Matematika", guru: "Drs. Bambang Suryadi", deadline: "2026-03-15", status: "Belum Dikumpulkan", deskripsi: "Kerjakan soal halaman 45-47 buku paket" },
  { id: 2, judul: "Tugas Bahasa Indonesia - Menulis Cerpen", mapel: "Bahasa Indonesia", guru: "Sri Wahyuni", deadline: "2026-03-12", status: "Sudah Dikumpulkan", deskripsi: "Tulis cerpen dengan tema lingkungan" },
  { id: 3, judul: "Laporan Praktikum IPA", mapel: "IPA", guru: "Ahmad Faruq", deadline: "2026-03-20", status: "Belum Dikumpulkan", deskripsi: "Laporan percobaan fotosintesis" },
];

export const mockMateri = [
  { id: 1, judul: "Persamaan dan Pertidaksamaan Linear Satu Variabel", mapel: "Matematika", guru: "Drs. Bambang Suryadi", tanggal: "2026-03-08", tipe: "PDF", deskripsi: "Materi tentang persamaan linear satu variabel" },
  { id: 2, judul: "Teks Narasi - Pengertian dan Contoh", mapel: "Bahasa Indonesia", guru: "Sri Wahyuni", tanggal: "2026-03-07", tipe: "Video", deskripsi: "Penjelasan teks narasi beserta contohnya" },
  { id: 3, judul: "Fotosintesis pada Tumbuhan", mapel: "IPA", guru: "Ahmad Faruq", tanggal: "2026-03-06", tipe: "PPT", deskripsi: "Proses fotosintesis dan faktor-faktor yang mempengaruhi" },
];

export const mockLatihan = [
  { id: 1, judul: "Latihan Soal Matematika Bab 3", mapel: "Matematika", guru: "Drs. Bambang Suryadi", deadline: "2026-03-11", soal: 15, status: "Belum Dikerjakan" },
  { id: 2, judul: "Quiz Bahasa Indonesia", mapel: "Bahasa Indonesia", guru: "Sri Wahyuni", deadline: "2026-03-10", soal: 10, status: "Sudah Dikerjakan", nilai: 85 },
];

export const mockDiskusi = [
  { id: 1, judul: "Diskusi: Cara Menyelesaikan Soal Cerita Matematika", penulis: "Drs. Bambang Suryadi", tanggal: "2026-03-08", kelas: "VII A", balasan: 12, tipe: "guru" },
  { id: 2, judul: "Pertanyaan tentang Materi Fotosintesis", penulis: "Aulia Rahma Putri", tanggal: "2026-03-07", kelas: "VII A", balasan: 5, tipe: "siswa" },
  { id: 3, judul: "Pembahasan Tugas Cerpen", penulis: "Sri Wahyuni", tanggal: "2026-03-06", kelas: "VII A", balasan: 8, tipe: "guru" },
];

export const mockInformasi = [
  { id: 1, judul: "Reminder: Tugas Matematika Deadline Besok!", tipe: "Reminder Tugas", tanggal: "2026-03-14", isi: "Jangan lupa kumpulkan tugas matematika halaman 45-47 besok!" },
  { id: 2, judul: "Pemberian Tugas Baru - Laporan IPA", tipe: "Tugas Baru", tanggal: "2026-03-09", isi: "Diberikan tugas laporan praktikum IPA, deadline 20 Maret 2026" },
  { id: 3, judul: "Informasi: Jadwal Ujian Berubah", tipe: "Informasi", tanggal: "2026-03-08", isi: "Ujian mata pelajaran IPA dipindahkan ke hari Kamis, 19 Maret 2026" },
];

export const mockLaporanSiswa = [
  { id: 1, nis: "2024001", nama: "Aulia Rahma Putri", aspek: "Akademik", deskripsi: "Menunjukkan perkembangan yang sangat baik dalam pelajaran Matematika. Aktif bertanya dan mengerjakan tugas tepat waktu.", tanggal: "2026-03-01", guru: "Drs. Bambang Suryadi" },
  { id: 2, nis: "2024001", nama: "Aulia Rahma Putri", aspek: "Sosial", deskripsi: "Anak sangat ramah dan mudah bergaul dengan teman-temannya. Sering membantu teman yang kesulitan.", tanggal: "2026-03-01", guru: "Sri Wahyuni" },
];

export const mockNotifikasi = [
  { id: 1, jenis: "tugas", pesan: "Tugas Matematika baru dari Drs. Bambang Suryadi", waktu: "5 menit lalu", dibaca: false },
  { id: 2, jenis: "materi", pesan: "Materi Bahasa Indonesia telah diunggah", waktu: "1 jam lalu", dibaca: false },
  { id: 3, jenis: "informasi", pesan: "Pengumuman: Jadwal ujian berubah", waktu: "2 jam lalu", dibaca: true },
  { id: 4, jenis: "nilai", pesan: "Nilai Quiz Bahasa Indonesia telah diinput", waktu: "1 hari lalu", dibaca: true },
];

export const nilaiPerMapel = [
  { mapel: "Matematika", uh1: 85, uh2: 88, uts: 82, uas: 90, nilai_akhir: 87 },
  { mapel: "Bahasa Indonesia", uh1: 90, uh2: 92, uts: 88, uas: 94, nilai_akhir: 91 },
  { mapel: "Bahasa Inggris", uh1: 78, uh2: 80, uts: 76, uas: 82, nilai_akhir: 79 },
  { mapel: "IPA", uh1: 82, uh2: 85, uts: 80, uas: 88, nilai_akhir: 84 },
  { mapel: "IPS", uh1: 88, uh2: 86, uts: 84, uas: 90, nilai_akhir: 87 },
  { mapel: "Pendidikan Agama Islam", uh1: 92, uh2: 90, uts: 94, uas: 95, nilai_akhir: 93 },
  { mapel: "Seni Budaya", uh1: 85, uh2: 88, uts: 82, uas: 86, nilai_akhir: 85 },
  { mapel: "Pendidikan Jasmani", uh1: 90, uh2: 92, uts: 88, uas: 90, nilai_akhir: 90 },
];

export const kehadiranWali = {
  siswa: "Aulia Rahma Putri",
  kelas: "VII A",
  bulan: "Maret 2026",
  hadir: 18,
  izin: 1,
  sakit: 0,
  alpa: 0,
  totalHari: 19,
  detail: [
    { tanggal: "2026-03-03", status: "Hadir" },
    { tanggal: "2026-03-04", status: "Hadir" },
    { tanggal: "2026-03-05", status: "Hadir" },
    { tanggal: "2026-03-06", status: "Izin" },
    { tanggal: "2026-03-07", status: "Hadir" },
    { tanggal: "2026-03-09", status: "Hadir" },
  ]
};

// ============================================================
// DATA MATERI PER KELAS
// ============================================================

export const materiPerKelas: Record<string, { mapel: string; icon: string; warna: string; topik: string[] }[]> = {
  "7": [
    {
      mapel: "Matematika",
      icon: "📐",
      warna: "blue",
      topik: [
        "Bilangan Bulat & Pecahan",
        "Aljabar",
        "Persamaan Linear Satu Variabel",
        "Perbandingan Senilai & Berbalik Nilai",
        "Bangun Datar",
        "Bangun Ruang",
        "Pengolahan Data",
      ],
    },
    {
      mapel: "Bahasa Indonesia",
      icon: "📖",
      warna: "green",
      topik: [
        "Teks Deskripsi",
        "Teks Narasi (Fantasi)",
        "Teks Prosedur",
        "Teks Berita",
        "Buku Fiksi & Non-Fiksi",
        "Surat Resmi & Pribadi",
      ],
    },
    {
      mapel: "IPA",
      icon: "🔬",
      warna: "teal",
      topik: [
        "Hakikat Ilmu Sains",
        "Zat dan Perubahannya",
        "Suhu dan Kalor",
        "Gerak dan Gaya",
        "Klasifikasi Makhluk Hidup",
        "Ekologi",
        "Bumi dan Tata Surya",
      ],
    },
    {
      mapel: "IPS",
      icon: "🌍",
      warna: "orange",
      topik: [
        "Keberadaan Diri dan Keluarga",
        "Pembiasaan Diri Melestarikan Lingkungan",
        "Potensi Ekonomi Lingkungan",
        "Pemberdayaan Masyarakat",
      ],
    },
    {
      mapel: "Pendidikan Pancasila",
      icon: "🦅",
      warna: "red",
      topik: [
        "Sejarah Kelahiran Pancasila",
        "Norma dan Keadilan",
        "Kesatuan Indonesia",
        "Lingkungan Sekitar",
      ],
    },
    {
      mapel: "Bahasa Inggris",
      icon: "🇬🇧",
      warna: "purple",
      topik: [
        "Introduction & Greetings",
        "Descriptive Text",
        "Narrative Text",
        "Procedure Text",
        "Simple Present & Past Tense",
      ],
    },
  ],
  "8": [
    {
      mapel: "Matematika",
      icon: "📐",
      warna: "blue",
      topik: [
        "Persamaan Garis Lurus",
        "Sistem Persamaan Linear Dua Variabel (SPLDV)",
        "Statistika",
        "Peluang",
        "Teorema Pythagoras",
      ],
    },
    {
      mapel: "Bahasa Indonesia",
      icon: "📖",
      warna: "green",
      topik: [
        "Teks Laporan Hasil Observasi (LHO)",
        "Iklan, Slogan, dan Poster",
        "Artikel Ilmiah Populer",
        "Karya Fiksi",
        "Puisi",
        "Pidato",
      ],
    },
    {
      mapel: "IPA",
      icon: "🔬",
      warna: "teal",
      topik: [
        "Sel",
        "Sistem Pencernaan",
        "Sistem Pernapasan",
        "Sistem Ekskresi",
        "Usaha dan Pesawat Sederhana",
        "Getaran dan Gelombang",
        "Cahaya dan Optik",
      ],
    },
    {
      mapel: "IPS",
      icon: "🌍",
      warna: "orange",
      topik: [
        "Kondisi Geografis dan Pemanfaatan SDA",
        "Keragaman Masyarakat Indonesia",
        "Nasionalisme",
        "Jati Diri Bangsa",
      ],
    },
    {
      mapel: "Pendidikan Pancasila",
      icon: "🦅",
      warna: "red",
      topik: [
        "Kedudukan dan Fungsi Pancasila",
        "Bentuk dan Kedaulatan Negara",
        "Tata Tertib",
        "Kebangkitan Nasional",
      ],
    },
    {
      mapel: "Bahasa Inggris",
      icon: "🇬🇧",
      warna: "purple",
      topik: [
        "Report Text",
        "Analytical Exposition",
        "Passive Voice",
        "Comparative & Superlative",
        "Conditional Sentences",
      ],
    },
  ],
  "9": [
    {
      mapel: "Matematika",
      icon: "📐",
      warna: "blue",
      topik: [
        "Perpangkatan dan Bentuk Akar",
        "Persamaan & Fungsi Kuadrat",
        "Transformasi Geometri",
        "Kesebangunan",
        "Kekongruenan",
      ],
    },
    {
      mapel: "Bahasa Indonesia",
      icon: "📖",
      warna: "green",
      topik: [
        "Teks Laporan Percobaan",
        "Pidato Persuasif",
        "Menyusun Cerpen",
        "Memberi Tanggapan Kritis secara Santun",
      ],
    },
    {
      mapel: "IPA",
      icon: "🔬",
      warna: "teal",
      topik: [
        "Sistem Reproduksi Manusia",
        "Pewarisan Sifat (Genetika)",
        "Listrik Statis & Dinamis",
        "Kemagnetan",
        "Bioteknologi",
        "Teknologi Ramah Lingkungan",
      ],
    },
    {
      mapel: "IPS",
      icon: "🌍",
      warna: "orange",
      topik: [
        "Perubahan Sosial Budaya",
        "Globalisasi",
        "Ketergantungan Antarruang (Ekonomi)",
        "Sejarah Indonesia: Kemerdekaan hingga Reformasi",
      ],
    },
    {
      mapel: "Pendidikan Pancasila",
      icon: "🦅",
      warna: "red",
      topik: [
        "Dinamika Perwujudan Pancasila",
        "Pembukaan UUD 1945",
        "Kedaulatan NKRI",
        "Bela Negara",
      ],
    },
    {
      mapel: "Bahasa Inggris",
      icon: "🇬🇧",
      warna: "purple",
      topik: [
        "Narrative Text",
        "Procedure Text",
        "Argumentative Essay",
        "Perfect Tenses",
        "Modal Verbs",
      ],
    },
  ],
};