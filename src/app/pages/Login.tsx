import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Shield, GraduationCap, BookOpen, Users, Eye, EyeOff, ArrowLeft, LogIn, ChevronRight } from "lucide-react";

const roles = [
  {
    key: "admin",
    label: "Admin",
    icon: Shield,
    desc: "Kelola data sekolah, guru, dan siswa",
    color: "from-purple-600 to-purple-800",
    border: "border-purple-300",
    bg: "bg-purple-50",
    route: "/admin",
    defaultUser: "admin",
    defaultPass: "admin123",
  },
  {
    key: "guru",
    label: "Guru",
    icon: GraduationCap,
    desc: "Absensi, nilai, tugas, dan informasi kelas",
    color: "from-blue-600 to-blue-800",
    border: "border-blue-300",
    bg: "bg-blue-50",
    route: "/guru",
    defaultUser: "guru",
    defaultPass: "guru123",
  },
  {
    key: "siswa",
    label: "Siswa",
    icon: BookOpen,
    desc: "Tugas, materi, jadwal, dan diskusi",
    color: "from-green-600 to-green-800",
    border: "border-green-300",
    bg: "bg-green-50",
    route: "/siswa",
    defaultUser: "siswa001",
    defaultPass: "siswa123",
  },
  {
    key: "wali",
    label: "Wali Murid",
    icon: Users,
    desc: "Pantau nilai, jadwal, dan kehadiran anak",
    color: "from-orange-500 to-orange-700",
    border: "border-orange-300",
    bg: "bg-orange-50",
    route: "/wali",
    defaultUser: "wali001",
    defaultPass: "wali123",
  },
];

export default function Login() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"role" | "form" | "kelas">("role");
  const [selectedKelas, setSelectedKelas] = useState<string | null>(null);

  const role = roles.find((r) => r.key === selectedRole);

  const handleLogin = () => {
    if (!username || !password) {
      setError("Username dan password harus diisi!");
      return;
    }
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      // For siswa, show class selection first
      if (selectedRole === "siswa") {
        setStep("kelas");
      } else if (role) {
        navigate(role.route);
      }
    }, 1000);
  };

  const handlePilihKelas = (kelas: string) => {
    setSelectedKelas(kelas);
    navigate("/siswa", { state: { kelas, nama: "Aulia Rahma Putri" } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d3b7d] via-[#1a5276] to-[#0a7a6e] flex flex-col items-center justify-center p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali ke Home
      </button>

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

      {/* STEP 1: Role Selection */}
      {step === "role" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-white font-bold text-center text-lg mb-1">Silakan Login</h2>
            <p className="text-white/60 text-sm text-center mb-6">Pilih peran Anda untuk melanjutkan</p>
            <div className="grid grid-cols-2 gap-3">
              {roles.map((r) => (
                <motion.button
                  key={r.key}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setSelectedRole(r.key);
                    setUsername(r.defaultUser);
                    setPassword(r.defaultPass);
                    setStep("form");
                  }}
                  className={`bg-gradient-to-br ${r.color} rounded-xl p-4 text-white text-left hover:opacity-90 transition-all shadow-lg`}
                >
                  <r.icon className="w-8 h-8 mb-2 opacity-90" />
                  <p className="font-bold text-sm">{r.label}</p>
                  <p className="text-white/70 text-xs mt-0.5">{r.desc}</p>
                  <div className="flex items-center gap-1 mt-2 text-white/80 text-xs">
                    Masuk <ChevronRight className="w-3 h-3" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 2: Login Form */}
      {step === "form" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className={`bg-gradient-to-r ${role?.color} p-5 text-white`}>
              <button
                onClick={() => { setSelectedRole(null); setError(""); setStep("role"); }}
                className="flex items-center gap-1 text-white/80 hover:text-white text-xs mb-3"
              >
                ← Ganti Peran
              </button>
              <div className="flex items-center gap-3">
                {role && <role.icon className="w-8 h-8" />}
                <div>
                  <p className="font-bold">Login sebagai</p>
                  <p className="text-xl font-black">{role?.label}</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Username / NIP / NIS</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0d3b7d] bg-gray-50"
                    placeholder="Masukkan username..."
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Password</label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0d3b7d] bg-gray-50 pr-10"
                      placeholder="Masukkan password..."
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-red-600 text-xs">{error}</div>
                )}
                <div className={`${role?.bg} ${role?.border} border rounded-lg p-3 text-xs text-gray-600`}>
                  <p className="font-semibold mb-1">Demo Login:</p>
                  <p>Username: <strong>{role?.defaultUser}</strong></p>
                  <p>Password: <strong>{role?.defaultPass}</strong></p>
                </div>
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className={`w-full bg-gradient-to-r ${role?.color} text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-70`}
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <LogIn className="w-4 h-4" />
                  )}
                  {loading ? "Memproses..." : "Masuk"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 3: Pilih Kelas (Siswa only) */}
      {step === "kelas" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-800 p-5 text-white">
              <button
                onClick={() => setStep("form")}
                className="flex items-center gap-1 text-white/80 hover:text-white text-xs mb-3"
              >
                ← Kembali
              </button>
              <div className="flex items-center gap-3">
                <BookOpen className="w-8 h-8" />
                <div>
                  <p className="font-bold text-sm">Selamat Datang, Aulia!</p>
                  <p className="text-xl font-black">Pilih Kelas Anda</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-500 text-sm text-center mb-6">Pilih kelas untuk masuk ke portal siswa</p>
              <div className="space-y-3">
                {[
                  {
                    kelas: "7",
                    label: "Kelas 7",
                    desc: "Matematika, B.Indonesia, IPA, IPS, Pancasila, B.Inggris",
                    color: "from-blue-500 to-blue-700",
                    badge: "VII",
                  },
                  {
                    kelas: "8",
                    label: "Kelas 8",
                    desc: "Matematika, B.Indonesia, IPA, IPS, Pancasila, B.Inggris",
                    color: "from-purple-500 to-purple-700",
                    badge: "VIII",
                  },
                  {
                    kelas: "9",
                    label: "Kelas 9",
                    desc: "Matematika, B.Indonesia, IPA, IPS, Pancasila, B.Inggris",
                    color: "from-orange-500 to-orange-700",
                    badge: "IX",
                  },
                ].map((item) => (
                  <motion.button
                    key={item.kelas}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handlePilihKelas(item.kelas)}
                    className={`w-full bg-gradient-to-r ${item.color} rounded-xl p-4 text-white text-left flex items-center gap-4 hover:opacity-90 transition-all shadow-md`}
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-black text-lg">{item.badge}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold">{item.label}</p>
                      <p className="text-white/70 text-xs mt-0.5 truncate">{item.desc}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/60 flex-shrink-0" />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <p className="text-white/40 text-xs mt-6">© 2026 SMP Negeri 1 Pleret</p>
    </div>
  );
}