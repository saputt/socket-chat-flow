# Socket-Vol-2: Advanced Real-time Chat & Authentication System 🚀

Project ini adalah implementasi sistem chat real-time yang kuat, menggunakan **Socket.io** untuk komunikasi dua arah dan **Prisma ORM** sebagai jembatan ke database. Fokus utama adalah pada keamanan autentikasi menggunakan rotasi **Access & Refresh Token** serta manajemen room grup yang dinamis.

## 🔥 Fitur Utama

- **JWT Handshake Security**: Autentikasi ketat langsung pada level koneksi Socket.io menggunakan data `auth` handshake.
- **Dynamic Group Rooms**: Sistem otomatis yang memasukkan user ke semua room grup mereka saat koneksi terjalin (`socket.join`).
- **Secure Token Rotation**: Mekanisme pembaruan Access Token secara otomatis melalui Refresh Token yang disimpan di **HTTP-Only Cookie**.
- **Unified Response Helper**: Standarisasi response API untuk memudahkan integrasi dengan Frontend.
- **Centralized Error Handling**: Middleware khusus untuk menangkap error tanpa membuat server *crash* (Internal Server Error 500 handling).

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Real-time**: [Socket.io](https://socket.io/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL / MySQL
- **Auth**: JWT (jsonwebtoken) & Cookie Parser

## 📁 Struktur Folder Lengkap

```text
Server/
├── prisma/             # Schema database & migrations
├── src/
│   ├── controllers/    # Handler request (Login, Get Chat, Create Group)
│   ├── middlewares/    # AuthGuard, ErrorHandler, & SocketInterceptor
│   ├── repositories/   # Data Access Object (Query langsung ke Prisma)
│   ├── routes/         # Definisi endpoint API (Auth, Chat, User)
│   ├── services/       # Business Logic (Proses data & validasi logic)
│   ├── socket/         # Event handlers (send_message, join_room, disconnect)
│   └── utils/          # Helpers (Token generator, Password hasher, Response helper)
├── .env                # Variabel lingkungan (Secret keys & DB URL)
├── .gitignore          # File/Folder yang diabaikan Git
├── index.js            # Entry point utama & inisialisasi Server
└── package.json        # List dependencies & scripts

```

## 🚀 Instalasi & Konfigurasi

1. **Clone Repository**
```bash
git clone [https://github.com/username/socket-vol-2.git](https://github.com/username/socket-vol-2.git)
cd socket-vol-2/Server

```


2. **Install Dependencies**
```bash
npm install

```


3. **Setup Environment**
Buat file `.env` di folder root server:
```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
ACCESS_TOKEN_SECRET="pake_string_acak_panjang_jirr"
REFRESH_TOKEN_SECRET="pake_string_acak_lebih_panjang_lagi"
CLIENT_URL="http://localhost:5173"
NODE_ENV="development"

```


4. **Database Migration**
```bash
npx prisma generate
npx prisma migrate dev --name init

```


5. **Run Project**
```bash
npm run dev

```



## 🔑 Alur Autentikasi & Socket

1. **Login**: User mendapat `accessToken` (JSON) dan `refreshToken` (HTTP-Only Cookie).
2. **Socket Handshake**: Client mengirim `userId` atau `token` melalui objek `auth` saat inisialisasi socket.
3. **Authorization**: Middleware di Backend memverifikasi identitas sebelum mengizinkan koneksi.
4. **Token Expired**: Jika `accessToken` mati, Frontend melakukan *silent refresh* ke endpoint `/api/refresh` untuk mendapatkan token baru tanpa logout.

## 📝 Catatan Pengembangan (WIP)

* [x] Fix `ERR_HTTP_HEADERS_SENT` dengan menambahkan `return` pada setiap response.
* [x] Proteksi rute dengan `authMiddleware`.
* [x] Handle logic `undefined` pada handshake socket.
* [ ] Refactor `chatService` untuk menangani variabel `decoded` yang lebih rapi.
* [ ] Implementasi fitur *Last Message* dan *Unread Count*.

---

**Warning**: Jangan lupa tambahkan `.env` ke dalam `.gitignore` sebelum melakukan push!

