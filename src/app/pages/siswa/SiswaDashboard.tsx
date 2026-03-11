import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen, PenTool, ClipboardList, Calendar,
  MessageSquare, Bell, Search, Home, LogOut,
  Menu as MenuIcon, X, Send, ChevronRight,
  CheckCircle, Clock, ArrowLeft, User, Star,
  ChevronDown, ChevronUp, FileText, Info
} from "lucide-react";
import {
  mockTugas, mockJadwal, mockLatihan, mockDiskusi,
  mockInformasi, mockNotifikasi, materiPerKelas
} from "../../data/mockData";

const kelasLabel: Record<string, string> = { "7": "VII", "8": "VIII", "9": "IX" };
const kelasColor: Record<string, string> = {
  "7": "from-blue-600 to-blue-800",
  "8": "from-purple-600 to-purple-800",
  "9": "from-orange-500 to-orange-700",
};
const warnaMap: Record<string, { bg: string; text: string; border: string; light: string }> = {
  blue: { bg: "bg-blue-500", text: "text-blue-600", border: "border-blue-200", light: "bg-blue-50" },
  green: { bg: "bg-green-500", text: "text-green-600", border: "border-green-200", light: "bg-green-50" },
  teal: { bg: "bg-teal-500", text: "text-teal-600", border: "border-teal-200", light: "bg-teal-50" },
  orange: { bg: "bg-orange-500", text: "text-orange-600", border: "border-orange-200", light: "bg-orange-50" },
  red: { bg: "bg-red-500", text: "text-red-600", border: "border-red-200", light: "bg-red-50" },
  purple: { bg: "bg-purple-500", text: "text-purple-600", border: "border-purple-200", light: "bg-purple-50" },
};

type ActiveView = "home" | "materi" | "latihan" | "tugas" | "jadwal" | "diskusi" | "informasi";

export default function SiswaDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { kelas = "7", nama = "Siswa" } = (location.state as any) || {};

  const [activeView, setActiveView] = useState<ActiveView>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [notifData, setNotifData] = useState(mockNotifikasi);
  const [selectedMapel, setSelectedMapel] = useState<string | null>(null);
  const [expandedTopik, setExpandedTopik] = useState<string | null>(null);
  const [diskusiReply, setDiskusiReply] = useState("");
  const [openDiskusi, setOpenDiskusi] = useState<number | null>(null);

  const unreadCount = notifData.filter(n => !n.dibaca).length;
  const materiKelas = materiPerKelas[kelas] || materiPerKelas["7"];
  const hariOrder = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const jadwalKelas = mockJadwal.filter(j => j.kelas === `VII A`);

  const now = new Date();
  const dateStr = now.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const menuFeatures: { key: ActiveView; label: string; icon: JSX.Element; color: string; bgCircle: string }[] = [
    {
      key: "materi", label: "Materi",
      icon: <BookOpen className="w-8 h-8" />,
      color: "text-blue-600", bgCircle: "bg-blue-100 border-blue-200",
    },
    {
      key: "latihan", label: "Latihan",
      icon: <PenTool className="w-8 h-8" />,
      color: "text-green-600", bgCircle: "bg-green-100 border-green-200",
    },
    {
      key: "tugas", label: "Tugas",
      icon: <ClipboardList className="w-8 h-8" />,
      color: "text-orange-600", bgCircle: "bg-orange-100 border-orange-200",
    },
    {
      key: "jadwal", label: "Jadwal",
      icon: <Calendar className="w-8 h-8" />,
      color: "text-purple-600", bgCircle: "bg-purple-100 border-purple-200",
    },
    {
      key: "diskusi", label: "Forum Diskusi",
      icon: <MessageSquare className="w-8 h-8" />,
      color: "text-teal-600", bgCircle: "bg-teal-100 border-teal-200",
    },
    {
      key: "informasi", label: "Informasi Kelas",
      icon: <Info className="w-8 h-8" />,
      color: "text-red-600", bgCircle: "bg-red-100 border-red-200",
    },
  ];

  const filteredMateri = materiKelas.filter(m =>
    !searchQuery || m.mapel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── HEADER ── */}
      <header className={`bg-gradient-to-r ${kelasColor[kelas]} text-white sticky top-0 z-40 shadow-lg`}>
        {/* Top row: date + profil */}
        <div className="flex items-center justify-between px-4 pt-2 pb-0">
          <p className="text-white/70 text-xs">{dateStr}</p>
          <button className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 text-xs font-semibold hover:bg-white/30 transition-colors">
            <User className="w-3 h-3" />
            Profil
          </button>
        </div>

        {/* Main navbar row */}
        <div className="flex items-center gap-2 px-3 py-2">
          {/* Menu */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors flex-shrink-0"
          >
            <MenuIcon className="w-4 h-4" />
          </button>

          {/* Logo */}
          <img
            src="https://tse2.mm.bing.net/th/id/OIP.gRycrEfwP4aElgAb_9LTCwHaHa?pid=Api&h=220&P=0"
            alt="Logo"
            className="w-8 h-8 rounded-full object-cover border-2 border-yellow-300 flex-shrink-0"
          />

          {/* Search */}
          <div className="flex-1 flex items-center bg-white/15 rounded-xl px-3 py-2 gap-2">
            <Search className="w-3.5 h-3.5 text-white/60 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Cari..."
              className="bg-transparent text-white placeholder-white/50 text-xs w-full outline-none"
            />
          </div>

          {/* Notif bubble */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="relative p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full text-xs flex items-center justify-center font-black text-[#0d3b7d]">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Kelas badge strip */}
        <div className="px-4 pb-2 flex items-center gap-2">
          {activeView !== "home" && (
            <button
              onClick={() => { setActiveView("home"); setSelectedMapel(null); setSearchQuery(""); }}
              className="flex items-center gap-1 text-white/70 hover:text-white text-xs"
            >
              <ArrowLeft className="w-3 h-3" />
            </button>
          )}
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-0.5 rounded-full">
            Kelas {kelasLabel[kelas]}
          </span>
          {activeView !== "home" && (
            <span className="text-white/70 text-xs">
              / {menuFeatures.find(f => f.key === activeView)?.label}
              {selectedMapel && ` / ${selectedMapel}`}
            </span>
          )}
        </div>
      </header>

      {/* Dropdown menu */}
      <AnimatePresence>
        {showMenu && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="fixed top-[110px] left-0 z-50 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 m-3 overflow-hidden"
            >
              <div className="p-2 space-y-0.5">
                <button
                  onClick={() => { navigate("/"); setShowMenu(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Home className="w-4 h-4 text-gray-400" /> Kembali ke Beranda
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Keluar
                </button>
              </div>
            </motion.div>
            <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
          </>
        )}
      </AnimatePresence>

      {/* Notif panel */}
      <AnimatePresence>
        {showNotif && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="fixed top-[110px] right-3 z-50 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <p className="font-bold text-gray-800 text-sm">Notifikasi</p>
                <button
                  onClick={() => setNotifData(prev => prev.map(n => ({ ...n, dibaca: true })))}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Tandai semua
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifData.map(n => (
                  <div
                    key={n.id}
                    onClick={() => setNotifData(prev => prev.map(i => i.id === n.id ? { ...i, dibaca: true } : i))}
                    className={`px-4 py-3 border-b border-gray-50 last:border-0 cursor-pointer ${n.dibaca ? 'bg-white' : 'bg-blue-50'}`}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.dibaca ? 'bg-gray-300' : 'bg-blue-500'}`} />
                      <div>
                        <p className="text-xs text-gray-700">{n.pesan}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{n.waktu}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="fixed inset-0 z-40" onClick={() => setShowNotif(false)} />
          </>
        )}
      </AnimatePresence>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 p-4 max-w-2xl mx-auto w-full pb-16">

        {/* ═══ HOME VIEW ═══ */}
        {activeView === "home" && (
          <div className="space-y-5">
            {/* Welcome Banner */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-gradient-to-r ${kelasColor[kelas]} rounded-2xl p-5 text-white shadow-md`}
            >
              <p className="text-white/80 text-sm">Selamat Datang,</p>
              <p className="font-black text-xl">{nama}</p>
              <p className="text-yellow-300 text-sm font-semibold mt-0.5">di Kelas {kelasLabel[kelas]}</p>
              <div className="flex items-center gap-2 mt-3">
                <div className="bg-white/20 rounded-lg px-3 py-1 text-xs font-semibold">{mockTugas.filter(t => t.status === "Belum Dikumpulkan").length} Tugas Aktif</div>
                <div className="bg-white/20 rounded-lg px-3 py-1 text-xs font-semibold">{mockLatihan.filter(l => l.status === "Belum Dikerjakan").length} Latihan</div>
              </div>
            </motion.div>

            {/* Feature Grid — Row 1: 4 items */}
            <div className="grid grid-cols-4 gap-3">
              {menuFeatures.slice(0, 4).map((f, i) => (
                <motion.button
                  key={f.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveView(f.key)}
                  className="flex flex-col items-center gap-2"
                >
                  <div className={`w-16 h-16 rounded-full border-2 ${f.bgCircle} flex items-center justify-center shadow-sm ${f.color}`}>
                    {f.icon}
                  </div>
                  <span className="text-xs text-gray-700 font-semibold text-center leading-tight">{f.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Feature Grid — Row 2: 2 items centered */}
            <div className="flex justify-center gap-10">
              {menuFeatures.slice(4, 6).map((f, i) => (
                <motion.button
                  key={f.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i + 4) * 0.05 }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveView(f.key)}
                  className="flex flex-col items-center gap-2"
                >
                  <div className={`w-16 h-16 rounded-full border-2 ${f.bgCircle} flex items-center justify-center shadow-sm ${f.color}`}>
                    {f.icon}
                  </div>
                  <span className="text-xs text-gray-700 font-semibold text-center leading-tight">{f.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Recent info */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <p className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
                <Bell className="w-4 h-4 text-orange-500" /> Informasi Terbaru
              </p>
              {mockInformasi.slice(0, 2).map(info => (
                <div key={info.id} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${info.tipe === 'Tugas Baru' ? 'bg-green-100' : info.tipe === 'Reminder Tugas' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                    <Bell className={`w-3.5 h-3.5 ${info.tipe === 'Tugas Baru' ? 'text-green-600' : info.tipe === 'Reminder Tugas' ? 'text-yellow-600' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{info.judul}</p>
                    <p className="text-gray-400 text-xs">{info.tanggal}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ MATERI VIEW ═══ */}
        {activeView === "materi" && !selectedMapel && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="font-black text-gray-800">Materi</h2>
                <p className="text-gray-400 text-xs">Pilih mata pelajaran</p>
              </div>
            </div>

            {/* Subject list — radio button style */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {filteredMateri.map((m, i) => {
                const warna = warnaMap[m.warna] || warnaMap.blue;
                return (
                  <motion.button
                    key={m.mapel}
                    whileHover={{ backgroundColor: "#f8fafc" }}
                    onClick={() => setSelectedMapel(m.mapel)}
                    className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors ${i !== 0 ? 'border-t border-gray-100' : ''}`}
                  >
                    {/* Radio circle */}
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${warna.border}`}>
                      <div className={`w-3 h-3 rounded-full ${warna.bg}`} />
                    </div>
                    {/* Icon */}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-lg ${warna.light}`}>
                      {m.icon}
                    </div>
                    {/* Name */}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">{m.mapel}</p>
                      <p className="text-gray-400 text-xs">{m.topik.length} topik</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ MATERI DETAIL (topik list) ═══ */}
        {activeView === "materi" && selectedMapel && (() => {
          const mapelData = materiKelas.find(m => m.mapel === selectedMapel);
          const warna = warnaMap[mapelData?.warna || "blue"];
          return (
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-1">
                <button
                  onClick={() => setSelectedMapel(null)}
                  className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 text-gray-600" />
                </button>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${warna.light}`}>
                  {mapelData?.icon}
                </div>
                <div>
                  <h2 className="font-black text-gray-800">{selectedMapel}</h2>
                  <p className="text-gray-400 text-xs">Kelas {kelasLabel[kelas]} • {mapelData?.topik.length} topik</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {mapelData?.topik.map((topik, i) => (
                  <motion.button
                    key={topik}
                    whileHover={{ backgroundColor: "#f8fafc" }}
                    onClick={() => setExpandedTopik(expandedTopik === topik ? null : topik)}
                    className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors ${i !== 0 ? 'border-t border-gray-100' : ''}`}
                  >
                    {/* Radio circle */}
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${warna.border}`}>
                      {expandedTopik === topik
                        ? <div className={`w-3 h-3 rounded-full ${warna.bg}`} />
                        : <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                      }
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">{topik}</p>
                      {expandedTopik === topik && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-2 space-y-1"
                        >
                          <p className="text-xs text-gray-500 leading-relaxed">
                            Materi {topik} untuk Kelas {kelasLabel[kelas]}. Pelajari materi ini dengan baik untuk persiapan ulangan harian dan ujian semester.
                          </p>
                          <div className="flex gap-2 mt-2">
                            <button className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold ${warna.light} ${warna.text}`}>
                              <FileText className="w-3 h-3" /> Buka Materi
                            </button>
                            <button className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600">
                              <Star className="w-3 h-3" /> Tandai
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                    {expandedTopik === topik
                      ? <ChevronUp className="w-4 h-4 text-gray-300 flex-shrink-0" />
                      : <ChevronDown className="w-4 h-4 text-gray-300 flex-shrink-0" />
                    }
                  </motion.button>
                ))}
              </div>
            </div>
          );
        })()}

        {/* ═══ LATIHAN VIEW ═══ */}
        {activeView === "latihan" && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <PenTool className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="font-black text-gray-800">Latihan Soal</h2>
            </div>
            {mockLatihan.map(l => (
              <motion.div key={l.id} whileHover={{ scale: 1.01 }} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${l.status === 'Sudah Dikerjakan' ? 'bg-green-100' : 'bg-orange-100'}`}>
                    {l.status === 'Sudah Dikerjakan'
                      ? <CheckCircle className="w-5 h-5 text-green-600" />
                      : <PenTool className="w-5 h-5 text-orange-600" />
                    }
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800 text-sm">{l.judul}</p>
                    <p className="text-gray-500 text-xs">{l.mapel} • {l.soal} soal</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Deadline: {l.deadline}</span>
                      {(l as any).nilai && <span className="text-green-600 font-semibold flex items-center gap-1"><Star className="w-3 h-3" />Nilai: {(l as any).nilai}</span>}
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ${l.status === 'Sudah Dikerjakan' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {l.status === 'Sudah Dikerjakan' ? 'Selesai' : 'Belum'}
                  </span>
                </div>
                {l.status !== "Sudah Dikerjakan" && (
                  <div className="mt-3 pt-3 border-t border-gray-50">
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-xs hover:bg-green-700">
                      <PenTool className="w-3 h-3" /> Kerjakan Sekarang
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* ═══ TUGAS VIEW ═══ */}
        {activeView === "tugas" && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="font-black text-gray-800">Penugasan</h2>
            </div>
            {mockTugas.map(t => (
              <motion.div key={t.id} whileHover={{ scale: 1.01 }} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${t.status === 'Sudah Dikumpulkan' ? 'bg-green-100' : 'bg-red-50'}`}>
                    {t.status === 'Sudah Dikumpulkan'
                      ? <CheckCircle className="w-5 h-5 text-green-600" />
                      : <Clock className="w-5 h-5 text-red-500" />
                    }
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full">{t.mapel}</span>
                    </div>
                    <p className="font-bold text-gray-800 text-sm">{t.judul}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{t.deskripsi}</p>
                    <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                      <User className="w-3 h-3" />{t.guru} • Deadline: {t.deadline}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ${t.status === 'Sudah Dikumpulkan' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                    {t.status === 'Sudah Dikumpulkan' ? 'Selesai' : 'Pending'}
                  </span>
                </div>
                {t.status !== "Sudah Dikumpulkan" && (
                  <div className="mt-3 pt-3 border-t border-gray-50">
                    <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-xs hover:bg-orange-600">
                      <Send className="w-3 h-3" /> Kumpulkan Tugas
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* ═══ JADWAL VIEW ═══ */}
        {activeView === "jadwal" && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="font-black text-gray-800">Jadwal Pelajaran</h2>
                <p className="text-gray-400 text-xs">Kelas {kelasLabel[kelas]} • Sem. Genap 2025/2026</p>
              </div>
            </div>
            {hariOrder.map(hari => {
              const items = jadwalKelas.filter(j => j.hari === hari);
              if (!items.length) return null;
              return (
                <div key={hari} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className={`bg-gradient-to-r ${kelasColor[kelas]} px-4 py-2`}>
                    <p className="text-white font-bold text-sm">{hari}</p>
                  </div>
                  {items.map(j => (
                    <div key={j.id} className="flex items-center p-3 border-b border-gray-50 last:border-0">
                      <span className="text-xs text-gray-400 font-mono w-28 flex-shrink-0">{j.jam}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-sm">{j.mapel}</p>
                        <p className="text-gray-400 text-xs">{j.guru}</p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* ═══ DISKUSI VIEW ═══ */}
        {activeView === "diskusi" && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h2 className="font-black text-gray-800">Forum Diskusi</h2>
                <p className="text-gray-400 text-xs">Kelas {kelasLabel[kelas]} • Siswa & Wali Kelas</p>
              </div>
            </div>
            {mockDiskusi.map(d => (
              <div key={d.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 cursor-pointer" onClick={() => setOpenDiskusi(openDiskusi === d.id ? null : d.id)}>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${d.tipe === 'guru' ? 'bg-blue-100' : 'bg-green-100'}`}>
                      <span className={`text-xs font-bold ${d.tipe === 'guru' ? 'text-blue-700' : 'text-green-700'}`}>{d.penulis[0]}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm text-gray-800">{d.penulis}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${d.tipe === 'guru' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{d.tipe}</span>
                      </div>
                      <p className="text-gray-700 text-sm mt-1">{d.judul}</p>
                      <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" /> {d.balasan} balasan • {d.tanggal}
                      </p>
                    </div>
                  </div>
                </div>
                {openDiskusi === d.id && (
                  <div className="px-4 pb-4 border-t border-gray-50">
                    <div className="pt-3 flex gap-2">
                      <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-700 text-xs font-bold">A</span>
                      </div>
                      <div className="flex-1 flex gap-2">
                        <input
                          value={diskusiReply}
                          onChange={e => setDiskusiReply(e.target.value)}
                          placeholder="Tulis balasan..."
                          className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                        <button onClick={() => setDiskusiReply("")} className="px-3 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700">
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ═══ INFORMASI VIEW ═══ */}
        {activeView === "informasi" && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Info className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="font-black text-gray-800">Informasi Kelas</h2>
            </div>
            {mockInformasi.map(info => (
              <motion.div key={info.id} whileHover={{ scale: 1.01 }} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${info.tipe === 'Tugas Baru' ? 'bg-green-100' : info.tipe === 'Reminder Tugas' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                    <Bell className={`w-5 h-5 ${info.tipe === 'Tugas Baru' ? 'text-green-600' : info.tipe === 'Reminder Tugas' ? 'text-yellow-600' : 'text-blue-600'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${info.tipe === 'Tugas Baru' ? 'bg-green-100 text-green-700' : info.tipe === 'Reminder Tugas' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                        {info.tipe}
                      </span>
                      <span className="text-gray-400 text-xs">{info.tanggal}</span>
                    </div>
                    <p className="font-semibold text-gray-800 text-sm">{info.judul}</p>
                    <p className="text-gray-600 text-xs mt-1">{info.isi}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 z-30 md:hidden">
        <button onClick={() => setActiveView("home")} className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-colors ${activeView === "home" ? "text-blue-600" : "text-gray-400"}`}>
          <Home className="w-4 h-4" />
          <span className="text-xs">Home</span>
        </button>
        <button onClick={() => setActiveView("tugas")} className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-colors ${activeView === "tugas" ? "text-orange-600" : "text-gray-400"}`}>
          <ClipboardList className="w-4 h-4" />
          <span className="text-xs">Tugas</span>
        </button>
        <button onClick={() => setActiveView("materi")} className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-colors ${activeView === "materi" ? "text-blue-600" : "text-gray-400"}`}>
          <BookOpen className="w-4 h-4" />
          <span className="text-xs">Materi</span>
        </button>
        <button onClick={() => navigate("/login")} className="flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl text-gray-400">
          <LogOut className="w-4 h-4" />
          <span className="text-xs">Keluar</span>
        </button>
      </div>
    </div>
  );
}
