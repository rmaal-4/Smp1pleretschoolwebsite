# 🚀 QUICK START GUIDE - Login System Testing

## Memulai Project

```bash
# 1. Install dependencies (jika belum)
npm install

# 2. Start dev server
npm run dev

# 3. Buka browser ke http://localhost:5173
```

---

## 🎯 Test Scenarios - Copy & Paste Ready

### 📱 TEST 1: SISWA LOGIN (VII A)

**Skenario:** Login sebagai siswa kelas VII A

1. Klik tombol **"Siswa"** di halaman login
2. Pilih tingkat kelas **"7"**
3. Pilih sub-kelas **"VII A"**
4. Copy-paste NISN: `2024001`
5. Copy-paste Tanggal Lahir: `12 Januari 2012`
6. Klik **"Masuk"**

✅ Expected: Masuk ke SiswaDashboard

---

### 📱 TEST 2: SISWA LOGIN (VIII B) 

**Skenario:** Login sebagai siswa kelas VIII B

1. Klik tombol **"Siswa"**
2. Pilih tingkat kelas **"8"**
3. Pilih sub-kelas **"VIII B"**
4. Copy-paste NISN: `2024010`
5. Copy-paste Tanggal Lahir: `22 November 2011`
6. Klik **"Masuk"**

✅ Expected: Masuk ke SiswaDashboard (kelas 8)

---

### 📱 TEST 3: SISWA LOGIN (IX C)

**Skenario:** Login sebagai siswa kelas IX C dengan tanggal lahir berbeda

1. Klik tombol **"Siswa"**
2. Pilih tingkat kelas **"9"**
3. Pilih sub-kelas **"IX C"**
4. Copy-paste NISN: `2024018`
5. Copy-paste Tanggal Lahir: `31 Januari 2010`
6. Klik **"Masuk"**

✅ Expected: Masuk ke SiswaDashboard (kelas 9)

---

### ❌ TEST 4: SISWA LOGIN - VALIDASI ERROR (Salah TTL)

**Skenario:** Coba login dengan TTL yang salah

1. Klik tombol **"Siswa"**
2. Pilih tingkat kelas **"7"**
3. Pilih sub-kelas **"VII A"**
4. Copy-paste NISN: `2024001`
5. **Salah:** Masukkan Tanggal Lahir: `12 Januari 2010` (TAHUN SALAH)
6. Klik **"Masuk"**

❌ Expected Error: "NISN atau tanggal lahir tidak sesuai dengan kelas yang dipilih!"

---

### ❌ TEST 5: SISWA LOGIN - VALIDASI ERROR (Kelas Tidak Cocok)

**Skenario:** Coba login siswa dengan kelas yang tidak cocok

1. Klik tombol **"Siswa"**
2. Pilih tingkat kelas **"8"** (SALAH - siswa ini di kelas 7)
3. Pilih sub-kelas **"VIII A"**
4. Copy-paste NISN: `2024001` (ini siswa VII A, bukan VIII A)
5. Copy-paste Tanggal Lahir: `12 Januari 2012`
6. Klik **"Masuk"**

❌ Expected Error: "NISN atau tanggal lahir tidak sesuai dengan kelas yang dipilih!"

---

### 👨‍🏫 TEST 6: GURU LOGIN

**Skenario:** Login sebagai guru Matematika

1. Klik tombol **"Guru"**
2. Copy-paste NIP: `198201012005011001`
3. Copy-paste Password: `drs. bambang suryadi, m.pd` (HURUF KECIL!)
4. Klik **"Masuk"**

✅ Expected: Masuk ke GuruDashboard (nama: Drs. Bambang Suryadi, M.Pd)

---

### 👨‍🏫 TEST 7: GURU LOGIN - GURU LAIN

**Skenario:** Login sebagai guru Bahasa Indonesia

1. Klik tombol **"Guru"**
2. Copy-paste NIP: `197905152003122002`
3. Copy-paste Password: `sri wahyuni, s.pd` (HURUF KECIL!)
4. Klik **"Masuk"**

✅ Expected: Masuk ke GuruDashboard (nama: Sri Wahyuni, S.Pd)

---

### ❌ TEST 8: GURU LOGIN - VALIDASI ERROR (Password Salah Case)

**Skenario:** Coba login guru dengan password huruf besar

1. Klik tombol **"Guru"**
2. Copy-paste NIP: `198201012005011001`
3. **SALAH:** Masukkan Password: `Drs. Bambang Suryadi, M.Pd` (HURUF BESAR!)
4. Klik **"Masuk"**

❌ Expected Error: "Password tidak sesuai!"

---

### ❌ TEST 9: GURU LOGIN - VALIDASI ERROR (NIP Tidak Ada)

**Skenario:** Coba login dengan NIP yang tidak ada

1. Klik tombol **"Guru"**
2. **SALAH:** Masukkan NIP: `999999999999999999` (tidak ada di database)
3. Masukkan Password: `aaa`
4. Klik **"Masuk"**

❌ Expected Error: "NIP tidak ditemukan!"

---

### 👨‍👩‍👦 TEST 10: WALI LOGIN

**Skenario:** Login sebagai wali murid dari siswa VII A

1. Klik tombol **"Wali Murid"**
2. Pilih kelas **"VII A"**
3. Copy-paste NISN Anak: `2024001`
4. Copy-paste Nama Anak: `Aulia Rahma Putri`
5. Klik **"Masuk"**

✅ Expected: Masuk ke WaliDashboard (nama siswa: Aulia Rahma Putri)

---

### 👨‍👩‍👦 TEST 11: WALI LOGIN - KELAS BERBEDA

**Skenario:** Login sebagai wali dari kelas IX B

1. Klik tombol **"Wali Murid"**
2. Pilih kelas **"IX B"**
3. Copy-paste NISN Anak: `2024016`
4. Copy-paste Nama Anak: `Purnama Sari`
5. Klik **"Masuk"**

✅ Expected: Masuk ke WaliDashboard (nama siswa: Purnama Sari)

---

### ❌ TEST 12: WALI LOGIN - VALIDASI ERROR (Nama Tidak Cocok)

**Skenario:** Coba login wali dengan nama anak yang salah

1. Klik tombol **"Wali Murid"**
2. Pilih kelas **"VII A"**
3. Copy-paste NISN Anak: `2024001`
4. **SALAH:** Masukkan Nama Anak: `Bima Saputra` (nama anak lain)
5. Klik **"Masuk"**

❌ Expected Error: "Data tidak sesuai! Pastikan NISN, nama anak, dan kelas sudah benar."

---

### ❌ TEST 13: WALI LOGIN - VALIDASI ERROR (Kelas Tidak Cocok)

**Skenario:** Coba login wali dengan kelas yang tidak cocok

1. Klik tombol **"Wali Murid"**
2. Pilih kelas **"VII B"** (SALAH - siswa ini di VII A)
3. Copy-paste NISN Anak: `2024001`
4. Copy-paste Nama Anak: `Aulia Rahma Putri`
5. Klik **"Masuk"**

❌ Expected Error: "Data tidak sesuai! Pastikan NISN, nama anak, dan kelas sudah benar."

---

### 🛡️ TEST 14: ADMIN LOGIN

**Skenario:** Login sebagai admin sekolah

1. Klik tombol **"Admin"**
2. Copy-paste Username: `smp1pleret` (HURUF KECIL!)
3. Copy-paste Password: `29011999`
4. Klik **"Masuk"**

✅ Expected: Masuk ke AdminDashboard

---

### ❌ TEST 15: ADMIN LOGIN - VALIDASI ERROR (Username Salah)

**Skenario:** Coba login admin dengan username berbeda

1. Klik tombol **"Admin"**
2. **SALAH:** Masukkan Username: `SMP1PLERET` (HURUF BESAR)
3. Masukkan Password: `29011999`
4. Klik **"Masuk"**

❌ Expected Error: "Username atau password salah!"

---

### ❌ TEST 16: ADMIN LOGIN - VALIDASI ERROR (Password Salah)

**Skenario:** Coba login admin dengan password yang salah

1. Klik tombol **"Admin"**
2. Masukkan Username: `smp1pleret`
3. **SALAH:** Masukkan Password: `25121999` (tanggal lain)
4. Klik **"Masuk"**

❌ Expected Error: "Username atau password salah!"

---

## 🧪 TESTING CHECKLIST

### Navigation ✅
- [ ] Back button pada login bekerja
- [ ] Kembali ke home dari login bekerja
- [ ] Menu vertikal terlihat dengan baik

### Siswa Login ✅
- [ ] Login VII A berhasil
- [ ] Login dari dua kelas berbeda berbeda (VII vs VIII)
- [ ] Error pada TTL salah
- [ ] Error pada kelas tidak cocok
- [ ] Dropdown kelas otomatis filter sub-kelas

### Guru Login ✅
- [ ] Login berhasil dengan NIP & nama
- [ ] Error saat password huruf besar
- [ ] Error saat NIP tidak ada
- [ ] Multiple guru dapat login berbeda

### Wali Login ✅
- [ ] Login berhasil dengan NISN & nama anak
- [ ] Error saat nama anak tidak cocok
- [ ] Error saat kelas tidak cocok
- [ ] Pilihan kelas muncul sesuai database

### Admin Login ✅
- [ ] Login berhasil dengan smp1pleret + 29011999
- [ ] Error saat username salah case
- [ ] Error saat password salah format
- [ ] Admin credentials exact match

### UI/UX ✅
- [ ] Tombol login vertikal (bukan grid)
- [ ] Loading indicator muncul saat submit
- [ ] Error message jelas dan membantu
- [ ] Responsive di mobile

### Data Integrity ✅
- [ ] Tidak ada NISN yang duplikat
- [ ] Setiap siswa punya TTL yang unik
- [ ] Guru NIP UNIQUE
- [ ] Kelas sesuai dengan distribusi

---

## 📊 DATA VALIDATION REFERENCE

### Valid Supersets:

| Role | Username | Password | Expected |
|------|----------|----------|----------|
| **Siswa VII A** | 2024001 | 12 Januari 2012 | ✅ |
| **Siswa VIII B** | 2024010 | 22 November 2011 | ✅ |
| **Siswa IX C** | 2024018 | 31 Januari 2010 | ✅ |
| **Guru** | 198201012005011001 | drs. bambang suryadi, m.pd | ✅ |
| **Guru** | 197905152003122002 | sri wahyuni, s.pd | ✅ |
| **Wali** | 2024001 + Aulia Rahma Putri | VII A | ✅ |
| **Wali** | 2024016 + Purnama Sari | IX B | ✅ |
| **Admin** | smp1pleret | 29011999 | ✅ |

---

## 💡 TIPS UNTUK TESTING

1. **Copy-Paste:** Gunakan copy-paste untuk menghindari typo
2. **Case Sensitive:** Guru password & admin username CASE SENSITIVE
3. **Exact Match:** Admin credentials harus exact (no spaces)
4. **TTL Format:** Tanggal lahir harus "DD Bulan YYYY" (e.g., "12 Januari 2012")
5. **Error Messages:** Baca error message dengan teliti untuk debugging

---

## 🐛 TROUBLESHOOTING

**Q: Siswa login gagal dengan "NISN atau tanggal lahir tidak sesuai"**
- A: Periksa:
  1. NISN sesuai dengan daftar di LOGIN_GUIDE.md
  2. Tanggal lahir format yang tepat (DD Bulan YYYY)
  3. Kelas yang dipilih cocok dengan siswa

**Q: Guru password tidak diterima**
- A: Harus huruf KECIL penuh, contoh: `drs. bambang suryadi, m.pd` (bukan "Drs. Bambang...")

**Q: Admin login gagal**
- A: Periksa:
  1. Username: `smp1pleret` (huruf kecil, no spaces)
  2. Password: `29011999` (tanggal 29-01-1999)

---

## 📞 QUICK LINKS

- **Full Login Guide:** [LOGIN_GUIDE.md](./LOGIN_GUIDE.md)
- **Implementation Summary:** [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
- **Project Repo:** `/workspaces/Smp1pleretschoolwebsite`

---

**Happy Testing! 🎉**

Created: 11 Maret 2026
