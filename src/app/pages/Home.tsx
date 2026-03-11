import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Bell,
  Images,
  LogIn,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Globe,
  BookOpen,
  Users,
  Award,
  Calendar,
  X,
  Play,
  ArrowRight,
  Menu as MenuIcon,
  X as XIcon,
} from "lucide-react";
import {
  announcements,
  galleryImages,
  schoolInfo,
} from "../data/mockData";

export default function Home() {
  const navigate = useNavigate();
  const [showAnnouncements, setShowAnnouncements] =
    useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<(typeof announcements)[0] | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* NAVBAR */}
      <nav className="bg-[#0d3b7d] text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="https://tse2.mm.bing.net/th/id/OIP.gRycrEfwP4aElgAb_9LTCwHaHa?pid=Api&h=220&P=0"
                alt="Logo SMP N 1 Pleret"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <p className="font-bold text-sm leading-tight">
                  SMP NEGERI 1
                </p>
                <p className="text-yellow-300 text-xs font-semibold">
                  PLERET
                </p>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setShowAnnouncements(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-yellow-400 text-[#0d3b7d] rounded-lg hover:bg-yellow-300 transition-all"
              >
                <Bell className="w-4 h-4" />
                <span className="text-sm">Pengumuman</span>
              </button>
              <button
                onClick={() => setShowGallery(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
              >
                <Images className="w-4 h-4" />
                <span className="text-sm">Galeri</span>
              </button>
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-1.5 px-4 py-2 bg-green-500 rounded-lg hover:bg-green-400 transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span className="text-sm">Login</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a2e66] px-4 pb-4 flex flex-col gap-2">
            <button
              onClick={() => {
                setShowAnnouncements(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-3 bg-yellow-400 text-[#0d3b7d] rounded-lg w-full"
            >
              <Bell className="w-4 h-4" />
              <span>Pengumuman</span>
            </button>
            <button
              onClick={() => {
                setShowGallery(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-3 bg-white/10 rounded-lg w-full"
            >
              <Images className="w-4 h-4" />
              <span>Galeri</span>
            </button>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 px-4 py-3 bg-green-500 rounded-lg w-full"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0d3b7d] via-[#1a5276] to-[#0a7a6e] text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(http://smp1pleret.sch.id/media_library/posts/medium/9b6f1e9c9b0f3bff756e4f2f88709336.jpeg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <img
                src="https://tse2.mm.bing.net/th/id/OIP.gRycrEfwP4aElgAb_9LTCwHaHa?pid=Api&h=220&P=0"
                alt="Logo SMP N 1 Pleret"
                className="w-24 h-24 rounded-full object-cover shadow-2xl border-4 border-yellow-400"
              />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-2">
              SMP NEGERI 1 PLERET
            </h1>
            <p className="text-yellow-300 text-lg md:text-xl mb-4 font-semibold">
              Bantul, Daerah Istimewa Yogyakarta
            </p>
            <p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base mb-8">
              {schoolInfo.visi}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate("/login")}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 text-[#0d3b7d] rounded-xl hover:bg-yellow-300 transition-all shadow-lg font-semibold"
              >
                <LogIn className="w-5 h-5" />
                Masuk ke Portal
              </button>
              <button
                onClick={() => setShowAnnouncements(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-white/30 rounded-xl hover:bg-white/20 transition-all"
              >
                <Bell className="w-5 h-5" />
                Lihat Pengumuman
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <div className="relative bg-[#0a2e66]/50 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: Users, label: "Siswa", value: "580+" },
              {
                icon: BookOpen,
                label: "Guru & Staff",
                value: "42",
              },
              { icon: Award, label: "Prestasi", value: "120+" },
              {
                icon: Calendar,
                label: "Tahun Berdiri",
                value: "1980",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1"
              >
                <stat.icon className="w-5 h-5 text-yellow-300" />
                <p className="text-xl font-black">
                  {stat.value}
                </p>
                <p className="text-white/70 text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ANNOUNCEMENTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-[#0d3b7d]">
              Pengumuman Terkini
            </h2>
            <p className="text-gray-500 text-sm">
              Informasi terbaru dari sekolah
            </p>
          </div>
          <button
            onClick={() => setShowAnnouncements(true)}
            className="flex items-center gap-1 text-[#0d3b7d] hover:text-blue-600 text-sm font-semibold"
          >
            Lihat Semua <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {announcements.slice(0, 4).map((ann) => (
            <motion.div
              key={ann.id}
              whileHover={{ scale: 1.01 }}
              onClick={() => setSelectedAnnouncement(ann)}
              className="cursor-pointer bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-lg flex-shrink-0 ${ann.urgent ? "bg-red-100" : "bg-blue-50"}`}
                >
                  <Bell
                    className={`w-4 h-4 ${ann.urgent ? "text-red-500" : "text-[#0d3b7d]"}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold ${ann.urgent ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-700"}`}
                    >
                      {ann.urgent ? "PENTING" : ann.category}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {ann.date}
                    </span>
                  </div>
                  <p className="font-semibold text-gray-800 text-sm line-clamp-2">
                    {ann.title}
                  </p>
                  <p className="text-gray-500 text-xs mt-1 line-clamp-1">
                    {ann.content}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-[#0d3b7d]">
                Galeri Sekolah
              </h2>
              <p className="text-gray-500 text-sm">
                Dokumentasi kegiatan SMP N 1 Pleret
              </p>
            </div>
            <button
              onClick={() => setShowGallery(true)}
              className="flex items-center gap-1 text-[#0d3b7d] hover:text-blue-600 text-sm font-semibold"
            >
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryImages.slice(0, 6).map((img, i) => (
              <motion.div
                key={img.id}
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-xl aspect-video cursor-pointer shadow-sm"
                onClick={() => setShowGallery(true)}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-3">
                  <p className="text-white text-xs font-semibold">
                    {img.title}
                  </p>
                  <p className="text-white/70 text-xs">
                    {img.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO TUTORIAL SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-[#0d3b7d]">
            Tutorial Penggunaan Portal
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Panduan cara mengakses dan menggunakan fitur-fitur
            portal SMP N 1 Pleret
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Cara Login ke Portal",
              desc: "Panduan login untuk Admin, Guru, Siswa, dan Wali Murid",
              duration: "3:45",
            },
            {
              title: "Panduan Guru - Input Nilai & Absensi",
              desc: "Tutorial lengkap fitur-fitur untuk guru",
              duration: "5:20",
            },
            {
              title: "Panduan Siswa - Akses Materi & Tugas",
              desc: "Cara mengakses materi, tugas, dan diskusi",
              duration: "4:10",
            },
          ].map((video, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden cursor-pointer"
            >
              <div className="relative bg-gradient-to-br from-[#0d3b7d] to-[#1a5276] aspect-video flex items-center justify-center">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url(${galleryImages[i].url})`,
                    backgroundSize: "cover",
                  }}
                />
                <div className="relative bg-white/20 backdrop-blur-sm rounded-full w-14 h-14 flex items-center justify-center border-2 border-white/50">
                  <Play className="w-6 h-6 text-white fill-white ml-1" />
                </div>
                <div className="absolute bottom-2 right-3 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <p className="font-semibold text-gray-800 text-sm">
                  {video.title}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {video.desc}
                </p>
                <div className="mt-3 flex items-center gap-1 text-[#0d3b7d] text-xs font-semibold">
                  <Play className="w-3 h-3 fill-[#0d3b7d]" />{" "}
                  Tonton Video
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-gray-400 text-xs mt-6">
          * Video tutorial akan ditambahkan oleh administrator
          sekolah
        </p>
      </section>

      {/* QUICK ACCESS */}
      <section className="bg-[#0d3b7d] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-black text-white mb-2">
            Akses Portal Sekolah
          </h2>
          <p className="text-white/70 text-sm mb-8">
            Pilih portal sesuai peran Anda
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                role: "Admin",
                icon: "🛡️",
                desc: "Kelola data sekolah",
                color: "bg-purple-500",
              },
              {
                role: "Guru",
                icon: "👨‍🏫",
                desc: "Absensi, nilai, tugas",
                color: "bg-blue-500",
              },
              {
                role: "Siswa",
                icon: "🎒",
                desc: "Tugas, materi, jadwal",
                color: "bg-green-500",
              },
              {
                role: "Wali Murid",
                icon: "👨‍👩‍👦",
                desc: "Pantau perkembangan anak",
                color: "bg-orange-500",
              },
            ].map((item) => (
              <motion.button
                key={item.role}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/login")}
                className={`${item.color} rounded-xl p-4 text-white text-left hover:opacity-90 transition-all shadow-lg`}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="font-bold text-sm">{item.role}</p>
                <p className="text-white/80 text-xs">
                  {item.desc}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#071d3f] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="https://tse2.mm.bing.net/th/id/OIP.gRycrEfwP4aElgAb_9LTCwHaHa?pid=Api&h=220&P=0"
                  alt="Logo SMP N 1 Pleret"
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <p className="font-bold text-sm">
                    SMP NEGERI 1 PLERET
                  </p>
                  <p className="text-yellow-300 text-xs">
                    Bantul, Yogyakarta
                  </p>
                </div>
              </div>
              <p className="text-white/60 text-xs">
                {schoolInfo.visi}
              </p>
            </div>
            <div>
              <p className="font-bold text-sm mb-3">Kontak</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/70 text-xs">
                  <MapPin className="w-3 h-3 text-yellow-300" />
                  {schoolInfo.address}
                </div>
                <div className="flex items-center gap-2 text-white/70 text-xs">
                  <Phone className="w-3 h-3 text-yellow-300" />
                  {schoolInfo.phone}
                </div>
                <div className="flex items-center gap-2 text-white/70 text-xs">
                  <Mail className="w-3 h-3 text-yellow-300" />
                  {schoolInfo.email}
                </div>
                <div className="flex items-center gap-2 text-white/70 text-xs">
                  <Globe className="w-3 h-3 text-yellow-300" />
                  {schoolInfo.website}
                </div>
              </div>
            </div>
            <div>
              <p className="font-bold text-sm mb-3">
                Akses Cepat
              </p>
              <div className="space-y-1">
                {[
                  "Portal Admin",
                  "Portal Guru",
                  "Portal Siswa",
                  "Portal Wali Murid",
                ].map((link) => (
                  <button
                    key={link}
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-1 text-white/70 text-xs hover:text-yellow-300 transition-colors"
                  >
                    <ChevronRight className="w-3 h-3" />
                    {link}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-4 text-center">
            <p className="text-white/40 text-xs">
              © 2026 SMP Negeri 1 Pleret. Semua hak dilindungi.
            </p>
          </div>
        </div>
      </footer>

      {/* ANNOUNCEMENT MODAL */}
      {showAnnouncements && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b bg-[#0d3b7d] text-white">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-yellow-300" />
                <h2 className="font-bold">
                  Pengumuman Sekolah
                </h2>
              </div>
              <button
                onClick={() => {
                  setShowAnnouncements(false);
                  setSelectedAnnouncement(null);
                }}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-4">
              {selectedAnnouncement ? (
                <div>
                  <button
                    onClick={() =>
                      setSelectedAnnouncement(null)
                    }
                    className="flex items-center gap-1 text-[#0d3b7d] text-sm mb-4 hover:underline"
                  >
                    ← Kembali
                  </button>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold ${selectedAnnouncement.urgent ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-700"}`}
                    >
                      {selectedAnnouncement.urgent
                        ? "PENTING"
                        : selectedAnnouncement.category}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {selectedAnnouncement.date}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-3">
                    {selectedAnnouncement.title}
                  </h3>
                  <p className="text-gray-600">
                    {selectedAnnouncement.content}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {announcements.map((ann) => (
                    <div
                      key={ann.id}
                      onClick={() =>
                        setSelectedAnnouncement(ann)
                      }
                      className="cursor-pointer p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-semibold ${ann.urgent ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-700"}`}
                        >
                          {ann.urgent
                            ? "PENTING"
                            : ann.category}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {ann.date}
                        </span>
                      </div>
                      <p className="font-semibold text-gray-800 text-sm">
                        {ann.title}
                      </p>
                      <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                        {ann.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* GALLERY MODAL */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b bg-[#0d3b7d] text-white">
              <div className="flex items-center gap-2">
                <Images className="w-5 h-5 text-yellow-300" />
                <h2 className="font-bold">Galeri Sekolah</h2>
              </div>
              <button
                onClick={() => setShowGallery(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {galleryImages.map((img) => (
                  <div
                    key={img.id}
                    className="relative overflow-hidden rounded-xl aspect-video shadow-sm"
                  >
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-3">
                      <p className="text-white text-xs font-semibold">
                        {img.title}
                      </p>
                      <span className="text-white/70 text-xs bg-black/30 px-2 py-0.5 rounded-full">
                        {img.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}