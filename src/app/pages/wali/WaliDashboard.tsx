import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Star, Calendar, Users, FileText, LogOut, Menu as MenuIcon, X,
  CheckCircle, XCircle, Clock, TrendingUp, BarChart2, BookOpen,
  Home, ChevronRight
} from "lucide-react";
import { nilaiPerMapel, kehadiranWali, mockJadwal, mockLaporanSiswa } from "../../data/mockData";

const navItems = [
  { key: "nilai", label: "Nilai Akademik", icon: Star },
  { key: "jadwal", label: "Jadwal", icon: Calendar },
  { key: "kehadiran", label: "Kehadiran", icon: Users },
  { key: "laporan", label: "Laporan Guru", icon: FileText },
];

const hariOrder = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export default function WaliDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("nilai");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const jadwalKelas = mockJadwal.filter(j => j.kelas === "VII A");
  const rata2 = Math.round(nilaiPerMapel.reduce((sum, n) => sum + n.nilai_akhir, 0) / nilaiPerMapel.length);

  const getGrade = (nilai: number) => {
    if (nilai >= 90) return { label: "A", color: "text-green-600 bg-green-100" };
    if (nilai >= 80) return { label: "B", color: "text-blue-600 bg-blue-100" };
    if (nilai >= 70) return { label: "C", color: "text-yellow-600 bg-yellow-100" };
    return { label: "D", color: "text-red-600 bg-red-100" };
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
            <p className="font-bold text-sm">Portal Wali Murid</p>
            <p className="text-yellow-300 text-xs">Budi Santoso</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden ml-auto p-1 hover:bg-white/10 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Student Info Card */}
        <div className="mx-3 mt-3 p-3 bg-white/10 rounded-xl border border-white/20">
          <p className="text-xs text-white/60 mb-1">Nama Siswa</p>
          <p className="font-bold text-sm">Aulia Rahma Putri</p>
          <p className="text-yellow-300 text-xs">Kelas VII A • NIS: 2024001</p>
        </div>

        <nav className="flex-1 p-3 space-y-1 mt-2">
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

        <div className="p-3 space-y-1 border-t border-white/10">
          <button onClick={() => navigate("/")} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-white/70 hover:bg-white/10 text-sm">
            <Home className="w-4 h-4" /> Beranda
          </button>
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
            <p className="text-gray-400 text-xs">Wali Murid • Aulia Rahma Putri - VII A</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-700 text-xs font-bold">W</span>
            </div>
            <span className="text-sm text-gray-700 hidden md:block">Wali Murid</span>
          </div>
        </header>

        <main className="flex-1 p-4 overflow-auto">
          {/* NILAI AKADEMIK */}
          {activeTab === "nilai" && (
            <div className="space-y-4">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Rata-rata Nilai", value: rata2, icon: Star, color: "text-yellow-600 bg-yellow-50" },
                  { label: "Mata Pelajaran", value: nilaiPerMapel.length, icon: BookOpen, color: "text-blue-600 bg-blue-50" },
                  { label: "Di Atas KKM", value: nilaiPerMapel.filter(n => n.nilai_akhir >= 75).length, icon: CheckCircle, color: "text-green-600 bg-green-50" },
                  { label: "Di Bawah KKM", value: nilaiPerMapel.filter(n => n.nilai_akhir < 75).length, icon: XCircle, color: "text-red-600 bg-red-50" },
                ].map((stat) => (
                  <motion.div key={stat.label} whileHover={{ scale: 1.02 }} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 ${stat.color.split(' ')[1]}`}>
                      <stat.icon className={`w-4 h-4 ${stat.color.split(' ')[0]}`} />
                    </div>
                    <p className={`text-xl font-black ${stat.color.split(' ')[0]}`}>{stat.value}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Nilai Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-[#0d3b7d]" />
                  <h3 className="font-bold text-gray-800">Nilai Per Mata Pelajaran</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        {["Mata Pelajaran", "UH 1", "UH 2", "UTS", "UAS", "Nilai Akhir", "Grade", "Status"].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-600 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {nilaiPerMapel.map((n, i) => {
                        const grade = getGrade(n.nilai_akhir);
                        return (
                          <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                            <td className="px-4 py-3 font-semibold text-gray-800 text-xs">{n.mapel}</td>
                            <td className="px-4 py-3 text-center text-xs text-gray-600">{n.uh1}</td>
                            <td className="px-4 py-3 text-center text-xs text-gray-600">{n.uh2}</td>
                            <td className="px-4 py-3 text-center text-xs text-gray-600">{n.uts}</td>
                            <td className="px-4 py-3 text-center text-xs text-gray-600">{n.uas}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                                  <div className={`h-1.5 rounded-full ${n.nilai_akhir >= 75 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${n.nilai_akhir}%` }} />
                                </div>
                                <span className="font-bold text-xs">{n.nilai_akhir}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${grade.color}`}>{grade.label}</span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${n.nilai_akhir >= 75 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {n.nilai_akhir >= 75 ? "Tuntas" : "Remidi"}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* JADWAL */}
          {activeTab === "jadwal" && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <p className="text-blue-800 text-xs">Jadwal mata pelajaran Kelas VII A Semester Genap 2025/2026</p>
              </div>
              {hariOrder.map(hari => {
                const items = jadwalKelas.filter(j => j.hari === hari);
                if (items.length === 0) return null;
                return (
                  <div key={hari} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-[#0d3b7d] px-4 py-2">
                      <p className="text-white font-bold text-sm">{hari}</p>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {items.map((j) => (
                        <div key={j.id} className="flex items-center p-3">
                          <span className="text-xs text-gray-400 font-mono w-28 flex-shrink-0">{j.jam}</span>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800 text-sm">{j.mapel}</p>
                            <p className="text-gray-400 text-xs">{j.guru}</p>
                          </div>
                          <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">{j.kelas}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* KEHADIRAN */}
          {activeTab === "kehadiran" && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-800">Kehadiran Real-time</h3>
                    <p className="text-gray-400 text-xs">{kehadiranWali.bulan} • {kehadiranWali.siswa}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Live
                  </div>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    { label: "Hadir", value: kehadiranWali.hadir, color: "bg-green-500", bg: "bg-green-50", text: "text-green-700" },
                    { label: "Izin", value: kehadiranWali.izin, color: "bg-yellow-500", bg: "bg-yellow-50", text: "text-yellow-700" },
                    { label: "Sakit", value: kehadiranWali.sakit, color: "bg-orange-500", bg: "bg-orange-50", text: "text-orange-700" },
                    { label: "Alpa", value: kehadiranWali.alpa, color: "bg-red-500", bg: "bg-red-50", text: "text-red-700" },
                  ].map((item) => (
                    <div key={item.label} className={`${item.bg} rounded-xl p-3 text-center`}>
                      <p className={`text-xl font-black ${item.text}`}>{item.value}</p>
                      <p className={`text-xs font-semibold ${item.text}`}>{item.label}</p>
                    </div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Persentase Kehadiran</span>
                    <span className="font-bold text-green-600">{Math.round((kehadiranWali.hadir / kehadiranWali.totalHari) * 100)}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-3 bg-green-500 rounded-full transition-all"
                      style={{ width: `${(kehadiranWali.hadir / kehadiranWali.totalHari) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Detail Harian */}
                <h4 className="font-semibold text-gray-700 text-sm mb-2">Detail Kehadiran</h4>
                <div className="space-y-2">
                  {kehadiranWali.detail.map((d, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <span className="text-xs text-gray-600">{d.tanggal}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${d.status === 'Hadir' ? 'bg-green-100 text-green-700' : d.status === 'Izin' ? 'bg-yellow-100 text-yellow-700' : d.status === 'Sakit' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                        {d.status === 'Hadir' ? <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> {d.status}</span> : d.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* LAPORAN GURU */}
          {activeTab === "laporan" && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <p className="text-blue-800 text-xs">Laporan perkembangan anak dikirimkan langsung oleh guru. Update secara berkala.</p>
              </div>

              {mockLaporanSiswa.map((laporan) => (
                <motion.div key={laporan.id} whileHover={{ scale: 1.01 }} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-700 text-xs font-bold">{laporan.guru[0]}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{laporan.guru}</p>
                        <p className="text-gray-400 text-xs">{laporan.tanggal}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${laporan.aspek === 'Akademik' ? 'bg-blue-100 text-blue-700' : laporan.aspek === 'Sosial' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                      {laporan.aspek}
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 mt-2">
                    <p className="text-gray-700 text-xs leading-relaxed">{laporan.deskripsi}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span>Tentang: <strong className="text-gray-600">{laporan.nama}</strong> • Kelas VII A</span>
                  </div>
                </motion.div>
              ))}

              {mockLaporanSiswa.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <FileText className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Belum ada laporan dari guru</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
