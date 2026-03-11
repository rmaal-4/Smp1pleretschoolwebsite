import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  LayoutDashboard, Users, GraduationCap, Key, LogOut, Menu as MenuIcon, X,
  Plus, Edit, Trash2, Eye, EyeOff, Search, Save, CheckCircle, XCircle,
  TrendingUp, BookOpen, Bell, ChevronRight, Download, AlertCircle
} from "lucide-react";
import { mockGuru, mockSiswa, mockAbsensi } from "../../data/mockData";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "kehadiran_guru", label: "Kehadiran Guru", icon: CheckCircle },
  { key: "kehadiran_siswa", label: "Kehadiran Siswa", icon: CheckCircle },
  { key: "guru", label: "Data Guru", icon: GraduationCap },
  { key: "siswa", label: "Data Siswa", icon: Users },
  { key: "password", label: "Kata Sandi", icon: Key },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [guruData, setGuruData] = useState(mockGuru);
  const [siswaData, setSiswaData] = useState(mockSiswa);
  const [searchSiswa, setSearchSiswa] = useState("");
  const [searchGuru, setSearchGuru] = useState("");
  const [showPasswords, setShowPasswords] = useState<Record<number, boolean>>({});
  const [editSiswa, setEditSiswa] = useState<typeof mockSiswa[0] | null>(null);
  const [showAddSiswa, setShowAddSiswa] = useState(false);
  const [newSiswa, setNewSiswa] = useState({ nis: "", nama: "", kelas: "", jenisKelamin: "L", ttl: "", alamat: "", wali: "", password: "" });

  const togglePass = (id: number) => setShowPasswords(prev => ({ ...prev, [id]: !prev[id] }));

  const filteredSiswa = siswaData.filter(s =>
    s.nama.toLowerCase().includes(searchSiswa.toLowerCase()) ||
    s.nis.includes(searchSiswa) ||
    s.kelas.toLowerCase().includes(searchSiswa.toLowerCase())
  );
  const filteredGuru = guruData.filter(g =>
    g.nama.toLowerCase().includes(searchGuru.toLowerCase()) ||
    g.mapel.toLowerCase().includes(searchGuru.toLowerCase())
  );

  const handleDeleteSiswa = (id: number) => {
    if (confirm("Hapus data siswa ini?")) setSiswaData(prev => prev.filter(s => s.id !== id));
  };
  const handleSaveSiswa = () => {
    if (editSiswa) {
      setSiswaData(prev => prev.map(s => s.id === editSiswa.id ? editSiswa : s));
      setEditSiswa(null);
    }
  };
  const handleAddSiswa = () => {
    setSiswaData(prev => [...prev, { ...newSiswa, id: Date.now(), status: "Aktif" }]);
    setNewSiswa({ nis: "", nama: "", kelas: "", jenisKelamin: "L", ttl: "", alamat: "", wali: "", password: "" });
    setShowAddSiswa(false);
  };

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
            <p className="font-bold text-sm truncate">SMP N 1 Pleret</p>
            <p className="text-yellow-300 text-xs">Portal Admin</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden ml-auto p-1 hover:bg-white/10 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-1">
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
          <button
            onClick={() => navigate("/login")}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-300 hover:bg-red-500/20 text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" /> Keluar
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
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
            <p className="text-gray-400 text-xs">Panel Administrator • SMP N 1 Pleret</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-700 text-xs font-bold">A</span>
            </div>
            <span className="text-sm text-gray-700 hidden md:block">Admin</span>
          </div>
        </header>

        <main className="flex-1 p-4 overflow-auto">
          {/* DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Siswa", value: siswaData.length, icon: Users, color: "bg-blue-500", light: "bg-blue-50", text: "text-blue-600" },
                  { label: "Total Guru", value: guruData.length, icon: GraduationCap, color: "bg-green-500", light: "bg-green-50", text: "text-green-600" },
                  { label: "Hadir Hari Ini", value: mockAbsensi.filter(a => a.status === "Hadir").length, icon: CheckCircle, color: "bg-teal-500", light: "bg-teal-50", text: "text-teal-600" },
                  { label: "Tidak Hadir", value: mockAbsensi.filter(a => a.status !== "Hadir").length, icon: AlertCircle, color: "bg-red-500", light: "bg-red-50", text: "text-red-600" },
                ].map((stat) => (
                  <motion.div key={stat.label} whileHover={{ scale: 1.02 }} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className={`w-10 h-10 ${stat.light} rounded-xl flex items-center justify-center mb-3`}>
                      <stat.icon className={`w-5 h-5 ${stat.text}`} />
                    </div>
                    <p className={`text-2xl font-black ${stat.text}`}>{stat.value}</p>
                    <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Kehadiran Guru Hari Ini */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#0d3b7d]" /> Kehadiran Guru Hari Ini
                  </h3>
                  <div className="space-y-2">
                    {guruData.slice(0, 5).map((g) => (
                      <div key={g.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-700 text-xs font-bold">{g.nama[0]}</span>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-700 line-clamp-1">{g.nama}</p>
                            <p className="text-gray-400 text-xs">{g.mapel}</p>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${g.status === 'Hadir' ? 'bg-green-100 text-green-700' : g.status === 'Izin' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                          {g.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Absensi Siswa */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#0d3b7d]" /> Kehadiran Siswa Hari Ini
                  </h3>
                  <div className="space-y-2">
                    {mockAbsensi.slice(0, 5).map((a) => (
                      <div key={a.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                        <div>
                          <p className="text-xs font-semibold text-gray-700">{a.nama}</p>
                          <p className="text-gray-400 text-xs">{a.kelas} • {a.nis}</p>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${a.status === 'Hadir' ? 'bg-green-100 text-green-700' : a.status === 'Izin' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                          {a.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Access */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Data Guru", desc: "Lihat dan kelola data guru", icon: GraduationCap, tab: "guru", color: "text-blue-600 bg-blue-50" },
                  { label: "Data Siswa", desc: "Tambah, edit, hapus data siswa", icon: Users, tab: "siswa", color: "text-green-600 bg-green-50" },
                  { label: "Kata Sandi", desc: "Kelola password akun siswa", icon: Key, tab: "password", color: "text-purple-600 bg-purple-50" },
                ].map((item) => (
                  <button key={item.label} onClick={() => setActiveTab(item.tab)} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-left hover:shadow-md transition-all">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${item.color.split(' ')[1]}`}>
                      <item.icon className={`w-5 h-5 ${item.color.split(' ')[0]}`} />
                    </div>
                    <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                    <div className="flex items-center gap-1 mt-2 text-[#0d3b7d] text-xs">
                      Buka <ChevronRight className="w-3 h-3" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* DATA GURU */}
          {activeTab === "guru" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    value={searchGuru}
                    onChange={(e) => setSearchGuru(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0d3b7d] bg-white"
                    placeholder="Cari guru..."
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#0d3b7d] text-white rounded-lg text-sm hover:bg-blue-800 transition-colors">
                  <Download className="w-4 h-4" /> Export
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        {["No", "NIP", "Nama", "Mata Pelajaran", "Kelas", "Jabatan", "Kehadiran", "Status"].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-600 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredGuru.map((g, i) => (
                        <tr key={g.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-gray-500 text-xs">{i + 1}</td>
                          <td className="px-4 py-3 text-gray-500 text-xs font-mono">{g.nip}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-700 text-xs font-bold">{g.nama[0]}</span>
                              </div>
                              <span className="font-semibold text-gray-800 text-xs">{g.nama}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-600 text-xs">{g.mapel}</td>
                          <td className="px-4 py-3 text-gray-600 text-xs">{g.kelas}</td>
                          <td className="px-4 py-3 text-gray-600 text-xs">{g.jabatan}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-100 rounded-full h-1.5 w-16">
                                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${g.kehadiran}%` }} />
                              </div>
                              <span className="text-xs text-gray-600">{g.kehadiran}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${g.status === 'Hadir' ? 'bg-green-100 text-green-700' : g.status === 'Izin' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                              {g.status}
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

          {/* DATA SISWA */}
          {activeTab === "siswa" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    value={searchSiswa}
                    onChange={(e) => setSearchSiswa(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0d3b7d] bg-white"
                    placeholder="Cari siswa..."
                  />
                </div>
                <button
                  onClick={() => setShowAddSiswa(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Tambah Siswa
                </button>
              </div>

              {showAddSiswa && (
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Plus className="w-4 h-4 text-green-600" /> Tambah Siswa Baru</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      { key: "nis", label: "NIS" },
                      { key: "nama", label: "Nama Lengkap" },
                      { key: "kelas", label: "Kelas" },
                      { key: "ttl", label: "Tempat, Tgl Lahir" },
                      { key: "alamat", label: "Alamat" },
                      { key: "wali", label: "Nama Wali" },
                      { key: "password", label: "Password" },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="text-xs text-gray-600 mb-1 block">{field.label}</label>
                        <input
                          value={(newSiswa as any)[field.key]}
                          onChange={(e) => setNewSiswa(prev => ({ ...prev, [field.key]: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0d3b7d]"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Jenis Kelamin</label>
                      <select
                        value={newSiswa.jenisKelamin}
                        onChange={(e) => setNewSiswa(prev => ({ ...prev, jenisKelamin: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0d3b7d]"
                      >
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button onClick={handleAddSiswa} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                      <Save className="w-4 h-4" /> Simpan
                    </button>
                    <button onClick={() => setShowAddSiswa(false)} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200">
                      <X className="w-4 h-4" /> Batal
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        {["No", "NIS", "Nama", "Kelas", "L/P", "Tgl Lahir", "Wali", "Aksi"].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-600 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSiswa.map((s, i) => (
                        <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          {editSiswa?.id === s.id ? (
                            <>
                              <td className="px-4 py-2 text-xs text-gray-500">{i + 1}</td>
                              <td className="px-4 py-2"><input value={editSiswa.nis} onChange={e => setEditSiswa({ ...editSiswa, nis: e.target.value })} className="w-24 border rounded px-2 py-1 text-xs" /></td>
                              <td className="px-4 py-2"><input value={editSiswa.nama} onChange={e => setEditSiswa({ ...editSiswa, nama: e.target.value })} className="w-36 border rounded px-2 py-1 text-xs" /></td>
                              <td className="px-4 py-2"><input value={editSiswa.kelas} onChange={e => setEditSiswa({ ...editSiswa, kelas: e.target.value })} className="w-20 border rounded px-2 py-1 text-xs" /></td>
                              <td className="px-4 py-2">
                                <select value={editSiswa.jenisKelamin} onChange={e => setEditSiswa({ ...editSiswa, jenisKelamin: e.target.value })} className="border rounded px-2 py-1 text-xs">
                                  <option value="L">L</option><option value="P">P</option>
                                </select>
                              </td>
                              <td className="px-4 py-2"><input value={editSiswa.ttl} onChange={e => setEditSiswa({ ...editSiswa, ttl: e.target.value })} className="w-40 border rounded px-2 py-1 text-xs" /></td>
                              <td className="px-4 py-2"><input value={editSiswa.wali} onChange={e => setEditSiswa({ ...editSiswa, wali: e.target.value })} className="w-32 border rounded px-2 py-1 text-xs" /></td>
                              <td className="px-4 py-2">
                                <div className="flex gap-1">
                                  <button onClick={handleSaveSiswa} className="p-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"><CheckCircle className="w-3.5 h-3.5" /></button>
                                  <button onClick={() => setEditSiswa(null)} className="p-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"><XCircle className="w-3.5 h-3.5" /></button>
                                </div>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="px-4 py-3 text-gray-500 text-xs">{i + 1}</td>
                              <td className="px-4 py-3 text-gray-500 text-xs font-mono">{s.nis}</td>
                              <td className="px-4 py-3 font-semibold text-gray-800 text-xs">{s.nama}</td>
                              <td className="px-4 py-3"><span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">{s.kelas}</span></td>
                              <td className="px-4 py-3 text-gray-600 text-xs">{s.jenisKelamin}</td>
                              <td className="px-4 py-3 text-gray-500 text-xs">{s.ttl}</td>
                              <td className="px-4 py-3 text-gray-600 text-xs">{s.wali}</td>
                              <td className="px-4 py-3">
                                <div className="flex gap-1">
                                  <button onClick={() => setEditSiswa(s)} className="p-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"><Edit className="w-3.5 h-3.5" /></button>
                                  <button onClick={() => handleDeleteSiswa(s.id)} className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><Trash2 className="w-3.5 h-3.5" /></button>
                                </div>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PASSWORD MANAGEMENT */}
          {activeTab === "password" && (
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-yellow-800 text-xs">Informasi kata sandi bersifat rahasia. Hanya Admin yang dapat melihat dan mengubah kata sandi siswa.</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        {["No", "NIS", "Nama Siswa", "Kelas", "Username", "Password", "Aksi"].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-600 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {siswaData.map((s, i) => (
                        <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-xs text-gray-500">{i + 1}</td>
                          <td className="px-4 py-3 text-xs font-mono text-gray-500">{s.nis}</td>
                          <td className="px-4 py-3 font-semibold text-xs text-gray-800">{s.nama}</td>
                          <td className="px-4 py-3"><span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">{s.kelas}</span></td>
                          <td className="px-4 py-3 text-xs text-gray-600 font-mono">{s.nis}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-gray-600">
                                {showPasswords[s.id] ? s.password : "••••••••"}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              <button
                                onClick={() => togglePass(s.id)}
                                className="p-1.5 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100"
                                title={showPasswords[s.id] ? "Sembunyikan" : "Tampilkan"}
                              >
                                {showPasswords[s.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              </button>
                              <button className="p-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100" title="Reset Password">
                                <Key className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* KEHADIRAN GURU */}
          {activeTab === "kehadiran_guru" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Kehadiran Guru</h2>
                  <p className="text-gray-500 text-sm">Data kehadiran guru harian</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        {["No", "Nama Guru", "Mata Pelajaran", "Status", "Keterangan", "Tanggal"].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-600 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {guruData.map((g, i) => (
                        <tr key={g.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-xs text-gray-500">{i + 1}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-700 text-xs font-bold">{g.nama[0]}</span>
                              </div>
                              <span className="font-semibold text-gray-800 text-xs">{g.nama}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-600">{g.mapel}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${g.status === 'Hadir' ? 'bg-green-100 text-green-700' : g.status === 'Izin' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                              {g.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-500">-</td>
                          <td className="px-4 py-3 text-xs text-gray-500">11 Maret 2026</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* KEHADIRAN SISWA */}
          {activeTab === "kehadiran_siswa" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Kehadiran Siswa</h2>
                  <p className="text-gray-500 text-sm">Data kehadiran siswa harian</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        {["No", "Nama Siswa", "NIS", "Kelas", "Status", "Keterangan", "Tanggal"].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-600 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockAbsensi.map((a, i) => (
                        <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-xs text-gray-500">{i + 1}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-700 text-xs font-bold">{a.nama[0]}</span>
                              </div>
                              <span className="font-semibold text-gray-800 text-xs">{a.nama}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs font-mono text-gray-600">{a.nis}</td>
                          <td className="px-4 py-3 text-xs"><span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{a.kelas}</span></td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${a.status === 'Hadir' ? 'bg-green-100 text-green-700' : a.status === 'Izin' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                              {a.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-500">{a.keterangan}</td>
                          <td className="px-4 py-3 text-xs text-gray-500">11 Maret 2026</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
