import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  LayoutDashboard, Users, Star, FileText, MessageSquare, Bell,
  Calendar, LogOut, Menu as MenuIcon, X, Plus, Trash2, Edit,
  CheckCircle, XCircle, Save, Search, Send, ChevronDown, ChevronUp,
  UserMinus, UserPlus, BookOpen, ClipboardList, AlertCircle
} from "lucide-react";
import { mockSiswa, mockAbsensi, mockNilai, mockJadwal, mockTugas, mockDiskusi, mockInformasi } from "../../data/mockData";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "absensi", label: "Absensi Siswa", icon: Users },
  { key: "siswa", label: "Manajemen Siswa", icon: UserPlus },
  { key: "nilai", label: "Input Nilai", icon: Star },
  { key: "laporan", label: "Laporan Siswa", icon: FileText },
  { key: "tugas", label: "Penugasan", icon: ClipboardList },
  { key: "diskusi", label: "Diskusi", icon: MessageSquare },
  { key: "informasi", label: "Informasi", icon: Bell },
  { key: "jadwal", label: "Jadwal", icon: Calendar },
];

type AbsensiStatus = "Hadir" | "Izin" | "Sakit" | "Alpa";

export default function GuruDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Absensi
  const [absensiData, setAbsensiData] = useState(
    mockSiswa.map(s => ({ id: s.id, nis: s.nis, nama: s.nama, kelas: s.kelas, status: "Hadir" as AbsensiStatus, keterangan: "" }))
  );
  const [absensiSaved, setAbsensiSaved] = useState(false);

  // Nilai
  const [nilaiData, setNilaiData] = useState(mockNilai);

  // Jadwal
  const [jadwalData, setJadwalData] = useState(mockJadwal);
  const [editJadwal, setEditJadwal] = useState<typeof mockJadwal[0] | null>(null);
  const [showAddJadwal, setShowAddJadwal] = useState(false);
  const [newJadwal, setNewJadwal] = useState({ hari: "Senin", jam: "", mapel: "", guru: "Drs. Bambang Suryadi, M.Pd", kelas: "VII A" });

  // Tugas
  const [tugasData, setTugasData] = useState(mockTugas);
  const [showAddTugas, setShowAddTugas] = useState(false);
  const [newTugas, setNewTugas] = useState({ judul: "", mapel: "", deadline: "", deskripsi: "" });

  // Informasi
  const [infoData, setInfoData] = useState(mockInformasi);
  const [showAddInfo, setShowAddInfo] = useState(false);
  const [newInfo, setNewInfo] = useState({ judul: "", tipe: "Informasi", isi: "" });

  // Diskusi
  const [diskusiData, setDiskusiData] = useState(mockDiskusi);
  const [newDiskusi, setNewDiskusi] = useState("");

  // Laporan
  const [laporanData, setLaporanData] = useState([
    { id: 1, nama: "Aulia Rahma Putri", kelas: "VII A", aspek: "Akademik", deskripsi: "Sangat aktif dan berprestasi dalam pelajaran matematika.", tanggal: "2026-03-01" },
    { id: 2, nama: "Bima Saputra", kelas: "VII A", aspek: "Sosial", deskripsi: "Perlu bimbingan lebih dalam interaksi sosial dengan teman.", tanggal: "2026-03-02" },
  ]);
  const [showAddLaporan, setShowAddLaporan] = useState(false);
  const [newLaporan, setNewLaporan] = useState({ nama: "", kelas: "", aspek: "Akademik", deskripsi: "" });

  // Siswa Manajemen
  const [siswaList, setSiswaList] = useState(mockSiswa.filter(s => s.kelas.startsWith("VII")));

  const updateAbsensi = (id: number, field: "status" | "keterangan", value: string) => {
    setAbsensiData(prev => prev.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const saveAbsensi = () => {
    setAbsensiSaved(true);
    setTimeout(() => setAbsensiSaved(false), 3000);
  };

  const hariOrder = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0d3b7d] text-white transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 flex flex-col`}>
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <img
            src="https://tse2.mm.bing.net/th/id/OIP.gRycrEfwP4aElgAb_9LTCwHaHa?pid=Api&h=220&P=0"
            alt="Logo SMP N 1 Pleret"
            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="font-bold text-sm">Portal Guru</p>
            <p className="text-yellow-300 text-xs">Drs. Bambang Suryadi</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden ml-auto p-1 hover:bg-white/10 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActiveTab(item.key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${activeTab === item.key ? 'bg-yellow-400 text-[#0d3b7d] font-bold' : 'text-white/80 hover:bg-white/10'}`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button onClick={() => navigate("/login")} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-300 hover:bg-red-500/20 text-sm">
            <LogOut className="w-4 h-4" /> Keluar
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
            <MenuIcon className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-gray-800 text-sm md:text-base">
              {navItems.find(n => n.key === activeTab)?.label}
            </h1>
            <p className="text-gray-400 text-xs">Portal Guru • Kelas VII A</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-700 text-xs font-bold">G</span>
            </div>
            <span className="text-sm text-gray-700 hidden md:block">Guru</span>
          </div>
        </header>

        <main className="flex-1 p-4 overflow-auto">
          {/* DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Siswa", value: siswaList.length, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                  { label: "Tugas Aktif", value: tugasData.length, icon: ClipboardList, color: "text-green-600", bg: "bg-green-50" },
                  { label: "Informasi", value: infoData.length, icon: Bell, color: "text-orange-600", bg: "bg-orange-50" },
                  { label: "Diskusi", value: diskusiData.length, icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-50" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                    <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><ClipboardList className="w-4 h-4 text-[#0d3b7d]" /> Tugas Terbaru</h3>
                  {tugasData.slice(0, 3).map(t => (
                    <div key={t.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div>
                        <p className="text-xs font-semibold text-gray-800 line-clamp-1">{t.judul}</p>
                        <p className="text-gray-400 text-xs">Deadline: {t.deadline}</p>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full whitespace-nowrap">{t.mapel}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Bell className="w-4 h-4 text-[#0d3b7d]" /> Informasi Terbaru</h3>
                  {infoData.slice(0, 3).map(info => (
                    <div key={info.id} className="py-2 border-b border-gray-50 last:border-0">
                      <p className="text-xs font-semibold text-gray-800 line-clamp-1">{info.judul}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">{info.tipe}</span>
                        <p className="text-gray-400 text-xs">{info.tanggal}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ABSENSI */}
          {activeTab === "absensi" && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-800">Absensi Siswa - Kelas VII A</h3>
                    <p className="text-gray-400 text-xs">Senin, 9 Maret 2026</p>
                  </div>
                  <button
                    onClick={saveAbsensi}
                    className="flex items-center gap-2 px-4 py-2 bg-[#0d3b7d] text-white rounded-lg text-sm hover:bg-blue-800 transition-colors"
                  >
                    <Save className="w-4 h-4" /> Simpan Absensi
                  </button>
                </div>
                {absensiSaved && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-2 mb-4 flex items-center gap-2 text-green-700 text-sm">
                    <CheckCircle className="w-4 h-4" /> Absensi berhasil disimpan!
                  </div>
                )}
                <div className="space-y-2">
                  {absensiData.map((siswa) => (
                    <div key={siswa.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-700 text-xs font-bold">{siswa.nama[0]}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800 text-sm truncate">{siswa.nama}</p>
                          <p className="text-gray-400 text-xs">{siswa.nis} • {siswa.kelas}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {(["Hadir", "Izin", "Sakit", "Alpa"] as AbsensiStatus[]).map((s) => (
                          <button
                            key={s}
                            onClick={() => updateAbsensi(siswa.id, "status", s)}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${siswa.status === s
                              ? s === "Hadir" ? "bg-green-500 text-white" : s === "Izin" ? "bg-yellow-500 text-white" : s === "Sakit" ? "bg-orange-500 text-white" : "bg-red-500 text-white"
                              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"}`}
                          >
                            {s}
                          </button>
                        ))}
                        {siswa.status !== "Hadir" && (
                          <input
                            value={siswa.keterangan}
                            onChange={(e) => updateAbsensi(siswa.id, "keterangan", e.target.value)}
                            placeholder="Keterangan..."
                            className="border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#0d3b7d]"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MANAJEMEN SISWA */}
          {activeTab === "siswa" && (
            <div className="space-y-4">
              <div className="flex justify-end gap-2">
                <button className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                  <UserPlus className="w-4 h-4" /> Tambah Siswa
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600">
                  <UserMinus className="w-4 h-4" /> Kurangi Siswa
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      {["No", "NIS", "Nama", "Kelas", "Jenis Kelamin", "Wali"].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-600 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {siswaList.map((s, i) => (
                      <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-4 py-3 text-xs text-gray-500">{i + 1}</td>
                        <td className="px-4 py-3 text-xs text-gray-500 font-mono">{s.nis}</td>
                        <td className="px-4 py-3 text-xs font-semibold text-gray-800">{s.nama}</td>
                        <td className="px-4 py-3"><span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">{s.kelas}</span></td>
                        <td className="px-4 py-3 text-xs text-gray-600">{s.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{s.wali}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* INPUT NILAI */}
          {activeTab === "nilai" && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-gray-800">Nilai Siswa - Matematika - Kelas VII A</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#0d3b7d] text-white rounded-lg text-sm hover:bg-blue-800">
                    <Save className="w-4 h-4" /> Simpan Nilai
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        {["No", "NIS", "Nama Siswa", "UH 1", "UH 2", "UTS", "UAS", "Nilai Akhir", "Keterangan"].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-600 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {nilaiData.map((n, i) => (
                        <tr key={n.id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="px-4 py-2 text-xs text-gray-500">{i + 1}</td>
                          <td className="px-4 py-2 text-xs text-gray-500 font-mono">{n.nis}</td>
                          <td className="px-4 py-2 text-xs font-semibold text-gray-800">{n.nama}</td>
                          {(["uh1", "uh2", "uts", "uas"] as const).map((field) => (
                            <td key={field} className="px-4 py-2">
                              <input
                                type="number"
                                value={(n as any)[field]}
                                onChange={(e) => setNilaiData(prev => prev.map(item => item.id === n.id ? { ...item, [field]: Number(e.target.value), nilai_akhir: Math.round(((item.uh1 + item.uh2 + item.uts + item.uas) / 4)) } : item))}
                                className="w-14 border border-gray-200 rounded px-2 py-1 text-xs text-center focus:outline-none focus:ring-1 focus:ring-[#0d3b7d]"
                                min={0} max={100}
                              />
                            </td>
                          ))}
                          <td className="px-4 py-2">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${n.nilai_akhir >= 75 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {n.nilai_akhir}
                            </span>
                          </td>
                          <td className="px-4 py-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${n.nilai_akhir >= 75 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                              {n.nilai_akhir >= 75 ? "Tuntas" : "Remidi"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* LAPORAN PERKEMBANGAN */}
          {activeTab === "laporan" && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button onClick={() => setShowAddLaporan(true)} className="flex items-center gap-2 px-4 py-2 bg-[#0d3b7d] text-white rounded-lg text-sm hover:bg-blue-800">
                  <Plus className="w-4 h-4" /> Tambah Laporan
                </button>
              </div>

              {showAddLaporan && (
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-3">Tambah Laporan Perkembangan Siswa</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    {[
                      { key: "nama", label: "Nama Siswa" },
                      { key: "kelas", label: "Kelas" },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="text-xs text-gray-600 mb-1 block">{f.label}</label>
                        <input
                          value={(newLaporan as any)[f.key]}
                          onChange={e => setNewLaporan(prev => ({ ...prev, [f.key]: e.target.value }))}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d3b7d]"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Aspek</label>
                      <select
                        value={newLaporan.aspek}
                        onChange={e => setNewLaporan(prev => ({ ...prev, aspek: e.target.value }))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d3b7d]"
                      >
                        {["Akademik", "Sosial", "Kehadiran", "Perilaku", "Prestasi"].map(a => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs text-gray-600 mb-1 block">Deskripsi Perkembangan</label>
                      <textarea
                        value={newLaporan.deskripsi}
                        onChange={e => setNewLaporan(prev => ({ ...prev, deskripsi: e.target.value }))}
                        rows={3}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d3b7d] resize-none"
                        placeholder="Tuliskan perkembangan siswa..."
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setLaporanData(prev => [...prev, { ...newLaporan, id: Date.now(), tanggal: "2026-03-09" }]);
                        setShowAddLaporan(false);
                        setNewLaporan({ nama: "", kelas: "", aspek: "Akademik", deskripsi: "" });
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-[#0d3b7d] text-white rounded-lg text-sm hover:bg-blue-800"
                    >
                      <Save className="w-4 h-4" /> Simpan Laporan
                    </button>
                    <button onClick={() => setShowAddLaporan(false)} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200">
                      <X className="w-4 h-4" /> Batal
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {laporanData.map((laporan) => (
                  <div key={laporan.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{laporan.nama}</p>
                        <p className="text-gray-400 text-xs">{laporan.kelas} • {laporan.tanggal}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${laporan.aspek === 'Akademik' ? 'bg-blue-100 text-blue-700' : laporan.aspek === 'Sosial' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                        {laporan.aspek}
                      </span>
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed">{laporan.deskripsi}</p>
                    <p className="text-gray-400 text-xs mt-2">👁️ Dapat dilihat oleh Wali Murid</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PENUGASAN */}
          {activeTab === "tugas" && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button onClick={() => setShowAddTugas(true)} className="flex items-center gap-2 px-4 py-2 bg-[#0d3b7d] text-white rounded-lg text-sm hover:bg-blue-800">
                  <Plus className="w-4 h-4" /> Buat Tugas
                </button>
              </div>

              {showAddTugas && (
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-3">Buat Tugas Baru</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    {[
                      { key: "judul", label: "Judul Tugas" },
                      { key: "mapel", label: "Mata Pelajaran" },
                      { key: "deadline", label: "Deadline", type: "date" },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="text-xs text-gray-600 mb-1 block">{f.label}</label>
                        <input
                          type={f.type || "text"}
                          value={(newTugas as any)[f.key]}
                          onChange={e => setNewTugas(prev => ({ ...prev, [f.key]: e.target.value }))}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d3b7d]"
                        />
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <label className="text-xs text-gray-600 mb-1 block">Deskripsi</label>
                      <textarea
                        value={newTugas.deskripsi}
                        onChange={e => setNewTugas(prev => ({ ...prev, deskripsi: e.target.value }))}
                        rows={3}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d3b7d] resize-none"
                        placeholder="Deskripsi tugas..."
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setTugasData(prev => [...prev, { ...newTugas, id: Date.now(), guru: "Drs. Bambang Suryadi", status: "Belum Dikumpulkan" }]);
                        setShowAddTugas(false);
                        setNewTugas({ judul: "", mapel: "", deadline: "", deskripsi: "" });
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-[#0d3b7d] text-white rounded-lg text-sm hover:bg-blue-800"
                    >
                      <Save className="w-4 h-4" /> Simpan
                    </button>
                    <button onClick={() => setShowAddTugas(false)} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200">
                      <X className="w-4 h-4" /> Batal
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {tugasData.map((t) => (
                  <div key={t.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 text-sm">{t.judul}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{t.mapel} • Deadline: {t.deadline}</p>
                        <p className="text-gray-600 text-xs mt-1">{t.deskripsi}</p>
                      </div>
                      <div className="flex gap-1 ml-2">
                        <button className="p-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"><Edit className="w-3.5 h-3.5" /></button>
                        <button onClick={() => setTugasData(prev => prev.filter(item => item.id !== t.id))} className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                      <span className="text-xs text-gray-500">Pengumpulan Tugas</span>
                      <div className="flex gap-2 text-xs">
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">2 Sudah</span>
                        <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full">4 Belum</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DISKUSI */}
          {activeTab === "diskusi" && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h3 className="font-bold text-gray-800 mb-3">Buat Topik Diskusi</h3>
                <textarea
                  value={newDiskusi}
                  onChange={e => setNewDiskusi(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d3b7d] resize-none"
                  placeholder="Tulis topik diskusi untuk kelas..."
                />
                <button
                  onClick={() => {
                    if (newDiskusi.trim()) {
                      setDiskusiData(prev => [{ id: Date.now(), judul: newDiskusi, penulis: "Drs. Bambang Suryadi", tanggal: "2026-03-09", kelas: "VII A", balasan: 0, tipe: "guru" }, ...prev]);
                      setNewDiskusi("");
                    }
                  }}
                  className="mt-2 flex items-center gap-2 px-4 py-2 bg-[#0d3b7d] text-white rounded-lg text-sm hover:bg-blue-800 transition-colors"
                >
                  <Send className="w-4 h-4" /> Kirim Topik
                </button>
              </div>

              <div className="space-y-3">
                {diskusiData.map((d) => (
                  <div key={d.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${d.tipe === 'guru' ? 'bg-blue-100' : 'bg-green-100'}`}>
                        <span className={`text-xs font-bold ${d.tipe === 'guru' ? 'text-blue-700' : 'text-green-700'}`}>{d.penulis[0]}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-gray-800">{d.penulis}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${d.tipe === 'guru' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{d.tipe}</span>
                          <span className="text-gray-400 text-xs">{d.tanggal}</span>
                        </div>
                        <p className="text-gray-700 text-sm mt-1">{d.judul}</p>
                        <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" /> {d.balasan} balasan
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INFORMASI */}
          {activeTab === "informasi" && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button onClick={() => setShowAddInfo(true)} className="flex items-center gap-2 px-4 py-2 bg-[#0d3b7d] text-white rounded-lg text-sm hover:bg-blue-800">
                  <Plus className="w-4 h-4" /> Buat Informasi
                </button>
              </div>

              {showAddInfo && (
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-3">Buat Informasi/Pengumuman</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Judul</label>
                      <input value={newInfo.judul} onChange={e => setNewInfo(prev => ({ ...prev, judul: e.target.value }))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d3b7d]" placeholder="Judul informasi..." />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Tipe</label>
                      <select value={newInfo.tipe} onChange={e => setNewInfo(prev => ({ ...prev, tipe: e.target.value }))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d3b7d]">
                        {["Informasi", "Reminder Tugas", "Tugas Baru", "Pengumuman"].map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Isi</label>
                      <textarea value={newInfo.isi} onChange={e => setNewInfo(prev => ({ ...prev, isi: e.target.value }))}
                        rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d3b7d] resize-none" placeholder="Isi informasi..." />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => {
                      setInfoData(prev => [...prev, { ...newInfo, id: Date.now(), tanggal: "2026-03-09" }]);
                      setShowAddInfo(false);
                      setNewInfo({ judul: "", tipe: "Informasi", isi: "" });
                    }} className="flex items-center gap-2 px-4 py-2 bg-[#0d3b7d] text-white rounded-lg text-sm hover:bg-blue-800">
                      <Send className="w-4 h-4" /> Kirim
                    </button>
                    <button onClick={() => setShowAddInfo(false)} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200">
                      <X className="w-4 h-4" /> Batal
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {infoData.map((info) => (
                  <div key={info.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${info.tipe === 'Tugas Baru' ? 'bg-green-100 text-green-700' : info.tipe === 'Reminder Tugas' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                            {info.tipe}
                          </span>
                          <span className="text-gray-400 text-xs">{info.tanggal}</span>
                        </div>
                        <p className="font-semibold text-gray-800 text-sm">{info.judul}</p>
                        <p className="text-gray-600 text-xs mt-1">{info.isi}</p>
                      </div>
                      <button onClick={() => setInfoData(prev => prev.filter(i => i.id !== info.id))} className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 ml-2">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* JADWAL */}
          {activeTab === "jadwal" && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button onClick={() => setShowAddJadwal(true)} className="flex items-center gap-2 px-4 py-2 bg-[#0d3b7d] text-white rounded-lg text-sm hover:bg-blue-800">
                  <Plus className="w-4 h-4" /> Tambah Jadwal
                </button>
              </div>

              {showAddJadwal && (
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-3">Tambah Jadwal Pelajaran</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Hari</label>
                      <select value={newJadwal.hari} onChange={e => setNewJadwal(prev => ({ ...prev, hari: e.target.value }))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d3b7d]">
                        {hariOrder.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>
                    {[
                      { key: "jam", label: "Jam (contoh: 07:00 - 07:40)" },
                      { key: "mapel", label: "Mata Pelajaran" },
                      { key: "guru", label: "Guru" },
                      { key: "kelas", label: "Kelas" },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="text-xs text-gray-600 mb-1 block">{f.label}</label>
                        <input value={(newJadwal as any)[f.key]} onChange={e => setNewJadwal(prev => ({ ...prev, [f.key]: e.target.value }))}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d3b7d]" />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => {
                      setJadwalData(prev => [...prev, { ...newJadwal, id: Date.now() }]);
                      setShowAddJadwal(false);
                    }} className="flex items-center gap-2 px-4 py-2 bg-[#0d3b7d] text-white rounded-lg text-sm hover:bg-blue-800">
                      <Save className="w-4 h-4" /> Simpan
                    </button>
                    <button onClick={() => setShowAddJadwal(false)} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200">
                      <X className="w-4 h-4" /> Batal
                    </button>
                  </div>
                </div>
              )}

              {hariOrder.map(hari => {
                const items = jadwalData.filter(j => j.hari === hari);
                if (items.length === 0) return null;
                return (
                  <div key={hari} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-[#0d3b7d] px-4 py-2">
                      <p className="text-white font-bold text-sm">{hari}</p>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {items.map((j) => (
                        <div key={j.id} className="flex items-center justify-between p-3 hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-400 font-mono w-28 flex-shrink-0">{j.jam}</span>
                            <div>
                              <p className="font-semibold text-gray-800 text-sm">{j.mapel}</p>
                              <p className="text-gray-400 text-xs">{j.guru} • {j.kelas}</p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button onClick={() => setEditJadwal(j)} className="p-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"><Edit className="w-3.5 h-3.5" /></button>
                            <button onClick={() => setJadwalData(prev => prev.filter(item => item.id !== j.id))} className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Edit Jadwal Modal */}
              {editJadwal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-5">
                    <h3 className="font-bold text-gray-800 mb-4">Edit Jadwal</h3>
                    <div className="space-y-3">
                      {[
                        { key: "hari", label: "Hari" },
                        { key: "jam", label: "Jam" },
                        { key: "mapel", label: "Mata Pelajaran" },
                        { key: "guru", label: "Guru" },
                        { key: "kelas", label: "Kelas" },
                      ].map(f => (
                        <div key={f.key}>
                          <label className="text-xs text-gray-600 mb-1 block">{f.label}</label>
                          <input value={(editJadwal as any)[f.key]}
                            onChange={e => setEditJadwal({ ...editJadwal, [f.key]: e.target.value } as typeof editJadwal)}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d3b7d]" />
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => {
                        setJadwalData(prev => prev.map(j => j.id === editJadwal.id ? editJadwal : j));
                        setEditJadwal(null);
                      }} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#0d3b7d] text-white rounded-lg text-sm hover:bg-blue-800">
                        <Save className="w-4 h-4" /> Simpan
                      </button>
                      <button onClick={() => setEditJadwal(null)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200">
                        <X className="w-4 h-4" /> Batal
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
