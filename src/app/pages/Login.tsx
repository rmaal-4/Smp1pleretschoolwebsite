import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Shield, GraduationCap, BookOpen, Users, Eye, EyeOff, ArrowLeft, LogIn, ChevronRight, AlertCircle } from "lucide-react";
import { mockGuru, mockSiswa } from "../data/mockData";

const roles = [
  {
    key: "siswa",
    label: "Siswa",
    icon: BookOpen,
    desc: "Tugas, materi, jadwal, dan diskusi",
    color: "from-green-600 to-green-800",
    icon_color: "text-green-500",
  },
  {
    key: "guru",
    label: "Guru",
    icon: GraduationCap,
    desc: "Absensi, nilai, tugas, dan informasi kelas",
    color: "from-blue-600 to-blue-800",
    icon_color: "text-blue-500",
  },
  {
    key: "wali",
    label: "Wali Murid",
    icon: Users,
    desc: "Pantau nilai, jadwal, dan kehadiran anak",
    color: "from-orange-500 to-orange-700",
    icon_color: "text-orange-500",
  },
  {
    key: "admin",
    label: "Admin",
    icon: Shield,
    desc: "Kelola data sekolah, guru, dan siswa",
    color: "from-purple-600 to-purple-800",
    icon_color: "text-purple-500",
  },
];

type LoginStep = "role" | "siswa_kelas" | "siswa_subkelas" | "siswa_login" | "guru_login" | "wali_kelas" | "wali_login" | "admin_login";

export default function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState<LoginStep>("role");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  
  // Siswa
  const [siswaKelas, setSiswaKelas] = useState<string | null>(null);
  const [siswaSubKelas, setSiswaSubKelas] = useState<string | null>(null);
  const [siswa_nisn, setSiswa_nisn] = useState("");
  const [siswa_ttl, setSiswa_ttl] = useState("");
  const [siswaError, setSiswaError] = useState("");
  const [siswaLoading, setSiswaLoading] = useState(false);
  const [siswaShowPass, setSiswaShowPass] = useState(false);
  
  // Guru
  const [guru_nip, setGuru_nip] = useState("");
  const [guru_password, setGuru_password] = useState("");
  const [guruError, setGuruError] = useState("");
  const [guruLoading, setGuruLoading] = useState(false);
  const [guruShowPass, setGuruShowPass] = useState(false);
  
  // Wali
  const [waliKelas, setWaliKelas] = useState<string | null>(null);
  const [wali_nisn, setWali_nisn] = useState("");
  const [wali_nama_anak, setWali_nama_anak] = useState("");
  const [waliError, setWaliError] = useState("");
  const [waliLoading, setWaliLoading] = useState(false);
  const [waliShowPass, setWaliShowPass] = useState(false);
  
  // Admin
  const [admin_username, setAdmin_username] = useState("");
  const [admin_password, setAdmin_password] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminShowPass, setAdminShowPass] = useState(false);

  const role = roles.find((r) => r.key === selectedRole);
  
  // Get unique kelas for siswa in selected grade
  const siswaKelasOptions = useMemo(() => {
    if (!siswaKelas) return [];
    const kelasPrefix = siswaKelas === "7" ? "VII" : siswaKelas === "8" ? "VIII" : "IX";
    const uniqueKelas = [...new Set(mockSiswa.map(s => s.kelas).filter(k => k.startsWith(kelasPrefix)))];
    return uniqueKelas.sort();
  }, [siswaKelas]);

  // Get wali kelas options
  const waliKelasOptions = [...new Set(mockSiswa.map(s => s.kelas))].sort();

  // Handle Siswa Login
  const handleSiswaLogin = async () => {
    setSiswaError("");
    if (!siswa_nisn || !siswa_ttl || !siswaKelas || !siswaSubKelas) {
      setSiswaError("Semua data harus diisi!");
      return;
    }

    setSiswaLoading(true);
    setTimeout(() => {
      setSiswaLoading(false);
      // Validasi NISN dan TTL (tanggal lahir)
      const siswa = mockSiswa.find(s => 
        s.nis === siswa_nisn && 
        s.ttl.includes(siswa_ttl) && 
        s.kelas === siswaSubKelas
      );
      
      if (siswa) {
        navigate("/siswa", { state: { kelas: siswaKelas, namaKelas: siswaSubKelas, nama: siswa.nama, nis: siswa.nis } });
      } else {
        setSiswaError("NISN atau tanggal lahir tidak sesuai dengan kelas yang dipilih!");
      }
    }, 1000);
  };

  // Handle Guru Login
  const handleGuruLogin = async () => {
    setGuruError("");
    if (!guru_nip || !guru_password) {
      setGuruError("NIP dan password harus diisi!");
      return;
    }

    setGuruLoading(true);
    setTimeout(() => {
      setGuruLoading(false);
      // Validasi NIP dan password (nama guru dalam huruf kecil)
      const guru = mockGuru.find(g => g.nip === guru_nip);
      
      if (guru) {
        const namaKecil = guru.nama.toLowerCase();
        if (guru_password === namaKecil) {
          navigate("/guru", { state: { nip: guru.nip, nama: guru.nama } });
        } else {
          setGuruError("Password tidak sesuai!");
        }
      } else {
        setGuruError("NIP tidak ditemukan!");
      }
    }, 1000);
  };

  // Handle Wali Login
  const handleWaliLogin = async () => {
    setWaliError("");
    if (!wali_nisn || !wali_nama_anak || !waliKelas) {
      setWaliError("Semua data harus diisi!");
      return;
    }

    setWaliLoading(true);
    setTimeout(() => {
      setWaliLoading(false);
      // Validasi NISN dan nama anak harus sesuai dengan kelas yang dipilih
      const siswa = mockSiswa.find(s => 
        s.nis === wali_nisn && 
        s.nama.toLowerCase() === wali_nama_anak.toLowerCase() &&
        s.kelas === waliKelas
      );
      
      if (siswa) {
        navigate("/wali", { state: { nis: siswa.nis, nama: siswa.nama, kelas: siswa.kelas } });
      } else {
        setWaliError("Data tidak sesuai! Pastikan NISN, nama anak, dan kelas sudah benar.");
      }
    }, 1000);
  };

  // Handle Admin Login
  const handleAdminLogin = async () => {
    setAdminError("");
    if (!admin_username || !admin_password) {
      setAdminError("Username dan password harus diisi!");
      return;
    }

    setAdminLoading(true);
    setTimeout(() => {
      setAdminLoading(false);
      // Admin: username = "smp1pleret", password = "29011999" (29 Januari 1999)
      if (admin_username === "smp1pleret" && admin_password === "29011999") {
        navigate("/admin", { state: { username: admin_username } });
      } else {
        setAdminError("Username atau password salah!");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d3b7d] via-[#1a5276] to-[#0a7a6e] flex flex-col items-center justify-center p-4">
      {/* Back Button */}
      {step !== "role" && (
        <button
          onClick={() => setStep("role")}
          className="absolute top-4 left-4 flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>
      )}

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <img
          src="https://tse2.mm.bing.net/th/id/OIP.gRycrEfwP4aElgAb_9LTCwHaHa?pid=Api&h=220&P=0"
          alt="Logo SMP N 1 Pleret"
          className="w-16 h-16 rounded-full object-cover mx-auto mb-3 shadow-lg border-2 border-yellow-400"
        />
        <h1 className="text-white font-black text-xl">SMP NEGERI 1 PLERET</h1>
        <p className="text-white/70 text-sm">Portal Akademik Terpadu</p>
      </motion.div>

      {/* STEP 1: Role Selection (Vertical Layout) */}
      {step === "role" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-white font-bold text-center text-lg mb-1">Silakan Login</h2>
            <p className="text-white/60 text-sm text-center mb-6">Pilih peran Anda untuk melanjutkan</p>
            <div className="space-y-3">
              {roles.map((r) => (
                <motion.button
                  key={r.key}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setSelectedRole(r.key);
                    if (r.key === "siswa") setStep("siswa_kelas");
                    else if (r.key === "guru") setStep("guru_login");
                    else if (r.key === "wali") setStep("wali_kelas");
                    else if (r.key === "admin") setStep("admin_login");
                  }}
                  className={`bg-gradient-to-r ${r.color} rounded-xl p-4 text-white text-left hover:opacity-90 transition-all shadow-lg w-full flex items-center gap-4`}
                >
                  <r.icon className="w-6 h-6 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold text-sm">{r.label}</p>
                    <p className="text-white/70 text-xs">{r.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* SISWA: Step 1 - Pilih Kelas (7, 8, 9) */}
      {step === "siswa_kelas" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-800 p-5 text-white">
              <h3 className="font-bold text-lg">Pilih Tingkat Kelas</h3>
              <p className="text-white/70 text-xs">Langkah 1: Pilih tingkat (7, 8, 9)</p>
            </div>
            <div className="p-6 space-y-3">
              {["7", "8", "9"].map((kelas) => (
                <motion.button
                  key={kelas}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setSiswaKelas(kelas);
                    setSiswaSubKelas(null);
                    setSiswa_nisn("");
                    setSiswa_ttl("");
                    setSiswaError("");
                    setStep("siswa_subkelas");
                  }}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4 hover:opacity-90 transition-all"
                >
                  <p className="font-bold">Kelas {kelas}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* SISWA: Step 2 - Pilih Sub Kelas (A, B, C, dll) */}
      {step === "siswa_subkelas" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-800 p-5 text-white">
              <h3 className="font-bold text-lg">Pilih Kelas</h3>
              <p className="text-white/70 text-xs">Langkah 2: Pilih sub-kelas (A, B, C, ...)</p>
            </div>
            <div className="p-6 space-y-3">
              {siswaKelasOptions.map((kelas) => (
                <motion.button
                  key={kelas}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setSiswaSubKelas(kelas);
                    setSiswa_nisn("");
                    setSiswa_ttl("");
                    setSiswaError("");
                    setStep("siswa_login");
                  }}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4 hover:opacity-90 transition-all"
                >
                  <p className="font-bold">{kelas}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* SISWA: Step 3 - Login Form */}
      {step === "siswa_login" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-800 p-5 text-white">
              <h3 className="font-bold text-lg">Login Siswa</h3>
              <p className="text-white/70 text-xs">Kelas: {siswaSubKelas}</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm text-gray-600 block mb-2">NISN / Nomor Induk Siswa</label>
                <input
                  type="text"
                  value={siswa_nisn}
                  onChange={(e) => setSiswa_nisn(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                  placeholder="Contoh: 2024001"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-2">Tanggal Lahir (password)</label>
                <input
                  type={siswaShowPass ? "text" : "password"}
                  value={siswa_ttl}
                  onChange={(e) => setSiswa_ttl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSiswaLogin()}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 pr-10"
                  placeholder="Contoh: 12 Januari 2012"
                  style={{ position: "relative" }}
                />
                <button
                  type="button"
                  onClick={() => setSiswaShowPass(!siswaShowPass)}
                  className="absolute right-3 top-[140px] text-gray-400 hover:text-gray-600"
                >
                  {siswaShowPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {siswaError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  {siswaError}
                </div>
              )}
              <button
                onClick={handleSiswaLogin}
                disabled={siswaLoading}
                className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-70"
              >
                {siswaLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <LogIn className="w-4 h-4" />
                )}
                {siswaLoading ? "Memproses..." : "Masuk"}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* GURU: Login Form */}
      {step === "guru_login" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-5 text-white">
              <h3 className="font-bold text-lg">Login Guru</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm text-gray-600 block mb-2">NIP / Nomor Induk Pegawai</label>
                <input
                  type="text"
                  value={guru_nip}
                  onChange={(e) => setGuru_nip(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  placeholder="Contoh: 198201012005011001"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-2">Password (nama panjang huruf kecil)</label>
                <div className="relative">
                  <input
                    type={guruShowPass ? "text" : "password"}
                    value={guru_password}
                    onChange={(e) => setGuru_password(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleGuruLogin()}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 pr-10"
                    placeholder="Contoh: drs. bambang suryadi, m.pd"
                  />
                  <button
                    type="button"
                    onClick={() => setGuruShowPass(!guruShowPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {guruShowPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              {guruError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  {guruError}
                </div>
              )}
              <button
                onClick={handleGuruLogin}
                disabled={guruLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-70"
              >
                {guruLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <LogIn className="w-4 h-4" />
                )}
                {guruLoading ? "Memproses..." : "Masuk"}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* WALI: Step 1 - Pilih Kelas */}
      {step === "wali_kelas" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-orange-700 p-5 text-white">
              <h3 className="font-bold text-lg">Pilih Kelas Anak</h3>
              <p className="text-white/70 text-xs">Langkah 1: Pilih kelas anak Anda</p>
            </div>
            <div className="p-6 space-y-3">
              {waliKelasOptions.map((kelas) => (
                <motion.button
                  key={kelas}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setWaliKelas(kelas);
                    setWali_nisn("");
                    setWali_nama_anak("");
                    setWaliError("");
                    setStep("wali_login");
                  }}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-4 hover:opacity-90 transition-all"
                >
                  <p className="font-bold">{kelas}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* WALI: Step 2 - Login Form */}
      {step === "wali_login" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-orange-700 p-5 text-white">
              <h3 className="font-bold text-lg">Login Wali Murid</h3>
              <p className="text-white/70 text-xs">Kelas anak: {waliKelas}</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm text-gray-600 block mb-2">NISN Anak</label>
                <input
                  type="text"
                  value={wali_nisn}
                  onChange={(e) => setWali_nisn(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                  placeholder="Contoh: 2024001"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-2">Nama Anak</label>
                <input
                  type="text"
                  value={wali_nama_anak}
                  onChange={(e) => setWali_nama_anak(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleWaliLogin()}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                  placeholder="Contoh: Aulia Rahma Putri"
                />
              </div>
              {waliError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  {waliError}
                </div>
              )}
              <button
                onClick={handleWaliLogin}
                disabled={waliLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-70"
              >
                {waliLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <LogIn className="w-4 h-4" />
                )}
                {waliLoading ? "Memproses..." : "Masuk"}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ADMIN: Login Form */}
      {step === "admin_login" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-5 text-white">
              <h3 className="font-bold text-lg">Login Admin</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm text-gray-600 block mb-2">Username</label>
                <input
                  type="text"
                  value={admin_username}
                  onChange={(e) => setAdmin_username(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                  placeholder="smp1pleret"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-2">Password (DDMMYYYY)</label>
                <div className="relative">
                  <input
                    type={adminShowPass ? "text" : "password"}
                    value={admin_password}
                    onChange={(e) => setAdmin_password(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 pr-10"
                    placeholder="29011999"
                  />
                  <button
                    type="button"
                    onClick={() => setAdminShowPass(!adminShowPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {adminShowPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              {adminError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  {adminError}
                </div>
              )}
              <button
                onClick={handleAdminLogin}
                disabled={adminLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-70"
              >
                {adminLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <LogIn className="w-4 h-4" />
                )}
                {adminLoading ? "Memproses..." : "Masuk"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}