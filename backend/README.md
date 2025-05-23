
# 📘 Admin CRUD Pegawai – API Documentation

## 🚀 Cara Menjalankan Aplikasi

### 🔑 Login
```http
POST http://localhost:4000/api/auth/login
```
**Request Body:**
```json
{
  "username": "123456789101112",
  "password": "admin123"
}
```

---

## 👥 Manajemen Pegawai

### ➕ Menambah Data Pegawai
```http
POST http://localhost:4000/api/pegawai
```
**Request Body:**
```json
{
  "nama_pegawai": "Iqbal",
  "nip": "19900101202233",
  "no_ktp": "3578121234567890",
  "panggilan": "Iqbal",
  "jk": "L",
  "id_agama": 1,
  "nidn": "0000000000",
  "no_kk": "3578121234567890",
  "no_karpeg": "00000000000000",
  "gol_darah": "O",
  "id_pendidikan": "1",
  "alamat": "Jl. Contoh No. 123",
  "kota": "Surabaya",
  "kode_pos": "60111",
  "id_wil": "35781000",
  "id_kabupaten": "3578",
  "id_prov": "35",
  "telpon": "031123456",
  "handphone": "081234567890",
  "email": "pegawai@example.com",
  "email_poliban": "pegawai@poliban.ac.id",
  "website": "www.example.com",
  "id_jabatan_fungsional": 1,
  "id_jabatan_struktural": 3,
  "id_status_pegawai": 1,
  "id_bagian": 1,
  "foto": "default.jpg",
  "foto_ktp": "default.jpg",
  "foto_npwp": "default.jpg",
  "foto_karpeg": "default.jpg",
  "foto_surat_nikah": "default.jpg",
  "foto_taspen": "default.jpg",
  "foto_nip": "default.jpg"
}
```

---

### ✏️ Mengubah Data Pegawai
```http
PUT http://localhost:4000/api/pegawai/{id}
```
**Request Body (Contoh):**
```json
{
  "nama_pegawai": "Saidi",
  "panggilan": "Saidi",
  "jk": "L",
  "id_agama": 1,
  "alamat": "Jl. Contoh No. 123",
  "kota": "Surabaya",
  "kode_pos": "60111",
  "id_wil": "35781000",
  "id_kabupaten": "3578",
  "id_prov": "35",
  "telpon": "031123456",
  "handphone": "081234567890",
  "email": "pegawai@example.com",
  "email_poliban": "pegawai@poliban.ac.id",
  "website": "www.example.com",
  "id_jabatan_fungsional": 1,
  "id_jabatan_struktural": 3,
  "id_status_pegawai": "1",
  "id_bagian": 1,
  "foto": "default.jpg",
  "foto_ktp": "default.jpg",
  "foto_npwp": "default.jpg",
  "foto_karpeg": "default.jpg",
  "foto_surat_nikah": "default.jpg",
  "foto_taspen": "default.jpg",
  "foto_nip": "default.jpg"
}
```

---

## 👤 Update Profil Pegawai

### 🟡 Update Data Non-Sensitif (oleh Pegawai)
```http
PUT http://localhost:4000/api/pegawai/profile/non-sensitive/{id}
```
**Request Body:**
```json
{
  "alamat": "Jl. Baru No. 456",
  "kota": "Jakarta",
  "kode_pos": "12345",
  "telpon": "021987654",
  "handphone": "08987654321",
  "email": "pegawai_update@example.com",
  "website": "www.pegawai.com",
  "id_prov": "31",
  "id_kabupaten": "3171",
  "email_poliban": "pegawai_update@poliban.ac.id"
}
```

---

### 🔐 Request Perubahan Data Sensitif (oleh Pegawai)
```http
POST http://localhost:4000/api/pegawai/profile/request-sensitive/{id}
```
**Request Body:**
```json
{
  "field": "email",
  "newValue": "newemail@example.com",
  "reason": "Perubahan alamat email untuk komunikasi"
}
```
> 🔒 Harus login sebagai pegawai

---

## 🛠️ Manajemen Request Perubahan (Admin)

### 📄 Melihat Semua Permintaan
```http
GET http://localhost:4000/api/pegawai/admin/change-requests
```

### 🔍 Melihat Detail Permintaan
```http
GET http://localhost:4000/api/pegawai/admin/change-requests/{id}
```

### ✅ Menyetujui / ❌ Menolak Permintaan
```http
PUT http://localhost:4000/api/pegawai/admin/change-requests/{id}
```
**Untuk menyetujui:**
```json
{
  "status": "approved",
  "keterangan": "Perubahan disetujui"
}
```
**Untuk menolak:**
```json
{
  "status": "rejected",
  "keterangan": "Perubahan ditolak karena alasan XYZ"
}
```

---  
> 🧠 Pastikan token JWT dikirim di `Authorization` header saat mengakses endpoint yang membutuhkan autentikasi.
