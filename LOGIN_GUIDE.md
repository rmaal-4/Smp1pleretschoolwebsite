# 📚 Panduan Login Portal SMP N 1 PLERET

## 🎯 Sistem Login Baru - Comprehensive Guide

Portal ini telah diupdate dengan sistem login yang lebih robust dengan validasi lengkap untuk setiap role.

---

## 🔐 LOGIN SISWA

### Flow Login Siswa:
1. **Pilih Tingkat Kelas** → Pilih antara 7, 8, atau 9
2. **Pilih Sub-Kelas** → Pilih A, B, C (sesuai ketersediaan)
3. **Masukkan NISN** → Nomor Induk Siswa
4. **Masukkan Tanggal Lahir** → Sebagai password (format: DD Bulan YYYY)

### Data Siswa untuk Testing:

#### Kelas VII A
| NISN | Nama | Tanggal Lahir | Kelas |
|------|------|---------------|-------|
| 2024001 | Aulia Rahma Putri | 12 Januari 2012 | VII A |
| 2024002 | Bima Saputra | 5 Maret 2012 | VII A |

#### Kelas VII B
| NISN | Nama | Tanggal Lahir | Kelas |
|------|------|---------------|-------|
| 2024003 | Citra Dewi Lestari | 20 Juni 2012 | VII B |
| 2024004 | Doni Hermawan | 14 April 2012 | VII B |
| 2024005 | Eka Sari Wijaya | 8 Mei 2012 | VII B |

#### Kelas VII C
| NISN | Nama | Tanggal Lahir | Kelas |
|------|------|---------------|-------|
| 2024006 | Faridah Nur Azizah | 25 Juli 2012 | VII C |
| 2024007 | Guntur Pratama | 11 September 2012 | VII C |

#### Kelas VIII A
| NISN | Nama | Tanggal Lahir | Kelas |
|------|------|---------------|-------|
| 2024008 | Hana Kartika | 3 Februari 2011 | VIII A |
| 2024009 | Ibnu Mahmud | 17 Oktober 2011 | VIII A |

#### Kelas VIII B
| NISN | Nama | Tanggal Lahir | Kelas |
|------|------|---------------|-------|
| 2024010 | Jaka Mulyono | 22 November 2011 | VIII B |
| 2024011 | Kartika Suwardi | 9 Januari 2011 | VIII B |

#### Kelas VIII C
| NISN | Nama | Tanggal Lahir | Kelas |
|------|------|---------------|-------|
| 2024012 | Lina Marlina | 30 Agustus 2011 | VIII C |
| 2024013 | Malik Surabaya | 6 Desember 2011 | VIII C |

#### Kelas IX A
| NISN | Nama | Tanggal Lahir | Kelas |
|------|------|---------------|-------|
| 2024014 | Nabila Putri | 19 Mei 2010 | IX A |
| 2024015 | Oman Kusuma | 27 Juni 2010 | IX A |

#### Kelas IX B
| NISN | Nama | Tanggal Lahir | Kelas |
|------|------|---------------|-------|
| 2024016 | Purnama Sari | 12 April 2010 | IX B |
| 2024017 | Qomar Hidayat | 8 Maret 2010 | IX B |

#### Kelas IX C
| NISNA | Nama | Tanggal Lahir | Kelas |
|------|------|---------------|-------|
| 2024018 | Rina Wulandari | 31 Januari 2010 | IX C |
| 2024019 | Slamet Riyanto | 14 Juli 2010 | IX C |

### ⚠️ Validasi Login Siswa:
- ✅ NISN HARUS ada dalam database
- ✅ Tanggal Lahir HARUS sesuai dengan NISN
- ✅ Kelas yang dipilih HARUS cocok dengan data siswa
- ❌ Jika ada yang tidak cocok, akan muncul error: "NISN atau tanggal lahir tidak sesuai dengan kelas yang dipilih!"

---

## 👨‍🏫 LOGIN GURU

### Flow Login Guru:
1. **Masukkan NIP** → Nomor Induk Pegawai
2. **Masukkan Password** → Nama guru lengkap **HURUF KECIL**

### Data Guru untuk Testing:

| NIP | Nama | Password (Huruf Kecil) |
|-----|------|------------------------|
| 198201012005011001 | Drs. Bambang Suryadi, M.Pd | drs. bambang suryadi, m.pd |
| 197905152003122002 | Sri Wahyuni, S.Pd | sri wahyuni, s.pd |
| 198007202006041003 | Ahmad Faruq, S.Pd | ahmad faruq, s.pd |
| 197603142000032004 | Siti Aminah, S.Pd.I | siti aminah, s.pd.i |
| 198509212010011005 | Rizki Pratama, S.Pd | rizki pratama, s.pd |
| 198312052008012006 | Dewi Rahayu, S.Pd | dewi rahayu, s.pd |

### ⚠️ Validasi Login Guru:
- ✅ NIP HARUS ada dalam database
- ✅ Password HARUS sama persis dengan nama guru (huruf kecil)
- ❌ Jika password salah: "Password tidak sesuai!"
- ❌ Jika NIP tidak ada: "NIP tidak ditemukan!"

---

## 👨‍👩‍👦 LOGIN WALI MURID

### Flow Login Wali Murid:
1. **Pilih Kelas Anak** → Pilih kelas sesuai dengan anak
2. **Masukkan NISN Anak** → Nomor Induk Anak
3. **Masukkan Nama Anak** → Nama lengkap anak

### Data Wali untuk Testing:
Gunakan data siswa di atas (NISN + Nama + Kelas harus cocok)

Contoh:
- **NISN:** 2024001
- **Nama Anak:** Aulia Rahma Putri  
- **Kelas:** VII A

### ⚠️ Validasi Login Wali:
- ✅ NISN HARUS ada dalam database
- ✅ Nama Anak HARUS sesuai dengan NISN
- ✅ Kelas HARUS cocok dengan data siswa
- ❌ Jika ada yang tidak cocok: "Data tidak sesuai! Pastikan NISN, nama anak, dan kelas sudah benar."

---

## 🛡️ LOGIN ADMIN

### Flow Login Admin:
1. **Username:** `smp1pleret` (huruf kecil)
2. **Password:** `29011999` (tanggal + bulan + tahun berdiri: 29 Januari 1999)

### Contoh Login Admin:
- **Username:** smp1pleret
- **Password:** 29011999

### ⚠️ Validasi Login Admin:
- ✅ Username HARUS exact: `smp1pleret`
- ✅ Password HARUS exact: `29011999`
- ❌ Jika salah: "Username atau password salah!"

---

## 🎨 Perubahan UI/Design

### Layout Menu Login
- ✅ Changed dari grid layout (2 kolom) menjadi **vertical layout** (1 kolom)
- ✅ Menu login terlihat lebih rapi dan mobile-friendly
- ✅ Button diatur dari atas ke bawah

### Logo Sekolah
- ✅ Semua logo sudah di-update dengan logo baru: https://tse2.mm.bing.net/th/id/OIP.gRycrEfwP4aElgAb_9LTCwHaHa

### Galeri Sekolah
Foto telah diupdate:
1. **Gedung Sekolah** - https://tse4.mm.bing.net/th/id/OIP.E5W-3P5c6Mq-wmkx3Y-hDgHaDS
2. **Kegiatan Mengajar** - https://tse2.mm.bing.net/th/id/OIP.EBEnww470bFB0fg3fc5LwwHaD9
3. **Kegiatan P5** - https://tse3.mm.bing.net/th/id/OIP.8U-8fcu82KfauhQHtV5OFQHaEK
4. **Kegiatan Upacara** - https://tse3.mm.bing.net/th/id/OIP.8EFWntmrW3ksHH7HaK74JAHaDS
5. **Acara Sekolah** - https://tse4.mm.bing.net/th/id/OIP.M_wnoqddYdXERjXMoAdswgAAAA
6. **Kegiatan Keagamaan** - https://tse4.mm.bing.net/th/id/OIP.-ISDeOohLDQ1vDhJU2WWegHaD9

---

## 📋 Testing Checklist

- [ ] Test Siswa Login dengan berbagai kelas
- [ ] Verify NISN validation
- [ ] Verify Tanggal Lahir (password) validation  
- [ ] Test Guru Login dengan beberapa guru
- [ ] Verify NIP validation
- [ ] Verify nama password validation (case-sensitive)
- [ ] Test Wali Login
- [ ] Verify NISN + nama anak validation
- [ ] Test Admin Login
- [ ] Verify username/password exact match
- [ ] Test error messages
- [ ] Verify vertical layout pada mobile

---

## 🔍 Fitur yang Sudah Implemented

✅ **Login System Baru**
- Multi-step login untuk siswa dan wali
- Validasi lengkap untuk setiap role
- Error handling yang user-friendly

✅ **Vertical Menu Layout**
- Login options ditampilkan dari atas ke bawah
- Better mobile responsiveness

✅ **Updated Gallery**
- 6 foto baru sesuai request

✅ **Expanded Student Database**
- 18 siswa dengan distribusi per kelas
- Data TTL lengkap untuk testing

---

## 📌 Catatan Penting

1. **Password Siswa:** Menggunakan Tanggal Lahir dalam format "DD Bulan YYYY" (e.g., "12 Januari 2012")
2. **Password Guru:** Menggunakan nama lengkap dalam huruf KECIL (e.g., "drs. bambang suryadi, m.pd")
3. **Admin Password:** Tanggal berdiri sekolah DDMMYYYY = 29011999
4. **Validasi Ketat:** Sistem akan menolak login jika data tidak sesuai

---

## 🆘 Troubleshooting

### Error: "NISN atau tanggal lahir tidak sesuai dengan kelas yang dipilih!"
- ✓ Periksa NISN yang dimasukkan
- ✓ Periksa tanggal lahir (format harus DD Bulan YYYY)
- ✓ Periksa kelas yang dipilih cocok dengan data siswa

### Error: "Password tidak sesuai!"
- ✓ Periksa NIP guru
- ✓ Periksa password harus HURUF KECIL
- ✓ Pastikan menggunakan nama lengkap guru

### Error: "Username atau password salah!"
- ✓ Username HARUS: `smp1pleret`
- ✓ Password HARUS: `29011999`
- ✓ Periksa tidak ada spasi tambahan

---

**Last Updated:** March 11, 2026  
**Version:** 2.0 (Login System Overhaul)
